import { Image, type ImageSourcePropType, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type Props = {
  tint: string;
  image?: ImageSourcePropType | undefined;
  size?: number;
  accessibilityLabel?: string;
};

export function Thumbnail({ tint, image, size = 64, accessibilityLabel }: Props) {
  const theme = useTheme();
  const radius = theme.radius.sm;
  if (image !== undefined) {
    return (
      <Image
        source={image}
        accessibilityLabel={accessibilityLabel ?? ''}
        accessibilityIgnoresInvertColors
        style={{ width: size, height: size, borderRadius: radius, backgroundColor: tint }}
      />
    );
  }
  return (
    <View
      accessibilityLabel={accessibilityLabel ?? ''}
      style={{ width: size, height: size, borderRadius: radius, backgroundColor: tint }}
    />
  );
}
