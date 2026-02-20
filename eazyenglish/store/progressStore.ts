import { create } from 'zustand';
import { UserProgress, CompletedLesson } from '@/types';

const STORAGE_KEY = 'eazy_english:progress';

const save = (k: string, v: unknown) =>
  typeof window !== 'undefined' && localStorage.setItem(k, JSON.stringify(v));

const load = <T>(k: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const getTodayDateString = (): string => new Date().toISOString().split('T')[0];

interface ProgressState {
  progress: UserProgress | null;
  isLoading: boolean;

  // Actions
  loadProgress: (userId: string) => void;
  initializeProgress: (userId: string) => void;
  completeLesson: (completedLesson: CompletedLesson) => void;
  getTodayXP: () => number;
  isLessonCompleted: (lessonId: string) => boolean;
  getProgress: () => UserProgress | null;
  clearProgress: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: null,
  isLoading: true,

  loadProgress: (userId) => {
    set({ isLoading: true });
    try {
      let progress = load<UserProgress>(STORAGE_KEY);

      // Initialize if doesn't exist
      if (!progress) {
        progress = {
          userId,
          completedLessons: [],
          currentLevel: 1,
          totalXPEarned: 0,
          streakData: {
            current: 0,
            longest: 0,
            lastActiveDate: getTodayDateString(),
            datesActive: [],
          },
          lastUpdated: new Date().toISOString(),
        };
        save(STORAGE_KEY, progress);
      }

      set({ progress, isLoading: false });
    } catch (error) {
      console.error('Error loading progress:', error);
      set({ isLoading: false });
    }
  },

  initializeProgress: (userId) => {
    const newProgress: UserProgress = {
      userId,
      completedLessons: [],
      currentLevel: 1,
      totalXPEarned: 0,
      streakData: {
        current: 0,
        longest: 0,
        lastActiveDate: getTodayDateString(),
        datesActive: [],
      },
      lastUpdated: new Date().toISOString(),
    };

    save(STORAGE_KEY, newProgress);
    set({ progress: newProgress });
  },

  completeLesson: (completedLesson) => {
    const { progress } = get();
    if (!progress) return;

    const updatedProgress: UserProgress = {
      ...progress,
      completedLessons: [...progress.completedLessons, completedLesson],
      totalXPEarned: progress.totalXPEarned + completedLesson.xpEarned,
      lastUpdated: new Date().toISOString(),
    };

    save(STORAGE_KEY, updatedProgress);
    set({ progress: updatedProgress });
  },

  getTodayXP: () => {
    const { progress } = get();
    if (!progress) return 0;

    const today = getTodayDateString();
    return progress.completedLessons
      .filter((lesson) => lesson.completedAt.startsWith(today))
      .reduce((sum, lesson) => sum + lesson.xpEarned, 0);
  },

  isLessonCompleted: (lessonId) => {
    const { progress } = get();
    if (!progress) return false;

    return progress.completedLessons.some(
      (lesson) => lesson.lessonId === lessonId
    );
  },

  getProgress: () => {
    return get().progress;
  },

  clearProgress: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    set({ progress: null });
  },
}));
