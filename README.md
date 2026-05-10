# Kathmandu Lens

A calm, offline-first companion for reading Kathmandu — temples, courtyards, objects, etiquette — without rushing and without phoning home.

The product brief is `docs/BRIEF.md`. The working agreement is `CLAUDE.md`.

## Status

Phase 1 — Foundation. Not yet feature-complete. See `CHANGELOG.md`.

## Prerequisites

- Node 22 (see `.nvmrc`)
- pnpm 9 (see `packageManager` in `package.json`)
- Xcode + iOS Simulator (macOS) or Android Studio + emulator
- (Optional) [Maestro](https://maestro.mobile.dev/) for E2E smoke flows

## Setup

```bash
nvm use
pnpm install
pnpm dev
```

The app boots cleanly with no `.env` file. Sentry and PostHog initialise to no-op stubs in that case.

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start Expo dev server |
| `pnpm ios` | Start + open iOS simulator |
| `pnpm android` | Start + open Android emulator |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | Biome lint |
| `pnpm format` | Biome format (write) |
| `pnpm test` | Jest |
| `pnpm test:coverage` | Jest with coverage |
| `pnpm test:e2e` | Maestro flows from `.maestro/` |
| `pnpm doctor` | `npx expo-doctor` |

## Environment variables

All optional. Code paths no-op when absent. Read via `expo-constants → expoConfig.extra`.

| Var | Purpose |
| --- | --- |
| `EXPO_PUBLIC_SENTRY_DSN` | Sentry init |
| `EXPO_PUBLIC_POSTHOG_API_KEY` | PostHog init |
| `EXPO_PUBLIC_POSTHOG_HOST` | PostHog host (default: `https://eu.i.posthog.com`) |

## Running the E2E smoke flow

Maestro is a separate CLI, not an npm package. Install it once on the host:

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

Then, with the app installed on a running simulator or device:

```bash
pnpm test:e2e
```

The Phase 1 flow (`.maestro/smoke.yaml`) covers the golden path: launch → first-launch etiquette gate → "I understand" → land on Explore → walk through the four tabs → re-open the etiquette modal via the `?` header button.

## Cultural posture

This app concerns living religious practice. See `docs/BRIEF.md §7` and `CLAUDE.md §3.10`. The Kumari is not depicted in app imagery. Stub `[NE]` strings indicate translation pending.

## Contributing

See `CLAUDE.md`.
