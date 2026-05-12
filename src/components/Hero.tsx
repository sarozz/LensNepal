import { Image, type ImageSourcePropType, View } from 'react-native';

type Props = {
  tint: string;
  image?: ImageSourcePropType | undefined;
  height?: number;
  accessibilityLabel?: string;
};

export function Hero({ tint, image, height = 220, accessibilityLabel }: Props) {
  if (image !== undefined) {
    return (
      <Image
        source={image}
        accessibilityLabel={accessibilityLabel ?? ''}
        accessibilityIgnoresInvertColors
        resizeMode="cover"
        style={{ width: '100%', height, backgroundColor: tint }}
      />
    );
  }
  return (
    <View
      accessibilityLabel={accessibilityLabel ?? ''}
      style={{ width: '100%', height, backgroundColor: tint }}
    />
  );
}
