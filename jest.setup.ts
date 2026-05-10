import '@testing-library/react-native';

jest.mock('react-native-unistyles', () => {
  const themes = jest.requireActual('@/theme/themes');
  return {
    StyleSheet: {
      configure: jest.fn(),
      create: (input: unknown) => input,
    },
    useUnistyles: () => ({ theme: themes.lightTheme, rt: {} }),
    UnistylesRuntime: {
      setTheme: jest.fn(),
      setAdaptiveThemes: jest.fn(),
      themeName: 'light',
      hasAdaptiveThemes: true,
    },
  };
});

jest.mock('react-native-mmkv', () => {
  class FakeMMKV {
    private readonly store = new Map<string, string | number | boolean>();
    set(key: string, value: string | number | boolean): void {
      this.store.set(key, value);
    }
    getString(key: string): string | undefined {
      const v = this.store.get(key);
      return typeof v === 'string' ? v : undefined;
    }
    getNumber(key: string): number | undefined {
      const v = this.store.get(key);
      return typeof v === 'number' ? v : undefined;
    }
    getBoolean(key: string): boolean | undefined {
      const v = this.store.get(key);
      return typeof v === 'boolean' ? v : undefined;
    }
    delete(key: string): void {
      this.store.delete(key);
    }
    clearAll(): void {
      this.store.clear();
    }
    contains(key: string): boolean {
      return this.store.has(key);
    }
    getAllKeys(): string[] {
      return Array.from(this.store.keys());
    }
  }
  return { MMKV: FakeMMKV };
});
