import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';
import { type AppTheme, type ThemeName, themes } from './themes';

export type ThemeMode = ThemeName | 'system';

export type ThemeContextValue = {
  theme: AppTheme;
  mode: ThemeMode;
  resolvedName: ThemeName;
  setMode: (next: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveSystem(colorScheme: ColorSchemeName): ThemeName {
  return colorScheme === 'dark' ? 'dark' : 'light';
}

function resolveName(mode: ThemeMode, colorScheme: ColorSchemeName): ThemeName {
  return mode === 'system' ? resolveSystem(colorScheme) : mode;
}

type Props = {
  initialMode?: ThemeMode;
  onModeChange?: (next: ThemeMode) => void;
  children: ReactNode;
};

export function ThemeProvider({ initialMode = 'system', onModeChange, children }: Props) {
  const [mode, setModeState] = useState<ThemeMode>(initialMode);
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme: next }) => {
      setColorScheme(next);
    });
    return () => sub.remove();
  }, []);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next);
      onModeChange?.(next);
    },
    [onModeChange],
  );

  const value = useMemo<ThemeContextValue>(() => {
    const resolvedName = resolveName(mode, colorScheme);
    return {
      mode,
      resolvedName,
      theme: themes[resolvedName],
      setMode,
    };
  }, [mode, colorScheme, setMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return ctx;
}
