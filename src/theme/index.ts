import { StyleSheet } from 'react-native-unistyles';
import { type AppTheme, themes } from './themes';

export const breakpoints = {
  xs: 0,
} as const;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: AppTheme;
    dark: AppTheme;
    outdoorBright: AppTheme;
  }
  export interface UnistylesBreakpoints {
    xs: number;
  }
}

StyleSheet.configure({
  themes,
  breakpoints,
  settings: {
    adaptiveThemes: true,
  },
});

export { themes, lightTheme, darkTheme, outdoorBrightTheme } from './themes';
export type { AppTheme, ThemeName } from './themes';
