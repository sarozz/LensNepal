jest.mock('expo-localization', () => ({
  getLocales: jest.fn(),
}));

import { getLocales, type Locale } from 'expo-localization';
import { detectLanguage } from './detect';

const mockedGetLocales = jest.mocked(getLocales);

function locale(languageCode: string | null): Locale {
  return {
    languageTag: languageCode ?? '',
    languageCode,
    languageScriptCode: null,
    languageRegionCode: null,
    languageCurrencyCode: null,
    languageCurrencySymbol: null,
    textDirection: 'ltr',
    digitGroupingSeparator: ',',
    decimalSeparator: '.',
    measurementSystem: 'metric',
    currencyCode: null,
    currencySymbol: null,
    regionCode: null,
    temperatureUnit: 'celsius',
  };
}

describe('detectLanguage', () => {
  beforeEach(() => {
    mockedGetLocales.mockReset();
  });

  it('returns "ne" when device reports Nepali first', () => {
    mockedGetLocales.mockReturnValue([locale('ne')]);
    expect(detectLanguage()).toBe('ne');
  });

  it('returns "en" when device reports English first', () => {
    mockedGetLocales.mockReturnValue([locale('en')]);
    expect(detectLanguage()).toBe('en');
  });

  it('falls back to English when device reports an unsupported locale', () => {
    mockedGetLocales.mockReturnValue([locale('fr')]);
    expect(detectLanguage()).toBe('en');
  });

  it('skips unsupported locales until it finds a supported one', () => {
    mockedGetLocales.mockReturnValue([locale('fr'), locale('ne')]);
    expect(detectLanguage()).toBe('ne');
  });

  it('falls back to English when languageCode is null', () => {
    mockedGetLocales.mockReturnValue([locale(null)]);
    expect(detectLanguage()).toBe('en');
  });
});
