import * as Sentry from '@sentry/react-native';
import { readEnv } from './env';

let initialized = false;

export function initSentry(): boolean {
  if (initialized) return false;
  const { sentryDsn } = readEnv();
  if (!sentryDsn) return false;
  Sentry.init({
    dsn: sentryDsn,
    enableAutoSessionTracking: true,
    sendDefaultPii: false,
    tracesSampleRate: 0,
  });
  initialized = true;
  return true;
}
