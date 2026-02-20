import { create } from 'zustand';
import { AppSettings } from '@/types';
import { saveSettings, getSettings } from '@/utils/storage';

interface SettingsState {
  settings: AppSettings;
  isLoading: boolean;
  
  // Actions
  loadSettings: () => Promise<void>;
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  toggleSound: () => Promise<void>;
  toggleMusic: () => Promise<void>;
  toggleVibration: () => Promise<void>;
  setTheme: (theme: AppSettings['theme']) => Promise<void>;
  setExplanationLanguage: (language: 'uz' | 'en') => Promise<void>;
}

const defaultSettings: AppSettings = {
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: true,
  theme: 'auto',
  explanationLanguage: 'uz',
  dailyReminderEnabled: false,
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: defaultSettings,
  isLoading: true,
  
  loadSettings: async () => {
    set({ isLoading: true });
    try {
      const settings = await getSettings();
      set({ 
        settings: settings || defaultSettings,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error loading settings:', error);
      set({ settings: defaultSettings, isLoading: false });
    }
  },
  
  updateSettings: async (updates) => {
    const { settings } = get();
    const updatedSettings = { ...settings, ...updates };
    await saveSettings(updatedSettings);
    set({ settings: updatedSettings });
  },
  
  toggleSound: async () => {
    const { settings, updateSettings } = get();
    await updateSettings({ soundEnabled: !settings.soundEnabled });
  },
  
  toggleMusic: async () => {
    const { settings, updateSettings } = get();
    await updateSettings({ musicEnabled: !settings.musicEnabled });
  },
  
  toggleVibration: async () => {
    const { settings, updateSettings } = get();
    await updateSettings({ vibrationEnabled: !settings.vibrationEnabled });
  },
  
  setTheme: async (theme) => {
    await get().updateSettings({ theme });
  },
  
  setExplanationLanguage: async (language) => {
    await get().updateSettings({ explanationLanguage: language });
  },
}));
