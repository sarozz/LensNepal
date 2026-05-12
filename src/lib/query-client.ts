import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';

const TWENTY_FOUR_HOURS_MS = 1000 * 60 * 60 * 24;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      staleTime: TWENTY_FOUR_HOURS_MS,
      gcTime: TWENTY_FOUR_HOURS_MS,
      retry: 0,
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'kathmandu-lens.query-cache',
});

export const persistOptions = {
  persister,
  maxAge: TWENTY_FOUR_HOURS_MS,
} as const;
