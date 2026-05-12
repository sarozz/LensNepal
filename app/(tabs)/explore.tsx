import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { Pressable, Stack, Surface, Text } from '@/components/primitives';
import { type ElementId, ELEMENTS } from '@/features/elements';
import { useTheme } from '@/hooks/useTheme';

function ElementCard({ id, onPress }: { id: ElementId; onPress: () => void }) {
  const { t } = useTranslation('elements');
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t(`elements.${id}.title`)}
      style={{
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
      }}
    >
      <Stack gap="xs">
        <Text variant="title2">{t(`elements.${id}.title`)}</Text>
        <Text variant="body" color="inkMuted">
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
        <Stack padding="lg" gap="md">
          {ELEMENTS.map((id) => (
            <ElementCard key={id} id={id} onPress={() => openElement(id)} />
          ))}
        </Stack>
      </ScrollView>
    </Surface>
  );
}
