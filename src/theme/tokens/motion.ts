export const duration = {
  instant: 80,
  fast: 160,
  standard: 240,
  slow: 360,
  deliberate: 560,
} as const;

export type DurationToken = keyof typeof duration;

export type CubicBezier = readonly [number, number, number, number];

export const easing: Record<'standard' | 'entrance' | 'exit' | 'emphasized', CubicBezier> = {
  standard: [0.2, 0, 0, 1],
  entrance: [0, 0, 0, 1],
  exit: [0.4, 0, 1, 1],
  emphasized: [0.2, 0, 0, 1],
};

export type EasingToken = keyof typeof easing;

export type SpringConfig = {
  damping: number;
  stiffness: number;
  mass: number;
};

export const spring: Record<'gentle' | 'responsive', SpringConfig> = {
  gentle: { damping: 22, stiffness: 180, mass: 1 },
  responsive: { damping: 26, stiffness: 280, mass: 1 },
};

export type SpringToken = keyof typeof spring;
