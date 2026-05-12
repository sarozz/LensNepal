import { darkPalette, lightPalette, outdoorBrightPalette, type Palette } from './tokens/colors';
import {
  darkElevation,
  type ElevationMap,
  lightElevation,
  outdoorBrightElevation,
} from './tokens/elevation';
import { duration, easing, spring } from './tokens/motion';
import { radius, spacing } from './tokens/spacing';
import { fontFamily, typography } from './tokens/typography';

export type AppTheme = {
  colors: Palette;
  elevation: ElevationMap;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  fontFamily: typeof fontFamily;
  motion: {
    duration: typeof duration;
    easing: typeof easing;
    spring: typeof spring;
  };
};

const sharedTokens = {
  spacing,
  radius,
  typography,
  fontFamily,
  motion: { duration, easing, spring },
};

export const lightTheme: AppTheme = {
  colors: lightPalette,
  elevation: lightElevation,
  ...sharedTokens,
};

export const darkTheme: AppTheme = {
  colors: darkPalette,
  elevation: darkElevation,
  ...sharedTokens,
};

export const outdoorBrightTheme: AppTheme = {
  colors: outdoorBrightPalette,
  elevation: outdoorBrightElevation,
  ...sharedTokens,
};

export type ThemeName = 'light' | 'dark' | 'outdoorBright';

export const themes: Record<ThemeName, AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
  outdoorBright: outdoorBrightTheme,
};
