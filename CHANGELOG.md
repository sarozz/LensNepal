# Changelog

All notable changes to Kathmandu Lens are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Phase 1 — Foundation (in progress)

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
