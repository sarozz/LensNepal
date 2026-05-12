import { type AppTheme, type ThemeName, themes } from './themes';

const themeNames: ThemeName[] = ['light', 'dark', 'outdoorBright'];

const requiredColorKeys: Array<keyof AppTheme['colors']> = [
  'bg',
  'surface',
  'surfaceMuted',
  'ink',
  'inkMuted',
  'inkSubtle',
  'accent',
  'accentMuted',
  'success',
  'warning',
  'danger',
  'border',
  'focus',
  'overlay',
];

const elevationLevels = ['level0', 'level1', 'level2', 'level3', 'level4'] as const;
const typographyTokens = [
  'display',
  'title1',
  'title2',
  'title3',
  'body',
  'bodyEmphasis',
  'callout',
  'subhead',
  'footnote',
  'caption',
] as const;

describe('themes', () => {
  describe.each(themeNames)('%s', (name) => {
    const theme = themes[name];

    it('exposes every colour token as a non-empty string', () => {
      for (const key of requiredColorKeys) {
        expect(typeof theme.colors[key]).toBe('string');
        expect(theme.colors[key].length).toBeGreaterThan(0);
      }
    });

    it('exposes every elevation level with a recognised kind', () => {
      for (const level of elevationLevels) {
        const e = theme.elevation[level];
        expect(['shadow', 'outdoor']).toContain(e.kind);
      }
    });

    it('exposes every typography token with Latin and Devanagari sizing', () => {
      for (const token of typographyTokens) {
        const t = theme.typography[token];
        expect(typeof t.latin.fontSize).toBe('number');
        expect(typeof t.latin.lineHeight).toBe('number');
        expect(typeof t.devanagari.fontSize).toBe('number');
        expect(typeof t.devanagari.lineHeight).toBe('number');
        expect(t.devanagari.letterSpacing).toBe(0);
        expect(t.fontWeight).toBeGreaterThanOrEqual(300);
        expect(t.fontWeight).toBeLessThanOrEqual(700);
      }
    });

    it('exposes spacing, radius, fontFamily, and motion tokens', () => {
      expect(theme.spacing.none).toBe(0);
      expect(typeof theme.spacing.lg).toBe('number');
      expect(theme.radius.pill).toBe(9999);
      expect(typeof theme.fontFamily.body).toBe('string');
      expect(typeof theme.motion.duration.standard).toBe('number');
      expect(theme.motion.easing.standard).toHaveLength(4);
      expect(typeof theme.motion.spring.gentle.damping).toBe('number');
      expect(theme.motion.spring.gentle.damping).toBeGreaterThanOrEqual(18);
    });
  });

  it('every theme exposes the same top-level keys', () => {
    const lightKeys = Object.keys(themes.light).sort();
    expect(Object.keys(themes.dark).sort()).toEqual(lightKeys);
    expect(Object.keys(themes.outdoorBright).sort()).toEqual(lightKeys);
  });
});
