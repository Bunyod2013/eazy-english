import { create } from 'zustand';
import { User } from '@/types';

const STORAGE_KEY = 'eazy_english:user';

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

interface UserState {
  user: User | null;
  isLoading: boolean;

  // Actions
  loadUser: () => void;
  createUser: (username: string, language: 'uz' | 'en', skillLevel: User['skillLevel']) => void;
  updateUser: (updates: Partial<User>) => void;
  addXP: (xp: number) => void;
  updateStreak: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: true,

  loadUser: () => {
    set({ isLoading: true });
    try {
      const user = load<User>(STORAGE_KEY);
      set({ user, isLoading: false });
    } catch (error) {
      console.error('Error loading user:', error);
      set({ isLoading: false });
    }
  },

  createUser: (username, language, skillLevel) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      preferredLanguage: language,
      skillLevel,
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      dailyGoal: 50,
      lastActiveDate: getTodayDateString(),
      createdAt: new Date().toISOString(),
    };

    save(STORAGE_KEY, newUser);
    set({ user: newUser });
  },

  updateUser: (updates) => {
    const { user } = get();
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    save(STORAGE_KEY, updatedUser);
    set({ user: updatedUser });
  },

  addXP: (xp) => {
    const { user, updateUser } = get();
    if (!user) return;

    updateUser({
      totalXP: user.totalXP + xp,
      lastActiveDate: getTodayDateString(),
    });
  },

  updateStreak: () => {
    const { user, updateUser } = get();
    if (!user) return;

    const today = getTodayDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (user.lastActiveDate === yesterdayStr) {
      const newStreak = user.currentStreak + 1;
      updateUser({
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, user.longestStreak),
        lastActiveDate: today,
      });
    } else if (user.lastActiveDate === today) {
      // Already updated today, do nothing
    } else {
      updateUser({
        currentStreak: 1,
        lastActiveDate: today,
      });
    }
  },

  clearUser: () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('eazy_english:progress');
        localStorage.removeItem('eazy_english:settings');
      }
      set({ user: null });
    } catch (error) {
      console.error('Error clearing user:', error);
      set({ user: null });
    }
  },
}));
