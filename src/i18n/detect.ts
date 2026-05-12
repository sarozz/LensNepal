import { getLocales } from 'expo-localization';
import { type Language, SUPPORTED_LANGUAGES } from './types';

const FALLBACK: Language = 'en';

function isSupported(code: string | null): code is Language {
  return code !== null && (SUPPORTED_LANGUAGES as ReadonlyArray<string>).includes(code);
}

export function detectLanguage(): Language {
  for (const locale of getLocales()) {
    if (isSupported(locale.languageCode)) {
      return locale.languageCode;
    }
  }
  return FALLBACK;
}
