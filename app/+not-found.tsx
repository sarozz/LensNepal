import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, Surface, Text } from '@/components/primitives';
import { useTheme } from '@/hooks/useTheme';

export default function NotFound() {
  const { t } = useTranslation('common');
  const theme = useTheme();
  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <Surface background="bg" padding="xl" style={{ flex: 1, justifyContent: 'center' }}>
        <Stack gap="lg" align="center">
          <Text variant="title1">{t('notFound')}</Text>
          <Link href="/(tabs)/explore" replace>
            <Text variant="callout" color="accent">
              {t('backToStart')}
            </Text>
          </Link>
        </Stack>
      </Surface>
    </SafeAreaView>
  );
}
