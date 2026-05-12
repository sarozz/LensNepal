import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Hero } from '@/components';
import { Pressable, Stack, Surface, Text } from '@/components/primitives';
import { ROUTE_META, ROUTES, type RouteId } from '@/features/routes';
import { useTheme } from '@/hooks/useTheme';

function RouteTile({ id, onPress }: { id: RouteId; onPress: () => void }) {
  const { t } = useTranslation('routes');
  const theme = useTheme();
  const meta = ROUTE_META[id];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t(`routes.${id}.title`)}
      style={{
        flexBasis: '48%',
        flexGrow: 0,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.surface,
        overflow: 'hidden',
      }}
    >
      <Hero
        tint={meta.tint}
        image={meta.image}
        height={120}
        accessibilityLabel={t(`routes.${id}.title`)}
      />
      <Stack padding="md" gap="xs">
        <Text variant="title3">{t(`routes.${id}.title`)}</Text>
        <Text variant="footnote" color="inkMuted" numberOfLines={2}>
          {t(`routes.${id}.oneLine`)}
        </Text>
        <Text variant="caption" color="inkSubtle">
          {t('meta.distance', { km: meta.distanceKm })} ·{' '}
          {t('meta.duration', { minutes: meta.walkingMinutes })}
        </Text>
      </Stack>
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
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
          }}
        >
          {ROUTES.map((id) => (
            <RouteTile key={id} id={id} onPress={() => openRoute(id)} />
          ))}
        </View>
      </ScrollView>
    </Surface>
  );
}
