const mockSentryInit = jest.fn();
let mockExpoConfig: { extra: Record<string, unknown> | null } | null = null;

jest.mock('@sentry/react-native', () => ({
  __esModule: true,
  init: mockSentryInit,
}));

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

describe('initSentry', () => {
  beforeEach(() => {
    jest.resetModules();
    mockSentryInit.mockClear();
    setExtra(null);
  });

  it('no-ops and returns false when no DSN is configured', () => {
    setExtra(null);
    const { initSentry } = require('./sentry');
    expect(initSentry()).toBe(false);
    expect(mockSentryInit).not.toHaveBeenCalled();
  });

  it('no-ops and returns false when DSN is the empty string', () => {
    setExtra({ sentryDsn: '' });
    const { initSentry } = require('./sentry');
    expect(initSentry()).toBe(false);
    expect(mockSentryInit).not.toHaveBeenCalled();
  });

  it('initialises Sentry with privacy-conservative options when DSN is present', () => {
    setExtra({ sentryDsn: 'https://abc@sentry.io/1' });
    const { initSentry } = require('./sentry');
    expect(initSentry()).toBe(true);
    expect(mockSentryInit).toHaveBeenCalledTimes(1);
    expect(mockSentryInit).toHaveBeenCalledWith({
      dsn: 'https://abc@sentry.io/1',
      enableAutoSessionTracking: true,
      sendDefaultPii: false,
      tracesSampleRate: 0,
    });
  });

  it('is idempotent — second call returns false and does not re-init', () => {
    setExtra({ sentryDsn: 'https://abc@sentry.io/1' });
    const { initSentry } = require('./sentry');
    expect(initSentry()).toBe(true);
    expect(initSentry()).toBe(false);
    expect(mockSentryInit).toHaveBeenCalledTimes(1);
  });
});
