const mockPostHogConstructor = jest.fn();
let mockExpoConfig: { extra: Record<string, unknown> | null } | null = null;

jest.mock('posthog-react-native', () => ({
  __esModule: true,
  default: mockPostHogConstructor,
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

describe('initAnalytics', () => {
  beforeEach(() => {
    jest.resetModules();
    mockPostHogConstructor.mockClear();
    mockPostHogConstructor.mockImplementation(() => ({}));
    setExtra(null);
  });

  it('no-ops and returns false when no API key is configured', () => {
    setExtra(null);
    const { initAnalytics } = require('./analytics');
    expect(initAnalytics()).toBe(false);
    expect(mockPostHogConstructor).not.toHaveBeenCalled();
  });

  it('no-ops and returns false when API key is the empty string', () => {
    setExtra({ posthogApiKey: '' });
    const { initAnalytics } = require('./analytics');
    expect(initAnalytics()).toBe(false);
    expect(mockPostHogConstructor).not.toHaveBeenCalled();
  });

  it('constructs a PostHog client with privacy options when key is present', () => {
    setExtra({
      posthogApiKey: 'phk_test',
      posthogHost: 'https://us.i.posthog.com',
    });
    const { initAnalytics } = require('./analytics');
    expect(initAnalytics()).toBe(true);
    expect(mockPostHogConstructor).toHaveBeenCalledTimes(1);
    expect(mockPostHogConstructor).toHaveBeenCalledWith('phk_test', {
      host: 'https://us.i.posthog.com',
      personProfiles: 'identified_only',
      disableSurveys: true,
    });
  });

  it('falls back to the EU host when posthogHost is absent', () => {
    setExtra({ posthogApiKey: 'phk_test' });
    const { initAnalytics } = require('./analytics');
    expect(initAnalytics()).toBe(true);
    expect(mockPostHogConstructor).toHaveBeenCalledWith('phk_test', {
      host: 'https://eu.i.posthog.com',
      personProfiles: 'identified_only',
      disableSurveys: true,
    });
  });

  it('is idempotent — second call returns false and does not re-construct', () => {
    setExtra({ posthogApiKey: 'phk_test' });
    const { initAnalytics } = require('./analytics');
    expect(initAnalytics()).toBe(true);
    expect(initAnalytics()).toBe(false);
    expect(mockPostHogConstructor).toHaveBeenCalledTimes(1);
  });
});
