import { useFonts } from 'expo-font';

export type UseAppFontsResult = {
  loaded: boolean;
  error: Error | null;
};

const fontMap: Record<string, number> = {};

export function useAppFonts(): UseAppFontsResult {
  const [loaded, error] = useFonts(fontMap);
  return { loaded, error: error ?? null };
}
