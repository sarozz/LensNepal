import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useAppFonts } from '@/hooks/useAppFonts';
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

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="etiquette" options={{ presentation: 'modal' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PersistQueryClientProvider>
    </I18nextProvider>
  );
}
