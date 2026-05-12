import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Pressable, Stack, Text } from '@/components/primitives';
import { useTheme } from '@/hooks/useTheme';
import { type ThemeMode, useThemePreference } from '@/hooks/useThemePreference';
import type { AppTheme } from '@/theme';
import { darkPalette, lightPalette, outdoorBrightPalette } from '@/theme/tokens/colors';

const MODES: ReadonlyArray<ThemeMode> = ['system', 'light', 'dark', 'outdoorBright'];

function swatchColor(mode: ThemeMode, theme: AppTheme): string {
  switch (mode) {
    case 'system':
      return theme.colors.inkSubtle;
    case 'light':
      return lightPalette.accent;
    case 'dark':
      return darkPalette.accent;
    case 'outdoorBright':
      return outdoorBrightPalette.accent;
  }
}

export function ThemeSwitcher() {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const { mode, setMode } = useThemePreference();

  const labels: Record<ThemeMode, string> = {
    system: t('theme.system'),
    light: t('theme.light'),
    dark: t('theme.dark'),
    outdoorBright: t('theme.outdoorBright'),
  };

  return (
    <Stack gap="sm">
      <Text variant="title3">{t('theme.sectionTitle')}</Text>
      <Stack direction="row" gap="sm">
        {MODES.map((m) => {
          const active = mode === m;
          return (
            <Pressable
              key={m}
              onPress={() => setMode(m)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={labels[m]}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing.sm,
                borderWidth: 1,
                borderColor: active ? theme.colors.accent : theme.colors.border,
                borderRadius: theme.radius.sm,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: swatchColor(m, theme),
                }}
              />
              <Text variant="footnote" color={active ? 'accent' : 'inkMuted'}>
                {labels[m]}
              </Text>
            </Pressable>
          );
        })}
      </Stack>
    </Stack>
  );
}
