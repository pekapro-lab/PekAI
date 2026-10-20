import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Send,
  Languages,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Flame,
  MessageSquare,
  Play,
  RotateCcw,
  Sliders,
  Award,
  Lightbulb,
} from 'lucide-react';
import { AudioVisualizerOrb } from './AudioVisualizerOrb';
import { analyzeTurn, pronounce, suggestReplies, translatePhrase } from '../grok';
import {
  LanguageConfig,
  Scenario,
  ProficiencyLevel,
  TranscriptMessage,
  TurnAnalysis,
  ReplySuggestion,
  SavedVocabularyItem,
} from '../types';
import { SessionStatus } from '../hooks/useLiveVoiceSession';

interface LiveConversationRoomProps {
  language: LanguageConfig;
  scenario: Scenario;
  level: ProficiencyLevel;
  tutorName: string;
  status: SessionStatus;
  errorMessage: string | null;
  messages: TranscriptMessage[];
  interimUserText: string;
  interimTutorText: string;
  isMuted: boolean;
  userAudioLevel: number;
  tutorAudioLevel: number;
  durationSeconds: number;
  onToggleMute: () => void;
  onSendText: (text: string) => void;
  onEndSession: () => void;
  onSaveVocabulary: (item: Omit<SavedVocabularyItem, 'id' | 'savedAt'>) => void;
  savedVocabulary: SavedVocabularyItem[];
  onUpdateAnalysis: (messageId: string, analysis: TurnAnalysis) => void;
  onSetMessageAnalyzing: (messageId: string, isAnalyzing: boolean) => void;
  onSetTranslation: (messageId: string, translatedText: string) => void;
  micNotice: string | null;
}

export const LiveConversationRoom: React.FC<LiveConversationRoomProps> = ({
  language,
  scenario,
  level,
  tutorName,
  status,
  errorMessage,
  messages,
  interimUserText,
  interimTutorText,
  isMuted,
  userAudioLevel,
  tutorAudioLevel,
  durationSeconds,
  onToggleMute,
  onSendText,
  onEndSession,
  onSaveVocabulary,
  savedVocabulary,
  onUpdateAnalysis,
  onSetMessageAnalyzing,
  onSetTranslation,
  micNotice,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'coach' | 'suggestions' | 'vocab' | 'stats'>('suggestions');
  const [expandedAnalysisIds, setExpandedAnalysisIds] = useState<Record<string, boolean>>({});
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});
  const [completedGoals, setCompletedGoals] = useState<Record<number, boolean>>({});

  // Dynamic reply suggestions state
  const [suggestions, setSuggestions] = useState<ReplySuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState<boolean>(false);
  const [playingAudioKey, setPlayingAudioKey] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimUserText, interimTutorText]);

  // Request suggestions when new tutor turn arrives
  useEffect(() => {
    const lastTutorMsg = [...messages].reverse().find((m) => m.role === 'tutor');
    if (lastTutorMsg) {
      fetchSuggestions(lastTutorMsg.text);
    }
  }, [messages.filter((m) => m.role === 'tutor').length]);

  const fetchSuggestions = async (tutorMsg: string) => {
    try {
      setIsLoadingSuggestions(true);
      const data = await suggestReplies({
        data: {
          lastTutorMessage: tutorMsg,
          language: language.name,
          scenario: scenario.title,
          level,
        },
      });
      if (data.suggestions) setSuggestions(data.suggestions);
    } catch (err) {
      console.error('Failed to fetch suggestions:', err);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleAnalyzeTurn = async (message: TranscriptMessage) => {
    if (message.analysis || message.isAnalyzing) {
      setExpandedAnalysisIds((prev) => ({
        ...prev,
        [message.id]: !prev[message.id],
      }));
      return;
    }

    try {
      onSetMessageAnalyzing(message.id, true);
      const data = await analyzeTurn({
        data: {
          turnText: message.text,
          language: language.name,
          scenario: scenario.title,
          targetLevel: level,
        },
      });
      onUpdateAnalysis(message.id, data);
      setExpandedAnalysisIds((prev) => ({
        ...prev,
        [message.id]: true,
      }));
    } catch (err) {
      console.error('Turn analysis error:', err);
    } finally {
      onSetMessageAnalyzing(message.id, false);
    }
  };

  const playPronunciation = async (text: string, key: string) => {
    try {
      setPlayingAudioKey(key);
      const data = await pronounce({
        data: { text, language: language.localeCode },
      });
      if (data.audioBase64) {
        const audio = new Audio(`data:${data.mimeType};base64,${data.audioBase64}`);
        audio.onended = () => setPlayingAudioKey(null);
        audio.onerror = () => setPlayingAudioKey(null);
        await audio.play();
      } else {
        setPlayingAudioKey(null);
      }
    } catch (err) {
      console.error('Failed to play pronunciation:', err);
      setPlayingAudioKey(null);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendText(inputText.trim());
    setInputText('');
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Metrics
  const userMsgCount = messages.filter((m) => m.role === 'user').length;
  const tutorMsgCount = messages.filter((m) => m.role === 'tutor').length;
  const totalTurns = userMsgCount + tutorMsgCount;
  const userWordsCount = messages
    .filter((m) => m.role === 'user')
    .reduce((acc, m) => acc + m.text.trim().split(/\s+/).length, 0);

  return (
    <div className="flex min-h-0 flex-1 flex-col h-[calc(100dvh-4.75rem)] max-w-7xl mx-auto px-2 sm:px-4 py-2">
      {/* Top Session Bar */}
      <header className="flex items-center justify-between bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 shrink-0 mb-3 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{language.flag}</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {scenario.title}
              </h2>
              <span className="text-xs text-stone-400 hidden sm:inline">· {language.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="text-amber-400 font-medium">Tutor: {tutorName}</span>
              <span>·</span>
              <span className="text-stone-400">{level}</span>
            </div>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3">
          {/* Duration timer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs font-mono font-medium text-stone-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTimer(durationSeconds)}</span>
          </div>

          {/* Mute button */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
            className={`p-2 rounded-xl border transition-colors ${
              isMuted
                ? 'bg-rose-950/60 border-rose-800 text-rose-300 hover:bg-rose-900/60'
                : 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
            }`}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* End session button */}
          <button
            onClick={onEndSession}
            className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 rounded-xl text-xs font-semibold transition-all shadow-sm"
          >
            Finalizar y resumen
          </button>
        </div>
      </header>

      {/* Main Workspace Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0">
        {/* Left Column: Voice Visualizer & Live Transcript Feed (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden shadow-md">
          {/* Visualizer Header Area */}
          <div className="shrink-0 border-b border-stone-800/80 bg-gradient-to-b from-stone-950/80 to-stone-900/40">
            <AudioVisualizerOrb
              status={status}
              userAudioLevel={userAudioLevel}
              tutorAudioLevel={tutorAudioLevel}
              isMuted={isMuted}
              tutorName={tutorName}
              interimUserText={interimUserText}
              interimTutorText={interimTutorText}
              language={language.name}
            />

            {errorMessage && (
              <div className="mx-4 mb-3 p-3 bg-rose-950/50 border border-rose-800/60 rounded-xl text-xs text-rose-300">
                {errorMessage}
              </div>
            )}
            {micNotice && !errorMessage && (
              <div className="mx-4 mb-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                {micNotice}
              </div>
            )}
          </div>

          {/* Scrollable Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-stone-500 py-8">
                <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm font-medium">Tu conversación en vivo aparecerá aquí</p>
                <p className="text-xs text-stone-600 mt-1 max-w-xs">
                  {tutorName} te está saludando. ¡Responde por el micrófono o con el chat inferior!
                </p>
              </div>
            )}

            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const isExpanded = !!expandedAnalysisIds[msg.id];
              const showTrans = !!showTranslations[msg.id];

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 px-1">
                    <span className="font-medium text-stone-400">
                      {isUser ? 'Tú' : tutorName}
                    </span>
                    <span>·</span>
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-amber-600 text-stone-950 font-medium rounded-tr-sm shadow-md'
                        : 'bg-stone-800 text-stone-100 rounded-tl-sm border border-stone-700/60 shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Translation toggle preview */}
                    {showTrans && (
                      <div className="mt-2 pt-2 border-t border-black/10 dark:border-white/10 text-xs italic opacity-90">
                        {msg.translatedText || 'Traduciendo al español...'}
                      </div>
                    )}
                  </div>

                  {/* Turn Action Pills (Coach / Grammar / Translate / Bookmark) */}
                  <div className="flex items-center gap-1.5 text-xs">
                    {/* Translate action */}
                    <button
                      onClick={async () => {
                        setShowTranslations((prev) => ({
                          ...prev,
                          [msg.id]: !prev[msg.id],
                        }));
                        if (!msg.translatedText) {
                          try {
                            const data = await translatePhrase({
                              data: { text: msg.text, language: language.name },
                            });
                            if (data.translation) onSetTranslation(msg.id, data.translation);
                          } catch {
                            // ignore
                          }
                        }
                      }}
                      className="text-stone-400 hover:text-stone-200 px-2 py-0.5 rounded-md hover:bg-stone-800 text-[11px] transition-colors"
                    >
                      {showTrans ? 'Ocultar traducción' : 'Traducir'}
                    </button>

                    {/* Pronounce audio button */}
                    <button
                      onClick={() => playPronunciation(msg.text, msg.id)}
                      title="Escuchar pronunciación nativa"
                      className="text-stone-400 hover:text-amber-400 p-1 rounded-md hover:bg-stone-800 transition-colors"
                    >
                      <Volume2
                        className={`w-3.5 h-3.5 ${
                          playingAudioKey === msg.id ? 'text-amber-400 animate-pulse' : ''
                        }`}
                      />
                    </button>

                    {/* Grammar analysis button for user speech */}
                    {isUser && (
                      <button
                        onClick={() => handleAnalyzeTurn(msg)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors flex items-center gap-1 ${
                          isExpanded
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'text-amber-400/90 hover:text-amber-300 hover:bg-stone-800'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{msg.isAnalyzing ? 'Analizando...' : isExpanded ? 'Ocultar ayuda' : 'Consejos PekAI'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>

                  {/* Inline Grammar & Phrasing Coach Card */}
                  {isExpanded && msg.analysis && (
                    <div className="w-full max-w-[90%] bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs space-y-2 mt-1 shadow-md">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-semibold flex items-center gap-1 ${
                            msg.analysis.isCorrect ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {msg.analysis.isCorrect ? '¡Frase precisa y natural!' : '¡Buen intento! Sugerencia:'}
                        </span>
                        {msg.analysis.pronunciationTip && (
                          <span className="text-stone-500 text-[11px]">
                            {msg.analysis.pronunciationTip}
                          </span>
                        )}
                      </div>

                      <p className="text-stone-300">{msg.analysis.explanation}</p>

                      {msg.analysis.correction && (
                        <div className="p-2 bg-stone-900 rounded-lg border border-stone-800">
                          <span className="text-stone-500 text-[10px] uppercase font-bold block mb-0.5">
                            Corrección gramatical:
                          </span>
                          <span className="text-amber-300 font-medium">
                            {msg.analysis.correction}
                          </span>
                        </div>
                      )}

                      <div className="p-2 bg-stone-900 rounded-lg border border-stone-800">
                        <span className="text-stone-500 text-[10px] uppercase font-bold block mb-0.5">
                          Alternativa nativa más natural:
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-300 font-medium">
                            {msg.analysis.naturalAlternative}
                          </span>
                          <button
                            onClick={() =>
                              playPronunciation(
                                msg.analysis!.naturalAlternative,
                                `alt-${msg.id}`
                              )
                            }
                            className="p-1 text-stone-400 hover:text-emerald-300"
                          >
                            <Play className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {msg.analysis.vocabulary && msg.analysis.vocabulary.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-stone-500 text-[10px] uppercase font-bold block">
                            Vocabulario clave:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.analysis.vocabulary.map((v, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  onSaveVocabulary({
                                    term: v.term,
                                    meaning: v.meaning,
                                    phonetic: v.phonetic,
                                    example: v.example,
                                    language: language.name,
                                  })
                                }
                                className="px-2 py-1 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-md text-stone-300 flex items-center gap-1.5 transition-colors"
                              >
                                <Bookmark className="w-3 h-3 text-amber-400" />
                                <span>{v.term}</span>
                                <span className="text-stone-500 font-normal">
                                  ({v.meaning})
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Text Input for Hybrid Mode */}
          <form
            onSubmit={handleSend}
            className="shrink-0 p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`O escribe una respuesta en ${language.name}...`}
              className="flex-1 bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-stone-950 font-bold rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Interactive Companion Drawer (5 cols) */}
        <div className="lg:col-span-5 flex flex-col bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden shadow-md">
          {/* Companion Tabs */}
          <div className="flex items-center border-b border-stone-800 p-1.5 bg-stone-950 gap-1 text-xs shrink-0">
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`flex-1 py-2 px-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'suggestions'
                  ? 'bg-stone-800 text-amber-300 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Qué responder</span>
            </button>
            <button
              onClick={() => setActiveTab('coach')}
              className={`flex-1 py-2 px-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'coach'
                  ? 'bg-stone-800 text-amber-300 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Metas y pautas</span>
            </button>
            <button
              onClick={() => setActiveTab('vocab')}
              className={`flex-1 py-2 px-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'vocab'
                  ? 'bg-stone-800 text-amber-300 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bóveda ({savedVocabulary.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-2 px-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'stats'
                  ? 'bg-stone-800 text-amber-300 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Métricas</span>
            </button>
          </div>

          {/* Companion Tab Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* TAB 1: What to Say / Suggested Replies */}
            {activeTab === 'suggestions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                      Sugerencias de respuesta en contexto
                    </h3>
                    <p className="text-xs text-stone-400">
                      ¿Dudas sobre qué decir? Pulsa para escuchar, practicar o enviar.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const lastTutorMsg = [...messages].reverse().find((m) => m.role === 'tutor');
                      fetchSuggestions(lastTutorMsg?.text || 'Hola');
                    }}
                    disabled={isLoadingSuggestions}
                    title="Actualizar sugerencias"
                    className="p-1.5 text-stone-400 hover:text-stone-200 bg-stone-800 rounded-lg hover:bg-stone-700 transition-colors"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${isLoadingSuggestions ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {isLoadingSuggestions ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="p-3 bg-stone-950/60 border border-stone-800 rounded-xl animate-pulse space-y-2"
                      >
                        <div className="h-4 bg-stone-800 rounded w-3/4" />
                        <div className="h-3 bg-stone-800/60 rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="space-y-2.5">
                    {suggestions.map((sug, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-stone-950/80 border border-stone-800 hover:border-amber-500/50 rounded-xl space-y-1.5 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            Opción {sug.level === 'easy' ? 'Sencilla' : sug.level === 'standard' ? 'Estándar' : 'Expresiva'}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => playPronunciation(sug.phrase, `sug-${idx}`)}
                              className="p-1 text-stone-400 hover:text-amber-400 transition-colors"
                              title="Escuchar audio nativo"
                            >
                              <Volume2
                                className={`w-3.5 h-3.5 ${
                                  playingAudioKey === `sug-${idx}` ? 'text-amber-400 animate-pulse' : ''
                                }`}
                              />
                            </button>
                            <button
                              onClick={() => {
                                onSendText(sug.phrase);
                              }}
                              className="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium text-[11px] rounded-md transition-colors"
                            >
                              Decir esto
                            </button>
                          </div>
                        </div>

                        <p className="font-semibold text-stone-100 text-sm">
                          {sug.phrase}
                        </p>
                        {sug.phonetic && (
                          <p className="text-xs text-stone-400 font-mono">
                            [{sug.phonetic}]
                          </p>
                        )}
                        <p className="text-xs text-stone-400">
                          {sug.translation}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-stone-400 italic">
                      Frases iniciales recomendadas para esta situación:
                    </p>
                    {scenario.starterPrompts.map((starter, i) => (
                      <div
                        key={i}
                        className="p-3 bg-stone-950/80 border border-stone-800 rounded-xl text-xs space-y-1"
                      >
                        <p className="text-stone-200 font-medium">{starter}</p>
                        <button
                          onClick={() => onSendText(starter)}
                          className="text-amber-400 hover:text-amber-300 font-medium text-[11px]"
                        >
                          Usar en conversación →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Goals & Scenario Tips */}
            {activeTab === 'coach' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-2">
                    Objetivos de práctica en este escenario
                  </h3>
                  <div className="space-y-2">
                    {scenario.suggestedGoals.map((goal, idx) => {
                      const isDone = !!completedGoals[idx];
                      return (
                        <button
                          key={idx}
                          onClick={() =>
                            setCompletedGoals((prev) => ({
                              ...prev,
                              [idx]: !prev[idx],
                            }))
                          }
                          className={`w-full flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs transition-colors ${
                            isDone
                              ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-300'
                              : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isDone ? 'text-emerald-400' : 'text-stone-600'
                            }`}
                          />
                          <span className={isDone ? 'line-through opacity-80' : ''}>
                            {goal}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-2">
                    Contexto del escenario
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed bg-stone-950 p-3 rounded-xl border border-stone-800">
                    {scenario.promptDescription}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: Vocabulary Vault */}
            {activeTab === 'vocab' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-1">
                    Bóveda de vocabulario guardado
                  </h3>
                  <p className="text-xs text-stone-400">
                    Palabras guardadas durante la conversación. Pulsa para escuchar la pronunciación.
                  </p>
                </div>

                {savedVocabulary.length === 0 ? (
                  <div className="text-center py-6 text-stone-500 text-xs">
                    No has guardado ninguna palabra todavía. Cuando recibas comentarios de PekAI, pulsa cualquier término clave para añadirlo a tu bóveda.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {savedVocabulary.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-200 text-sm">
                            {item.term}
                          </span>
                          <button
                            onClick={() => playPronunciation(item.term, item.id)}
                            className="p-1 text-stone-400 hover:text-amber-400"
                          >
                            <Volume2
                              className={`w-3.5 h-3.5 ${
                                playingAudioKey === item.id ? 'text-amber-400 animate-pulse' : ''
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-xs text-amber-300">{item.meaning}</p>
                        {item.example && (
                          <p className="text-xs text-stone-400 italic">
                            "{item.example}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Scenario Recommended Vocab */}
                {scenario.vocabularyHints.length > 0 && (
                  <div className="pt-3 border-t border-stone-800 space-y-2">
                    <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                      Vocabulario clave recomendado
                    </h4>
                    <div className="space-y-1.5">
                      {scenario.vocabularyHints.map((hint, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-stone-950/60 border border-stone-800 rounded-lg text-xs"
                        >
                          <span className="font-medium text-stone-200">{hint.term}</span>
                          <span className="text-stone-400">{hint.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Live Stats */}
            {activeTab === 'stats' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-1">
                    Dinámica de la sesión en directo
                  </h3>
                  <p className="text-xs text-stone-400">
                    Estadísticas de participación y tiempo de habla en tiempo real.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-center">
                    <span className="text-xl font-bold text-amber-400">{userMsgCount}</span>
                    <span className="block text-xs text-stone-400 mt-0.5">Tus turnos</span>
                  </div>
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-center">
                    <span className="text-xl font-bold text-emerald-400">{tutorMsgCount}</span>
                    <span className="block text-xs text-stone-400 mt-0.5">Turnos del tutor</span>
                  </div>
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-center">
                    <span className="text-xl font-bold text-indigo-400">{userWordsCount}</span>
                    <span className="block text-xs text-stone-400 mt-0.5">Palabras dichas</span>
                  </div>
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-center">
                    <span className="text-xl font-bold text-white">{formatTimer(durationSeconds)}</span>
                    <span className="block text-xs text-stone-400 mt-0.5">Duración</span>
                  </div>
                </div>

                {/* Talk ratio gauge */}
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-amber-400">
                      Alumno: {totalTurns > 0 ? Math.round((userMsgCount / totalTurns) * 100) : 50}%
                    </span>
                    <span className="text-emerald-400">
                      Tutor: {totalTurns > 0 ? Math.round((tutorMsgCount / totalTurns) * 100) : 50}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-amber-500 h-full transition-all"
                      style={{
                        width: `${totalTurns > 0 ? (userMsgCount / totalTurns) * 100 : 50}%`,
                      }}
                    />
                    <div
                      className="bg-emerald-500 h-full transition-all"
                      style={{
                        width: `${totalTurns > 0 ? (tutorMsgCount / totalTurns) * 100 : 50}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    ¡Intenta mantener un reparto 50/50 para maximizar tu soltura y tiempo de habla activa!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
