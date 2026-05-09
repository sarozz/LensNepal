import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text as RNText,
  type StyleProp,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import type { AppTheme } from '@/theme';
import type { TypographyToken } from '@/theme/tokens/typography';

export type TextColor = keyof AppTheme['colors'];

type Props = Omit<RNTextProps, 'style'> & {
  variant?: TypographyToken;
  color?: TextColor;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
};

export function Text({ variant = 'body', color = 'ink', style, children, ...rest }: Props) {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const isDevanagari = i18n.language === 'ne';
  const token = theme.typography[variant];
  const script = isDevanagari ? token.devanagari : token.latin;

  return (
    <RNText
      style={[
        {
          fontSize: script.fontSize,
          lineHeight: script.lineHeight,
          letterSpacing: script.letterSpacing,
          fontWeight: token.fontWeight,
          color: theme.colors[color],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
