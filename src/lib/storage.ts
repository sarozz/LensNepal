import { storage } from './mmkv';

export const STORAGE_KEYS = {
  hasSeenEtiquette: 'hasSeenEtiquette',
  preferredLanguage: 'preferredLanguage',
  preferredTheme: 'preferredTheme',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;

export function getBoolean(key: StorageKey): boolean | undefined {
  return storage.getBoolean(STORAGE_KEYS[key]);
}

export function setBoolean(key: StorageKey, value: boolean): void {
  storage.set(STORAGE_KEYS[key], value);
}

export function getString(key: StorageKey): string | undefined {
  return storage.getString(STORAGE_KEYS[key]);
}

export function setString(key: StorageKey, value: string): void {
  storage.set(STORAGE_KEYS[key], value);
}

export function remove(key: StorageKey): void {
  storage.delete(STORAGE_KEYS[key]);
}

export function clear(): void {
  storage.clearAll();
}

export const querySyncStorage = {
  getItem: (key: string): string | null => storage.getString(key) ?? null,
  setItem: (key: string, value: string): void => storage.set(key, value),
  removeItem: (key: string): void => storage.delete(key),
};
