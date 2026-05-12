# Asset folders

## Fonts

See `fonts/README.md`. Phase 1 ships system-font fallback until binaries land.

## Element images

Drop one `.jpg` or `.png` per element into `elements/`. Recommended square (1:1) at ≥ 600 × 600 px so the 64 dp browse thumbnail and the 220 dp detail hero both look sharp on retina screens.

Expected filenames:

| File | Element |
| --- | --- |
| `elements/boudha.jpg` | Boudha Stupa |
| `elements/pashupatinath.jpg` | Pashupatinath |
| `elements/swayambhu.jpg` | Swayambhu eyes |
| `elements/lion-gate.jpg` | Stone lions |
| `elements/lotus-motif.jpg` | Lotus motif |

After dropping a file, wire it in `src/features/elements/dataset.ts`:

```ts
boudha: {
  id: 'boudha',
  tint: '#F2EDE4',
  image: require('@/assets/elements/boudha.jpg'),
  source: { ... },
},
```

Until the file is added, the app shows a tinted block in the same position. The image swaps in cleanly when present — no code beyond the `require` line.

## Route images

Same pattern under `routes/`:

| File | Route |
| --- | --- |
| `routes/patan-dawn.jpg` | Patan dawn walk |
| `routes/boudha-kora.jpg` | Boudha kora |
| `routes/swayambhu-climb.jpg` | Swayambhu climb |

Wire in `src/features/routes/dataset.ts` the same way.

## Attribution

Every image we ship needs a source line. Acceptable origins:

- Your own photographs (preferred)
- Wikimedia Commons (CC BY / CC BY-SA — attribution required)
- Photos taken by someone you have written permission from

Keep a `CREDITS.md` alongside any image folder that lists every file with photographer name and licence. CC images must keep their licence text visible in the in-app sources expander (Phase 4) and in CREDITS.md.

The Kumari is **not** photographed (BRIEF §3.5, CLAUDE §3.10). Any image suspected of depicting her is removed.
