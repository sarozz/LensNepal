import { useUnistyles } from 'react-native-unistyles';
import type { AppTheme } from '@/theme';

export function useTheme(): AppTheme {
  const { theme } = useUnistyles();
  return theme;
}
