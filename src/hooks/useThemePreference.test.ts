import { act, renderHook } from '@testing-library/react-native';
import { UnistylesRuntime } from 'react-native-unistyles';
import { clear, getString, setString } from '@/lib/storage';
import { useThemePreference } from './useThemePreference';

const mocked = jest.mocked(UnistylesRuntime);

describe('useThemePreference', () => {
  beforeEach(() => {
    clear();
    mocked.setTheme.mockClear();
    mocked.setAdaptiveThemes.mockClear();
  });

  it("starts in 'system' mode when nothing is stored", () => {
    const { result } = renderHook(() => useThemePreference());
    expect(result.current.mode).toBe('system');
    expect(mocked.setAdaptiveThemes).toHaveBeenLastCalledWith(true);
    expect(mocked.setTheme).not.toHaveBeenCalled();
  });

  it('starts in the stored mode and applies it', () => {
    setString('preferredTheme', 'dark');
    const { result } = renderHook(() => useThemePreference());
    expect(result.current.mode).toBe('dark');
    expect(mocked.setAdaptiveThemes).toHaveBeenLastCalledWith(false);
    expect(mocked.setTheme).toHaveBeenLastCalledWith('dark');
  });

  it('falls back to system when stored value is not a recognised theme', () => {
    setString('preferredTheme', 'mauve' as never);
    const { result } = renderHook(() => useThemePreference());
    expect(result.current.mode).toBe('system');
  });

  it("setMode('outdoorBright') persists and disables adaptive", () => {
    const { result } = renderHook(() => useThemePreference());
    act(() => {
      result.current.setMode('outdoorBright');
    });
    expect(result.current.mode).toBe('outdoorBright');
    expect(getString('preferredTheme')).toBe('outdoorBright');
    expect(mocked.setAdaptiveThemes).toHaveBeenLastCalledWith(false);
    expect(mocked.setTheme).toHaveBeenLastCalledWith('outdoorBright');
  });

  it("setMode('system') clears the persisted key and re-enables adaptive", () => {
    setString('preferredTheme', 'dark');
    const { result } = renderHook(() => useThemePreference());
    act(() => {
      result.current.setMode('system');
    });
    expect(result.current.mode).toBe('system');
    expect(getString('preferredTheme')).toBeUndefined();
    expect(mocked.setAdaptiveThemes).toHaveBeenLastCalledWith(true);
  });
});
