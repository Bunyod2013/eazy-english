/**
 * localStorage wrapper - SSR safe
 * Provides typed JSON storage helpers with a consistent key prefix.
 */

export const STORAGE_KEYS = {
  USER: "eazy_english:user",
  PROGRESS: "eazy_english:progress",
  SETTINGS: "eazy_english:settings",
} as const;

const isBrowser = typeof window !== "undefined";

/**
 * Save data to localStorage as JSON.
 */
export function saveData<T>(key: string, data: T): void {
  if (!isBrowser) return;
  try {
    const serialized = JSON.stringify(data);
    window.localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`[storage] Failed to save key "${key}":`, error);
  }
}

/**
 * Load data from localStorage, parsing JSON.
 * Returns null if key is missing, window is unavailable, or parsing fails.
 */
export function loadData<T = unknown>(key: string): T | null {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`[storage] Failed to load key "${key}":`, error);
    return null;
  }
}

/**
 * Remove a key from localStorage.
 */
export function removeData(key: string): void {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`[storage] Failed to remove key "${key}":`, error);
  }
}
