import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Stack, Surface, Text } from '@/components/primitives';

export default function NotFound() {
  const { t } = useTranslation('common');
  return (
    <Surface background="bg" padding="xl" style={{ flex: 1, justifyContent: 'center' }}>
      <Stack gap="lg" align="center">
        <Text variant="title1">{t('notFound')}</Text>
        <Link href="/" replace>
          <Text variant="callout" color="accent">
            {t('backToStart')}
          </Text>
        </Link>
      </Stack>
    </Surface>
  );
}
