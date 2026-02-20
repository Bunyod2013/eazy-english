import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Word, 
  UserWordProgress, 
  VocabularyCategory, 
  VocabularySession,
  VocabularyStats,
  WordStrength,
  WordLevel 
} from '@/types/vocabulary';

interface VocabularyState {
  // Data
  words: Map<string, Word>;
  userProgress: Map<string, UserWordProgress>;
  categories: VocabularyCategory[];
  currentSession: VocabularySession | null;
  
  // Stats
  stats: VocabularyStats;
  
  // Loading
  isLoading: boolean;
  
  // Actions
  loadWords: () => Promise<void>;
  loadUserProgress: (userId: string) => Promise<void>;
  saveUserProgress: (userId: string) => Promise<void>;
  
  // Session management
  startNewWordsSession: (categoryId: string, count: number) => void;
  startPracticeSession: () => void;
  startReviewSession: () => void;
  submitAnswer: (wordId: string, correct: boolean, exerciseType: string, timeSpent: number) => void;
  completeSession: () => VocabularySession | null;
  
  // Word management
  updateWordStrength: (wordId: string, correct: boolean) => void;
  getWeakWords: () => Word[];
  getDueWords: () => Word[];
  getWordsByCategory: (categoryId: string) => Word[];
  
  // Stats
  updateStats: () => void;
  getStats: () => VocabularyStats;
}

const REVIEW_INTERVALS = {
  0: 0,                    // Immediately
  1: 4 * 3600 * 1000,      // 4 hours
  2: 8 * 3600 * 1000,      // 8 hours
  3: 24 * 3600 * 1000,     // 1 day
  4: 3 * 86400 * 1000,     // 3 days
  5: 7 * 86400 * 1000,     // 1 week
  6: 14 * 86400 * 1000,    // 2 weeks
  7: 30 * 86400 * 1000,    // 1 month
};

function calculateNextReview(strength: WordStrength, correct: boolean): Date {
  const newStrength = correct 
    ? Math.min(7, strength + 1) 
    : Math.max(0, strength - 1);
  
  const interval = REVIEW_INTERVALS[newStrength as keyof typeof REVIEW_INTERVALS] || REVIEW_INTERVALS[0];
  return new Date(Date.now() + interval);
}

function getWordLevel(strength: WordStrength): WordLevel {
  if (strength === 0) return 'new';
  if (strength === 1) return 'learning';
  if (strength === 2) return 'practicing';
  if (strength === 3) return 'familiar';
  if (strength === 4) return 'strong';
  return 'mastered';
}

function getCategoryNameUz(category: string): string {
  const nameMap: Record<string, string> = {
    basics: 'Asoslar',
    numbers: 'Raqamlar',
    colors: 'Ranglar',
    family: 'Oila',
    body: 'Tana',
    food: 'Ovqat',
    drinks: 'Ichimliklar',
    animals: 'Hayvonlar',
    clothes: 'Kiyim',
    house: 'Uy',
    furniture: 'Mebel',
    work: 'Ish',
    school: 'Maktab',
    time: 'Vaqt',
    weather: 'Ob-havo',
    travel: 'Sayohat',
    transport: 'Transport',
    shopping: 'Xarid',
    restaurant: 'Restoran',
    health: 'Salomatlik',
  };
  return nameMap[category] || category;
}

function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    basics: '📚',
    numbers: '🔢',
    colors: '🎨',
    family: '👨‍👩‍👧‍👦',
    body: '🫀',
    food: '🍔',
    drinks: '☕',
    animals: '🦁',
    clothes: '👕',
    house: '🏠',
    furniture: '🪑',
    work: '💼',
    school: '🏫',
    time: '⏰',
    weather: '🌤️',
    travel: '✈️',
    transport: '🚗',
    shopping: '🛍️',
    restaurant: '🍽️',
    health: '🏥',
  };
  return iconMap[category] || '📖';
}

function getCategoryDescriptionUz(category: string): string {
  const descMap: Record<string, string> = {
    basics: 'Kundalik zarur so\'zlar',
    numbers: 'Raqamlar va sanash',
    colors: 'Ranglar',
    family: 'Oila a\'zolari',
    body: 'Tana a\'zolari',
    food: 'Ovqatlar',
    drinks: 'Ichimliklar',
    animals: 'Hayvonlar',
    clothes: 'Kiyim-kechak',
    house: 'Uy va xonalar',
    furniture: 'Mebel buyumlari',
    work: 'Ish va ofis',
    school: 'Maktab va ta\'lim',
    time: 'Vaqt va sanalar',
    weather: 'Ob-havo holati',
    travel: 'Sayohat va turizm',
    transport: 'Transport vositalari',
    shopping: 'Xarid va do\'konlar',
    restaurant: 'Restoran va ovqatlanish',
    health: 'Salomatlik va tibbiyot',
  };
  return descMap[category] || category;
}

function generateExercisesForWord(word: Word, isNew: boolean): any[] {
  const exercises: any[] = [];
  
  // For new words: introduction first
  if (isNew) {
    exercises.push({
      id: `${word.id}_intro`,
      type: 'introduction',
      wordId: word.id,
      word,
      prompt: word.word,
      promptUz: word.translationUz,
      correctAnswer: word.translation,
    });
  }
  
  // Translation match
  exercises.push({
    id: `${word.id}_trans`,
    type: 'translation_match',
    wordId: word.id,
    word,
    prompt: word.word,
    promptUz: 'Tarjimani toping',
    options: [word.translation, ...(word.distractors || []).slice(0, 3)].sort(() => Math.random() - 0.5),
    correctAnswer: word.translation,
  });
  
  // Fill blank (if has examples)
  if (word.examples && word.examples.length > 0) {
    exercises.push({
      id: `${word.id}_fill`,
      type: 'fill_blank',
      wordId: word.id,
      word,
      prompt: word.examples[0].en.replace(word.word, '___'),
      promptUz: word.examples[0].uz,
      correctAnswer: word.word,
    });
  }
  
  return exercises;
}

export const useVocabularyStore = create<VocabularyState>((set, get) => ({
  words: new Map(),
  userProgress: new Map(),
  categories: [],
  currentSession: null,
  isLoading: false,
  stats: {
    totalWords: 0,
    wordsLearned: 0,
    wordsMastered: 0,
    wordsToReview: 0,
    dailyGoal: 20,
    dailyProgress: 0,
    todayNewWords: 0,
    streak: 0,
    longestStreak: 0,
    categoriesCompleted: 0,
    totalXP: 0,
  },

  loadWords: async () => {
    set({ isLoading: true });
    
    try {
      // Dynamically import word data
      const { ALL_WORDS } = await import('@/data/vocabulary/allWords');
      
      // Convert array to Map
      const wordsMap = new Map(ALL_WORDS.map(word => [word.id, word]));
      
      // Generate categories from words
      const categoryMap = new Map<string, VocabularyCategory>();
      
      ALL_WORDS.forEach(word => {
        if (!categoryMap.has(word.category)) {
          categoryMap.set(word.category, {
            id: word.category,
            name: word.category.charAt(0).toUpperCase() + word.category.slice(1),
            nameUz: getCategoryNameUz(word.category),
            icon: getCategoryIcon(word.category),
            description: `${word.category} words`,
            descriptionUz: getCategoryDescriptionUz(word.category),
            level: word.level,
            wordIds: [],
          });
        }
        
        const category = categoryMap.get(word.category)!;
        category.wordIds.push(word.id);
      });
      
      const categories = Array.from(categoryMap.values());
      
      set({ 
        words: wordsMap, 
        categories,
        isLoading: false,
        stats: {
          ...get().stats,
          totalWords: wordsMap.size,
          todayNewWords: 0,
        },
      });
      
      get().updateStats();
    } catch (error) {
      console.error('Failed to load words:', error);
      set({ isLoading: false });
    }
  },

  loadUserProgress: async (userId: string) => {
    try {
      const data = await AsyncStorage.getItem(`vocabulary_progress_${userId}`);
      if (data) {
        const progressArray = JSON.parse(data);
        const progressMap = new Map(
          progressArray.map((p: any) => [
            p.wordId,
            {
              ...p,
              firstSeen: new Date(p.firstSeen),
              lastSeen: new Date(p.lastSeen),
              nextReview: new Date(p.nextReview),
              exerciseHistory: p.exerciseHistory.map((h: any) => ({
                ...h,
                timestamp: new Date(h.timestamp),
              })),
            },
          ])
        );
        set({ userProgress: progressMap });
        get().updateStats();
      }
    } catch (error) {
      console.error('Failed to load user progress:', error);
    }
  },

  saveUserProgress: async (userId: string) => {
    try {
      const progressArray = Array.from(get().userProgress.entries()).map(([wordId, progress]) => ({
        wordId,
        ...progress,
      }));
      await AsyncStorage.setItem(
        `vocabulary_progress_${userId}`,
        JSON.stringify(progressArray)
      );
    } catch (error) {
      console.error('Failed to save user progress:', error);
    }
  },

  startNewWordsSession: (categoryId: string, count: number) => {
    const { words, userProgress } = get();
    const categoryWords = get().getWordsByCategory(categoryId);
    
    // Get new words (not in progress)
    const newWords = categoryWords
      .filter(w => !userProgress.has(w.id))
      .slice(0, count);
    
    // Generate exercises for each word
    const exercises = newWords.flatMap(word => generateExercisesForWord(word, true));
    
    const session: VocabularySession = {
      id: Date.now().toString(),
      type: 'new_words',
      startTime: new Date(),
      words: newWords.map(w => w.id),
      exercises,
      currentIndex: 0,
      answers: [],
      correctCount: 0,
      totalCount: exercises.length,
      xpEarned: 0,
      streak: 0,
    };
    
    set({ currentSession: session });
  },

  startPracticeSession: () => {
    const weakWords = get().getWeakWords().slice(0, 15);
    
    // Generate exercises
    const exercises = weakWords.flatMap(word => generateExercisesForWord(word, false));
    
    const session: VocabularySession = {
      id: Date.now().toString(),
      type: 'practice',
      startTime: new Date(),
      words: weakWords.map(w => w.id),
      exercises,
      currentIndex: 0,
      answers: [],
      correctCount: 0,
      totalCount: exercises.length,
      xpEarned: 0,
      streak: 0,
    };
    
    set({ currentSession: session });
  },

  startReviewSession: () => {
    const dueWords = get().getDueWords();
    
    // Generate exercises
    const exercises = dueWords.flatMap(word => generateExercisesForWord(word, false));
    
    const session: VocabularySession = {
      id: Date.now().toString(),
      type: 'review',
      startTime: new Date(),
      words: dueWords.map(w => w.id),
      exercises,
      currentIndex: 0,
      answers: [],
      correctCount: 0,
      totalCount: exercises.length,
      xpEarned: 0,
      streak: 0,
    };
    
    set({ currentSession: session });
  },

  submitAnswer: (wordId: string, correct: boolean, exerciseType: string, timeSpent: number) => {
    const { currentSession } = get();
    if (!currentSession) return;
    
    // Update session
    const newAnswers = [...currentSession.answers, {
      wordId,
      correct,
      exerciseType: exerciseType as any,
      timeSpent,
    }];
    
    const newStreak = correct ? currentSession.streak + 1 : 0;
    const xpGain = correct ? (10 + (newStreak >= 5 ? 5 : 0)) : 0;
    
    set({
      currentSession: {
        ...currentSession,
        answers: newAnswers,
        currentIndex: currentSession.currentIndex + 1,
        correctCount: currentSession.correctCount + (correct ? 1 : 0),
        xpEarned: currentSession.xpEarned + xpGain,
        streak: newStreak,
      },
    });
    
    // Update word strength
    get().updateWordStrength(wordId, correct);
  },

  completeSession: () => {
    const { currentSession } = get();
    if (!currentSession) return null;
    
    const completedSession = { ...currentSession };
    set({ currentSession: null });
    get().updateStats();
    
    return completedSession;
  },

  updateWordStrength: (wordId: string, correct: boolean) => {
    const { userProgress, words } = get();
    const word = words.get(wordId);
    if (!word) return;
    
    const existing = userProgress.get(wordId);
    const now = new Date();
    
    if (!existing) {
      // New word
      const newProgress: UserWordProgress = {
        wordId,
        strength: correct ? 1 : 0,
        level: 'learning',
        timesCorrect: correct ? 1 : 0,
        timesIncorrect: correct ? 0 : 1,
        totalExposures: 1,
        firstSeen: now,
        lastSeen: now,
        nextReview: calculateNextReview(0, correct),
        exerciseHistory: [],
      };
      
      userProgress.set(wordId, newProgress);
    } else {
      // Update existing
      const newStrength = correct 
        ? Math.min(5, existing.strength + 1) 
        : Math.max(0, existing.strength - 1);
      
      const updated: UserWordProgress = {
        ...existing,
        strength: newStrength as WordStrength,
        level: getWordLevel(newStrength as WordStrength),
        timesCorrect: existing.timesCorrect + (correct ? 1 : 0),
        timesIncorrect: existing.timesIncorrect + (correct ? 0 : 1),
        totalExposures: existing.totalExposures + 1,
        lastSeen: now,
        nextReview: calculateNextReview(existing.strength, correct),
      };
      
      userProgress.set(wordId, updated);
    }
    
    set({ userProgress: new Map(userProgress) });
  },

  getWeakWords: () => {
    const { words, userProgress } = get();
    return Array.from(words.values())
      .filter(w => {
        const progress = userProgress.get(w.id);
        return progress && progress.strength < 3;
      })
      .sort((a, b) => {
        const aStrength = userProgress.get(a.id)!.strength;
        const bStrength = userProgress.get(b.id)!.strength;
        return aStrength - bStrength;
      });
  },

  getDueWords: () => {
    const { words, userProgress } = get();
    const now = new Date();
    
    return Array.from(words.values())
      .filter(w => {
        const progress = userProgress.get(w.id);
        return progress && progress.nextReview <= now;
      })
      .sort((a, b) => {
        const aNext = userProgress.get(a.id)!.nextReview.getTime();
        const bNext = userProgress.get(b.id)!.nextReview.getTime();
        return aNext - bNext;
      });
  },

  getWordsByCategory: (categoryId: string) => {
    const { words, categories } = get();
    const category = categories.find(c => c.id === categoryId);
    if (!category) return [];
    
    return category.wordIds
      .map(id => words.get(id))
      .filter(w => w !== undefined) as Word[];
  },

  updateStats: () => {
    const { words, userProgress } = get();
    
    const wordsLearned = Array.from(userProgress.values())
      .filter(p => p.strength > 0).length;
    
    const wordsMastered = Array.from(userProgress.values())
      .filter(p => p.strength === 5).length;
    
    const wordsToReview = get().getDueWords().length;
    
    set({
      stats: {
        ...get().stats,
        totalWords: words.size,
        wordsLearned,
        wordsMastered,
        wordsToReview,
      },
    });
  },

  getStats: () => get().stats,
}));
