export type Palette = {
  bg: string;
  surface: string;
  surfaceMuted: string;
  ink: string;
  inkMuted: string;
  inkSubtle: string;
  accent: string;
  accentMuted: string;
  success: string;
  warning: string;
  danger: string;
  border: string;
  focus: string;
  overlay: string;
};

export const lightPalette: Palette = {
  bg: '#FAF7F2',
  surface: '#FFFFFF',
  surfaceMuted: '#F2EDE4',
  ink: '#1B1916',
  inkMuted: '#5A554D',
  inkSubtle: '#8A857B',
  accent: '#C8552B',
  accentMuted: '#E8B89C',
  success: '#3F7A4C',
  warning: '#C9A227',
  danger: '#B23A3A',
  border: '#E5DED1',
  focus: '#2E5C8A',
  overlay: 'rgba(27,25,22,0.55)',
};

export const darkPalette: Palette = {
  bg: '#121110',
  surface: '#1B1916',
  surfaceMuted: '#24211D',
  ink: '#F2EDE4',
  inkMuted: '#A8A199',
  inkSubtle: '#6E6962',
  accent: '#E07A4A',
  accentMuted: '#6B3A22',
  success: '#5FA374',
  warning: '#E6C24E',
  danger: '#D85A5A',
  border: '#2E2A26',
  focus: '#6A9DD2',
  overlay: 'rgba(0,0,0,0.7)',
};

export const outdoorBrightPalette: Palette = {
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceMuted: '#ECECEC',
  ink: '#000000',
  inkMuted: '#2A2A2A',
  inkSubtle: '#555555',
  accent: '#A8331C',
  accentMuted: '#D67A60',
  success: '#1F5C2E',
  warning: '#8B6F00',
  danger: '#8E1F1F',
  border: '#B0B0B0',
  focus: '#003C82',
  overlay: 'rgba(0,0,0,0.85)',
};
