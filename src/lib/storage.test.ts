import {
  clear,
  getBoolean,
  getString,
  querySyncStorage,
  remove,
  setBoolean,
  setString,
  STORAGE_KEYS,
} from './storage';

describe('storage', () => {
  beforeEach(() => {
    clear();
  });

  it('round-trips booleans', () => {
    setBoolean('hasAcknowledgedEtiquette', true);
    expect(getBoolean('hasAcknowledgedEtiquette')).toBe(true);
    setBoolean('hasAcknowledgedEtiquette', false);
    expect(getBoolean('hasAcknowledgedEtiquette')).toBe(false);
  });

  it('round-trips strings', () => {
    setString('preferredLanguage', 'ne');
    expect(getString('preferredLanguage')).toBe('ne');
  });

  it('returns undefined for unset keys', () => {
    expect(getBoolean('hasAcknowledgedEtiquette')).toBeUndefined();
    expect(getString('preferredLanguage')).toBeUndefined();
  });

  it('removes a single key without touching others', () => {
    setString('preferredLanguage', 'en');
    setString('preferredTheme', 'dark');
    remove('preferredLanguage');
    expect(getString('preferredLanguage')).toBeUndefined();
    expect(getString('preferredTheme')).toBe('dark');
  });

  it('clear() empties everything', () => {
    setBoolean('hasAcknowledgedEtiquette', true);
    setString('preferredLanguage', 'ne');
    setString('preferredTheme', 'outdoorBright');
    clear();
    expect(getBoolean('hasAcknowledgedEtiquette')).toBeUndefined();
    expect(getString('preferredLanguage')).toBeUndefined();
    expect(getString('preferredTheme')).toBeUndefined();
  });

  it('exposes a key registry whose values match their keys', () => {
    for (const [name, value] of Object.entries(STORAGE_KEYS)) {
      expect(value).toBe(name);
    }
  });
});

describe('querySyncStorage adapter', () => {
  beforeEach(() => clear());

  it('getItem returns null for unset keys (Storage contract)', () => {
    expect(querySyncStorage.getItem('cache')).toBeNull();
  });

  it('setItem then getItem round-trips', () => {
    querySyncStorage.setItem('cache', '{"foo":1}');
    expect(querySyncStorage.getItem('cache')).toBe('{"foo":1}');
  });

  it('removeItem clears a single key', () => {
    querySyncStorage.setItem('cache', 'x');
    querySyncStorage.removeItem('cache');
    expect(querySyncStorage.getItem('cache')).toBeNull();
  });
});
