# Architecture

A short engineering pointer for Phase 1 Kathmandu Lens. The product brief is `docs/BRIEF.md`; the working agreement is `CLAUDE.md`. This document describes how the parts fit together — not what they should do (that's the brief).

## Module layout

The folder structure in BRIEF §9.1 is the source of truth. A condensed view:

```
.
├── app/                  # expo-router routes
│   ├── _layout.tsx       # root: providers, splash, first-launch gate
│   ├── (tabs)/           # tab group: explore / routes / collection / guide
│   ├── etiquette.tsx     # modal route: cultural primer
│   └── +not-found.tsx
├── src/
│   ├── components/
│   │   ├── primitives/   # Text, Surface, Stack, Pressable
│   │   └── etiquette/    # EtiquetteSection
│   ├── hooks/            # useAppFonts, useTheme, useFirstLaunch
│   ├── i18n/             # i18next + en/ne resources
│   ├── lib/              # mmkv, storage, query-client, env, sentry, analytics
│   └── theme/            # tokens + three themes (light/dark/outdoorBright)
├── docs/                 # BRIEF.md, architecture.md
└── .maestro/             # smoke.yaml
```

Empty stubs (`features/badges`, `features/journal`) are reserved for later phases per BRIEF §9.1; later-phase folders (`features/recognition`, `features/ar`, `features/ai-guide`) are intentionally absent until their phase.

## Provider chain

`app/_layout.tsx` mounts top-down:

```
<I18nextProvider>
  <PersistQueryClientProvider>
    <Stack>          ← expo-router navigator
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="etiquette" presentation="modal" />
      <Stack.Screen name="+not-found" />
    </Stack>
  </PersistQueryClientProvider>
</I18nextProvider>
```

Three side-effects fire above the tree at module load: `import '@/theme'` triggers `StyleSheet.configure({ themes, breakpoints, settings })` once; `initSentry()` and `initAnalytics()` no-op when their `EXPO_PUBLIC_*` env var is absent (BRIEF §9.5, CLAUDE §3.9).

## Boot order

1. Bundle loads. Module-level side effects fire: `StyleSheet.configure`, `initSentry`, `initAnalytics`, `SplashScreen.preventAutoHideAsync`.
2. `RootLayout` mounts. `useAppFonts()` runs; with no font binaries yet, resolves immediately.
3. `useFirstLaunch()` reads `hasAcknowledgedEtiquette` from MMKV (sync). The result is fed into the `Stack`'s `initialRouteName` and the etiquette `Stack.Screen`'s `gestureEnabled`.
4. Splash hides once fonts resolve (or error).
5. First-launch users land on the etiquette modal with no swipe-down dismiss; "I understand" persists the ack and `router.replace`s to `/(tabs)/explore`.
6. Returning users land on the tabs directly; the `?` header button still opens the modal at any time.

## Theming

Three themes — `light`, `dark`, `outdoorBright` — share an `AppTheme` shape. Tokens are split into `colors`, `typography`, `motion`, `spacing`, `elevation`. Light/dark use shadow elevation; `outdoorBright` uses a hairline + tone-shift descriptor (BRIEF §5.5). `useTheme()` wraps `useUnistyles()` and returns the typed theme; primitives consume it.

## i18n

Three namespaces — `common`, `tabs`, `etiquette`. Type augmentation on `i18next.CustomTypeOptions` types every `t()` call. Two guard tests:

- `keysets.test.ts` — fails if `en` and `ne` diverge.
- `orphans.test.ts` — fails if any defined key is unreferenced or any reference is undefined. Dynamic prefixes (template-literal calls) and intentional pre-seeded keys live in named allowlists at the top of the test.

## Storage and query

A single MMKV instance (`id: 'kathmandu-lens'`) backs both app settings and the React Query cache. The query client uses `networkMode: 'offlineFirst'` with `staleTime: 24h`, `gcTime: 24h`, `retry: 0`; the persister caps cache age at 24h. No `useQuery` callsites exist in Phase 1 — the plumbing is present per BRIEF §11.5 but unexercised.

## Test posture

- Jest + RNTL on every public function in `src/lib` and across the theme tree.
- Coverage threshold: 70 % stmts/branches/funcs/lines on `src/lib` and `src/theme` (CLAUDE §4.6, BRIEF §11.5). Phase 1 is at 100 %.
- The unistyles native bridge is mocked in `jest.setup.ts` so primitives render in jsdom.
- `react-native-mmkv` is mocked there too, with an in-memory shim.
- Maestro smoke flow at `.maestro/smoke.yaml` covers the gate + tabs + re-open via `?`. Local-only for now; CI runs on `ubuntu-latest` and skips Maestro until macOS-runner budget is approved.

## CI

`.github/workflows/ci.yml` runs on every push to non-`main` branches and every PR targeting `main`. One job on `ubuntu-latest`:

1. checkout
2. pnpm 9.15.0 + Node from `.nvmrc` with pnpm cache
3. `pnpm install --frozen-lockfile`
4. `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test:coverage` (which enforces the threshold)

Concurrency is per-branch with cancel-in-progress.

## Decisions log

Every per-commit deviation, dependency adjustment, and follow-up item is catalogued in `CHANGELOG.md`. The brief is the single source of truth for product/visual intent; this document only describes how the code is organised.
