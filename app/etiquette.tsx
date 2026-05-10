import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { EtiquetteSection } from '@/components/etiquette';
import { Pressable, Stack, Surface, Text } from '@/components/primitives';
import { useFirstLaunch } from '@/hooks/useFirstLaunch';
import { useTheme } from '@/hooks/useTheme';

const SECTION_ORDER = ['photography', 'footwear', 'silence', 'sacredObjects', 'kumari'] as const;

export default function EtiquetteModal() {
  const router = useRouter();
  const { t } = useTranslation('etiquette');
  const theme = useTheme();
  const { acknowledge } = useFirstLaunch();

  const handleAcknowledge = () => {
    acknowledge();
    router.replace('/(tabs)/explore');
  };

  return (
    <Surface background="bg" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing['2xl'] }}>
        <Stack padding="xl" gap="md">
          <Text variant="display">{t('title')}</Text>
          <Text variant="body" color="inkMuted">
            {t('intro')}
          </Text>
        </Stack>
        {SECTION_ORDER.map((key, index) => (
          <EtiquetteSection
            key={key}
            title={t(`sections.${key}.title`)}
            body={t(`sections.${key}.body`)}
            isLast={index === SECTION_ORDER.length - 1}
          />
        ))}
        <Stack padding="xl" align="center">
          <Pressable
            onPress={handleAcknowledge}
            accessibilityRole="button"
            style={{
              backgroundColor: theme.colors.accent,
              paddingHorizontal: theme.spacing.xl,
              paddingVertical: theme.spacing.md,
              borderRadius: theme.radius.md,
            }}
          >
            <Text variant="callout" color="surface">
              {t('acknowledge.cta')}
            </Text>
          </Pressable>
        </Stack>
      </ScrollView>
    </Surface>
  );
}
