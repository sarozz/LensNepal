import type commonEn from './locales/en/common.json';
import type etiquetteEn from './locales/en/etiquette.json';
import type tabsEn from './locales/en/tabs.json';

export type Language = 'en' | 'ne';

export type Namespace = 'common' | 'tabs' | 'etiquette';

export const SUPPORTED_LANGUAGES: ReadonlyArray<Language> = ['en', 'ne'];

export const NAMESPACES: ReadonlyArray<Namespace> = ['common', 'tabs', 'etiquette'];

export type Resources = {
  common: typeof commonEn;
  tabs: typeof tabsEn;
  etiquette: typeof etiquetteEn;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: Resources;
    returnNull: false;
  }
}
