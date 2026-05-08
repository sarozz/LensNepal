export const fontFamily = {
  display: 'Fraunces',
  body: 'Inter',
  bodyDevanagari: 'Mukta',
  displayDevanagari: 'TiroDevanagariHindi',
  fallbackDevanagari: 'NotoSansDevanagari',
} as const;

export type FontFamilyToken = keyof typeof fontFamily;

export type FontWeight = 300 | 400 | 500 | 600 | 700;

export type ScaleEntry = {
  latin: { fontSize: number; lineHeight: number; letterSpacing: number };
  devanagari: { fontSize: number; lineHeight: number; letterSpacing: 0 };
  fontWeight: FontWeight;
};

export type TypographyToken =
  | 'display'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body'
  | 'bodyEmphasis'
  | 'callout'
  | 'subhead'
  | 'footnote'
  | 'caption';

export const typography: Record<TypographyToken, ScaleEntry> = {
  display: {
    latin: { fontSize: 32, lineHeight: 38, letterSpacing: -0.64 },
    devanagari: { fontSize: 32, lineHeight: 40, letterSpacing: 0 },
    fontWeight: 600,
  },
  title1: {
    latin: { fontSize: 24, lineHeight: 30, letterSpacing: -0.48 },
    devanagari: { fontSize: 24, lineHeight: 32, letterSpacing: 0 },
    fontWeight: 600,
  },
  title2: {
    latin: { fontSize: 20, lineHeight: 26, letterSpacing: -0.4 },
    devanagari: { fontSize: 20, lineHeight: 28, letterSpacing: 0 },
    fontWeight: 600,
  },
  title3: {
    latin: { fontSize: 18, lineHeight: 24, letterSpacing: 0 },
    devanagari: { fontSize: 18, lineHeight: 26, letterSpacing: 0 },
    fontWeight: 600,
  },
  body: {
    latin: { fontSize: 16, lineHeight: 24, letterSpacing: 0 },
    devanagari: { fontSize: 16, lineHeight: 26, letterSpacing: 0 },
    fontWeight: 400,
  },
  bodyEmphasis: {
    latin: { fontSize: 16, lineHeight: 24, letterSpacing: 0 },
    devanagari: { fontSize: 16, lineHeight: 26, letterSpacing: 0 },
    fontWeight: 600,
  },
  callout: {
    latin: { fontSize: 15, lineHeight: 22, letterSpacing: 0 },
    devanagari: { fontSize: 15, lineHeight: 24, letterSpacing: 0 },
    fontWeight: 500,
  },
  subhead: {
    latin: { fontSize: 14, lineHeight: 20, letterSpacing: 0 },
    devanagari: { fontSize: 14, lineHeight: 22, letterSpacing: 0 },
    fontWeight: 500,
  },
  footnote: {
    latin: { fontSize: 13, lineHeight: 18, letterSpacing: 0 },
    devanagari: { fontSize: 13, lineHeight: 20, letterSpacing: 0 },
    fontWeight: 400,
  },
  caption: {
    latin: { fontSize: 12, lineHeight: 16, letterSpacing: 0.12 },
    devanagari: { fontSize: 12, lineHeight: 18, letterSpacing: 0 },
    fontWeight: 400,
  },
};
