import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppFonts } from '@/hooks/useAppFonts';
import { useFirstLaunch } from '@/hooks/useFirstLaunch';
import { useThemePreference } from '@/hooks/useThemePreference';
import { i18n } from '@/i18n';
import { initAnalytics } from '@/lib/analytics';
import { persistOptions, queryClient } from '@/lib/query-client';
import { initSentry } from '@/lib/sentry';
import '@/theme';

initSentry();
initAnalytics();

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded, error } = useAppFonts();
  const { acknowledged } = useFirstLaunch();
  useThemePreference();

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
          <StatusBar style="auto" />
          <Stack
            initialRouteName={acknowledged ? '(tabs)' : 'etiquette'}
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              animationDuration: 240,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="etiquette"
              options={{
                presentation: 'modal',
                gestureEnabled: acknowledged,
                animation: 'slide_from_bottom',
                animationDuration: 360,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PersistQueryClientProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
