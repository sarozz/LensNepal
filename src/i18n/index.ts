import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { detectLanguage } from './detect';
import collectionEn from './locales/en/collection.json';
import commonEn from './locales/en/common.json';
import elementsEn from './locales/en/elements.json';
import etiquetteEn from './locales/en/etiquette.json';
import routesEn from './locales/en/routes.json';
import tabsEn from './locales/en/tabs.json';
import collectionNe from './locales/ne/collection.json';
import commonNe from './locales/ne/common.json';
import elementsNe from './locales/ne/elements.json';
import etiquetteNe from './locales/ne/etiquette.json';
import routesNe from './locales/ne/routes.json';
import tabsNe from './locales/ne/tabs.json';
import { NAMESPACES } from './types';

export const resources = {
  en: {
    common: commonEn,
    tabs: tabsEn,
    etiquette: etiquetteEn,
    elements: elementsEn,
    routes: routesEn,
    collection: collectionEn,
  },
  ne: {
    common: commonNe,
    tabs: tabsNe,
    etiquette: etiquetteNe,
    elements: elementsNe,
    routes: routesNe,
    collection: collectionNe,
  },
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
