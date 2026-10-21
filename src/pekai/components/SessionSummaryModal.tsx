import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { SessionSummaryData } from '../types';

interface SessionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summaryData: SessionSummaryData | null;
  isLoading: boolean;
  languageName: string;
  scenarioTitle: string;
  onRestartPractice: () => void;
}

export const SessionSummaryModal: React.FC<SessionSummaryModalProps> = ({
  isOpen,
  onClose,
  summaryData,
  isLoading,
  languageName,
  scenarioTitle,
  onRestartPractice,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && summaryData && !isLoading) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#6366f1', '#ec4899'],
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen, summaryData, isLoading]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!summaryData) return;
    const text = `Informe de fluidez PekAI - ${languageName}
Escenario: ${scenarioTitle}
Puntuación global: ${summaryData.overallScore}/100
Fluidez: ${summaryData.fluencyScore}% | Gramática: ${summaryData.grammarScore}% | Vocabulario: ${summaryData.vocabularyScore}%

Resumen: ${summaryData.summary}

Fortalezas destacadas:
${summaryData.strengths.map((s) => `• ${s}`).join('\n')}

Correcciones clave:
${summaryData.corrections.map((c) => `• Dijiste: "${c.learnerSaid}" -> Corrección: "${c.corrected}" (${c.why})`).join('\n')}

Consejo para la siguiente sesión: ${summaryData.recommendedNextSteps}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-6">
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
            <h3 className="text-lg font-bold text-stone-100">
              Analizando tu práctica con PekAI...
            </h3>
            <p className="text-xs text-stone-400 max-w-sm">
              Estamos evaluando tu soltura comunicativa, precisión gramatical, repertorio de vocabulario y cadencia de respuesta.
            </p>
          </div>
        ) : summaryData ? (
          <>
            {/* Header with Overall Score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Informe de rendimiento PekAI</span>
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {scenarioTitle}
                </h2>
                <span className="text-xs text-stone-400">
                  Idioma practicado: {languageName}
                </span>
              </div>

              {/* Main Score Ring */}
              <div className="flex items-center gap-3 bg-stone-950 p-3 rounded-2xl border border-stone-800 self-start sm:self-auto">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-black text-xl shadow-lg shadow-amber-900/30">
                  {summaryData.overallScore}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-stone-200 block">Fluidez global</span>
                  <span className="text-stone-400 text-[11px]">Sobre 100 puntos</span>
                </div>
              </div>
            </div>

            {/* Sub-score gauges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-center">
                <span className="text-xs text-stone-400 font-medium block">Fluidez</span>
                <span className="text-lg font-bold text-emerald-400">
                  {summaryData.fluencyScore}%
                </span>
              </div>
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-center">
                <span className="text-xs text-stone-400 font-medium block">Gramática</span>
                <span className="text-lg font-bold text-amber-400">
                  {summaryData.grammarScore}%
                </span>
              </div>
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-center">
                <span className="text-xs text-stone-400 font-medium block">Vocabulario</span>
                <span className="text-lg font-bold text-indigo-400">
                  {summaryData.vocabularyScore}%
                </span>
              </div>
            </div>

            {/* Summary Narrative */}
            <p className="text-sm text-stone-300 leading-relaxed bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
              {summaryData.summary}
            </p>

            {/* Strengths */}
            {summaryData.strengths && summaryData.strengths.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Fortalezas destacadas</span>
                </h4>
                <div className="space-y-1.5">
                  {summaryData.strengths.map((str, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-xs text-emerald-300 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actionable Corrections */}
            {summaryData.corrections && summaryData.corrections.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Correcciones clave a recordar</span>
                </h4>
                <div className="space-y-2">
                  {summaryData.corrections.map((corr, i) => (
                    <div
                      key={i}
                      className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs space-y-1"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-rose-400/90 font-medium">
                          Dijiste: "{corr.learnerSaid}"
                        </span>
                        <span className="text-emerald-400 font-bold">
                          Mejor: "{corr.corrected}"
                        </span>
                      </div>
                      <p className="text-stone-400 text-[11px] mt-0.5">
                        {corr.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Steps Recommendation */}
            <div className="p-3.5 bg-indigo-950/20 border border-indigo-900/40 rounded-xl text-xs text-indigo-200 space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-indigo-400 block">
                Consejo de PekAI para tu siguiente sesión:
              </span>
              <p>{summaryData.recommendedNextSteps}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-800">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado al portapapeles' : 'Copiar informe'}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={onRestartPractice}
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Practicar de nuevo</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-stone-400 text-xs">
            No hay datos de resumen disponibles.
          </div>
        )}
      </div>
    </div>
  );
};
