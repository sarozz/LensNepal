import { useTranslation } from 'react-i18next';
import { Stack, Surface, Text } from '@/components/primitives';

export default function ExploreScreen() {
  const { t: tTabs } = useTranslation('tabs');
  const { t: tCommon } = useTranslation('common');
  return (
    <Surface background="bg" padding="lg" style={{ flex: 1 }}>
      <Stack gap="md">
        <Text variant="title1">{tTabs('explore')}</Text>
        <Text variant="body" color="inkMuted">
          {tCommon('placeholder')}
        </Text>
      </Stack>
    </Surface>
  );
}
