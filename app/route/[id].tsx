import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Stack, Surface, Text } from '@/components/primitives';
import { isRouteId, ROUTE_META } from '@/features/routes';
import { useTheme } from '@/hooks/useTheme';

export default function RouteDetail() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation('routes');
  const { t: tCommon } = useTranslation('common');
  const theme = useTheme();

  const id = params.id ?? '';
  if (!isRouteId(id)) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: theme.colors.bg }}>
        <Surface background="bg" padding="xl" style={{ flex: 1, justifyContent: 'center' }}>
          <Stack gap="md" align="center">
            <Text variant="title1">{tCommon('notFound')}</Text>
            <Pressable onPress={() => router.back()} accessibilityRole="button">
              <Text variant="callout" color="accent">
                {tCommon('backToStart')}
              </Text>
            </Pressable>
          </Stack>
        </Surface>
      </SafeAreaView>
    );
  }

  const meta = ROUTE_META[id];
  const title = t(`routes.${id}.title`);
  const oneLine = t(`routes.${id}.oneLine`);
  const description = t(`routes.${id}.description`);
  const whenToGo = t(`routes.${id}.whenToGo`);
  const tips = t(`routes.${id}.tips`);

  return (
    <Surface background="bg" style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: theme.spacing['2xl'],
          paddingBottom: theme.spacing['2xl'],
        }}
      >
        <Stack padding="xl" gap="md">
          <Text variant="display">{title}</Text>
          <Text variant="body" color="ink">
            {oneLine}
          </Text>
          <Text variant="footnote" color="inkSubtle">
            {t('meta.distance', { km: meta.distanceKm })} ·{' '}
            {t('meta.duration', { minutes: meta.walkingMinutes })}
          </Text>
        </Stack>
        <Stack padding="xl" gap="sm">
          <Text variant="body" color="inkMuted">
            {description}
          </Text>
        </Stack>
        <Stack padding="xl" gap="xs">
          <Text variant="title3">{t('sections.whenToGo')}</Text>
          <Text variant="body" color="inkMuted">
            {whenToGo}
          </Text>
        </Stack>
        <Stack padding="xl" gap="xs">
          <Text variant="title3">{t('sections.tips')}</Text>
          <Text variant="body" color="inkMuted">
            {tips}
          </Text>
        </Stack>
      </ScrollView>
    </Surface>
  );
}
