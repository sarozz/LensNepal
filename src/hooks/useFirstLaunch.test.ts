import { act, renderHook } from '@testing-library/react-native';
import { clear, getBoolean, setBoolean } from '@/lib/storage';
import { useFirstLaunch } from './useFirstLaunch';

describe('useFirstLaunch', () => {
  beforeEach(() => {
    clear();
  });

  it('starts unacknowledged when storage is empty', () => {
    const { result } = renderHook(() => useFirstLaunch());
    expect(result.current.acknowledged).toBe(false);
  });

  it('starts acknowledged when storage already says so', () => {
    setBoolean('hasAcknowledgedEtiquette', true);
    const { result } = renderHook(() => useFirstLaunch());
    expect(result.current.acknowledged).toBe(true);
  });

  it('acknowledge() flips state and persists to MMKV', () => {
    const { result } = renderHook(() => useFirstLaunch());
    expect(result.current.acknowledged).toBe(false);
    act(() => {
      result.current.acknowledge();
    });
    expect(result.current.acknowledged).toBe(true);
    expect(getBoolean('hasAcknowledgedEtiquette')).toBe(true);
  });
});
