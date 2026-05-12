import { useThemeContext } from '@/theme';
import type { AppTheme } from '@/theme';

export function useTheme(): AppTheme {
  return useThemeContext().theme;
}
