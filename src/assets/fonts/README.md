# Fonts

This directory holds the font binaries the app loads via `useAppFonts`. Until binaries are dropped in, the app falls back to system fonts at every typography token. That's expected during early Phase 1; nothing in code depends on the binaries existing.

## Files expected

| File on disk                                                  | Family token (used in `fontFamily` style prop) | Source                                                      | Licence  |
| ------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------- | -------- |
| `Fraunces-VariableFont.ttf`                                   | `Fraunces`                                     | https://fonts.google.com/specimen/Fraunces                  | OFL 1.1  |
| `Inter-VariableFont.ttf`                                      | `Inter`                                        | https://fonts.google.com/specimen/Inter                     | OFL 1.1  |
| `Mukta-Light.ttf`, `-Regular.ttf`, `-Medium.ttf`, `-SemiBold.ttf`, `-Bold.ttf` | `Mukta`                                        | https://fonts.google.com/specimen/Mukta                     | OFL 1.1  |
| `TiroDevanagariHindi-Regular.ttf`                             | `TiroDevanagariHindi`                          | https://fonts.google.com/specimen/Tiro+Devanagari+Hindi     | OFL 1.1  |
| `NotoSansDevanagari-VariableFont.ttf`                         | `NotoSansDevanagari`                           | https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari | OFL 1.1  |

## Wiring binaries in

Once the files are placed alongside this README, populate `fontMap` in `src/hooks/useAppFonts.ts`:

```ts
const fontMap = {
  Fraunces: require('@/assets/fonts/Fraunces-VariableFont.ttf'),
  Inter: require('@/assets/fonts/Inter-VariableFont.ttf'),
  'Mukta-Light': require('@/assets/fonts/Mukta-Light.ttf'),
  // ...etc
};
```

The keys must match the `fontFamily` strings declared in `src/theme/tokens/typography.ts`. If you change a key here, change it there.

## Licensing

All five families are SIL Open Font License 1.1. Keep the upstream `OFL.txt` next to each family if you redistribute the bundle outside the app binary.
