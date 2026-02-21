import { create } from 'zustand';
import { User, LearningPurpose } from '@/types';
import { saveUser, getUser, clearAllData } from '@/utils/storage';
import { getTodayDateString } from '@/utils/date';

interface UserState {
  user: User | null;
  isLoading: boolean;
  
  // Actions
  loadUser: () => Promise<void>;
  createUser: (username: string, language: 'uz' | 'en', skillLevel: User['skillLevel'], purposes?: string[]) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  addXP: (xp: number) => Promise<void>;
  updateStreak: () => Promise<void>;
  clearUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: true,
  
  loadUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getUser();
      set({ user, isLoading: false });
    } catch (error) {
      console.error('Error loading user:', error);
      set({ isLoading: false });
    }
  },
  
  createUser: async (username, language, skillLevel, purposes) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      preferredLanguage: language,
      skillLevel,
      learningPurpose: (purposes || ['general']) as LearningPurpose[],
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      dailyGoal: 50, // Default 50 XP per day
      lastActiveDate: getTodayDateString(),
      createdAt: new Date().toISOString(),
    };
    
    await saveUser(newUser);
    set({ user: newUser });
  },
  
  updateUser: async (updates) => {
    const { user } = get();
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    await saveUser(updatedUser);
    set({ user: updatedUser });
  },
  
  addXP: async (xp) => {
    const { user, updateUser } = get();
    if (!user) return;
    
    await updateUser({
      totalXP: user.totalXP + xp,
      lastActiveDate: getTodayDateString(),
    });
  },
  
  updateStreak: async () => {
    const { user, updateUser } = get();
    if (!user) return;
    
    const today = getTodayDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    // If last active was yesterday, increment streak
    if (user.lastActiveDate === yesterdayStr) {
      const newStreak = user.currentStreak + 1;
      await updateUser({
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, user.longestStreak),
        lastActiveDate: today,
      });
    }
    // If last active was today, no change
    else if (user.lastActiveDate === today) {
      // Already updated today, do nothing
    }
    // Otherwise, reset streak to 1
    else {
      await updateUser({
        currentStreak: 1,
        lastActiveDate: today,
      });
    }
  },
  
  clearUser: async () => {
    try {
      // Clear all local storage data
      await clearAllData();
      set({ user: null });
    } catch (error) {
      console.error('Error clearing user:', error);
      // Still set user to null even if storage clear fails
      set({ user: null });
    }
  },
}));
