import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Hero } from '@/components';
import { Button, Pressable, Stack, Surface, Text } from '@/components/primitives';
import { useCollection } from '@/features/collection';
import { isRouteId, ROUTE_META } from '@/features/routes';
import { useTheme } from '@/hooks/useTheme';

export default function RouteDetail() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation('routes');
  const { t: tCommon } = useTranslation('common');
  const { t: tCollection } = useTranslation('collection');
  const theme = useTheme();
  const { isSaved, save, remove } = useCollection();

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
  const saved = isSaved('route', id);

  const toggle = async () => {
    if (saved) await remove('route', id);
    else await save('route', id);
  };

  return (
    <Surface background="bg" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing['2xl'] }}>
        <Hero tint={meta.tint} image={meta.image} accessibilityLabel={title} />
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
        <Stack padding="xl">
          <Button
            label={saved ? tCollection('saved') : tCollection('save')}
            onPress={() => void toggle()}
          />
        </Stack>
      </ScrollView>
    </Surface>
  );
}
