import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CollectionProvider } from '@/features/collection';
import { useAppFonts } from '@/hooks/useAppFonts';
import { useFirstLaunch } from '@/hooks/useFirstLaunch';
import { i18n } from '@/i18n';
import { initAnalytics } from '@/lib/analytics';
import { persistOptions, queryClient } from '@/lib/query-client';
import { initSentry } from '@/lib/sentry';
import { ThemeProvider } from '@/theme';

initSentry();
initAnalytics();

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded, error } = useAppFonts();
  const { acknowledged, hydrated } = useFirstLaunch();

  useEffect(() => {
    if ((loaded || error) && hydrated) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error, hydrated]);

  if ((!loaded && !error) || !hydrated) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <CollectionProvider>
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
                <Stack.Screen
                  name="element/[id]"
                  options={{
                    animation: 'slide_from_right',
                    animationDuration: 240,
                  }}
                />
                <Stack.Screen
                  name="route/[id]"
                  options={{
                    animation: 'slide_from_right',
                    animationDuration: 240,
                  }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
            </PersistQueryClientProvider>
          </CollectionProvider>
        </I18nextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
