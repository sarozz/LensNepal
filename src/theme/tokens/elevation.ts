export type ShadowElevation = {
  kind: 'shadow';
  shadowColor: string;
  shadowOffset: { width: 0; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export type OutdoorElevation = {
  kind: 'outdoor';
  borderWidth: number;
  toneShift: number;
};

export type Elevation = ShadowElevation | OutdoorElevation;

export type ElevationLevel = 'level0' | 'level1' | 'level2' | 'level3' | 'level4';

export type ElevationMap = Record<ElevationLevel, Elevation>;

export const lightElevation: ElevationMap = {
  level0: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  level2: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  level3: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
  level4: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 16,
  },
};

export const darkElevation: ElevationMap = {
  level0: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  level1: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  level2: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 3,
  },
  level3: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.36,
    shadowRadius: 16,
    elevation: 8,
  },
  level4: {
    kind: 'shadow',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.44,
    shadowRadius: 28,
    elevation: 16,
  },
};

export const outdoorBrightElevation: ElevationMap = {
  level0: { kind: 'outdoor', borderWidth: 0, toneShift: 0 },
  level1: { kind: 'outdoor', borderWidth: 1, toneShift: 0 },
  level2: { kind: 'outdoor', borderWidth: 1, toneShift: 0.02 },
  level3: { kind: 'outdoor', borderWidth: 1, toneShift: 0.04 },
  level4: { kind: 'outdoor', borderWidth: 2, toneShift: 0.04 },
};
