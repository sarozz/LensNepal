import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Stack, Surface, Text } from '@/components/primitives';
import { ELEMENT_SOURCES, isElementId } from '@/features/recognition';
import { useTheme } from '@/hooks/useTheme';

export default function RecognitionResult() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation('recognition');
  const { t: tCommon } = useTranslation('common');
  const theme = useTheme();

  const id = params.id ?? '';
  if (!isElementId(id)) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: theme.colors.bg }}>
        <Surface background="bg" padding="xl" style={{ flex: 1, justifyContent: 'center' }}>
          <Stack gap="md" align="center">
            <Text variant="title1">{tCommon('notFound')}</Text>
            <Pressable onPress={() => router.back()} accessibilityRole="button">
              <Text variant="callout" color="accent">
                {tCommon('close')}
              </Text>
            </Pressable>
          </Stack>
        </Surface>
      </SafeAreaView>
    );
  }

  const element = ELEMENT_SOURCES[id];
  const title = t(`elements.${id}.title`);
  const oneLine = t(`elements.${id}.oneLine`);
  const context = t(`elements.${id}.context`);
  const sourceLabel = t(element.source.labelKey);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <Surface background="bg" style={{ flex: 1 }}>
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
        <ScrollView
          contentContainerStyle={{
            paddingTop: theme.spacing['2xl'],
            paddingBottom: theme.spacing['2xl'],
          }}
        >
          <Stack padding="xl" gap="md">
            <Text variant="footnote" color="inkSubtle">
              {t('lowConfidence')}
            </Text>
            <Text variant="display">{title}</Text>
            <Text variant="body" color="ink">
              {oneLine}
            </Text>
          </Stack>
          <Stack padding="xl" gap="sm">
            <Text variant="body" color="inkMuted">
              {context}
            </Text>
          </Stack>
          <Stack padding="xl" gap="xs">
            <Text variant="footnote" color="inkSubtle">
              {t('sources.intro')}
            </Text>
            <Text variant="footnote" color="inkMuted">
              {sourceLabel} — {element.source.url}
            </Text>
          </Stack>
        </ScrollView>
      </Surface>
    </SafeAreaView>
  );
}
