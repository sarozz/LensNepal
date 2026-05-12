import type { ViewStyle } from 'react-native';
import { Stack, Text } from '@/components/primitives';
import { useTheme } from '@/hooks/useTheme';

type Props = {
  title: string;
  body: string;
  isLast?: boolean;
};

export function EtiquetteSection({ title, body, isLast = false }: Props) {
  const theme = useTheme();
  const dividerStyle: ViewStyle = isLast
    ? {}
    : { borderBottomWidth: 1, borderBottomColor: theme.colors.border };

  return (
    <Stack testID="etiquette-section" gap="sm" padding="lg" style={dividerStyle}>
      <Text variant="title2">{title}</Text>
      <Text variant="body" color="inkMuted">
        {body}
      </Text>
    </Stack>
  );
}
