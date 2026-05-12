import { useTranslation } from 'react-i18next';
import { Stack, Surface, Text } from '@/components/primitives';

export default function RoutesScreen() {
  const { t: tTabs } = useTranslation('tabs');
  const { t: tCommon } = useTranslation('common');
  return (
    <Surface
      background="bg"
      padding="xl"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack gap="md" align="center">
        <Text variant="title1">{tTabs('routes')}</Text>
        <Text variant="body" color="inkSubtle">
          {tCommon('placeholder')}
        </Text>
      </Stack>
    </Surface>
  );
}
