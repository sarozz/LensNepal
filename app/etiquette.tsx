import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Stack, Surface, Text } from '@/components/primitives';

export default function EtiquetteModal() {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <Surface background="surface" padding="xl" style={{ flex: 1, justifyContent: 'center' }}>
      <Stack gap="lg" align="center">
        <Text variant="title1">{t('placeholder')}</Text>
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <Text variant="callout" color="accent">
            {t('dismiss')}
          </Text>
        </Pressable>
      </Stack>
    </Surface>
  );
}
