import { useState, useEffect } from "react";
import { STORAGE_KEYS, loadData } from "@/utils/storage";

// ---------------------------------------------------------------------------
// Theme color definitions
// ---------------------------------------------------------------------------

export const DARK_THEME = {
  bg: {
    primary: "#000000",
    secondary: "#0a0a0a",
    card: "#111111",
    elevated: "#1a1a1a",
  },
  text: {
    primary: "#ffffff",
    secondary: "#a3a3a3",
    tertiary: "#737373",
  },
  green: {
    primary: "#58cc02",
    light: "#85e33a",
    dark: "#3d9100",
    bg: "#1a3311",
    border: "#2d5019",
  },
  blue: {
    primary: "#1cb0f6",
    light: "#4dc3ff",
    dark: "#0f9cd9",
    bg: "#0f1f2d",
    border: "#15334a",
  },
  red: {
    primary: "#ff4b4b",
    light: "#ff6b6b",
    dark: "#d93636",
    bg: "#2d0f0f",
    border: "#4a1515",
  },
  purple: {
    primary: "#ce82ff",
    light: "#e0a6ff",
    dark: "#a855f7",
    bg: "#1f0f2d",
    border: "#35154a",
  },
  stats: {
    streak: { bg: "#2d1a0f", border: "#4a2815", text: "#ff9600" },
    xp: { bg: "#2d2510", border: "#4a3d15", text: "#fbbf24" },
    lessons: { bg: "#0f1f2d", border: "#15334a", text: "#1cb0f6" },
    accuracy: { bg: "#0f2d14", border: "#154a1f", text: "#58cc02" },
  },
  border: {
    primary: "#262626",
    secondary: "#1a1a1a",
  },
} as const;

export const LIGHT_THEME = {
  bg: {
    primary: "#ffffff",
    secondary: "#f9fafb",
    card: "#ffffff",
    elevated: "#f9fafb",
  },
  text: {
    primary: "#1f2937",
    secondary: "#6b7280",
    tertiary: "#9ca3af",
  },
  green: {
    primary: "#58cc02",
    light: "#85e33a",
    dark: "#3d9100",
    bg: "#f0fdf4",
    border: "#bbf7d0",
  },
  blue: {
    primary: "#1cb0f6",
    light: "#4dc3ff",
    dark: "#0f9cd9",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  red: {
    primary: "#ff4b4b",
    light: "#ff6b6b",
    dark: "#d93636",
    bg: "#fef2f2",
    border: "#fecaca",
  },
  purple: {
    primary: "#ce82ff",
    light: "#e0a6ff",
    dark: "#a855f7",
    bg: "#f3e8ff",
    border: "#e9d5ff",
  },
  stats: {
    streak: { bg: "#fff5ed", border: "#fed7aa", text: "#ff9600" },
    xp: { bg: "#fef3c7", border: "#fde68a", text: "#f59e0b" },
    lessons: { bg: "#eff6ff", border: "#bfdbfe", text: "#1cb0f6" },
    accuracy: { bg: "#f0fdf4", border: "#bbf7d0", text: "#58cc02" },
  },
  border: {
    primary: "#e5e7eb",
    secondary: "#f3f4f6",
  },
} as const;

// ---------------------------------------------------------------------------
// Type for a theme object
// ---------------------------------------------------------------------------

export type ThemeColors = typeof LIGHT_THEME;

// ---------------------------------------------------------------------------
// Helper: get theme colors by name
// ---------------------------------------------------------------------------

export function getThemeColors(theme: "light" | "dark"): ThemeColors {
  return theme === "dark" ? DARK_THEME : LIGHT_THEME;
}

// ---------------------------------------------------------------------------
// Hook: useTheme
// Reads the persisted theme preference from localStorage and returns the
// resolved color palette. Falls back to "light" when no preference is stored.
// ---------------------------------------------------------------------------

interface Settings {
  theme?: "light" | "dark";
}

export function useTheme(): {
  theme: "light" | "dark";
  colors: ThemeColors;
  toggleTheme: () => void;
} {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Read persisted preference on mount
  useEffect(() => {
    const settings = loadData<Settings>(STORAGE_KEYS.SETTINGS);
    if (settings?.theme === "dark" || settings?.theme === "light") {
      setTheme(settings.theme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      // Persist to localStorage
      if (typeof window !== "undefined") {
        try {
          const existing = loadData<Settings>(STORAGE_KEYS.SETTINGS) ?? {};
          window.localStorage.setItem(
            STORAGE_KEYS.SETTINGS,
            JSON.stringify({ ...existing, theme: next }),
          );
        } catch {
          // silently ignore storage errors
        }
      }
      return next;
    });
  };

  return {
    theme,
    colors: getThemeColors(theme),
    toggleTheme,
  };
}
