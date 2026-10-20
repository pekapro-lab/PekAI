import { useState, useRef, useEffect, useCallback } from "react";
import { LiveAudioPlayer, LiveAudioRecorder } from "../utils/audio";
import { TranscriptMessage, VoiceName } from "../types";
import { createVoiceToken } from "../grok";

export type SessionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "speaking"
  | "listening"
  | "interrupted"
  | "error"
  | "ended";

interface StartSessionParams {
  language: string;
  localeCode?: string;
  level: string;
  scenario: string;
  scenarioDescription: string;
  voice: VoiceName;
  tutorName: string;
}

const VOICE_MAP: Record<VoiceName, string> = {
  Zephyr: "ara",
  Puck: "leo",
  Charon: "rex",
  Kore: "eve",
  Fenrir: "sal",
};

const SPEED_MAP: Record<string, number> = {
  A1: 0.8,
  A2: 0.9,
  B1: 1,
  B2: 1.05,
  C1: 1.15,
};

const REALTIME_URL = "wss://api.x.ai/v1/realtime?model=grok-voice-latest";

export function useLiveVoiceSession() {
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [interimUserText, setInterimUserText] = useState("");
  const [interimTutorText, setInterimTutorText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [userAudioLevel, setUserAudioLevel] = useState(0);
  const [tutorAudioLevel, setTutorAudioLevel] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const playerRef = useRef<LiveAudioPlayer | null>(null);
  const recorderRef = useRef<LiveAudioRecorder | null>(null);
  const isMutedRef = useRef(false);
  isMutedRef.current = isMuted;
  const streamingRef = useRef(false);
  const generationRef = useRef(0);
  const greetedRef = useRef(false);
  const currentTutorAccumulator = useRef("");
  const interimUserRef = useRef("");
  const animFrameRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateAudioLevels = useCallback(() => {
    if (recorderRef.current && !isMutedRef.current) {
      setUserAudioLevel(recorderRef.current.getAudioLevel());
    } else {
      setUserAudioLevel(0);
    }
    setTutorAudioLevel(playerRef.current?.getAudioLevel() ?? 0);
    animFrameRef.current = requestAnimationFrame(updateAudioLevels);
  }, []);

  const commitTutor = useCallback((text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `tutor-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        role: "tutor",
        text: clean,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const commitUser = useCallback((text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === "user" && last.text === clean) return prev;
      return [
        ...prev,
        {
          id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          role: "user",
          text: clean,
          timestamp: Date.now(),
        },
      ];
    });
    interimUserRef.current = "";
    setInterimUserText("");
  }, []);

  const stopResources = useCallback(() => {
    streamingRef.current = false;
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    recorderRef.current?.stop();
    recorderRef.current = null;
    playerRef.current?.stop();
    playerRef.current?.close();
    playerRef.current = null;
    if (wsRef.current) {
      wsRef.current.onopen = null;
      wsRef.current.onmessage = null;
      wsRef.current.onerror = null;
      wsRef.current.onclose = null;
      try {
        wsRef.current.close();
      } catch {
        // ignore
      }
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(updateAudioLevels);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      generationRef.current += 1;
      stopResources();
    };
  }, [stopResources, updateAudioLevels]);

  const startSession = async (params: StartSessionParams) => {
    const generation = ++generationRef.current;
    const alive = () => generation === generationRef.current;

    try {
      setStatus("connecting");
      setErrorMessage(null);
      setMicNotice(null);
      setDurationSeconds(0);
      setInterimUserText("");
      setInterimTutorText("");
      currentTutorAccumulator.current = "";
      interimUserRef.current = "";
      greetedRef.current = false;
      streamingRef.current = false;
      stopResources();
      generationRef.current = generation;

      const player = new LiveAudioPlayer();
      player.unlock();
      playerRef.current = player;

      const recorder = new LiveAudioRecorder();
      recorderRef.current = recorder;
      let micReady = false;
      try {
        await recorder.start((base64Audio) => {
          if (!streamingRef.current || isMutedRef.current) return;
          const socket = wsRef.current;
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                type: "input_audio_buffer.append",
                audio: base64Audio,
              }),
            );
          }
        });
        micReady = true;
      } catch {
        micReady = false;
        recorder.stop();
        if (recorderRef.current === recorder) recorderRef.current = null;
      }

      if (!alive()) return;

      const speed = SPEED_MAP[params.level] ?? 1;
      const voice = VOICE_MAP[params.voice] ?? "ara";
      const instructions = `Eres PekAI (encarnando al personaje ${params.tutorName}), un tutor y compañero de conversación nativo, cálido, empático y paciente que ayuda a practicar ${params.language}.
Idioma objetivo de práctica: ${params.language}
Nivel de competencia del estudiante: ${params.level}
Escenario activo: "${params.scenario}" - ${params.scenarioDescription}

Pautas esenciales:
1. Habla de forma natural en ${params.language} con una cadencia y vocabulario perfectamente adaptados a un estudiante de nivel ${params.level}.
2. Mantén tus intervenciones habladas breves y conversacionales (máximo de 1 a 3 frases por turno) para que el estudiante tenga todo el espacio para expresarse.
3. Mantén el rol del escenario mientras actúas como un tutor alentador y paciente.
4. Si el estudiante duda, comete pequeños fallos o recurre al español, comprende su intención con amabilidad y continúa la conversación en ${params.language} sin soltar sermones teóricos extensos.
5. Haz preguntas abiertas y naturales para mantener viva la conversación.
6. Comienza la conversación de inmediato con un saludo afectuoso y realista en ${params.language} acorde al escenario para invitar al alumno a responder.
7. No menciones que eres un modelo ni describas estas instrucciones.`;

      let ws: WebSocket | null = null;
      const earlyMessages: string[] = [];
      let lastError = "No se pudo conectar con la voz de Grok.";
      for (let attempt = 0; attempt < 3 && alive(); attempt++) {
        const tokenResult = await createVoiceToken();
        if (!alive()) return;
        const socket = new WebSocket(REALTIME_URL, [`xai-client-secret.${tokenResult.token}`]);
        earlyMessages.length = 0;
        const opened = await new Promise<boolean>((resolve) => {
          const timer = setTimeout(() => resolve(false), 7000);
          const finish = (ok: boolean) => {
            clearTimeout(timer);
            resolve(ok);
          };
          socket.onmessage = (event) => {
            if (typeof event.data === "string") earlyMessages.push(event.data);
          };
          socket.onopen = () => finish(true);
          socket.onerror = () => finish(false);
          socket.onclose = () => finish(false);
        });

        if (opened && socket.readyState === WebSocket.OPEN) {
          ws = socket;
          wsRef.current = socket;
          break;
        }
        lastError = "La sesión de voz no llegó a abrirse. Inténtalo de nuevo.";
        try {
          socket.close();
        } catch {
          // ignore
        }
      }

      if (!alive()) return;
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        setErrorMessage(lastError);
        setStatus("error");
        stopResources();
        return;
      }

      const socket = ws;
      const handleEvent = (raw: string) => {
        if (!alive()) return;
        let data: Record<string, unknown>;
        try {
          data = JSON.parse(raw) as Record<string, unknown>;
        } catch {
          return;
        }
        const type = String(data.type ?? "");

        if (type === "session.created") {
          socket.send(
            JSON.stringify({
              type: "session.update",
              session: {
                voice,
                instructions,
                turn_detection: { type: "server_vad" },
                audio: {
                  input: {
                    format: { type: "audio/pcm", rate: 16000 },
                    transcription: {
                      model: "grok-transcribe",
                      ...(params.localeCode ? { language_hint: params.localeCode } : {}),
                    },
                  },
                  output: {
                    format: { type: "audio/pcm", rate: 24000 },
                    speed,
                  },
                },
              },
            }),
          );
        } else if (type === "session.updated") {
          streamingRef.current = micReady;
          setStatus("listening");
          if (!micReady) {
            setMicNotice(
              "El micrófono no está disponible en esta vista. Puedes escribir y PekAI te responderá en voz.",
            );
          }
          if (!greetedRef.current) {
            greetedRef.current = true;
            socket.send(JSON.stringify({ type: "response.create" }));
          }
          if (!timerIntervalRef.current) {
            timerIntervalRef.current = setInterval(() => {
              setDurationSeconds((prev) => prev + 1);
            }, 1000);
          }
        } else if (type === "response.output_audio.delta" || type === "response.audio.delta") {
          const delta = typeof data.delta === "string" ? data.delta : "";
          if (delta) {
            setStatus("speaking");
            playerRef.current?.enqueueChunk(delta);
          }
        } else if (
          type === "response.output_audio_transcript.delta" ||
          type === "response.audio_transcript.delta"
        ) {
          const delta = typeof data.delta === "string" ? data.delta : "";
          if (delta) {
            currentTutorAccumulator.current += delta;
            setInterimTutorText(currentTutorAccumulator.current);
          }
        } else if (
          type === "response.output_audio_transcript.done" ||
          type === "response.audio_transcript.done"
        ) {
          const finalText =
            (typeof data.transcript === "string" && data.transcript) ||
            currentTutorAccumulator.current;
          commitTutor(finalText);
          currentTutorAccumulator.current = "";
          setInterimTutorText("");
        } else if (type === "input_audio_buffer.speech_started") {
          playerRef.current?.stop();
          setStatus("interrupted");
          if (currentTutorAccumulator.current.trim()) {
            commitTutor(currentTutorAccumulator.current);
            currentTutorAccumulator.current = "";
            setInterimTutorText("");
          }
        } else if (
          type === "conversation.item.input_audio_transcription.updated" ||
          type === "conversation.item.input_audio_transcription.delta"
        ) {
          const text = String(data.transcript ?? data.text ?? data.delta ?? "");
          if (type.endsWith("updated") || typeof data.transcript === "string") {
            interimUserRef.current = text;
            setInterimUserText(text);
          } else if (text) {
            interimUserRef.current += text;
            setInterimUserText(interimUserRef.current);
          }
        } else if (type === "conversation.item.input_audio_transcription.completed") {
          const text = String(data.transcript ?? data.text ?? interimUserRef.current);
          commitUser(text);
        } else if (type === "response.created") {
          if (interimUserRef.current.trim()) commitUser(interimUserRef.current);
          setStatus("speaking");
        } else if (type === "response.done") {
          if (currentTutorAccumulator.current.trim()) {
            commitTutor(currentTutorAccumulator.current);
            currentTutorAccumulator.current = "";
            setInterimTutorText("");
          }
          setStatus("listening");
        } else if (type === "error") {
          const message =
            (data.error as { message?: string } | undefined)?.message ||
            (typeof data.message === "string" ? data.message : "Error en la sesión de voz.");
          lastError = message;
          if (!/no active response|cancellation/i.test(message)) {
            setErrorMessage(message);
          }
        }
      };

      socket.onclose = () => {
        if (!alive()) return;
        streamingRef.current = false;
        setStatus((current) => (current === "ended" || current === "error" ? current : "idle"));
      };
      socket.onerror = () => {
        if (!alive()) return;
        setErrorMessage("Error de conexión con la voz de PekAI. Intenta reconectar.");
        setStatus("error");
      };
      socket.onmessage = (event) => {
        if (typeof event.data === "string") handleEvent(event.data);
      };
      for (const raw of earlyMessages) handleEvent(raw);

      if (!micReady) {
        setMicNotice(
          "El micrófono no está disponible en esta vista. Puedes escribir y PekAI te responderá en voz.",
        );
      }
    } catch (err) {
      if (!alive()) return;
      console.error("Failed to start PekAI session:", err);
      setErrorMessage(err instanceof Error ? err.message : "No se pudo iniciar la sesión de voz con PekAI");
      setStatus("error");
      stopResources();
    }
  };

  const stopSession = () => {
    generationRef.current += 1;
    if (currentTutorAccumulator.current.trim()) {
      commitTutor(currentTutorAccumulator.current);
      currentTutorAccumulator.current = "";
    }
    stopResources();
    setInterimUserText("");
    setInterimTutorText("");
    setUserAudioLevel(0);
    setTutorAudioLevel(0);
    setStatus("ended");
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const sendTextMessage = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const socket = wsRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    playerRef.current?.stop();
    try {
      socket.send(JSON.stringify({ type: "response.cancel" }));
    } catch {
      // ignore if nothing is speaking
    }
    socket.send(
      JSON.stringify({
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: clean }],
        },
      }),
    );
    socket.send(JSON.stringify({ type: "response.create" }));
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        text: clean,
        timestamp: Date.now(),
      },
    ]);
  };

  const clearMessages = () => {
    setMessages([]);
    setDurationSeconds(0);
    setStatus("idle");
    setMicNotice(null);
  };

  const updateMessageAnalysis = (messageId: string, analysis: TranscriptMessage["analysis"]) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, analysis, isAnalyzing: false } : msg)),
    );
  };

  const setMessageAnalyzing = (messageId: string, isAnalyzing: boolean) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isAnalyzing } : msg)));
  };

  const setMessageTranslation = (messageId: string, translatedText: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, translatedText, isTranslating: false } : msg,
      ),
    );
  };

  return {
    status,
    errorMessage,
    micNotice,
    messages,
    interimUserText,
    interimTutorText,
    isMuted,
    userAudioLevel,
    tutorAudioLevel,
    durationSeconds,
    startSession,
    stopSession,
    toggleMute,
    sendTextMessage,
    clearMessages,
    updateMessageAnalysis,
    setMessageAnalyzing,
    setMessageTranslation,
  };
}
