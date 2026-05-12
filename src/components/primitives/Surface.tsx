import type { ReactNode } from 'react';
import { type StyleProp, View, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import type { AppTheme } from '@/theme';
import type { ElevationLevel } from '@/theme/tokens/elevation';
import type { SpacingToken } from '@/theme/tokens/spacing';

type SurfaceColor = keyof AppTheme['colors'];

type Props = Omit<ViewProps, 'style'> & {
  elevation?: ElevationLevel;
  padding?: SpacingToken;
  background?: SurfaceColor;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export function Surface({
  elevation = 'level0',
  padding,
  background = 'surface',
  style,
  children,
  ...rest
}: Props) {
  const theme = useTheme();
  const elev = theme.elevation[elevation];

  const elevationStyle: ViewStyle =
    elev.kind === 'shadow'
      ? {
          shadowColor: elev.shadowColor,
          shadowOffset: elev.shadowOffset,
          shadowOpacity: elev.shadowOpacity,
          shadowRadius: elev.shadowRadius,
          elevation: elev.elevation,
        }
      : {
          borderWidth: elev.borderWidth,
          borderColor: theme.colors.border,
        };

  const baseStyle: ViewStyle = {
    backgroundColor: theme.colors[background],
    ...(padding !== undefined ? { padding: theme.spacing[padding] } : {}),
  };

  return (
    <View style={[baseStyle, elevationStyle, style]} {...rest}>
      {children}
    </View>
  );
}
