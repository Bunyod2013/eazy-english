// Vocabulary Learning System Types

export type WordStrength = 0 | 1 | 2 | 3 | 4 | 5;
export type WordLevel = 'new' | 'learning' | 'practicing' | 'familiar' | 'strong' | 'mastered';
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction';
export type ExerciseType = 
  | 'introduction'
  | 'translation_match'
  | 'word_to_picture'
  | 'picture_to_word'
  | 'listening'
  | 'speaking'
  | 'fill_blank'
  | 'sentence_building'
  | 'multiple_choice'
  | 'word_association';

export interface Word {
  id: string;
  word: string;
  translation: string;
  translationUz: string;
  pronunciation: string;
  audioUrl?: string;
  imageUrl?: string;
  category: string;
  level: 1 | 2 | 3 | 4 | 5;
  
  examples: {
    en: string;
    uz: string;
  }[];
  
  partOfSpeech: PartOfSpeech;
  forms?: {
    plural?: string;
    past?: string;
    pastParticiple?: string;
    ing?: string;
  };
  
  synonyms?: string[];
  antonyms?: string[];
  related?: string[];
  
  // For exercises
  distractors?: string[]; // Wrong options
}

export interface UserWordProgress {
  wordId: string;
  strength: WordStrength;
  level: WordLevel;
  
  timesCorrect: number;
  timesIncorrect: number;
  totalExposures: number;
  
  firstSeen: Date;
  lastSeen: Date;
  nextReview: Date;
  
  exerciseHistory: {
    type: ExerciseType;
    correct: boolean;
    timestamp: Date;
  }[];
}

export interface VocabularyCategory {
  id: string;
  name: string;
  nameUz: string;
  icon: string;
  description: string;
  descriptionUz: string;
  level: 1 | 2 | 3 | 4 | 5;
  wordIds: string[];
  requiredCategory?: string; // Must complete this first
}

export interface VocabularySession {
  id: string;
  type: 'new_words' | 'practice' | 'review' | 'timed';
  startTime: Date;
  words: string[];
  exercises: VocabularyExercise[];
  currentIndex: number;
  answers: {
    wordId: string;
    correct: boolean;
    exerciseType: ExerciseType;
    timeSpent: number;
  }[];
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  streak: number;
}

export interface VocabularyExercise {
  id: string;
  type: ExerciseType;
  wordId: string;
  word: Word;
  prompt: string;
  promptUz: string;
  options?: string[];
  correctAnswer: string | string[];
  hint?: string;
  audioRequired?: boolean;
}

export interface VocabularyStats {
  totalWords: number;
  wordsLearned: number;
  wordsMastered: number;
  wordsToReview: number;
  dailyGoal: number;
  dailyProgress: number;
  todayNewWords: number;
  streak: number;
  longestStreak: number;
  categoriesCompleted: number;
  totalXP: number;
}
