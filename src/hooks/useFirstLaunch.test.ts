import { act, renderHook, waitFor } from '@testing-library/react-native';
import { clear, getBoolean, setBoolean } from '@/lib/storage';
import { useFirstLaunch } from './useFirstLaunch';

describe('useFirstLaunch', () => {
  beforeEach(async () => {
    await clear();
  });

  it('hydrates to unacknowledged when storage is empty', async () => {
    const { result } = renderHook(() => useFirstLaunch());
    await waitFor(() => {
      expect(result.current.hydrated).toBe(true);
    });
    expect(result.current.acknowledged).toBe(false);
  });

  it('hydrates to acknowledged when storage already says so', async () => {
    await setBoolean('hasAcknowledgedEtiquette', true);
    const { result } = renderHook(() => useFirstLaunch());
    await waitFor(() => {
      expect(result.current.hydrated).toBe(true);
    });
    expect(result.current.acknowledged).toBe(true);
  });

  it('acknowledge() flips state and persists', async () => {
    const { result } = renderHook(() => useFirstLaunch());
    await waitFor(() => {
      expect(result.current.hydrated).toBe(true);
    });
    await act(async () => {
      await result.current.acknowledge();
    });
    expect(result.current.acknowledged).toBe(true);
    expect(await getBoolean('hasAcknowledgedEtiquette')).toBe(true);
  });
});
