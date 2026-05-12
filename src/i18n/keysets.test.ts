import commonEn from './locales/en/common.json';
import etiquetteEn from './locales/en/etiquette.json';
import recognitionEn from './locales/en/recognition.json';
import tabsEn from './locales/en/tabs.json';
import commonNe from './locales/ne/common.json';
import etiquetteNe from './locales/ne/etiquette.json';
import recognitionNe from './locales/ne/recognition.json';
import tabsNe from './locales/ne/tabs.json';

const namespaces = {
  common: { en: commonEn, ne: commonNe },
  tabs: { en: tabsEn, ne: tabsNe },
  etiquette: { en: etiquetteEn, ne: etiquetteNe },
  recognition: { en: recognitionEn, ne: recognitionNe },
};

function collectKeyPaths(node: unknown, prefix = ''): string[] {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) {
    return prefix === '' ? [] : [prefix];
  }
  const out: string[] = [];
  const record = node as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const path = prefix === '' ? key : `${prefix}.${key}`;
    out.push(...collectKeyPaths(record[key], path));
  }
  return out;
}

function eachLeaf(
  node: unknown,
  prefix: string,
  visit: (path: string, value: unknown) => void,
): void {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) {
    visit(prefix, node);
    return;
  }
  const record = node as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const path = prefix === '' ? key : `${prefix}.${key}`;
    eachLeaf(record[key], path, visit);
  }
}

describe('locale keysets', () => {
  describe.each(Object.entries(namespaces))('%s', (_name, pair) => {
    it('en and ne have identical key paths', () => {
      const enPaths = collectKeyPaths(pair.en).sort();
      const nePaths = collectKeyPaths(pair.ne).sort();
      expect(nePaths).toEqual(enPaths);
    });

    it('every leaf is a non-empty string', () => {
      for (const obj of [pair.en, pair.ne]) {
        eachLeaf(obj, '', (path, value) => {
          expect(typeof value).toBe('string');
          if (typeof value === 'string') {
            expect(value.trim().length).toBeGreaterThan(0);
          }
          expect(path).not.toBe('');
        });
      }
    });
  });
});
