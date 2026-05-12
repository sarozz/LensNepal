import { useCallback, useEffect, useState } from 'react';
import { getBoolean, setBoolean } from '@/lib/storage';

export type FirstLaunchState = {
  acknowledged: boolean;
  hydrated: boolean;
  acknowledge: () => Promise<void>;
};

export function useFirstLaunch(): FirstLaunchState {
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getBoolean('hasAcknowledgedEtiquette');
      if (cancelled) return;
      setAcknowledged(stored ?? false);
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const acknowledge = useCallback(async () => {
    await setBoolean('hasAcknowledgedEtiquette', true);
    setAcknowledged(true);
  }, []);

  return { acknowledged, hydrated, acknowledge };
}
