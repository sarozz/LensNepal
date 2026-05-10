import { useCallback, useEffect, useState } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';
import { getString, remove, setString } from '@/lib/storage';
import type { ThemeName } from '@/theme';

export type ThemeMode = ThemeName | 'system';

export type ThemePreferenceState = {
  mode: ThemeMode;
  setMode: (next: ThemeMode) => void;
};

function isThemeName(value: string): value is ThemeName {
  return value === 'light' || value === 'dark' || value === 'outdoorBright';
}

function readInitialMode(): ThemeMode {
  const stored = getString('preferredTheme');
  return stored !== undefined && isThemeName(stored) ? stored : 'system';
}

function applyMode(mode: ThemeMode): void {
  if (mode === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
  } else {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(mode);
  }
}

export function useThemePreference(): ThemePreferenceState {
  const [mode, setModeState] = useState<ThemeMode>(readInitialMode);

  useEffect(() => {
    applyMode(mode);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    if (next === 'system') {
      remove('preferredTheme');
    } else {
      setString('preferredTheme', next);
    }
    setModeState(next);
  }, []);

  return { mode, setMode };
}
