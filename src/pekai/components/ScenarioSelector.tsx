import React, { useState } from 'react';
import {
  Globe,
  Sparkles,
  Coffee,
  MapPin,
  ShoppingBag,
  Briefcase,
  Building2,
  HeartHandshake,
  Activity,
  Layers,
  ChevronRight,
  Headphones,
  Sliders,
  Check,
  PlusCircle,
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  PRESET_SCENARIOS,
  PROFICIENCY_LEVELS,
} from '../data/languages';
import { LanguageConfig, Scenario, ProficiencyLevel, VoiceName } from '../types';

interface ScenarioSelectorProps {
  selectedLanguage: LanguageConfig;
  onSelectLanguage: (lang: LanguageConfig) => void;
  selectedLevel: ProficiencyLevel;
  onSelectLevel: (level: ProficiencyLevel) => void;
  selectedVoice: VoiceName;
  onSelectVoice: (voice: VoiceName) => void;
  selectedTutorName: string;
  onSelectTutorName: (name: string) => void;
  selectedScenario: Scenario;
  onSelectScenario: (scenario: Scenario) => void;
  onStartConversation: () => void;
  savedVocabCount: number;
  onOpenVocabVault: () => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
  selectedLevel,
  onSelectLevel,
  selectedVoice: _selectedVoice,
  onSelectVoice,
  selectedTutorName,
  onSelectTutorName,
  selectedScenario,
  onSelectScenario,
  onStartConversation,
  savedVocabCount,
  onOpenVocabVault,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customDescription, setCustomDescription] = useState<string>('');

  const filteredScenarios = PRESET_SCENARIOS.filter((sc) => {
    if (filterCategory === 'all') return true;
    return sc.category === filterCategory;
  });

  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleCreateCustomScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newScenario: Scenario = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim(),
      subtitle: 'Custom user-defined conversation scenario',
      category: 'custom',
      icon: 'Sparkles',
      levelRecommendation: selectedLevel,
      promptDescription: customDescription.trim() || `The user wants to practice: ${customTitle}`,
      suggestedGoals: ['Practice active vocabulary', 'Ask relevant questions', 'Maintain natural conversational rhythm'],
      starterPrompts: [`Hello, I would like to talk about ${customTitle}.`],
      vocabularyHints: [],
    };

    onSelectScenario(newScenario);
    setShowCustomModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto min-w-0 px-4 py-8 space-y-10">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Impulsado por Grok Voice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            PekAI · Compañero de Conversación
          </h1>
          <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Practica conversación espontánea con un compañero de idiomas por voz en tiempo real.
            Habla por el micrófono, escucha respuestas instantáneas y recibe correcciones gramaticales al momento.
          </p>
        </div>

        {/* Quick stats & Vault Access */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenVocabVault}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 rounded-xl text-xs font-medium text-stone-300 transition-all shadow-sm"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Bóveda de Vocabulario</span>
            {savedVocabCount > 0 && (
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                {savedVocabCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Step 1: Target Language Selection */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-200 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>1. Elige el idioma de práctica</span>
          </h2>
          <span className="text-xs text-stone-500">
            Seleccionado: {selectedLanguage.name} ({selectedLanguage.nativeName})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage.id === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => {
                  onSelectLanguage(lang);
                  onSelectVoice(lang.defaultVoice);
                  if (lang.suggestedTutors[0]) {
                    onSelectTutorName(lang.suggestedTutors[0].name);
                  }
                }}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all text-sm group ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/30'
                    : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span className="text-2xl">{lang.flag}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <span className="font-semibold text-stone-200 group-hover:text-white">
                  {lang.name}
                </span>
                <span className="text-xs text-stone-400 font-normal">
                  {lang.nativeName}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2: Proficiency Level & Tutor Persona */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Proficiency Levels */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-base font-semibold text-stone-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>2. Nivel de competencia objetivo</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PROFICIENCY_LEVELS.map((pl) => {
              const isSelected = selectedLevel === pl.level;
              return (
                <button
                  key={pl.level}
                  onClick={() => onSelectLevel(pl.level)}
                  className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/30'
                      : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-300">
                      {pl.badge}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">{pl.speed}</span>
                  </div>
                  <span className="font-semibold text-stone-200 text-sm">
                    {pl.name}
                  </span>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                    {pl.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tutor Persona & Voice */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-base font-semibold text-stone-200 flex items-center gap-2">
            <Headphones className="w-4 h-4 text-indigo-400" />
            <span>3. Tutor de PekAI y voz</span>
          </h2>
          <div className="space-y-2.5">
            {selectedLanguage.suggestedTutors.map((tutor) => {
              const isSelected = selectedTutorName === tutor.name;
              return (
                <button
                  key={tutor.name}
                  onClick={() => {
                    onSelectTutorName(tutor.name);
                    onSelectVoice(tutor.voice);
                  }}
                  className={`w-full flex items-start gap-3 p-3 text-left rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-indigo-950/30 border-indigo-500/60 ring-1 ring-indigo-500/30'
                      : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700'
                  }`}
                >
                  <span className="text-2xl p-1 bg-stone-800 rounded-lg shrink-0">
                    {tutor.avatar}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-200 text-sm">
                        {tutor.name}
                      </span>
                      <span className="text-xs text-indigo-400 font-medium">
                        Voz: {tutor.voice}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400 block truncate">
                      {tutor.role}
                    </span>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {tutor.bio}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step 3: Scenario Selector */}
      <section className="space-y-4">
        <div className="flex min-w-0 flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-stone-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>4. Elige una situación de la vida real</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Escenarios inmersivos para practicar de inmediato o crea un tema a tu medida
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex w-full min-w-0 items-center gap-1 overflow-x-auto bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'daily', label: 'Día a día' },
              { id: 'travel', label: 'Viajes' },
              { id: 'social', label: 'Social' },
              { id: 'career', label: 'Profesional' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap ${
                  filterCategory === cat.id
                    ? 'bg-stone-800 text-stone-100 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <button
              onClick={() => setShowCustomModal(true)}
              className="px-3 py-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-stone-800 font-medium whitespace-nowrap flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Crear libre</span>
            </button>
          </div>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScenarios.map((sc) => {
            const isSelected = selectedScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc)}
                className={`flex flex-col text-left p-4 rounded-xl border transition-all relative group ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/70 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/30'
                    : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-900 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-stone-800 text-stone-300 group-hover:text-white'
                    }`}
                  >
                    {getScenarioIcon(sc.icon)}
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    Rec. {sc.levelRecommendation}
                  </span>
                </div>

                <h3 className="font-semibold text-stone-100 text-base leading-snug">
                  {sc.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1.5 leading-relaxed line-clamp-2">
                  {sc.subtitle}
                </p>

                {/* Goals Preview */}
                <div className="mt-4 pt-3 border-t border-stone-800/80 w-full">
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    Objetivos a practicar:
                  </span>
                  <ul className="text-xs text-stone-400 space-y-1">
                    {sc.suggestedGoals.slice(0, 2).map((goal, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                        <span className="truncate">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Scenario Preview & Launch Bar */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-stone-800 border border-stone-700/80 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-stone-400">
            <span className="text-amber-400 font-semibold">{selectedLanguage.name}</span>
            <span>·</span>
            <span>Nivel {selectedLevel}</span>
            <span>·</span>
            <span>Tutor: {selectedTutorName}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Todo listo para hablar en: {selectedScenario.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
            {selectedScenario.subtitle}
          </p>
        </div>

        <button
          onClick={onStartConversation}
          className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-amber-900/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shrink-0 cursor-pointer"
        >
          <Headphones className="w-5 h-5" />
          <span>Iniciar conversación de voz</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Custom Scenario Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-stone-100 mb-1">
              Crear situación de rol personalizada
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Describe cualquier escenario que desees practicar con tu tutor PekAI.
            </p>

            <form onSubmit={handleCreateCustomScenario} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Título del tema o situación
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Ej.: Pedir unas tapas en una taberna de Madrid"
                  required
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Detalles del personaje y contexto
                </label>
                <textarea
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Ej.: Eres el camarero de una taberna castiza. Te pido una ración de bravas y una tortilla jugosa y charlamos sobre el fútbol o el tiempo."
                  rows={3}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors"
                >
                  Guardar escenario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
