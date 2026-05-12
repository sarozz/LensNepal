import {
  clear,
  getBoolean,
  getString,
  remove,
  setBoolean,
  setString,
  STORAGE_KEYS,
} from './storage';

describe('storage', () => {
  beforeEach(async () => {
    await clear();
  });

  it('round-trips booleans', async () => {
    await setBoolean('hasAcknowledgedEtiquette', true);
    expect(await getBoolean('hasAcknowledgedEtiquette')).toBe(true);
    await setBoolean('hasAcknowledgedEtiquette', false);
    expect(await getBoolean('hasAcknowledgedEtiquette')).toBe(false);
  });

  it('round-trips strings', async () => {
    await setString('preferredLanguage', 'ne');
    expect(await getString('preferredLanguage')).toBe('ne');
  });

  it('returns undefined for unset keys', async () => {
    expect(await getBoolean('hasAcknowledgedEtiquette')).toBeUndefined();
    expect(await getString('preferredLanguage')).toBeUndefined();
  });

  it('removes a single key without touching others', async () => {
    await setString('preferredLanguage', 'en');
    await setString('preferredTheme', 'dark');
    await remove('preferredLanguage');
    expect(await getString('preferredLanguage')).toBeUndefined();
    expect(await getString('preferredTheme')).toBe('dark');
  });

  it('clear() empties everything', async () => {
    await setBoolean('hasAcknowledgedEtiquette', true);
    await setString('preferredLanguage', 'ne');
    await setString('preferredTheme', 'outdoorBright');
    await clear();
    expect(await getBoolean('hasAcknowledgedEtiquette')).toBeUndefined();
    expect(await getString('preferredLanguage')).toBeUndefined();
    expect(await getString('preferredTheme')).toBeUndefined();
  });

  it('exposes a key registry whose values match their keys', () => {
    for (const [name, value] of Object.entries(STORAGE_KEYS)) {
      expect(value).toBe(name);
    }
  });
});
