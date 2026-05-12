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

## Custom development client (EAS Build)

Phase 2 features (camera, on-device CV) need native modules that don't ship inside Expo Go. Build a custom dev client once, then `pnpm dev` connects to it just like Expo Go.

```bash
# Once per machine:
npm install -g eas-cli
eas login                # create a free Expo account at expo.dev if needed

# Inside the project:
cd ~/Desktop/lensnepal
pnpm install
eas init                 # links project to your Expo account (first time only)
eas build --profile development --platform ios   # ~10-15 min, cloud build
```

When the build finishes you'll get a link/QR. Open it on your phone to install **Kathmandu Lens (dev)**. From then on, run `pnpm dev` locally and scan the QR with the dev client (not Expo Go).

Android: swap `--platform ios` for `--platform android`. The simulator build (`"simulator": true` in `eas.json`) lets you run on iOS Simulator without code-signing.

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

### Cultural review checklist (PR maintainer)

Before merging any PR that touches `src/i18n/locales/**/etiquette.json` or any other cultural copy:

- [ ] A native Nepali speaker has read every changed `en` body string.
- [ ] The Kumari section, if changed, has been re-reviewed under that lens.
- [ ] `[NE]`-prefixed Nepali stubs have been replaced with real translations, OR the PR description explicitly defers the translation pass.
- [ ] No changed string introduces "must / should / do not" tone, per BRIEF §6.

## CI

`.github/workflows/ci.yml` runs on every push to non-`main` branches and every PR to `main`. The single job runs `pnpm install` + `typecheck` + `lint` + `format:check` + `test:coverage` on `ubuntu-latest`. Coverage threshold is 70 % stmts/branches/funcs/lines on `src/lib` and `src/theme`.

Maestro is intentionally not run in CI for Phase 1 — it's local-only via `pnpm test:e2e` until there's budget for `macos-latest` runners.

## Architecture

`docs/architecture.md` is a one-page pointer covering provider chain, boot order, theming, i18n posture, and storage. Read the brief first; this is the engineering supplement.

## Contributing

See `CLAUDE.md`.
