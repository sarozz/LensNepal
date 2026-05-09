import type { ReactNode } from 'react';
import { type StyleProp, View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import type { SpacingToken } from '@/theme/tokens/spacing';

type Direction = 'row' | 'column';
type Align = 'flex-start' | 'center' | 'flex-end' | 'stretch';
type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';

type Props = Omit<ViewProps, 'style'> & {
  direction?: Direction;
  gap?: SpacingToken;
  align?: Align;
  justify?: Justify;
  padding?: SpacingToken;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export function Stack({
  direction = 'column',
  gap,
  align,
  justify,
  padding,
  style,
  children,
  ...rest
}: Props) {
  const theme = useTheme();
  const baseStyle: ViewStyle = {
    flexDirection: direction,
    ...(gap !== undefined ? { gap: theme.spacing[gap] } : {}),
    ...(align !== undefined ? { alignItems: align } : {}),
    ...(justify !== undefined ? { justifyContent: justify } : {}),
    ...(padding !== undefined ? { padding: theme.spacing[padding] } : {}),
  };

  return (
    <View style={[baseStyle, style]} {...rest}>
      {children}
    </View>
  );
}
