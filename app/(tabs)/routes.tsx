import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Thumbnail } from '@/components';
import { Pressable, Stack, Surface, Text } from '@/components/primitives';
import { ROUTE_META, ROUTES, type RouteId } from '@/features/routes';
import { useTheme } from '@/hooks/useTheme';

function RouteCard({ id, onPress }: { id: RouteId; onPress: () => void }) {
  const { t } = useTranslation('routes');
  const theme = useTheme();
  const meta = ROUTE_META[id];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t(`routes.${id}.title`)}
      style={{
        flexDirection: 'row',
        gap: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
      }}
    >
      <Thumbnail tint={meta.tint} image={meta.image} size={64} />
      <View style={{ flex: 1 }}>
        <Stack gap="xs">
          <Text variant="title2">{t(`routes.${id}.title`)}</Text>
          <Text variant="body" color="inkMuted">
            {t(`routes.${id}.oneLine`)}
          </Text>
          <Text variant="footnote" color="inkSubtle">
            {t('meta.distance', { km: meta.distanceKm })} ·{' '}
            {t('meta.duration', { minutes: meta.walkingMinutes })}
          </Text>
        </Stack>
      </View>
    </Pressable>
  );
}

export default function RoutesScreen() {
  const { t } = useTranslation('routes');
  const router = useRouter();
  const theme = useTheme();

  const openRoute = (id: RouteId) => {
    router.push({ pathname: '/route/[id]', params: { id } });
  };

  return (
    <Surface background="bg" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing['2xl'] }}>
        <Stack padding="xl" gap="sm">
          <Text variant="title1">{t('browse.title')}</Text>
          <Text variant="body" color="inkMuted">
            {t('browse.intro')}
          </Text>
        </Stack>
        <Stack padding="lg" gap="md">
          {ROUTES.map((id) => (
            <RouteCard key={id} id={id} onPress={() => openRoute(id)} />
          ))}
        </Stack>
      </ScrollView>
    </Surface>
  );
}
