import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Hero } from '@/components';
import { Pressable, Stack, Surface, Text } from '@/components/primitives';
import { type ElementId, ELEMENT_META, ELEMENTS } from '@/features/elements';
import { useTheme } from '@/hooks/useTheme';

function ElementTile({ id, onPress }: { id: ElementId; onPress: () => void }) {
  const { t } = useTranslation('elements');
  const theme = useTheme();
  const meta = ELEMENT_META[id];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t(`elements.${id}.title`)}
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
        accessibilityLabel={t(`elements.${id}.title`)}
      />
      <Stack padding="md" gap="xs">
        <Text variant="title3">{t(`elements.${id}.title`)}</Text>
        <Text variant="footnote" color="inkMuted" numberOfLines={2}>
          {t(`elements.${id}.oneLine`)}
        </Text>
      </Stack>
    </Pressable>
  );
}

export default function ExploreScreen() {
  const { t } = useTranslation('elements');
  const router = useRouter();
  const theme = useTheme();

  const openElement = (id: ElementId) => {
    router.push({ pathname: '/element/[id]', params: { id } });
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
          {ELEMENTS.map((id) => (
            <ElementTile key={id} id={id} onPress={() => openElement(id)} />
          ))}
        </View>
      </ScrollView>
    </Surface>
  );
}
