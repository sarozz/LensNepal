import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EtiquetteSection } from '@/components/etiquette';
import { Button, Pressable, Stack, Surface, Text } from '@/components/primitives';
import { useFirstLaunch } from '@/hooks/useFirstLaunch';
import { useTheme } from '@/hooks/useTheme';

const SECTION_ORDER = ['photography', 'footwear', 'silence', 'sacredObjects', 'kumari'] as const;

export default function EtiquetteModal() {
  const router = useRouter();
  const { t } = useTranslation('etiquette');
  const { t: tCommon } = useTranslation('common');
  const theme = useTheme();
  const { acknowledged, acknowledge } = useFirstLaunch();

  const handleAcknowledge = async () => {
    await acknowledge();
    router.replace('/(tabs)/explore');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <Surface background="bg" style={{ flex: 1 }}>
        {acknowledged ? (
          <Pressable
            onPress={() => router.back()}
            accessibilityLabel={tCommon('close')}
            accessibilityRole="button"
            style={{
              position: 'absolute',
              top: theme.spacing.md,
              right: theme.spacing.lg,
              zIndex: 1,
              padding: theme.spacing.sm,
            }}
          >
            <Text variant="title2" color="inkMuted">
              {tCommon('closeGlyph')}
            </Text>
          </Pressable>
        ) : null}
        <ScrollView
          contentContainerStyle={{
            paddingTop: theme.spacing['2xl'],
            paddingBottom: theme.spacing['2xl'],
          }}
        >
          <Stack padding="xl" gap="md">
            <Text variant="display">{t('title')}</Text>
            <Text variant="body" color="ink">
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
            <Button label={t('acknowledge.cta')} onPress={handleAcknowledge} />
          </Stack>
        </ScrollView>
      </Surface>
    </SafeAreaView>
  );
}
