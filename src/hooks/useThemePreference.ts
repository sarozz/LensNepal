import { useEffect } from 'react';
import { type ThemeMode, useThemeContext } from '@/theme';
import { getString, remove, setString } from '@/lib/storage';

export type ThemePreferenceState = {
  mode: ThemeMode;
  setMode: (next: ThemeMode) => Promise<void>;
};

function isThemeMode(value: string): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark' || value === 'outdoorBright';
}

export function useThemePreference(): ThemePreferenceState {
  const { mode, setMode: setContextMode } = useThemeContext();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getString('preferredTheme');
      if (cancelled) return;
      if (stored !== undefined && isThemeMode(stored) && stored !== mode) {
        setContextMode(stored);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, setContextMode]);

  const setMode = async (next: ThemeMode): Promise<void> => {
    setContextMode(next);
    if (next === 'system') {
      await remove('preferredTheme');
    } else {
      await setString('preferredTheme', next);
    }
  };

  return { mode, setMode };
}
