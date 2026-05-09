import { persistOptions, queryClient } from './query-client';

const TWENTY_FOUR_HOURS_MS = 1000 * 60 * 60 * 24;

describe('queryClient defaults', () => {
  const opts = queryClient.getDefaultOptions();

  it('uses offlineFirst network mode for queries', () => {
    expect(opts.queries?.networkMode).toBe('offlineFirst');
  });

  it('uses offlineFirst network mode for mutations', () => {
    expect(opts.mutations?.networkMode).toBe('offlineFirst');
  });

  it('caps staleTime at 24h', () => {
    expect(opts.queries?.staleTime).toBe(TWENTY_FOUR_HOURS_MS);
  });

  it('caps gcTime at 24h', () => {
    expect(opts.queries?.gcTime).toBe(TWENTY_FOUR_HOURS_MS);
  });

  it("disables retries — offline-first apps shouldn't spin", () => {
    expect(opts.queries?.retry).toBe(0);
  });
});

describe('persistOptions', () => {
  it('exposes a persister', () => {
    expect(persistOptions.persister).toBeDefined();
  });

  it('caps cache age at 24h', () => {
    expect(persistOptions.maxAge).toBe(TWENTY_FOUR_HOURS_MS);
  });
});
