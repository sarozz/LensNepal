let mockExpoConfig: { extra: Record<string, unknown> | null } | null = null;

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    get expoConfig() {
      return mockExpoConfig;
    },
  },
}));

function setExtra(extra: Record<string, unknown> | null): void {
  mockExpoConfig = extra === null ? null : { extra };
}

const POSTHOG_EU_DEFAULT = 'https://eu.i.posthog.com';

describe('readEnv', () => {
  beforeEach(() => {
    jest.resetModules();
    setExtra(null);
  });

  it('returns all-undefined plus the EU PostHog default when expoConfig is null', () => {
    setExtra(null);
    const { readEnv } = require('./env');
    expect(readEnv()).toEqual({
      sentryDsn: undefined,
      posthogApiKey: undefined,
      posthogHost: POSTHOG_EU_DEFAULT,
    });
  });

  it('returns all-undefined when extras are absent on expoConfig', () => {
    mockExpoConfig = {} as never;
    const { readEnv } = require('./env');
    expect(readEnv()).toEqual({
      sentryDsn: undefined,
      posthogApiKey: undefined,
      posthogHost: POSTHOG_EU_DEFAULT,
    });
  });

  it('passes populated values through unchanged', () => {
    setExtra({
      sentryDsn: 'https://abc@sentry.io/1',
      posthogApiKey: 'phk_test',
      posthogHost: 'https://us.i.posthog.com',
    });
    const { readEnv } = require('./env');
    expect(readEnv()).toEqual({
      sentryDsn: 'https://abc@sentry.io/1',
      posthogApiKey: 'phk_test',
      posthogHost: 'https://us.i.posthog.com',
    });
  });

  it('treats empty and whitespace strings as undefined', () => {
    setExtra({ sentryDsn: '', posthogApiKey: '   ', posthogHost: '' });
    const { readEnv } = require('./env');
    expect(readEnv()).toEqual({
      sentryDsn: undefined,
      posthogApiKey: undefined,
      posthogHost: POSTHOG_EU_DEFAULT,
    });
  });

  it('ignores non-string extra values defensively', () => {
    setExtra({ sentryDsn: 42, posthogApiKey: false, posthogHost: undefined });
    const { readEnv } = require('./env');
    expect(readEnv()).toEqual({
      sentryDsn: undefined,
      posthogApiKey: undefined,
      posthogHost: POSTHOG_EU_DEFAULT,
    });
  });
});
