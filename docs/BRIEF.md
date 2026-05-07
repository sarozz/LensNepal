# Kathmandu Lens — Product & Engineering Brief

> **Status:** DRAFT v0.1 (authored by Claude Code from the Phase 1 task message + Expo SDK 54 defaults). Review and edit before any Phase 1 code is written. Anywhere you see `TODO(human)` the value is a guess — please confirm or replace.

## 1. Vision

Kathmandu Lens is a calm, offline-first, on-device companion that helps a respectful traveller read Kathmandu — its temples, its courtyards, its objects, its etiquette — without rushing, without phoning home, and without drowning the experience in chrome. The app uses on-device computer vision to recognise what the camera sees, narrates it through a culturally aware AI guide, and rewards repeat exploration through a quiet collection and journaling loop.

The product opposes three things, deliberately:

1. **Disrespectful tourism.** The very first screen is the cultural etiquette primer, and acknowledging it is a hard gate.
2. **Cloud-dependence.** Recognition, narration prep, and content all work offline. Connectivity is a bonus, not a requirement.
3. **Ambient anxiety.** Motion is gentle, copy is present-tense, no streaks, no notifications guilt-tripping the user back.

## 2. Target users

- **Primary:** the slow traveller — solo or in pairs, 25–55, has a week+ in the Kathmandu Valley, walks Patan and Bhaktapur as well as Durbar Square, takes one or two trips a year, reads a guidebook before arriving.
- **Secondary:** the diaspora returning, often with a non-Nepali partner or child — wants an explainer that doesn't condescend and supports Nepali. `TODO(human): confirm Nepali readability is for diaspora, not local Kathmandu residents.`
- **Out of scope:** organised group tours, package tourism, students researching for academic work, locals using it as a daily reference.

## 3. Experience pillars

### 3.1 Recognise

Point the camera at a temple, a tympanum, a deity, an offering, a piece of architecture — get a confident, sourced label and a one-paragraph "what am I looking at." Recognition is on-device. Confidence below a threshold says "I'm not sure" rather than guessing. (Phase 2.)

### 3.2 Narrate

Once recognised, the AI guide gives a calm, present-tense explanation, with depth toggled by the user (one-line / paragraph / deep dive). Narration is generated from a structured knowledge base; the LLM is the voice, not the source of truth. (Phase 4.)

### 3.3 Walk

Curated walking routes with offline maps, quiet ambient cues at points of interest, and no forced "next stop." Routes load fully offline. (Phase 5.)

### 3.4 Collect & journal

Recognised objects accrete into a personal collection (badges, with progressive disclosure of detail). Optional, gentle, and never the point. The journal is local-only by default. (Phases 1 stub → 3 real.)

### 3.5 Cultural Etiquette primer

The app's most important screen, and the only real screen Phase 1 ships. Five sections, each ≤ 80 words, calm and present-tense:

1. **Photography** — when to ask, when not to ask, who you never photograph (see §5 below for Kumari guidance).
2. **Footwear** — where to remove shoes, where to keep them on, why.
3. **Silence** — sound levels in temple courtyards, during puja, near sleeping deities.
4. **Sacred objects** — bells, lamps, offerings, statues; what to touch, what not to touch, what circumambulation looks like (always clockwise, always with the right hand toward the shrine).
5. **If you accidentally photograph the Kumari** — the goddess incarnate is photographed only by family. Tourists who do so by accident: delete the photo, do not share, do not apologise loudly. The screen explains this without scolding.

Acknowledgement is mandatory on first launch and persisted in MMKV under `hasAcknowledgedEtiquette`. The screen is reachable from a `?` button in any tab header thereafter. Copy lives in `i18n/{en,ne}/etiquette.json`. The Nepali stub has English values prefixed `[NE]` for the human translator pass.

## 4. Information architecture

The app is a four-tab shell. Tabs are equal — no tab is the "default." Order, left to right:

| # | Key          | English label | Nepali label    | Phase 1 state |
|---|--------------|---------------|-----------------|---------------|
| 1 | `explore`    | Explore       | अन्वेषण         | placeholder   |
| 2 | `routes`     | Routes        | मार्ग           | placeholder   |
| 3 | `collection` | Collection    | संग्रह          | placeholder   |
| 4 | `guide`      | Guide         | निर्देशिका      | placeholder   |

Each placeholder shows the tab's name + a one-line stub copy from i18n + a theme-aware background. A `?` icon in every tab header opens the etiquette modal (`app/etiquette.tsx`).

The etiquette primer is a modal route, not a tab — it is gateway content, not a destination users return to as a hub.

`TODO(human): confirm Nepali tab labels above. I have used common dictionary forms; a native speaker should sign off.`

## 5. Visual identity

### 5.1 Principles

- **Quiet over loud.** Default UI never competes with the city.
- **Warmth over neutrality.** Paper white with a faint amber tint, never pure cool grey.
- **One accent.** A muted terracotta, used sparingly. Multiple accent colours are forbidden.
- **Hairlines, not boxes.** Borders divide; large filled chips do not.
- **Latin and Devanagari are first-class.** The type system supports both at every scale.

### 5.2 Palette — three themes

All values are linear sRGB. Contrast against the matching `bg` is verified ≥ 4.5:1 for body text and ≥ 3:1 for large/title text. `outdoorBright` targets ≥ 7:1 for body text under direct sun.

**Light**

| Token             | Hex        | Use                                      |
|-------------------|------------|------------------------------------------|
| `bg`              | `#FAF7F2`  | App background (warm paper)              |
| `surface`         | `#FFFFFF`  | Cards, sheets                            |
| `surfaceMuted`    | `#F2EDE4`  | Secondary surfaces                       |
| `ink`             | `#1B1916`  | Primary text                             |
| `inkMuted`        | `#5A554D`  | Secondary text                           |
| `inkSubtle`       | `#8A857B`  | Tertiary text, disabled                  |
| `accent`          | `#C8552B`  | Primary action, terracotta               |
| `accentMuted`     | `#E8B89C`  | Hover, pressed, accent backgrounds       |
| `success`         | `#3F7A4C`  | Positive feedback                        |
| `warning`         | `#C9A227`  | Caution                                  |
| `danger`          | `#B23A3A`  | Destructive, errors                      |
| `border`          | `#E5DED1`  | Hairlines                                |
| `focus`           | `#2E5C8A`  | Focus ring (lapis blue)                  |
| `overlay`         | `rgba(27,25,22,0.55)` | Modal scrim                  |

**Dark**

| Token             | Hex        | Use                                      |
|-------------------|------------|------------------------------------------|
| `bg`              | `#121110`  | App background                           |
| `surface`         | `#1B1916`  | Cards, sheets                            |
| `surfaceMuted`    | `#24211D`  | Secondary surfaces                       |
| `ink`             | `#F2EDE4`  | Primary text                             |
| `inkMuted`        | `#A8A199`  | Secondary text                           |
| `inkSubtle`       | `#6E6962`  | Tertiary text                            |
| `accent`          | `#E07A4A`  | Primary action (warmer for dark bg)      |
| `accentMuted`     | `#6B3A22`  | Hover, pressed                           |
| `success`         | `#5FA374`  |                                          |
| `warning`         | `#E6C24E`  |                                          |
| `danger`          | `#D85A5A`  |                                          |
| `border`          | `#2E2A26`  |                                          |
| `focus`           | `#6A9DD2`  |                                          |
| `overlay`         | `rgba(0,0,0,0.7)` |                                   |

**Outdoor bright** — for outdoor sun readability, biased to maximum contrast. Elevation rendered as hairline + tone shift, not shadow.

| Token             | Hex        | Use                                      |
|-------------------|------------|------------------------------------------|
| `bg`              | `#FFFFFF`  |                                          |
| `surface`         | `#FFFFFF`  |                                          |
| `surfaceMuted`    | `#ECECEC`  |                                          |
| `ink`             | `#000000`  |                                          |
| `inkMuted`        | `#2A2A2A`  |                                          |
| `inkSubtle`       | `#555555`  |                                          |
| `accent`          | `#A8331C`  | Deeper terracotta for max contrast       |
| `accentMuted`     | `#D67A60`  |                                          |
| `success`         | `#1F5C2E`  |                                          |
| `warning`         | `#8B6F00`  |                                          |
| `danger`          | `#8E1F1F`  |                                          |
| `border`          | `#B0B0B0`  | Stronger borders to compensate for sun   |
| `focus`           | `#003C82`  |                                          |
| `overlay`         | `rgba(0,0,0,0.85)` |                                  |

### 5.3 Typography

Font families:

| Role                       | Family                  | Notes                                                    |
|----------------------------|-------------------------|----------------------------------------------------------|
| Display (Latin)            | Fraunces variable       | Opsz axis pinned to 48 for display, 14 for body          |
| Body / UI (Latin)          | Inter variable          |                                                          |
| Body / UI (Devanagari)     | Mukta                   | Weights 300, 400, 600, 700                               |
| Display (Devanagari)       | Tiro Devanagari Hindi   | Regular only                                             |
| Fallback (Devanagari)      | Noto Sans Devanagari    | Used when Mukta/Tiro lack a glyph                        |

Scale (size / line-height in dp, weight). Devanagari uses `+2` line-height for matras.

| Token            | Latin       | Devanagari   | Weight | Usage                              |
|------------------|-------------|--------------|--------|------------------------------------|
| `display`        | 32 / 38     | 32 / 40      | 600    | Hero, primer section openers       |
| `title1`         | 24 / 30     | 24 / 32      | 600    | Screen titles                      |
| `title2`         | 20 / 26     | 20 / 28      | 600    | Section headings                   |
| `title3`         | 18 / 24     | 18 / 26      | 600    | Subsections (Inter, not Fraunces)  |
| `body`           | 16 / 24     | 16 / 26      | 400    | Default body                       |
| `bodyEmphasis`   | 16 / 24     | 16 / 26      | 600    | Emphasised body                    |
| `callout`        | 15 / 22     | 15 / 24      | 500    | Buttons, chips                     |
| `subhead`        | 14 / 20     | 14 / 22      | 500    | Captions over images               |
| `footnote`       | 13 / 18     | 13 / 20      | 400    | Footnotes, source attributions     |
| `caption`        | 12 / 16     | 12 / 18      | 400    | Tiny meta                          |

Letter-spacing: `-0.02em` on `display` and `title1`/`title2`; `0` on body; `+0.01em` on `caption`. Devanagari letter-spacing is always `0`.

`TODO(human): confirm font roster. Mukta + Tiro Devanagari Hindi may not be the final choice; Noto Sans Devanagari alone is acceptable if licensing/distribution becomes an issue.`

### 5.4 Motion

All durations in milliseconds. All easing functions in cubic-bezier form. Reanimated 4 syntax.

| Token                  | Value                                | Use                                       |
|------------------------|--------------------------------------|-------------------------------------------|
| `duration.instant`     | 80                                   | Press feedback                            |
| `duration.fast`        | 160                                  | Tooltip, chip toggle                      |
| `duration.standard`    | 240                                  | Tab change, sheet slide                   |
| `duration.slow`        | 360                                  | Modal enter                               |
| `duration.deliberate`  | 560                                  | First-launch primer reveals               |
| `easing.standard`      | cubic-bezier(0.2, 0, 0, 1)           | Default                                   |
| `easing.entrance`      | cubic-bezier(0, 0, 0, 1)             | Enter from offscreen                      |
| `easing.exit`          | cubic-bezier(0.4, 0, 1, 1)           | Exit to offscreen                         |
| `easing.emphasized`    | cubic-bezier(0.2, 0, 0, 1)           | Important transitions                     |
| `spring.gentle`        | { damping: 22, stiffness: 180, mass: 1 } | Sheet drag-release                    |
| `spring.responsive`    | { damping: 26, stiffness: 280, mass: 1 } | Tab indicator, toggle                 |

Reduced motion: respect `useReducedMotion()`. Any motion > 200 ms collapses to a fade with `duration.fast`. No bouncy springs ever — `damping` ≥ 18.

### 5.5 Elevation

Four steps. Light/dark use shadows; `outdoorBright` uses a 1 dp hairline border + 4 % tone shift in place of a shadow (sun washes out subtle drops).

| Step       | Light/Dark shadow                                         | Outdoor bright                                |
|------------|-----------------------------------------------------------|-----------------------------------------------|
| `level0`   | none                                                      | none                                          |
| `level1`   | y=1, blur=2, alpha=0.06 (light) / 0.20 (dark)             | hairline border, no shadow                    |
| `level2`   | y=2, blur=6, alpha=0.10 / 0.28                            | hairline + 2 % tone shift                     |
| `level3`   | y=6, blur=16, alpha=0.14 / 0.36                           | hairline + 4 % tone shift                     |
| `level4`   | y=12, blur=28, alpha=0.18 / 0.44                          | hairline + 4 % tone shift + 1 dp border       |

## 6. Content & voice

- **Tense:** present.
- **Person:** second ("you stand here," not "the visitor stands here"). Sparingly first-person plural for cultural collective ("we remove our shoes").
- **Tone:** calm, observational, never instructional-clipped. Avoid "must," "should," "do not." Prefer "we don't," "the temple is quiet," "you remove your shoes here."
- **Length:** body paragraphs ≤ 80 words. Section openers ≤ 25 words.
- **Sources:** every cultural/historical claim has a source, attached in a `sources[]` array on the structured content. Sources surface in a "Where this comes from" expander on long-form screens (Phase 4).

## 7. Privacy, consent, cultural posture

- **Default offline.** No account, no telemetry without explicit consent.
- **Anonymous analytics.** PostHog with `personProfiles: 'identified_only'`, `disableSurveys: true`. We never identify by default.
- **No photos leave the device** unless the user explicitly exports/shares.
- **Camera is permission-prompted with cultural framing,** not a generic "we need camera." (Phase 2.)
- **Content respects living traditions.** Anything depicting active worship is double-reviewed by a Nepali cultural advisor before shipping. `TODO(human): name advisor and review process.`
- **The Kumari is never depicted in app imagery.** (Photographs of the Kumari Ghar exterior are acceptable; the goddess herself is not.)

## 8. Accessibility & inclusivity

- All interactive surfaces ≥ 44 × 44 dp.
- Text scales with OS font size up to 200 %.
- All copy resolved through i18next; no hardcoded user-visible strings.
- Devanagari rendering tested at every type scale.
- Colour is never the sole carrier of meaning.
- Screen-reader labels reviewed in both English and Nepali.
- Outdoor-bright theme exists specifically for low-vision users in addition to outdoor sun.

## 9. Engineering

### 9.1 Folder structure

```
.
├── app/                          # expo-router routes
│   ├── _layout.tsx               # root providers
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── explore.tsx
│   │   ├── routes.tsx
│   │   ├── collection.tsx
│   │   └── guide.tsx
│   ├── etiquette.tsx             # modal route
│   └── +not-found.tsx
├── src/
│   ├── components/
│   │   ├── primitives/           # Text, Pressable, Surface, Stack
│   │   ├── feedback/             # Toast, Empty, Skeleton
│   │   └── index.ts
│   ├── features/                 # vertical slices
│   │   ├── badges/               # Phase 1 stub (empty barrel)
│   │   │   └── index.ts
│   │   └── journal/              # Phase 1 stub (empty barrel)
│   │       └── index.ts
│   ├── theme/
│   │   ├── tokens/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── motion.ts
│   │   │   ├── spacing.ts
│   │   │   └── elevation.ts
│   │   ├── themes.ts
│   │   └── index.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── detect.ts
│   │   ├── locales/
│   │   │   ├── en/{common,tabs,etiquette}.json
│   │   │   └── ne/{common,tabs,etiquette}.json
│   │   └── types.ts
│   ├── lib/
│   │   ├── mmkv.ts
│   │   ├── storage.ts
│   │   ├── query-client.ts
│   │   ├── sentry.ts
│   │   ├── analytics.ts
│   │   └── env.ts
│   ├── hooks/
│   │   ├── useAppFonts.ts
│   │   ├── useTheme.ts
│   │   └── useFirstLaunch.ts
│   ├── assets/
│   │   ├── fonts/README.md
│   │   └── images/
│   └── types/
│       └── env.d.ts
├── docs/
│   ├── BRIEF.md
│   └── architecture.md
├── .maestro/smoke.yaml
├── .github/workflows/ci.yml
├── app.config.ts
├── babel.config.js
├── biome.json
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── lefthook.yml
├── jest.config.js
├── jest.setup.ts
├── .nvmrc
├── .gitignore
├── README.md
├── CHANGELOG.md
├── CLAUDE.md
└── LICENSE
```

`features/recognition`, `features/ar`, `features/ai-guide` are intentionally *not* created until their phase. Empty stubs invite premature wiring.

### 9.2 Dependencies

Phase 1 (install in commit (a)):

| Package                                    | Version   | Purpose                                    |
|--------------------------------------------|-----------|--------------------------------------------|
| expo                                       | ^54       | SDK                                        |
| expo-router                                | ^4        | File-based routing                         |
| react                                      | ^19       |                                            |
| react-native                               | ^0.81     |                                            |
| react-native-unistyles                     | ^3        | Theme system                               |
| react-native-reanimated                    | ^4        | Animation                                  |
| react-native-gesture-handler               | ^2        |                                            |
| react-native-screens                       | ^4        |                                            |
| react-native-safe-area-context             | ^5        |                                            |
| @gorhom/bottom-sheet                       | ^5.1.8    | Modal sheets                               |
| @shopify/flash-list                        | ^2        | Lists                                      |
| react-native-mmkv                          | ^3        | Persistent storage                         |
| @tanstack/react-query                      | ^5        | Server state                               |
| @tanstack/react-query-persist-client       | ^5        | Cache persistence                          |
| zustand                                    | ^5        | Client state                               |
| i18next                                    | ^24       | i18n                                       |
| react-i18next                              | ^15       | React bindings                             |
| @sentry/react-native                       | ^6        | Crash + error reporting                    |
| posthog-react-native                       | ^4        | Anonymous analytics                        |
| expo-font, expo-localization               | ^13, ^16  |                                            |
| expo-haptics, expo-image                   | ^14, ^2   |                                            |
| expo-splash-screen, expo-status-bar        | latest    |                                            |
| **dev:** typescript                        | ^5.6      |                                            |
| **dev:** @biomejs/biome                    | ^1.9      | Lint + format                              |
| **dev:** jest, jest-expo                   | latest    |                                            |
| **dev:** @testing-library/react-native     | ^12       |                                            |
| **dev:** @testing-library/jest-native      | latest    |                                            |
| **dev:** lefthook                          | ^1        | Pre-commit hooks                           |

Phase 2+ (DO NOT install in Phase 1):

- react-native-vision-camera (Phase 2 — recognition)
- react-native-executorch or equivalent on-device runtime (Phase 2)
- @viro-community/react-viro (Phase 5 — AR overlays)
- @anthropic-ai/sdk (Phase 4 — AI guide)
- expo-audio (Phase 4 — TTS playback)
- react-native-maps (Phase 5 — routes)

If a Phase 1 implementation appears to need any of the above, STOP and ASK.

### 9.3 TypeScript configuration

```jsonc
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "alwaysStrict": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "moduleResolution": "bundler",
    "module": "esnext",
    "target": "es2022",
    "lib": ["es2023"],
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@app/*": ["app/*"]
    },
    "types": ["jest"]
  },
  "include": ["src/**/*", "app/**/*", "*.ts", "*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"],
  "exclude": ["node_modules", "babel.config.js", "metro.config.js"]
}
```

No `any`, no `@ts-ignore`. `@ts-expect-error` allowed only with an issue link comment.

### 9.4 New Architecture

`app.config.ts` sets `newArchEnabled: true` at the root level (Expo SDK 54 default, but pinned explicitly). `npx expo-doctor` must pass before any commit on `main`.

### 9.5 Environment variables

Read via `app.config.ts → extras` only. Never `process.env` at runtime. Phase 1 envs:

| Var                              | Required | Purpose                       |
|----------------------------------|----------|-------------------------------|
| `EXPO_PUBLIC_SENTRY_DSN`         | no       | Sentry init (no-op if absent) |
| `EXPO_PUBLIC_POSTHOG_API_KEY`    | no       | PostHog init (no-op if absent)|
| `EXPO_PUBLIC_POSTHOG_HOST`       | no       | Defaults to EU cloud          |

Code paths that consume these MUST handle absent values without crashing or warning loudly. The app must run in dev with no `.env` file.

## 10. Quality & non-negotiables

- TypeScript strict, no `any`, no `@ts-ignore`. `@ts-expect-error` requires a tracked issue.
- No hardcoded user-visible strings — every label resolves through i18next.
- Tests exist for every public function in `src/lib` and `src/theme` (Phase 1 coverage target ≥ 70 %).
- `pnpm typecheck && pnpm lint && pnpm test && npx expo-doctor` is the green light.
- Maestro smoke flow passes on iOS sim before each phase tag.
- No silent skipping. If a feature can't ship, the changelog says so.
- ASK before adding any dependency not listed in §9.2.
- ASK before changing folder structure in §9.1.
- ASK before touching `docs/BRIEF.md` (this file).

## 11. Phasing

### 11.1 Phase 0 — Decisions (this phase)
Brief signed off, CLAUDE.md signed off, repo created, branch protection rules `TODO(human)`.

### 11.2 — *(reserved for later phases)*

### 11.5 Phase 1 — Foundation (the current task)

A runnable Expo SDK 54 New-Architecture app with:

- Four-tab shell (placeholder screens)
- Theme system (three themes: light, dark, outdoorBright)
- i18n scaffold (en + ne stub)
- Observability wiring (Sentry + PostHog, no-op without env vars)
- Offline-first storage (MMKV + TanStack Query persistor, network-mode 'offlineFirst', 24h max-age)
- Cultural Etiquette primer (the one real screen, mandatory acknowledgement)
- Tests, Maestro smoke, CI

No CV, no AI, no AR, no maps, no real content beyond the etiquette primer.

### 11.6+ — *(later phases — not detailed in this draft)*

Phase 2: on-device recognition. Phase 3: collection + journal. Phase 4: AI guide + TTS. Phase 5: routes + AR. Phase 6: EAS, store, Maestro in CI.

## 12. Definition of Done (per phase)

A phase is done when:

- [ ] All deliverables in the phase brief are checked
- [ ] `pnpm install && pnpm start` runs on iOS sim and Android emulator with no warnings
- [ ] `npx expo-doctor` passes
- [ ] `pnpm typecheck` is clean
- [ ] `pnpm lint` is clean
- [ ] `pnpm test` is green and meets the phase's coverage target
- [ ] Maestro smoke flow passes on iOS sim
- [ ] No hardcoded user-visible strings
- [ ] No env-var-dependent code path crashes when env vars are absent
- [ ] CHANGELOG entry written
- [ ] README updated for any new commands or env vars
- [ ] Cultural review sign-off where the phase touches living traditions (Phases 4, 5)

---

*End of draft. Next step: human review of the `TODO(human)` blocks above.*
