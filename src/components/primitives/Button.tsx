import type { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Pressable } from './Pressable';
import { Text } from './Text';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, disabled, accessibilityLabel, style }: Props) {
  const theme = useTheme();
  const baseStyle: ViewStyle = {
    borderColor: theme.colors.accent,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignSelf: 'flex-start',
  };
  return (
    <Pressable
      onPress={onPress}
      {...(disabled !== undefined ? { disabled } : {})}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={[baseStyle, style]}
    >
      <Text variant="callout" color="accent">
        {label}
      </Text>
    </Pressable>
  );
}
