import {
  Pressable as RNPressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Props = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
};

const DEFAULT_HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

export function Pressable({ style, hitSlop = DEFAULT_HIT_SLOP, ...rest }: Props) {
  return (
    <RNPressable
      hitSlop={hitSlop}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
        typeof style === 'function' ? null : style,
      ]}
      {...rest}
    />
  );
}
