import { renderHook } from '@testing-library/react-native';

jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true, null]),
}));

import { useFonts } from 'expo-font';
import { useAppFonts } from './useAppFonts';

const mockedUseFonts = jest.mocked(useFonts);

describe('useAppFonts', () => {
  beforeEach(() => {
    mockedUseFonts.mockReset();
    mockedUseFonts.mockReturnValue([true, null]);
  });

  it('returns loaded:true with no error when fonts resolve', () => {
    const { result } = renderHook(() => useAppFonts());
    expect(result.current.loaded).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('passes the configured map to expo-font', () => {
    renderHook(() => useAppFonts());
    expect(mockedUseFonts).toHaveBeenCalledTimes(1);
    expect(mockedUseFonts.mock.calls[0]?.[0]).toEqual(expect.any(Object));
  });

  it('surfaces the error when expo-font reports failure', () => {
    const failure = new Error('font load failed');
    mockedUseFonts.mockReturnValueOnce([false, failure]);
    const { result } = renderHook(() => useAppFonts());
    expect(result.current.loaded).toBe(false);
    expect(result.current.error).toEqual(failure);
  });
});
