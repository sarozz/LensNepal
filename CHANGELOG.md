# Changelog

All notable changes to Kathmandu Lens are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Phase 1 — Foundation (in progress)

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
