import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Thumbnail } from '@/components';
import { Pressable, Stack, Surface, Text } from '@/components/primitives';
import { useCollection } from '@/features/collection';
import { type ElementId, ELEMENT_META, isElementId } from '@/features/elements';
import { isRouteId, ROUTE_META, type RouteId } from '@/features/routes';
import { useTheme } from '@/hooks/useTheme';

type RowProps = {
  kindLabel: string;
  title: string;
  summary: string;
  tint: string;
  image?: Parameters<typeof Thumbnail>[0]['image'];
  onOpen: () => void;
};

function SavedRow({ kindLabel, title, summary, tint, image, onOpen }: RowProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onOpen}
      accessibilityRole="button"
      accessibilityLabel={title}
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
      <Thumbnail tint={tint} image={image} size={64} />
      <View style={{ flex: 1 }}>
        <Stack gap="xs">
          <Text variant="footnote" color="inkSubtle">
            {kindLabel}
          </Text>
          <Text variant="title2">{title}</Text>
          <Text variant="body" color="inkMuted">
            {summary}
          </Text>
        </Stack>
      </View>
    </Pressable>
  );
}

function ElementRow({ id, onOpen }: { id: ElementId; onOpen: () => void }) {
  const { t } = useTranslation('elements');
  const { t: tCollection } = useTranslation('collection');
  const meta = ELEMENT_META[id];
  return (
    <SavedRow
      kindLabel={tCollection('kind.element')}
      title={t(`elements.${id}.title`)}
      summary={t(`elements.${id}.oneLine`)}
      tint={meta.tint}
      image={meta.image}
      onOpen={onOpen}
    />
  );
}

function RouteRow({ id, onOpen }: { id: RouteId; onOpen: () => void }) {
  const { t } = useTranslation('routes');
  const { t: tCollection } = useTranslation('collection');
  const meta = ROUTE_META[id];
  return (
    <SavedRow
      kindLabel={tCollection('kind.route')}
      title={t(`routes.${id}.title`)}
      summary={t(`routes.${id}.oneLine`)}
      tint={meta.tint}
      image={meta.image}
      onOpen={onOpen}
    />
  );
}

export default function CollectionScreen() {
  const { t } = useTranslation('collection');
  const router = useRouter();
  const theme = useTheme();
  const { items, clear } = useCollection();

  const openElement = (id: ElementId) => {
    router.push({ pathname: '/element/[id]', params: { id } });
  };
  const openRoute = (id: RouteId) => {
    router.push({ pathname: '/route/[id]', params: { id } });
  };

  const rows: ReactNode[] = [];
  for (const item of items) {
    if (item.kind === 'element' && isElementId(item.id)) {
      const id = item.id;
      rows.push(<ElementRow key={`element:${id}`} id={id} onOpen={() => openElement(id)} />);
    } else if (item.kind === 'route' && isRouteId(item.id)) {
      const id = item.id;
      rows.push(<RouteRow key={`route:${id}`} id={id} onOpen={() => openRoute(id)} />);
    }
  }

  if (rows.length === 0) {
    return (
      <Surface background="bg" padding="xl" style={{ flex: 1, justifyContent: 'center' }}>
        <Stack gap="md" align="center">
          <Text variant="title1">{t('browse.title')}</Text>
          <Text variant="body" color="inkSubtle" style={{ textAlign: 'center' }}>
            {t('browse.empty')}
          </Text>
        </Stack>
      </Surface>
    );
  }

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
          {rows}
        </Stack>
        <Stack padding="xl" align="center">
          <Pressable onPress={() => void clear()} accessibilityRole="button">
            <Text variant="callout" color="danger">
              {t('clearAll')}
            </Text>
          </Pressable>
        </Stack>
      </ScrollView>
    </Surface>
  );
}
