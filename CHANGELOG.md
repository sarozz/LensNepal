# Changelog

All notable changes to Kathmandu Lens are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Phase 1 — Foundation (in progress)

#### Commit (i) — docs + CI

- `.github/workflows/ci.yml` ships GitHub Actions on `ubuntu-latest`. Triggers: push to non-`main` branches + PR to `main`. Steps: checkout → pnpm 9.15 → Node 22 (with pnpm cache) → `pnpm install --frozen-lockfile` → `pnpm typecheck` → `pnpm lint` → `pnpm format:check` → `pnpm test:coverage` (which enforces the 70% threshold from commit (h)). Concurrency cancel-in-progress per branch.
- `docs/architecture.md` ships a one-page engineering pointer: module layout, provider chain (`I18nextProvider → PersistQueryClientProvider → expo-router Stack`), boot order (`StyleSheet.configure → initSentry → initAnalytics → useFirstLaunch gate`), theming, i18n posture, storage, test posture, CI, and a decisions-log pointer.
- `README.md` gains a "CI" section, an "Architecture" pointer, and a "Cultural review checklist" the PR maintainer ticks before merging cultural-copy changes (per CLAUDE §3.10).
- Out of scope and explicitly skipped: Maestro in CI (deferred until macOS-runner budget); EAS / source-maps upload (Phase 6 concern); branch protection rules (repo-admin, not committable); `expo-doctor` in CI (its remote checks fail behind sandbox / GitHub egress).
- Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test:coverage` (still 79 tests across 16 suites, 100% on `src/lib` and `src/theme`).

### Phase 1 — Definition of Done (per BRIEF §12)

| Box | Status |
|---|---|
| Four-tab shell renders with placeholder screens | ✓ commit (f) |
| Three-theme system with tokens | ✓ commit (b) |
| i18n scaffold with en + ne | ✓ commit (c) |
| Observability wiring (no-op without env vars) | ✓ commit (e) |
| Offline-first storage with 24h max-age | ✓ commit (d) |
| Cultural Etiquette primer with mandatory ack | ✓ commit (g) |
| Tests, Maestro smoke, CI | ✓ commits (h) and (i) |
| `pnpm typecheck && pnpm lint && pnpm test && npx expo-doctor` clean | ✓ (expo-doctor 16/18 — 2 sandbox-only network failures) |
| Coverage ≥ 70% on `src/lib` and `src/theme` | ✓ at 100% |
| App boots cleanly with no `.env` file | ✓ commit (e) |
| Cultural copy reviewed by native speaker | ☐ **pending** — Kumari section especially per CLAUDE §3.10 |
| `BRIEF.md` follow-up edit catalogued | ☐ **pending** — full deviation list in this file under each commit |
| Maestro smoke passes on iOS sim | ☐ **pending local run** — sandbox can't host iOS sim |

#### Commit (h) — tests + Maestro

- `.maestro/smoke.yaml` ships the golden-path E2E flow per BRIEF §11.5 / DoD §12: launch with cleared state → first-launch etiquette gate visible → tap "I understand" → walk through Explore / Routes / Collection / Guide → re-open the etiquette modal via the `?` header button. Maestro CLI is a separate binary; install instructions added to `README.md`.
- `src/i18n/orphans.test.ts` delivers the deferred half of CLAUDE §4.6 ("test fails if any orphan keys are unused"). Static regex over `src/` + `app/` that:
  - walks each file's `useTranslation()` declarations to map `t`-aliases to candidate namespaces (keeping a list per alias to handle multi-namespace files like `app/(tabs)/_layout.tsx`),
  - extracts every static `t('key')` / `t("key")` / `t(\`key\`)` call,
  - skips template literals containing `${}` (handled by the explicit DYNAMIC_KEY_ALLOWLIST),
  - hard-fails on both true orphans and undefined refs.
- A `RESERVED_ORPHANS` allowlist holds the action-verb keys seeded in commit (c) that don't have callsites yet (`ok`, `cancel`, `retry`, `dismiss`, `loading`, `error.{generic,offline,tryAgain}`). Each entry should graduate out of the list when a real caller appears. A second test guards that the allowlist itself doesn't go stale (every entry still defined in `en/*.json`).
- `jest.config.js` gains `coverageThreshold` of 70 % stmts/branches/funcs/lines on `src/lib` and `src/theme`. We're at 100 % so the threshold is a floor against future regression, not a stretch.
- `README.md` adds a "Running the E2E smoke flow" subsection.
- New devDep: `@types/node@^22.0.0` so the orphan test can use `node:fs` / `node:path` (peer-dep style — added with the same handling as `@types/jest`/`@babel/core`).
- Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` (79 tests across 16 suites), `pnpm test:coverage` (still 100 % on tracked dirs).

#### Commit (g) — etiquette primer

- Five-section primer per BRIEF §3.5: photography, footwear, silence, sacred objects, the Kumari clause. English copy authored to BRIEF §6 tone (present tense, observational, ≤80 words per body, no "must/should/do not"). **Cultural review still pending — especially the Kumari section per CLAUDE §3.10.**
- `src/hooks/useFirstLaunch.ts` reads `hasAcknowledgedEtiquette` from MMKV and exposes `acknowledge()` to flip it. Synchronous initial state from MMKV — no async hydration glitch.
- Storage key renamed `hasSeenEtiquette` → `hasAcknowledgedEtiquette` to match BRIEF §3.5. No data migration needed (no production data yet).
- Mandatory first-launch gate: `app/_layout.tsx` sets `Stack` `initialRouteName="etiquette"` when not yet acknowledged, and `gestureEnabled: acknowledged` so the modal can't be swiped past on first launch.
- Once "I understand" is tapped, `acknowledge()` writes MMKV and `router.replace('/(tabs)/explore')` lands the user on the tab shell.
- `?` button added as `headerRight` on the tabs layout per BRIEF §4 — pushes `/etiquette` from any tab. Accessibility label `"Open cultural etiquette guide"` ships in `common.openEtiquette`. The visible `?` glyph itself goes through i18n (`common.helpGlyph`) per CLAUDE §3.5 (no hardcoded user-visible strings, exception list empty).
- New presentational component `src/components/etiquette/EtiquetteSection` with hairline divider — matches "hairlines, not boxes" principle (§5.1).
- All `ne` strings ship as `[NE]`-prefixed stubs flagged translation-pending. Keysets stay aligned (`keysets.test.ts` enforces this on every commit).
- Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` (76 tests across 15 suites), `pnpm test:coverage` (100% on `src/lib` and `src/theme`).

#### Commit (e) — observability

- `src/lib/env.ts` exposes `readEnv()` which reads `Constants.expoConfig?.extra` and returns a typed `Env` shape. Empty/whitespace strings collapse to `undefined`; `posthogHost` falls back to the EU cloud per BRIEF §9.5. The function is fully defensive against non-string extra values.
- `src/lib/sentry.ts` ships `initSentry(): boolean`. No-ops and returns `false` when DSN is absent or empty (CLAUDE §3.9). With a DSN, calls `Sentry.init({ sendDefaultPii: false, tracesSampleRate: 0, enableAutoSessionTracking: true })` — privacy posture per BRIEF §7. Idempotent.
- `src/lib/analytics.ts` ships `initAnalytics(): boolean`. No-ops when API key is absent. Otherwise constructs `new PostHog(apiKey, { host, personProfiles: 'identified_only', disableSurveys: true })` per BRIEF §7. Idempotent.
- `app/_layout.tsx` calls `initSentry()` and `initAnalytics()` at module top — both no-op when env is empty so dev with no `.env` boots cleanly.
- `app.config.ts` already forwards `EXPO_PUBLIC_*` env vars through `extra` (commit (a)). Runtime code never touches `process.env`.
- 100 % statement coverage on all five `src/lib` files. 70 tests across 13 suites.
- Out of scope, intentionally: `captureException`/`track`/`screen` helpers, source-maps upload, error boundary integration. None has callers in Phase 1.

#### Commit (d) — storage + query

- `src/lib/mmkv.ts` exposes a single MMKV instance (`id: 'kathmandu-lens'`) per Q2-A — query cache, app settings, and feature data all share one bucket. Phase 1 volume is small enough that the simpler model wins.
- `src/lib/storage.ts` ships a typed key registry (`hasSeenEtiquette`, `preferredLanguage`, `preferredTheme`) plus `get/set/remove/clear` helpers narrowed to known keys. Adds `querySyncStorage`, the `Storage` adapter the persister consumes (sync `getItem`/`setItem`/`removeItem`).
- `src/lib/query-client.ts` configures the `QueryClient` with `networkMode: 'offlineFirst'`, `staleTime: 24h`, `gcTime: 24h`, `retry: 0`, and exports a ready-to-use `persistOptions` (`{ persister, maxAge: 24h }`) for `<PersistQueryClientProvider>`. The persister is the canonical `createSyncStoragePersister` from `@tanstack/query-sync-storage-persister` (Q1-A; new dep with prior approval).
- `app/_layout.tsx` now wraps the router stack in `<PersistQueryClientProvider>` between the i18n provider and the navigator.
- `jest.setup.ts` adds an in-memory `MMKV` mock so `src/lib` tests run in jsdom; storage round-trips and query-client defaults are verified end-to-end.
- Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` (56/56 across 10 suites), `pnpm test:coverage` (100% on both `src/lib` and `src/theme`).
- Out of scope, intentionally: language and theme persistence — keys are pre-declared but no callsite reads/writes them yet. Lands when the toggle UIs do. No `useQuery` callers either; Phase 1 has no remote data.

#### Commit (f) — app shell + tabs (pulled forward)

- Pulled forward of (d) and (e) at the user's request so the dev server has something visible to render. New phase order: `(a)→(b)→(c)→(f)→(d)→(e)→(g)→(h)→(i)`. Storage and observability slot in afterwards and hot-reload into the live app.
- Four-tab shell via `expo-router`: explore, routes, collection, guide. Tab labels resolved through `useTranslation('tabs')`; tab bar tinted by the active theme.
- Root `_layout.tsx` mounts `<I18nextProvider>`, triggers `StyleSheet.configure` via `import '@/theme'`, calls `useAppFonts()`, hides the splash screen once fonts resolve (or error).
- Modal `etiquette.tsx` route ships as a placeholder rendering `t('common:placeholder')` + dismiss button. Real cultural copy lands in commit (g).
- `+not-found.tsx` 404 with a back-to-root link.
- Primitives — `Text`, `Surface`, `Stack`, `Pressable` — landed in `src/components/primitives/`. `Text` automatically picks Latin vs Devanagari sizing based on current language. Each primitive has a unit test.
- `useTheme()` hook in `src/hooks/` wraps `useUnistyles().theme` and returns the typed `AppTheme`.
- Three new keys in `common` namespace (en + ne, `[NE]`-prefixed): `placeholder`, `notFound`, `backToStart`. Translation pending.
- New devDep: `@expo/ngrok` (with explicit user approval per CLAUDE §3.2) so `expo start --tunnel` works without a runtime prompt.
- `jest.setup.ts` now mocks `react-native-unistyles` so primitives render in jsdom without the native bridge — returns the `lightTheme` from the actual themes module.
- Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` (40 tests across 8 suites).

#### Commit (c) — i18n

- `i18next` + `react-i18next` initialised in `src/i18n/index.ts` with three namespaces (`common`, `tabs`, `etiquette`) for English and Nepali. Resources bundled directly (no lazy loading; six small JSONs).
- `detectLanguage()` reads `expo-localization.getLocales()`, returns the first supported locale code, falls back to English. Pure function, six unit tests.
- Keyset-divergence guard (`src/i18n/keysets.test.ts`): walks both languages across all three namespaces; fails on any missing key path or empty/whitespace value. Satisfies the "en and ne keysets diverge" half of CLAUDE §4.6.
- `i18next` `CustomTypeOptions` augmented in `src/i18n/types.ts` so `t('common.ok')`-style calls are type-checked.
- **Translation pending (per CLAUDE §3.10):** every `ne` value is a `[NE] <english>` placeholder. These need a native-speaker review before cultural copy lands. Flagged here so the changelog acts as the queue. Empty `etiquette` namespace will be populated in commit (g).
- **Deferred:** the "orphan keys unused" half of CLAUDE §4.6 needs source-tree introspection; staged for commit (h) "tests + Maestro" alongside the rest of the test infra.
- **Choices recorded for the brief follow-up (per CLAUDE §3.4):** Q1-A English fallback when device locale is neither `en` nor `ne`; Q2-A empty `etiquette` namespace until commit (g); Q3-A i18next type augmentation enabled; Q4-A no language-choice persistence until MMKV lands in commit (d).
- Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` (27 tests across 4 suites), `pnpm test:coverage` (still 100 % on `src/theme`; coverage target unchanged).

#### Commit (b) — theme + fonts

- Three Unistyles themes (`light`, `dark`, `outdoorBright`) wired via `StyleSheet.configure`. Tokens split into `tokens/{colors,typography,motion,spacing,elevation}.ts` per BRIEF §9.1.
- `useAppFonts` hook scaffolded over `expo-font.useFonts` with an empty map; binaries land later (see `src/assets/fonts/README.md`). App falls back to system fonts in the meantime — no runtime errors.
- Token-tree walker test (`src/theme/themes.test.ts`) iterates every required colour, elevation level, typography token, plus spacing/radius/fontFamily/motion across all three themes. 100 % coverage on `src/theme` (Phase 1 target ≥ 70 %).
- `babel.config.js` already on `react-native-worklets/plugin`; no further babel changes.
- `jest.setup.ts` switched to `import '@testing-library/react-native'` (RNTL v13 self-extends `expect` on import). Custom `transformIgnorePatterns` removed from `jest.config.js` — the `jest-expo` preset already handles pnpm's `.pnpm/` indirection correctly.
- Choices recorded (Q1–Q4 in chat): full font roster (Fraunces, Inter, Mukta, Tiro Devanagari Hindi, Noto Sans Devanagari); 4 dp spacing scale; `xs:4 / sm:8 / md:12 / lg:16 / pill:9999` radii; phone-only breakpoint `{ xs: 0 }`.
- Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test`, `pnpm test:coverage` all green.

#### Commit (a) — bootstrap + tooling

- pnpm + Expo SDK 55 (New Architecture default) + TypeScript strict + Biome + lefthook + Jest scaffolding.
- App boots with no `.env` — Sentry/PostHog code paths add in commit (e); env reads no-op when absent.
- Verifications: `pnpm typecheck` clean, `pnpm lint` clean, `pnpm format:check` clean, `pnpm test --passWithNoTests` clean, `npx expo-doctor` 16/18 (the 2 failures are sandbox network unreachability of `exp.host` and `reactnative.directory`, not project issues).

##### Deviations from BRIEF §9.2 (need brief follow-up edit per CLAUDE §3.4)

The brief's version pins were authored against Expo SDK 54 and have drifted from the npm registry. With explicit user approval to bump to SDK 55 (latest stable as of 2026-05-07):

- All `expo-*` packages aligned to `~55.x.x` (brief pinned several to incorrect versions like `expo-splash-screen@^30.0.0`, which doesn't exist).
- `expo-router`: `^4` → `~55.0.14`.
- `jest-expo`: `^54` → `~55.0.0`.
- `react`: pinned at `19.2.6` to satisfy peer dep alignment (RN 0.81.6 wants `^19.1.4`, jest-expo 55 brings `react-test-renderer@19.2.0` which wants `^19.2.0`).
- `@types/react`: `~19.2.0` (matches react).
- `@testing-library/react-native`: `^12` → `^13.3.3` (v12 was deprecated upstream).
- `@testing-library/jest-native`: **dropped** (deprecated upstream; matchers now built into RNTL — imported via `@testing-library/react-native/extend-expect`).

##### Mechanically-required peer deps added (with explicit user approval per CLAUDE §3.2)

- `@babel/core` — required by `babel-preset-expo`.
- `@types/react` — required for any TS+React project.
- `@types/jest` — required by jest+TS.
- `react-test-renderer` — required by jest-expo / RNTL.
- `react-native-worklets@^0.8.3` — required peer of `react-native-reanimated@4` (surfaced by expo-doctor).

##### Other notes

- `newArchEnabled: true` is **not** a valid `ExpoConfig` field in SDK 55; New Architecture is the default. Removed from `app.config.ts`.
- `babel.config.js` uses `react-native-worklets/plugin` (the reanimated v4 path), not the legacy `react-native-reanimated/plugin`.
- `.nvmrc` set to Node 22 as the recommended default; pinned exactly when SDK 55 final patch is selected.
- `LICENSE` deferred per Phase 1 blocker — to be added when the project licence is chosen.
