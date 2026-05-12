import Constants from 'expo-constants';

type Extra = {
  sentryDsn?: unknown;
  posthogApiKey?: unknown;
  posthogHost?: unknown;
};

const POSTHOG_EU_DEFAULT = 'https://eu.i.posthog.com';

export type Env = {
  sentryDsn: string | undefined;
  posthogApiKey: string | undefined;
  posthogHost: string;
};

function clean(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function readExtra(): Extra {
  const extra = Constants.expoConfig?.extra;
  if (extra === null || extra === undefined) return {};
  return extra as Extra;
}

export function readEnv(): Env {
  const extra = readExtra();
  return {
    sentryDsn: clean(extra.sentryDsn),
    posthogApiKey: clean(extra.posthogApiKey),
    posthogHost: clean(extra.posthogHost) ?? POSTHOG_EU_DEFAULT,
  };
}
