import { useSettingsStore } from '@/store/settingsStore';

// Dark Mode Theme - Green & Black
export const DARK_THEME = {
  // Backgrounds
  bg: {
    primary: '#000000',      // Pure black
    secondary: '#0a0a0a',    // Almost black
    card: '#111111',         // Dark card
    elevated: '#1a1a1a',     // Elevated card
  },
  // Text
  text: {
    primary: '#ffffff',      // White
    secondary: '#a3a3a3',    // Gray
    tertiary: '#737373',     // Darker gray
  },
  // Green accents
  green: {
    primary: '#58cc02',      // Duolingo green
    light: '#85e33a',        // Light green
    dark: '#3d9100',         // Dark green
    bg: '#1a3311',           // Green background
    border: '#2d5019',       // Green border
  },
  // Blue accents
  blue: {
    primary: '#1cb0f6',      // Duolingo blue
    light: '#4dc3ff',        // Light blue
    dark: '#0f9cd9',         // Dark blue
    bg: '#0f1f2d',           // Blue background
    border: '#15334a',       // Blue border
  },
  // Red accents
  red: {
    primary: '#ff4b4b',      // Duolingo red
    light: '#ff6b6b',        // Light red
    dark: '#d93636',         // Dark red
    bg: '#2d0f0f',           // Red background
    border: '#4a1515',       // Red border
  },
  // Purple accents
  purple: {
    primary: '#ce82ff',      // Duolingo purple
    light: '#e0a6ff',        // Light purple
    dark: '#a855f7',         // Dark purple
    bg: '#1f0f2d',           // Purple background
    border: '#35154a',       // Purple border
  },
  // Stats colors (darker versions)
  stats: {
    streak: { bg: '#2d1a0f', border: '#4a2815', text: '#ff9600' },
    xp: { bg: '#2d2510', border: '#4a3d15', text: '#fbbf24' },
    lessons: { bg: '#0f1f2d', border: '#15334a', text: '#1cb0f6' },
    accuracy: { bg: '#0f2d14', border: '#154a1f', text: '#58cc02' },
    trophy: { bg: '#2d1a2d', border: '#4a2a4a', text: '#a855f7' },
    goal: { bg: '#2d0f1a', border: '#4a1530', text: '#db2777' },
  },
  // UI Elements
  border: {
    primary: '#262626',      // Border color
    secondary: '#1a1a1a',    // Lighter border
  },
};

// Light Mode Theme (existing colors)
export const LIGHT_THEME = {
  // Backgrounds
  bg: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    card: '#ffffff',
    elevated: '#f9fafb',
  },
  // Text
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    tertiary: '#9ca3af',
  },
  // Green accents
  green: {
    primary: '#58cc02',
    light: '#85e33a',
    dark: '#3d9100',
    bg: '#f0fdf4',
    border: '#bbf7d0',
  },
  // Blue accents
  blue: {
    primary: '#1cb0f6',
    light: '#4dc3ff',
    dark: '#0f9cd9',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
  // Red accents
  red: {
    primary: '#ff4b4b',
    light: '#ff6b6b',
    dark: '#d93636',
    bg: '#fef2f2',
    border: '#fecaca',
  },
  // Purple accents
  purple: {
    primary: '#ce82ff',
    light: '#e0a6ff',
    dark: '#a855f7',
    bg: '#f3e8ff',
    border: '#e9d5ff',
  },
  // Stats colors
  stats: {
    streak: { bg: '#fff5ed', border: '#fed7aa', text: '#ff9600' },
    xp: { bg: '#fef3c7', border: '#fde68a', text: '#f59e0b' },
    lessons: { bg: '#eff6ff', border: '#bfdbfe', text: '#1cb0f6' },
    accuracy: { bg: '#f0fdf4', border: '#bbf7d0', text: '#58cc02' },
    trophy: { bg: '#f3e8ff', border: '#e9d5ff', text: '#a855f7' },
    goal: { bg: '#fce7f3', border: '#fbcfe8', text: '#db2777' },
  },
  // UI Elements
  border: {
    primary: '#e5e7eb',
    secondary: '#f3f4f6',
  },
};

// Hook to get current theme
export const useTheme = () => {
  const { settings } = useSettingsStore();
  const isDark = settings.theme === 'dark';
  
  return {
    colors: isDark ? DARK_THEME : LIGHT_THEME,
    isDark,
  };
};

// Helper function to get theme colors (for non-hook contexts)
export const getThemeColors = (isDark: boolean) => {
  return isDark ? DARK_THEME : LIGHT_THEME;
};
