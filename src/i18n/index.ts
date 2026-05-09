import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { detectLanguage } from './detect';
import commonEn from './locales/en/common.json';
import etiquetteEn from './locales/en/etiquette.json';
import tabsEn from './locales/en/tabs.json';
import commonNe from './locales/ne/common.json';
import etiquetteNe from './locales/ne/etiquette.json';
import tabsNe from './locales/ne/tabs.json';
import { NAMESPACES } from './types';

export const resources = {
  en: { common: commonEn, tabs: tabsEn, etiquette: etiquetteEn },
  ne: { common: commonNe, tabs: tabsNe, etiquette: etiquetteNe },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: 'en',
  ns: [...NAMESPACES],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export { i18n };
export { detectLanguage } from './detect';
export { SUPPORTED_LANGUAGES, NAMESPACES } from './types';
export type { Language, Namespace, Resources } from './types';
