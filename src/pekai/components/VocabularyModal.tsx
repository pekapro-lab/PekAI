import React, { useState } from 'react';
import {
  Bookmark,
  Volume2,
  Trash2,
  X,
  Languages,
  Search,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { SavedVocabularyItem } from '../types';
import { pronounce } from '../grok';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: SavedVocabularyItem[];
  onRemoveItem: (id: string) => void;
}

export const VocabularyModal: React.FC<VocabularyModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredItems = items.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const playPronunciation = async (text: string, id: string) => {
    try {
      setPlayingAudioId(id);
      const data = await pronounce({
        data: { text, language: 'auto' },
      });
      if (data.audioBase64) {
        const audio = new Audio(`data:${data.mimeType};base64,${data.audioBase64}`);
        audio.onended = () => setPlayingAudioId(null);
        audio.onerror = () => setPlayingAudioId(null);
        await audio.play();
      } else {
        setPlayingAudioId(null);
      }
    } catch (err) {
      console.error('Failed to play pronunciation:', err);
      setPlayingAudioId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Bóveda de Vocabulario</h2>
              <span className="text-xs text-stone-400">
                {items.length} términos y expresiones guardadas
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search filter */}
        <div className="relative my-4">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar términos guardados o traducciones..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-sm font-medium">No hay términos guardados</p>
              <p className="text-xs text-stone-600">
                Pulsa en las etiquetas de vocabulario durante los comentarios de PekAI para guardarlas aquí.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-stone-950 border border-stone-800 hover:border-stone-700 rounded-xl space-y-1.5 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">
                      {item.term}
                    </span>
                    {item.phonetic && (
                      <span className="text-xs text-stone-400 font-mono">
                        [{item.phonetic}]
                      </span>
                    )}
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-medium">
                      {item.language}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => playPronunciation(item.term, item.id)}
                      title="Escuchar"
                      className="p-1.5 text-stone-400 hover:text-amber-400 transition-colors"
                    >
                      <Volume2
                        className={`w-4 h-4 ${
                          playingAudioId === item.id ? 'text-amber-400 animate-pulse' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove"
                      className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-amber-300 font-medium">
                  {item.meaning}
                </p>

                {item.example && (
                  <p className="text-xs text-stone-400 italic">
                    "{item.example}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
