import React from 'react';
import { motion } from 'motion/react';
import { Mic, Volume2, Loader2, VolumeX } from 'lucide-react';
import { SessionStatus } from '../hooks/useLiveVoiceSession';

interface AudioVisualizerOrbProps {
  status: SessionStatus;
  userAudioLevel: number;
  tutorAudioLevel: number;
  isMuted: boolean;
  tutorName: string;
  interimUserText: string;
  interimTutorText: string;
  language: string;
}

export const AudioVisualizerOrb: React.FC<AudioVisualizerOrbProps> = ({
  status,
  userAudioLevel,
  tutorAudioLevel,
  isMuted,
  tutorName,
  interimUserText,
  interimTutorText,
  language,
}) => {
  const isSpeaking = status === 'speaking' || tutorAudioLevel > 0.05;
  const isListening = status === 'listening' || (!isSpeaking && userAudioLevel > 0.04);
  const isConnecting = status === 'connecting';

  // Base scale influenced by audio
  const tutorScale = 1 + tutorAudioLevel * 0.45;
  const userScale = 1 + userAudioLevel * 0.45;

  return (
    <div className="flex flex-col items-center justify-center p-6 relative select-none">
      {/* Visualizer Orb Container */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Ambient background glow rings */}
        <motion.div
          animate={{
            scale: isSpeaking ? tutorScale * 1.25 : isListening ? userScale * 1.2 : 1,
            opacity: isSpeaking ? 0.35 : isListening ? 0.3 : 0.15,
          }}
          transition={{ duration: 0.15 }}
          className={`absolute inset-0 rounded-full blur-2xl ${
            isSpeaking
              ? 'bg-amber-500'
              : isListening
              ? 'bg-emerald-500'
              : isConnecting
              ? 'bg-indigo-500'
              : 'bg-stone-700'
          }`}
        />

        {/* Outer rhythmic pulsing ring */}
        <motion.div
          animate={{
            scale: isSpeaking ? [1, 1.15, 1] : isListening ? [1, 1.08, 1] : [1, 1.03, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            scale: { repeat: Infinity, duration: isSpeaking ? 1.2 : 2.5, ease: 'easeInOut' },
            rotate: { repeat: Infinity, duration: 16, ease: 'linear' },
          }}
          className={`absolute w-full h-full rounded-full border border-dashed transition-colors duration-500 ${
            isSpeaking
              ? 'border-amber-400/40'
              : isListening
              ? 'border-emerald-400/40'
              : 'border-stone-700/60'
          }`}
        />

        {/* Middle interactive wave ring */}
        <motion.div
          animate={{
            scale: isSpeaking ? tutorScale : isListening ? userScale : 1,
          }}
          transition={{ duration: 0.08, ease: 'easeOut' }}
          className={`absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border transition-colors duration-300 ${
            isSpeaking
              ? 'border-amber-300/60 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
              : isListening
              ? 'border-emerald-300/60 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
              : 'border-stone-700 bg-stone-800/40'
          }`}
        />

        {/* Central Core Orb */}
        <motion.div
          animate={{
            scale: isSpeaking
              ? 1 + tutorAudioLevel * 0.25
              : isListening
              ? 1 + userAudioLevel * 0.2
              : 1,
          }}
          transition={{ duration: 0.06 }}
          className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center relative shadow-xl backdrop-blur-md transition-colors duration-500 ${
            isSpeaking
              ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 text-amber-50 shadow-amber-900/40'
              : isListening
              ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 text-emerald-50 shadow-emerald-950/40'
              : isConnecting
              ? 'bg-gradient-to-br from-indigo-600 to-purple-800 text-indigo-100'
              : 'bg-stone-800 text-stone-400'
          }`}
        >
          {isConnecting ? (
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          ) : isSpeaking ? (
            <Volume2 className="w-8 h-8 animate-pulse text-white drop-shadow" />
          ) : isMuted ? (
            <VolumeX className="w-8 h-8 text-rose-300" />
          ) : (
            <Mic className="w-8 h-8 text-white drop-shadow" />
          )}

          {/* Core waveform frequency mini-bars */}
          <div className="flex items-center gap-1 mt-2 h-4">
            {[0.4, 0.9, 0.6, 1.0, 0.7, 0.5].map((factor, i) => {
              const activeLevel = isSpeaking ? tutorAudioLevel : isListening ? userAudioLevel : 0.08;
              const barHeight = Math.max(3, Math.min(16, (activeLevel * 20 * factor) + 3));
              return (
                <motion.div
                  key={i}
                  animate={{ height: barHeight }}
                  transition={{ duration: 0.05 }}
                  className="w-1 bg-white/80 rounded-full"
                />
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* State label & helper */}
      <div className="mt-4 flex flex-col items-center text-center max-w-md">
        <div className="flex items-center gap-2 text-xs tracking-wide uppercase font-medium">
          {isConnecting ? (
            <span className="text-indigo-400">Conectando con PekAI en tiempo real...</span>
          ) : isSpeaking ? (
            <span className="text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
              {tutorName} está hablando en {language}
            </span>
          ) : isListening ? (
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              {isMuted ? 'Micrófono silenciado' : 'Escuchando... Habla con naturalidad'}
            </span>
          ) : (
            <span className="text-stone-400">Listo para practicar con PekAI</span>
          )}
        </div>

        {/* Live speech preview banner */}
        {(interimUserText || interimTutorText) && (
          <div className="mt-3 px-4 py-2 bg-stone-900/90 border border-stone-800 rounded-xl text-sm max-w-lg shadow-sm">
            {interimTutorText ? (
              <p className="text-amber-200/90 italic font-normal">
                "{interimTutorText}"
              </p>
            ) : interimUserText ? (
              <p className="text-emerald-200/90 italic font-normal">
                "{interimUserText}..."
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
