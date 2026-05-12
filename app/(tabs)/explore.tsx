import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Pressable, Stack, Surface, Text } from '@/components/primitives';
import { recognise } from '@/features/recognition';
import { useTheme } from '@/hooks/useTheme';

export default function ExploreScreen() {
  const { t } = useTranslation('recognition');
  const theme = useTheme();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [busy, setBusy] = useState(false);

  if (!permission) {
    return (
      <Surface background="bg" style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
          <Stack gap="md" align="center">
            <Text variant="body" color="inkSubtle">
              {t('thinking')}
            </Text>
          </Stack>
        </SafeAreaView>
      </Surface>
    );
  }

  if (!permission.granted) {
    return (
      <Surface background="bg" padding="xl" style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
          <Stack gap="lg">
            <Text variant="title1">{t('permission.title')}</Text>
            <Text variant="body" color="inkMuted">
              {t('permission.body')}
            </Text>
            <Button label={t('permission.grant')} onPress={() => void requestPermission()} />
            {!permission.canAskAgain ? (
              <Text variant="footnote" color="inkSubtle">
                {t('permission.denied')}
              </Text>
            ) : null}
          </Stack>
        </SafeAreaView>
      </Surface>
    );
  }

  const onShutter = async () => {
    if (busy || cameraRef.current === null) return;
    setBusy(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        skipProcessing: true,
      });
      if (!photo) {
        setBusy(false);
        return;
      }
      const match = await recognise(photo.uri);
      router.push({ pathname: '/recognition/[id]', params: { id: match.elementId } });
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
      <SafeAreaView
        edges={['bottom']}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          paddingBottom: theme.spacing.xl,
        }}
        pointerEvents="box-none"
      >
        <Pressable
          onPress={() => void onShutter()}
          accessibilityRole="button"
          accessibilityLabel={t('shutter')}
          accessibilityState={{ busy }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: theme.colors.surface,
            borderWidth: 4,
            borderColor: theme.colors.accent,
            opacity: busy ? 0.6 : 1,
          }}
        />
        {busy ? (
          <Text variant="footnote" color="surface" style={{ marginTop: theme.spacing.sm }}>
            {t('thinking')}
          </Text>
        ) : null}
      </SafeAreaView>
    </View>
  );
}
