import { create } from 'zustand';
import { AppSettings } from '@/types';

const STORAGE_KEY = 'eazy_english:settings';

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

const defaultSettings: AppSettings = {
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  theme: 'light',
  explanationLanguage: 'uz',
  dailyReminderEnabled: false,
};

interface SettingsState {
  settings: AppSettings;
  isLoading: boolean;

  // Actions
  loadSettings: () => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
  toggleSound: () => void;
  setTheme: (theme: AppSettings['theme']) => void;
  setExplanationLanguage: (language: 'uz' | 'en') => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: defaultSettings,
  isLoading: true,

  loadSettings: () => {
    set({ isLoading: true });
    try {
      const settings = load<AppSettings>(STORAGE_KEY);
      set({
        settings: settings || defaultSettings,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading settings:', error);
      set({ settings: defaultSettings, isLoading: false });
    }
  },

  updateSettings: (updates) => {
    const { settings } = get();
    const updatedSettings = { ...settings, ...updates };
    save(STORAGE_KEY, updatedSettings);
    set({ settings: updatedSettings });
  },

  toggleSound: () => {
    const { settings, updateSettings } = get();
    updateSettings({ soundEnabled: !settings.soundEnabled });
  },

  setTheme: (theme) => {
    get().updateSettings({ theme });
  },

  setExplanationLanguage: (language) => {
    get().updateSettings({ explanationLanguage: language });
  },
}));
