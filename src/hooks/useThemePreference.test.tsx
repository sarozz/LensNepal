import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { clear, getString, setString } from '@/lib/storage';
import { ThemeProvider } from '@/theme';
import { useThemePreference } from './useThemePreference';

const wrap = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

describe('useThemePreference', () => {
  beforeEach(async () => {
    await clear();
  });

  it("starts in 'system' mode when nothing is stored", async () => {
    const { result } = renderHook(() => useThemePreference(), { wrapper: wrap });
    await waitFor(() => {
      expect(result.current.mode).toBe('system');
    });
  });

  it('hydrates to the stored mode', async () => {
    await setString('preferredTheme', 'dark');
    const { result } = renderHook(() => useThemePreference(), { wrapper: wrap });
    await waitFor(() => {
      expect(result.current.mode).toBe('dark');
    });
  });

  it("setMode('outdoorBright') persists and updates state", async () => {
    const { result } = renderHook(() => useThemePreference(), { wrapper: wrap });
    await act(async () => {
      await result.current.setMode('outdoorBright');
    });
    expect(result.current.mode).toBe('outdoorBright');
    expect(await getString('preferredTheme')).toBe('outdoorBright');
  });

  it("setMode('system') clears the persisted key", async () => {
    await setString('preferredTheme', 'dark');
    const { result } = renderHook(() => useThemePreference(), { wrapper: wrap });
    await waitFor(() => {
      expect(result.current.mode).toBe('dark');
    });
    await act(async () => {
      await result.current.setMode('system');
    });
    expect(result.current.mode).toBe('system');
    expect(await getString('preferredTheme')).toBeUndefined();
  });
});
