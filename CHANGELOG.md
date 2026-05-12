# Changelog

All notable changes to Kathmandu Lens are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Phase 2 — Browse the valley's elements (in progress)

#### Commit (q) — Routes browse: three curated walks

Same pattern as the elements browse from commit (p). Routes tab moves from placeholder to real content. No native map, no GPS — text content only, Expo Go-compatible.

**New**
- `src/features/routes/dataset.ts` — three route IDs (`patanDawn`, `boudhaKora`, `swayambhuClimb`) typed as a non-empty readonly tuple. Each has a `distanceKm` and `walkingMinutes`.
- `src/features/routes/index.ts` — barrel.
- `src/i18n/locales/{en,ne}/routes.json` — `browse.*` header text, `meta.distance` / `meta.duration` interpolated strings, `sections.whenToGo` / `sections.tips`, and per-route `title` / `oneLine` / `description` / `whenToGo` / `tips`. All five sections per route at ≤ 80 words, present-tense, observational per BRIEF §6.
- `app/route/[id].tsx` — push-route detail page mirroring `app/element/[id].tsx`.

**Modified**
- `app/(tabs)/routes.tsx` — placeholder replaced with a browse view: header text, three RouteCard rows (title + one-line + distance · duration). Tap → push to `/route/[id]`.
- `app/_layout.tsx` — registered `route/[id]` Stack.Screen with the brief's slide-from-right + 240 ms motion.
- `src/i18n/types.ts` + `src/i18n/index.ts` — added `routes` namespace.
- `src/i18n/keysets.test.ts` — walks the new namespace.
- `src/i18n/orphans.test.ts` — added the 15 dynamic-key entries (`routes:routes.<id>.{title,oneLine,description,whenToGo,tips}`).

**Out of scope**
- Live map / GPS / turn-by-turn — `react-native-maps` is a native module, needs an EAS dev client. Routes are text-only for now.
- Cross-linking route stops to element pages — possible later; not in MVP.
- Real images of the routes — content drop.

**Brief alignment**
BRIEF §3.3 "Walk" partially honored: offline route descriptions, advice on timing, no internet required. The map / route-finding pieces (which the brief implies) are explicitly deferred until a dev client exists.

**Verifications** — `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` all green. 92 tests across 19 suites.

#### Commit (p) — Phase 2 redo: pure browse, no fake recognition

The previous Phase 2 (commit (o)) shipped a camera + stub-recognition flow. User feedback was direct and correct: "phase two has been the worst feature." Tapping a shutter and getting a random one of five elements is worse than no recognition — the output can't be trusted, the affordance is broken. This commit replaces it with the honest play given the Expo Go constraint: **browse the dataset deliberately.**

**Removed**
- `expo-camera` — no camera in this iteration.
- `src/features/recognition/recogniser.ts` — the stub is gone, not deferred.
- `app/recognition/[id].tsx` — replaced.

**Renamed**
- `src/features/recognition/` → `src/features/elements/`. The folder was never about CV anyway; it always held the curated dataset.
- `app/recognition/[id].tsx` → `app/element/[id].tsx`. Detail page is now a regular push route, not a modal — browse-then-read reads more like a slide-from-right than a slide-from-bottom.
- i18n namespace `recognition` → `elements`. Camera-specific keys (`permission.*`, `shutter`, `thinking`, `lowConfidence`) deleted; only `browse.*`, `sources.*`, and `elements.*` remain.

**Modified**
- `app/(tabs)/explore.tsx` — now a browse view. Header text ("Five things to look for" + intro), then a scrollable column of five `ElementCard`s (1 dp border, no shadow, no random surprises). Tap → push to `/element/[id]`.
- `app/element/[id].tsx` — same content as before (title, oneLine, context, source) but presented as a regular pushed screen. No "Best guess" label, no `×` close button — back navigation handles dismissal naturally.
- `app/_layout.tsx` — registered `element/[id]` with slide_from_right + 240 ms (the brief's `duration.standard`). The recognition modal entry is gone.

**Why this is better than (o)**
- The user can see all five elements at once. No reliance on random sampling.
- Tap is deterministic: tap "Boudha Stupa" → you read about Boudha Stupa. No fake confidence score, no surprise output.
- The path back is the back swipe / hardware back, which is the standard browse gesture.
- The dataset + context pages are real value that survive any future flip back to real CV. When/if EAS dev client happens, a camera flow can layer on top — but the browse stays.

**Brief follow-up**
BRIEF §3.1 ("Recognise") is now partially honored: the dataset is offline-first, the context appears, the photo never leaves the device (because there's no photo). The "on-device CV identifies it" part is **explicitly deferred** until an EAS dev client is in play. The brief should be amended to call out Browse as the Phase 2 Expo Go scope, with Recognise as Phase 2.5 once a custom dev build exists.

**Verifications** — `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` all green. 90 tests across 19 suites.

#### Commit (o) — camera flow + stubbed recognition (Expo Go-compatible)

User declined the EAS dev-client path. Phase 2's recognise feature ships with the real camera (`expo-camera`, bundled with Expo SDK 54, runs inside Expo Go) and a stubbed recognition function that returns a random element from a 5-strong dataset after a 600 ms "thinking" delay. Real on-device CV waits until/if an EAS dev client is set up — only `recogniser.ts` needs to be swapped.

**Reverts commit (n)** — removed `expo-dev-client` and `eas.json` plus the README section. Cleaner repo since the EAS path is shelved.

**Added**
- `expo-camera@~17.0.10` — SDK 54-bundled camera, runs in Expo Go.

**New files**
- `src/features/recognition/dataset.ts` — 5 element IDs (`boudha`, `pashupatinath`, `swayambhu`, `lionGate`, `lotusMotif`) typed as a non-empty readonly tuple. Source URLs (Wikipedia) attached per BRIEF §6 ("every cultural/historical claim has a source"). Sources expander UI is Phase 4 — we just store the URL.
- `src/features/recognition/recogniser.ts` — `recognise(photoUri): Promise<Match>` stub. Picks a random element, returns it after 600 ms. The future on-device CV swap is a single-function change.
- `src/features/recognition/index.ts` — barrel.
- `src/i18n/locales/{en,ne}/recognition.json` — new namespace with permission UI strings + 5 element entries (title, oneLine, context — body paragraphs ≤ 80 words, present tense, observational per BRIEF §6). All Nepali strings `[NE]`-prefixed pending native review.
- `app/recognition/[id].tsx` — modal route showing the matched element title + oneLine + context + source. Close button top-right.

**Modified**
- `app/(tabs)/explore.tsx` — now the camera screen. Uses `useCameraPermissions()` for the permission flow, shows a permission-prompt screen with the outlined `Button` when needed, otherwise renders `CameraView` with a circular shutter overlay. Tap → `takePictureAsync` → `recognise(uri)` → `router.push('/recognition/[id]')`.
- `app/_layout.tsx` — registered `recognition/[id]` as a modal Stack.Screen with the brief's 360 ms slide-from-bottom motion.
- `src/i18n/types.ts` + `src/i18n/index.ts` — added `recognition` to the namespace list, types, and resources.
- `src/i18n/keysets.test.ts` — walks the new namespace too.
- `src/i18n/orphans.test.ts` — added 15 dynamic-key entries (`recognition:elements.<id>.{title,oneLine,context}`) plus `recognition:sources.wikipedia` to the DYNAMIC_KEY_ALLOWLIST.
- `app.config.ts` — `experiments.typedRoutes: false`. Re-enable when Metro can regenerate the types file.
- Deleted `.expo/types/router.d.ts` — stale; will regenerate on next `pnpm dev`.

**Deviations from the brief (called out)**
- BRIEF §3.1 says "On-device CV identifies it." We ship a stub instead. Cultural / privacy posture preserved — photos never leave the device.
- BRIEF §9.2 lists `react-native-vision-camera` and `react-native-executorch` as Phase 2+ deps. Neither installed; replaced with `expo-camera` + stub.

**Verifications**
`pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` — 90 tests across 19 suites all green. New `recognition` namespace keysets identical between en and ne; orphan-key test clean.

#### Commit (n) — set up EAS dev client for Phase 2 native modules

Phase 2's core feature (on-device CV via vision-camera + ML runtime) cannot run inside off-the-shelf Expo Go. This commit prepares the repo so a custom dev client can be built once on EAS and used for the rest of the project.

- Added `expo-dev-client@~6.0.21` to dependencies — the runtime your custom dev client wraps.
- Added `eas.json` with three profiles: `development` (sim-friendly, includes dev client), `preview` (internal distribution), `production` (autoIncrement, channel: production).
- `README.md` gained a "Custom development client (EAS Build)" section with the four commands the user runs once per machine: `npm i -g eas-cli`, `eas login`, `eas init`, `eas build --profile development --platform ios`.

Native modules that need a dev client (`react-native-vision-camera`, on-device ML, plus optionally re-adding `react-native-unistyles@3` / `react-native-mmkv@3`) ship in subsequent commits once the dev client is verified on-device.

Verifications: `pnpm install` clean (one harmless peer warning, unchanged), `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` — 88 tests across 19 suites still green.

### Phase 1 — Foundation

#### Commit (m) — drop native-module deps so Expo Go can run the app

User's Expo Go binary cannot load libraries that ship custom native code (NitroModules, TurboModules). The brief's chosen stack — `react-native-unistyles@3` (Nitro) + `react-native-mmkv@3` (Turbo) — is correct for a production build with a custom dev client, but cannot run inside off-the-shelf Expo Go. This commit replaces both with Expo Go-compatible alternatives so live preview works today without an EAS build.

**Removed**
- `react-native-unistyles` (used NitroModules).
- `react-native-mmkv` (used TurboModules + new arch).
- `@tanstack/query-sync-storage-persister` (paired with MMKV's sync API).

**Added**
- `@react-native-async-storage/async-storage@2.2.0` — bundled with Expo SDK 54, runs inside Expo Go.
- `@tanstack/query-async-storage-persister@^5` — matches the new async storage.

**New file**
- `src/theme/ThemeContext.tsx` — a pure React-Context theme provider. Listens to `Appearance` for system mode, holds the active `ThemeMode`, dispatches mode changes. ~80 lines, no native code.

**Refactored**
- `src/theme/index.ts` no longer triggers `StyleSheet.configure` as a side effect. Now just exports `ThemeProvider`, `useThemeContext`, and the theme objects.
- `src/hooks/useTheme.ts` reads from `ThemeContext` instead of `useUnistyles()`.
- `src/hooks/useThemePreference.ts` is now async (`setMode` returns Promise) and dispatches into the theme context. Reads `preferredTheme` from AsyncStorage at mount, persists changes back.
- `src/hooks/useFirstLaunch.ts` is async; exposes a `hydrated` flag so the root layout can wait one tick before choosing the initial route. `acknowledge()` is now async.
- `src/lib/storage.ts` — every public function returns a Promise. Internally calls AsyncStorage.
- `src/lib/query-client.ts` swaps in `createAsyncStoragePersister`.
- `src/lib/mmkv.ts` — deleted.
- `app/_layout.tsx` waits on both `loaded` (fonts) AND `hydrated` (etiquette ack) before deciding `initialRouteName`. Mounts `<ThemeProvider>` between `SafeAreaProvider` and `I18nextProvider`.
- `app/etiquette.tsx` — `handleAcknowledge` awaits the (now async) `acknowledge()` before navigating.
- `jest.setup.ts` — dropped the unistyles + MMKV mocks. Added the official AsyncStorage jest mock.

**Tests**
- `src/test-utils.tsx` — new `TestWrapper` that wraps children in `I18nextProvider` + `ThemeProvider`, used by every primitive and component test.
- All primitive tests updated to use `TestWrapper`.
- `useFirstLaunch.test.ts`, `useThemePreference.test.tsx`, `ThemeSwitcher.test.tsx`, `storage.test.ts` rewritten for async API + `waitFor`.

**Brief follow-up**
BRIEF §9.2's stack named `react-native-unistyles@^3` and `react-native-mmkv@^3`. The realistic options going forward:
1. Keep the current Expo Go-compatible stack (Context + AsyncStorage) and amend the brief.
2. Reintroduce `unistyles@3` + `mmkv@3` once an EAS dev client is set up — the architecture cleanly accepts either backend, only `useTheme.ts`, `useThemePreference.ts`, `storage.ts` need to flip.

Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` — **88 tests across 19 suites**, all green.

#### Commit (l) — SDK 55 → SDK 54 rollback

User has Expo Go pinned to SDK 54 and explicitly requested the project be downgraded to match. **This reverses commit (a)'s SDK 55 bump.** All Phase 1 features (etiquette, theme switcher, primitives, tests) remain unchanged — only version pins shift.

The brief's original SDK 54 pin table (BRIEF §9.2) had inaccurate versions — `expo-router@^4`, `expo-image@^2`, `expo-splash-screen@^30` etc. didn't exist on npm in those forms. Used the canonical `bundledNativeModules.json` from `expo@54.0.34` to pin every package correctly:

| Package | SDK 55 → SDK 54 |
|---|---|
| `expo` | `~55.0.23` → `~54.0.34` |
| `expo-router` | `~55.0.14` → **`~6.0.23`** (brief said `^4` — that pin was wildly wrong) |
| `expo-font` | `~55.0.0` → `~14.0.11` |
| `expo-localization` | `~55.0.0` → `~17.0.8` |
| `expo-haptics` | `~55.0.0` → `~15.0.8` |
| `expo-image` | `~55.0.0` → `~3.0.11` |
| `expo-splash-screen` | `~55.0.20` → `~31.0.13` |
| `expo-status-bar` | `~55.0.0` → `~3.0.9` |
| `expo-constants` | `~55.0.0` → `~18.0.13` |
| `expo-linking` | `~55.0.0` → `~8.0.12` |
| `jest-expo` | `~55.0.0` → `~54.0.17` |
| `react` | `19.2.6` → `19.1.0` |
| `react-native` | `0.81.6` → `0.81.5` |
| `react-native-worklets` | `^0.8.3` → `0.5.1` |
| `react-native-reanimated` | `^4.0.0` → `~4.1.1` |
| `react-native-gesture-handler` | `^2.20.0` → `~2.28.0` |
| `react-native-screens` | `^4.0.0` → `~4.16.0` |
| `react-native-safe-area-context` | `^5.0.0` → `~5.6.0` |
| `react-test-renderer` | `19.2.6` → `19.1.0` |
| `@types/react` | `~19.2.0` → `~19.1.0` |

`app.config.ts` restored `newArchEnabled: true` (a valid `ExpoConfig` field in SDK 54).

`pnpm-lock.yaml` regenerated. 92 tests across 19 suites still pass; typecheck, lint, format all clean. One harmless peer-dep warning: react-dom@19.2.6 wants react@^19.2.6, found 19.1.0 — only relevant on web target, not native.

Brief follow-up: BRIEF §9.2's pin table needs to be replaced with the actual SDK 54 versions from `bundledNativeModules.json` (not the values that were originally written). Same footprint as before, accurate values.

#### Commit (k) — visual maturity (polish round 2)

Targeted polish after a candid round-1 review. Closes most of the deferred items from commit (j).

- **Tab bar icons.** Ionicons line variants per tab (`compass-outline` / `map-outline` / `bookmark-outline` / `book-outline`) via `@expo/vector-icons`. Active = `accent`, inactive = `inkSubtle`. The package was already in the transitive graph; now explicit in `dependencies`.
- **Header styling.** `Tabs.screenOptions.headerTitleStyle` pulls `fontSize` from `theme.typography.title3.latin` and weight from the same token. `headerStyle` gains a 1 dp `border` hairline at the bottom — replaces the missing platform shadow on `headerShadowVisible: false`.
- **Status bar.** `expo-status-bar` mounted inside the root layout with `style="auto"` so iOS automatically chooses light/dark content based on the active theme background. Fixes black-on-black on dark theme.
- **Motion budget.** Stack `screenOptions.animation: 'slide_from_right'` with `animationDuration: 240` (BRIEF §5.4 `duration.standard`). Etiquette modal uses `slide_from_bottom` with `360 ms` (`duration.slow`, the brief's pick for "Modal enter"). The motion tokens authored in commit (b) are finally in use.
- **Splash background tinted.** `app.config.ts` `splash.backgroundColor` set to `#FAF7F2` (the warm-paper `bg` token). Launch flash is no longer a stark white rectangle.
- **Theme switcher refinement.** Each tile gets an 8 dp swatch dot before the label, coloured to that theme's accent (`light` → `#C8552B`, `dark` → `#E07A4A`, `outdoorBright` → `#A8331C`, `system` → `inkSubtle`). The user can now SEE what they're picking, not just read the label.
- **Tab placeholder breathing room.** Explore / Routes / Collection screens centred vertically with `inkSubtle` placeholder copy (was `inkMuted`). Reads as "calm pause" rather than "TODO empty state". Guide stays left-aligned because it has the ThemeSwitcher below.

New direct dep: `@expo/vector-icons@^15.0.0` — already transitively present via Expo, now declared explicitly so TS can resolve types. Not a real install change.

Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` (92 tests across 19 suites, all green), `pnpm test:coverage` (100% on `src/lib` and `src/theme`).

Still deferred (intentional): font binaries (sandbox can't fetch Google Fonts), custom tab bar component, dedicated lead-text typography token.

#### Commit (j) — UI polish

A direct response to a candid UI/UX review against BRIEF §5.1's principles ("hairlines, not boxes" / "one accent used sparingly" / "quiet over loud"). Five targeted fixes:

- **Outlined `Button` primitive** at `src/components/primitives/Button.tsx`. 1 dp accent border, accent-coloured label, no fill — replaces the solid terracotta CTA the etiquette modal previously rendered. Single variant for Phase 1; expands when callers demand more.
- **`SafeAreaProvider` at the root** plus `SafeAreaView` on the etiquette modal and `+not-found` screen. Fixes a real bug where modal content collided with notch / home-indicator on real devices. `react-native-safe-area-context` was installed since commit (a) but unused until now.
- **Theme switcher reachable from the Guide tab.** New `useThemePreference()` hook persists `preferredTheme` to MMKV (key was pre-declared in commit (d)) and applies it via `UnistylesRuntime.setTheme` / `setAdaptiveThemes`. Four-mode `ThemeSwitcher` component: **System** (auto, OS-driven) / Light / Dark / Outdoor. Per Q-A in commit-(j) plan, "System" defers to OS appearance via adaptive themes; the other three are explicit overrides that disable adaptive. `outdoorBright` was unreachable from UI before this commit.
- **Modal close button.** Top-right `×` `Pressable` on the etiquette modal — visible only when `acknowledged === true` so first-launch users still cannot bypass the gate. Helps Android users where swipe-down-to-dismiss isn't a learned gesture.
- **Etiquette intro typography lift.** Changed intro `<Text>` colour from `inkMuted` → `ink` and added a `2xl` top padding above the title. Achieves visual hierarchy via colour shift + spacing rather than introducing an 11th typography token outside BRIEF §5.3's defined ten.

New i18n keys: `common.close`, `common.closeGlyph`, `common.theme.{sectionTitle,system,light,dark,outdoorBright}`. Both languages aligned; `[NE]`-prefixed for the Nepali stubs per CLAUDE §3.10.

`jest.setup.ts` adds `UnistylesRuntime` mock so `useThemePreference` and `ThemeSwitcher` render in jsdom. Stable `jest.fn()` references via the global mock so tests can assert against `setTheme` / `setAdaptiveThemes` calls.

Verifications: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test` — **92 tests across 19 suites**, all green. `pnpm test:coverage` still 100 % on `src/lib` and `src/theme`.

Out of scope (intentional, deferred): tab bar icons, custom motion using BRIEF §5.4 tokens, lead-text typography variant, font binaries, custom tab bar component, settings screen.

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
