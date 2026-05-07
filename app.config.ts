import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Kathmandu Lens',
  slug: 'kathmandu-lens',
  version: '0.1.0',
  scheme: 'kathmandu-lens',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.kathmandulens.app',
  },
  android: {
    package: 'com.kathmandulens.app',
  },
  plugins: ['expo-router', 'expo-font', 'expo-localization'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    posthogApiKey: process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
    posthogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
  },
};

export default config;
