import { create } from 'zustand';
import { UserProgress, CompletedLesson, StreakData } from '@/types';
import { saveProgress, getProgress } from '@/utils/storage';
import { getTodayDateString } from '@/utils/date';

interface ProgressState {
  progress: UserProgress | null;
  isLoading: boolean;
  
  // Actions
  loadProgress: (userId: string) => Promise<void>;
  initializeProgress: (userId: string) => Promise<void>;
  completeLesson: (completedLesson: CompletedLesson) => Promise<void>;
  getTodayXP: () => number;
  isLessonCompleted: (lessonId: string) => boolean;
  clearProgress: () => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: null,
  isLoading: true,
  
  loadProgress: async (userId) => {
    set({ isLoading: true });
    try {
      let progress = await getProgress();
      
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
        await saveProgress(progress);
      }
      
      set({ progress, isLoading: false });
    } catch (error) {
      console.error('Error loading progress:', error);
      set({ isLoading: false });
    }
  },
  
  initializeProgress: async (userId) => {
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
    
    await saveProgress(newProgress);
    set({ progress: newProgress });
  },
  
  completeLesson: async (completedLesson) => {
    const { progress } = get();
    if (!progress) return;
    
    const updatedProgress: UserProgress = {
      ...progress,
      completedLessons: [...progress.completedLessons, completedLesson],
      totalXPEarned: progress.totalXPEarned + completedLesson.xpEarned,
      lastUpdated: new Date().toISOString(),
    };
    
    await saveProgress(updatedProgress);
    set({ progress: updatedProgress });
  },
  
  getTodayXP: () => {
    const { progress } = get();
    if (!progress) return 0;
    
    const today = getTodayDateString();
    return progress.completedLessons
      .filter(lesson => lesson.completedAt.startsWith(today))
      .reduce((sum, lesson) => sum + lesson.xpEarned, 0);
  },
  
  isLessonCompleted: (lessonId) => {
    const { progress } = get();
    if (!progress) return false;
    
    return progress.completedLessons.some(lesson => lesson.lessonId === lessonId);
  },
  
  clearProgress: async () => {
    set({ progress: null });
  },
}));
