import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  hasAcknowledgedEtiquette: 'hasAcknowledgedEtiquette',
  preferredLanguage: 'preferredLanguage',
  preferredTheme: 'preferredTheme',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;

export async function getBoolean(key: StorageKey): Promise<boolean | undefined> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS[key]);
  if (raw === null) return undefined;
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return undefined;
}

export async function setBoolean(key: StorageKey, value: boolean): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS[key], value ? 'true' : 'false');
}

export async function getString(key: StorageKey): Promise<string | undefined> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS[key]);
  return raw === null ? undefined : raw;
}

export async function setString(key: StorageKey, value: string): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS[key], value);
}

export async function remove(key: StorageKey): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEYS[key]);
}

export async function clear(): Promise<void> {
  await AsyncStorage.clear();
}
