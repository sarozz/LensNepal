import type commonEn from './locales/en/common.json';
import type elementsEn from './locales/en/elements.json';
import type etiquetteEn from './locales/en/etiquette.json';
import type routesEn from './locales/en/routes.json';
import type tabsEn from './locales/en/tabs.json';

export type Language = 'en' | 'ne';

export type Namespace = 'common' | 'tabs' | 'etiquette' | 'elements' | 'routes';

export const SUPPORTED_LANGUAGES: ReadonlyArray<Language> = ['en', 'ne'];

export const NAMESPACES: ReadonlyArray<Namespace> = [
  'common',
  'tabs',
  'etiquette',
  'elements',
  'routes',
];

export type Resources = {
  common: typeof commonEn;
  tabs: typeof tabsEn;
  etiquette: typeof etiquetteEn;
  elements: typeof elementsEn;
  routes: typeof routesEn;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: Resources;
    returnNull: false;
  }
}
