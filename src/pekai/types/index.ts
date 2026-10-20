export type ProficiencyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type VoiceName = 'Zephyr' | 'Puck' | 'Charon' | 'Kore' | 'Fenrir';

export interface LanguageConfig {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  defaultVoice: VoiceName;
  suggestedTutors: {
    name: string;
    role: string;
    voice: VoiceName;
    bio: string;
    avatar: string;
  }[];
  sampleGreeting: string;
  localeCode: string;
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  category: 'travel' | 'social' | 'career' | 'daily' | 'custom';
  icon: string;
  levelRecommendation: ProficiencyLevel;
  promptDescription: string;
  suggestedGoals: string[];
  starterPrompts: string[];
  vocabularyHints: { term: string; meaning: string }[];
}

export interface TranscriptMessage {
  id: string;
  role: 'user' | 'tutor';
  text: string;
  timestamp: number;
  translatedText?: string;
  isTranslating?: boolean;
  analysis?: TurnAnalysis;
  isAnalyzing?: boolean;
}

export interface TurnAnalysis {
  isCorrect: boolean;
  explanation: string;
  correction?: string;
  naturalAlternative: string;
  pronunciationTip?: string;
  vocabulary: {
    term: string;
    meaning: string;
    phonetic?: string;
    example?: string;
  }[];
}

export interface ReplySuggestion {
  phrase: string;
  phonetic?: string;
  translation: string;
  level: string;
}

export interface SessionSummaryData {
  overallScore: number;
  fluencyScore: number;
  grammarScore: number;
  vocabularyScore: number;
  summary: string;
  strengths: string[];
  corrections: {
    learnerSaid: string;
    corrected: string;
    why: string;
  }[];
  keyTerms: {
    term: string;
    definition: string;
    sampleSentence?: string;
  }[];
  recommendedNextSteps: string;
}

export interface SavedVocabularyItem {
  id: string;
  term: string;
  meaning: string;
  phonetic?: string;
  example?: string;
  language: string;
  savedAt: number;
}
