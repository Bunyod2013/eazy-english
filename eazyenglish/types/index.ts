// User Types
export interface User {
  id: string;
  username: string;
  preferredLanguage: 'uz' | 'en';
  skillLevel: SkillLevel;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  dailyGoal: number; // XP per day
  lastActiveDate: string; // ISO date string
  createdAt: string;
}

export type SkillLevel = 'beginner' | 'elementary' | 'intermediate';

// Lesson Types
export interface Lesson {
  id: string;
  title: string;
  titleUz: string; // Uzbek translation
  description: string;
  descriptionUz: string;
  level: number; // 1-150
  requiredXP: number; // XP needed to unlock
  xpReward: number; // XP earned on completion
  category: LessonCategory;
  isLocked: boolean;
  questions: Question[];
}

export type LessonCategory = 
  | 'alphabet' 
  | 'greetings' 
  | 'numbers' 
  | 'colors' 
  | 'family'
  | 'food'
  | 'animals'
  | 'daily_life'
  | 'school'
  | 'travel'
  | 'work'
  | 'grammar'
  | 'vocabulary';

// Question Types
export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  promptUz: string; // Uzbek explanation
  correctAnswer: string | string[];
  options?: string[]; // for multiple choice
  wordBank?: string[]; // for word_bank type - words to build sentence
  hints?: string[];
  hintsUz?: string[];
  audio?: string; // audio file path
  audioText?: string; // text that is spoken in audio
  image?: string; // image file path or emoji
  images?: string[]; // ✅ NEW: Multiple images for image_choice
  isNewWord?: boolean; // Flag to show "YANGI SO'Z" badge
  distractorWord?: string; // ✅ NEW: For listening_discrimination (mall vs mail)
  // Vocabulary fields
  word?: string; // The English word being taught
  translation?: string; // Uzbek translation
  pronunciation?: string; // IPA pronunciation
  partOfSpeech?: string;
  examples?: { en: string; uz: string }[];
  synonyms?: string[];
  antonyms?: string[];
  explanation?: string; // English explanation
  explanationUz?: string; // Uzbek explanation
  audioSlow?: string; // slower audio file path
  targetPhrase?: string; // ✅ NEW: For speaking practice
}

export type QuestionType = 
  | 'vocabulary' // Learn new word with image
  | 'translation' // Translate word/sentence
  | 'multiple_choice' // Select correct answer
  | 'fill_blank' // Fill in the blank
  | 'listening' // Listen and select/type
  | 'word_bank' // Build sentence from words
  | 'listening_discrimination' // ✅ NEW: Distinguish similar sounds (mall/mail)
  | 'image_choice' // ✅ NEW: Select correct image
  | 'speaking' // ✅ ENHANCED: Repeat after Falstaff
  | 'matching'; // Match pairs

// User Progress Types
export interface UserProgress {
  userId: string;
  completedLessons: CompletedLesson[];
  currentLevel: number;
  totalXPEarned: number;
  streakData: StreakData;
  lastUpdated: string;
}

export interface CompletedLesson {
  lessonId: string;
  completedAt: string;
  xpEarned: number;
  accuracy: number; // 0-100
  timeTaken: number; // seconds
}

export interface StreakData {
  current: number;
  longest: number;
  lastActiveDate: string;
  datesActive: string[]; // Array of ISO date strings
}

// Lesson Session Types (during active lesson)
export interface LessonSession {
  lessonId: string;
  currentQuestionIndex: number;
  answers: QuestionAnswer[];
  startedAt: string;
  hearts: number; // Lives (3-5)
  xpEarned: number;
}

export interface QuestionAnswer {
  questionId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
  timeTaken: number; // seconds
}

// Settings Types
export interface AppSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  vibrationEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  explanationLanguage: 'uz' | 'en'; // Language for explanations
  dailyReminderEnabled: boolean;
  dailyReminderTime?: string; // HH:MM format
}

// Gamification Types
export interface Achievement {
  id: string;
  title: string;
  titleUz: string;
  description: string;
  descriptionUz: string;
  icon: string;
  unlockedAt?: string;
  requirement: number; // e.g., 100 for "Complete 100 lessons"
  type: AchievementType;
}

export type AchievementType = 
  | 'lessons_completed'
  | 'streak_days'
  | 'xp_earned'
  | 'perfect_lessons'; // 100% accuracy

// Stats Types
export interface UserStats {
  totalLessons: number;
  completedLessons: number;
  averageAccuracy: number;
  totalTimeLearning: number; // minutes
  strongCategories: LessonCategory[];
  weakCategories: LessonCategory[];
}
