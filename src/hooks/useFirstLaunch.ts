import { useCallback, useState } from 'react';
import { getBoolean, setBoolean } from '@/lib/storage';

export type FirstLaunchState = {
  acknowledged: boolean;
  acknowledge: () => void;
};

export function useFirstLaunch(): FirstLaunchState {
  const [acknowledged, setAcknowledged] = useState<boolean>(
    () => getBoolean('hasAcknowledgedEtiquette') ?? false,
  );

  const acknowledge = useCallback(() => {
    setBoolean('hasAcknowledgedEtiquette', true);
    setAcknowledged(true);
  }, []);

  return { acknowledged, acknowledge };
}
