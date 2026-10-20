import { createServerFn } from "@tanstack/react-start";
import type {
  ReplySuggestion,
  SessionSummaryData,
  TurnAnalysis,
} from "./types";

const MODEL = "grok-4.5";

function requireKey() {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    throw new Error("La voz y el análisis de PekAI no están disponibles en este entorno.");
  }
  return apiKey;
}

function parseJson<T>(raw: string): T {
  const trimmed = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("PekAI no devolvió un informe válido.");
  return JSON.parse(trimmed.slice(start, end + 1)) as T;
}

async function grokJson<T>(system: string, user: string, maxTokens: number): Promise<T> {
  const apiKey = requireKey();
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.4,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`Grok no ha podido responder (${res.status}). Inténtalo de nuevo.`);
  }
  const body = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = body.choices?.[0]?.message?.content ?? "";
  return parseJson<T>(text);
}

function clip(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function extractToken(body: unknown, depth = 0): string | null {
  if (!body || typeof body !== "object" || depth > 3) return null;
  const record = body as Record<string, unknown>;
  for (const key of ["value", "token", "secret", "client_secret", "ephemeral_token"]) {
    const direct = record[key];
    if (typeof direct === "string" && direct.length > 8) return direct;
  }
  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      const nested = extractToken(value, depth + 1);
      if (nested) return nested;
    }
  }
  return null;
}

export const createVoiceToken = createServerFn({ method: "POST" }).handler(async () => {
  const apiKey = requireKey();
  const res = await fetch("https://api.x.ai/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ expires_after: { seconds: 600 } }),
  });
  if (!res.ok) {
    throw new Error(`No se ha podido abrir la sesión de voz (${res.status}).`);
  }
  const body = await res.json();
  const token = extractToken(body);
  if (!token) throw new Error("La sesión de voz no ha devuelto una credencial válida.");
  return { token };
});

export const analyzeTurn = createServerFn({ method: "POST" })
  .validator(
    (input: {
      turnText: string;
      language?: string;
      scenario?: string;
      targetLevel?: string;
    }) => ({
      turnText: clip(input?.turnText, 800),
      language: clip(input?.language, 40) || "Español",
      scenario: clip(input?.scenario, 160),
      targetLevel: clip(input?.targetLevel, 40) || "B1",
    }),
  )
  .handler(async ({ data }): Promise<TurnAnalysis> => {
    if (!data.turnText) throw new Error("No hay frase que analizar.");
    const parsed = await grokJson<TurnAnalysis>(
      "Eres PekAI, profesor de idiomas. Responde solo JSON en español de España. Sé cercano, breve y motivador.",
      `Analiza esta intervención de un estudiante de ${data.language}.
Frase: "${data.turnText}"
Escenario: ${data.scenario || "conversación libre"}
Nivel: ${data.targetLevel}

JSON con estas claves:
isCorrect (boolean),
explanation (1-2 frases en español de España),
correction (versión corregida o cadena vacía),
naturalAlternative (cómo lo diría un nativo),
pronunciationTip (consejo fonético breve),
vocabulary (array de 1 a 3 objetos con term, meaning, phonetic, example).`,
      700,
    );
    return {
      isCorrect: Boolean(parsed.isCorrect),
      explanation: parsed.explanation || "Sin observaciones.",
      correction: parsed.correction || "",
      naturalAlternative: parsed.naturalAlternative || parsed.correction || data.turnText,
      pronunciationTip: parsed.pronunciationTip || "",
      vocabulary: Array.isArray(parsed.vocabulary) ? parsed.vocabulary.slice(0, 3) : [],
    };
  });

export const suggestReplies = createServerFn({ method: "POST" })
  .validator(
    (input: {
      lastTutorMessage?: string;
      language?: string;
      scenario?: string;
      level?: string;
    }) => ({
      lastTutorMessage: clip(input?.lastTutorMessage, 600) || "¡Hola! ¿En qué puedo ayudarte hoy?",
      language: clip(input?.language, 40) || "Español",
      scenario: clip(input?.scenario, 160),
      level: clip(input?.level, 40) || "B1",
    }),
  )
  .handler(async ({ data }) => {
    const parsed = await grokJson<{ suggestions: ReplySuggestion[] }>(
      "Eres PekAI, entrenador de conversación. Responde solo JSON.",
      `El tutor acaba de decir: "${data.lastTutorMessage}"
Escenario: ${data.scenario}
Idioma de práctica: ${data.language}
Nivel: ${data.level}

Genera exactamente 3 respuestas que el alumno podría decir ahora en ${data.language}:
una sencilla, una estándar y una expresiva.
JSON: { "suggestions": [ { "phrase", "phonetic", "translation", "level" } ] }
translation siempre en español de España. level es "sencilla", "estándar" o "expresiva".`,
      600,
    );
    return { suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.slice(0, 3) : [] };
  });

export const sessionSummary = createServerFn({ method: "POST" })
  .validator(
    (input: {
      language?: string;
      level?: string;
      scenario?: string;
      history?: { role: string; text: string }[];
    }) => ({
      language: clip(input?.language, 40) || "Español",
      level: clip(input?.level, 40) || "B1",
      scenario: clip(input?.scenario, 160),
      history: (Array.isArray(input?.history) ? input.history : [])
        .slice(-30)
        .map((item) => ({
          role: item?.role === "user" ? "user" : "tutor",
          text: clip(item?.text, 400),
        }))
        .filter((item) => item.text),
    }),
  )
  .handler(async ({ data }): Promise<SessionSummaryData> => {
    const conversation = data.history
      .map((item) => `${item.role === "user" ? "Alumno" : "Tutor"}: ${item.text}`)
      .join("\n");
    const parsed = await grokJson<SessionSummaryData>(
      "Eres un docente de PekAI. Evalúa con rigor amable, en español de España. Solo JSON.",
      `Evalúa esta práctica de ${data.language}, nivel ${data.level}.
Escenario: ${data.scenario || "libre"}

${conversation || "Diálogo introductorio breve."}

JSON:
overallScore, fluencyScore, grammarScore, vocabularyScore (enteros 0-100),
summary (párrafo alentador),
strengths (2 a 4 strings),
corrections (1 a 3 objetos learnerSaid, corrected, why; array vacío si no hay),
keyTerms (objetos term, definition, sampleSentence),
recommendedNextSteps (string).`,
      900,
    );
    return {
      overallScore: clampScore(parsed.overallScore),
      fluencyScore: clampScore(parsed.fluencyScore),
      grammarScore: clampScore(parsed.grammarScore),
      vocabularyScore: clampScore(parsed.vocabularyScore),
      summary: parsed.summary || "Buena sesión de práctica.",
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 4) : [],
      corrections: Array.isArray(parsed.corrections) ? parsed.corrections.slice(0, 3) : [],
      keyTerms: Array.isArray(parsed.keyTerms) ? parsed.keyTerms.slice(0, 6) : [],
      recommendedNextSteps: parsed.recommendedNextSteps || "Sigue practicando turnos un poco más largos.",
    };
  });

export const translatePhrase = createServerFn({ method: "POST" })
  .validator((input: { text: string; language?: string }) => ({
    text: clip(input?.text, 800),
    language: clip(input?.language, 40) || "el idioma de práctica",
  }))
  .handler(async ({ data }) => {
    if (!data.text) throw new Error("No hay texto que traducir.");
    const parsed = await grokJson<{ translation: string }>(
      "Traduce con naturalidad. Solo JSON.",
      `Traduce al español de España este texto, que está en ${data.language}. Conserva el tono.
Texto: "${data.text}"
JSON: { "translation": "..." }`,
      300,
    );
    return { translation: parsed.translation || "" };
  });

export const pronounce = createServerFn({ method: "POST" })
  .validator((input: { text: string; language?: string }) => ({
    text: clip(input?.text, 280),
    language: toSpeechLanguage(clip(input?.language, 40)),
  }))
  .handler(async ({ data }) => {
    if (!data.text) throw new Error("No hay texto que pronunciar.");
    const apiKey = requireKey();
    const res = await fetch("https://api.x.ai/v1/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text: data.text,
        voice_id: "eve",
        language: data.language,
        speed: 0.92,
      }),
    });
    if (!res.ok) {
      throw new Error(`No se ha podido pronunciar la frase (${res.status}).`);
    }
    const bytes = new Uint8Array(await res.arrayBuffer());
    return { audioBase64: Buffer.from(bytes).toString("base64"), mimeType: "audio/mpeg" };
  });

function clampScore(value: unknown) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function toSpeechLanguage(value: string) {
  const raw = value.toLowerCase();
  if (raw.startsWith("es") || raw.includes("espa")) return "es";
  if (raw.startsWith("en") || raw.includes("ingl")) return "en";
  if (raw.startsWith("fr") || raw.includes("franc")) return "fr";
  if (raw.startsWith("ja") || raw.includes("japon")) return "ja";
  if (raw.startsWith("de") || raw.includes("alem")) return "de";
  if (raw.startsWith("it") || raw.includes("ital")) return "it";
  if (raw.startsWith("zh") || raw.includes("mandar") || raw.includes("chino")) return "zh";
  if (raw.startsWith("ko") || raw.includes("corean")) return "ko";
  if (raw.startsWith("pt") || raw.includes("portug")) return "pt";
  if (/^[a-z]{2}(-[a-z]{2})?$/i.test(value)) return value;
  return "auto";
}
