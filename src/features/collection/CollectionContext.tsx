import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type ItemKind = 'element' | 'route';

export type SavedItem = {
  kind: ItemKind;
  id: string;
  savedAt: number;
};

const STORAGE_KEY = 'collection';

export type CollectionState = {
  items: ReadonlyArray<SavedItem>;
  hydrated: boolean;
  isSaved: (kind: ItemKind, id: string) => boolean;
  save: (kind: ItemKind, id: string) => Promise<void>;
  remove: (kind: ItemKind, id: string) => Promise<void>;
  clear: () => Promise<void>;
};

const CollectionContext = createContext<CollectionState | null>(null);

function isSavedItem(value: unknown): value is SavedItem {
  if (value === null || typeof value !== 'object') return false;
  const v = value as Partial<SavedItem>;
  return (
    (v.kind === 'element' || v.kind === 'route') &&
    typeof v.id === 'string' &&
    typeof v.savedAt === 'number'
  );
}

async function readItems(): Promise<SavedItem[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedItem);
  } catch {
    return [];
  }
}

async function writeItems(items: ReadonlyArray<SavedItem>): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ReadonlyArray<SavedItem>>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const loaded = await readItems();
      if (cancelled) return;
      setItems(loaded);
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const isSaved = useCallback(
    (kind: ItemKind, id: string) => items.some((i) => i.kind === kind && i.id === id),
    [items],
  );

  const save = useCallback(
    async (kind: ItemKind, id: string) => {
      const next: SavedItem[] = [
        { kind, id, savedAt: Date.now() },
        ...items.filter((i) => !(i.kind === kind && i.id === id)),
      ];
      setItems(next);
      await writeItems(next);
    },
    [items],
  );

  const remove = useCallback(
    async (kind: ItemKind, id: string) => {
      const next = items.filter((i) => !(i.kind === kind && i.id === id));
      setItems(next);
      await writeItems(next);
    },
    [items],
  );

  const clear = useCallback(async () => {
    setItems([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<CollectionState>(
    () => ({ items, hydrated, isSaved, save, remove, clear }),
    [items, hydrated, isSaved, save, remove, clear],
  );

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection(): CollectionState {
  const ctx = useContext(CollectionContext);
  if (ctx === null) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return ctx;
}
