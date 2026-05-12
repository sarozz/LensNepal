declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_SENTRY_DSN?: string;
      EXPO_PUBLIC_POSTHOG_API_KEY?: string;
      EXPO_PUBLIC_POSTHOG_HOST?: string;
    }
  }
}

export {};
