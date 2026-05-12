import type { ImageSourcePropType } from 'react-native';

export const ROUTES = ['patanDawn', 'boudhaKora', 'swayambhuClimb'] as const satisfies readonly [
  string,
  ...string[],
];

export type RouteId = (typeof ROUTES)[number];

export type RouteMeta = {
  id: RouteId;
  tint: string;
  image?: ImageSourcePropType;
  distanceKm: number;
  walkingMinutes: number;
};

export const ROUTE_META: Record<RouteId, RouteMeta> = {
  patanDawn: {
    id: 'patanDawn',
    tint: '#E8B89C',
    distanceKm: 1.6,
    walkingMinutes: 45,
  },
  boudhaKora: {
    id: 'boudhaKora',
    tint: '#F2EDE4',
    distanceKm: 0.7,
    walkingMinutes: 30,
  },
  swayambhuClimb: {
    id: 'swayambhuClimb',
    tint: '#5F8A6E',
    distanceKm: 1.2,
    walkingMinutes: 40,
  },
};

export function isRouteId(value: string): value is RouteId {
  return (ROUTES as ReadonlyArray<string>).includes(value);
}
