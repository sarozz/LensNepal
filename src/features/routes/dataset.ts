import type { ImageSourcePropType } from 'react-native';
import { ROUTE_IMAGES } from './images';

export const ROUTES = ['patanDawn', 'boudhaKora', 'swayambhuClimb'] as const satisfies readonly [
  string,
  ...string[],
];

export type RouteId = (typeof ROUTES)[number];

export type RouteMeta = {
  id: RouteId;
  tint: string;
  image?: ImageSourcePropType | undefined;
  distanceKm: number;
  walkingMinutes: number;
};

type RouteSeed = Omit<RouteMeta, 'image'>;

const SEED: Record<RouteId, RouteSeed> = {
  patanDawn: { id: 'patanDawn', tint: '#E8B89C', distanceKm: 1.6, walkingMinutes: 45 },
  boudhaKora: { id: 'boudhaKora', tint: '#F2EDE4', distanceKm: 0.7, walkingMinutes: 30 },
  swayambhuClimb: { id: 'swayambhuClimb', tint: '#5F8A6E', distanceKm: 1.2, walkingMinutes: 40 },
};

export const ROUTE_META: Record<RouteId, RouteMeta> = Object.fromEntries(
  ROUTES.map((id) => [id, { ...SEED[id], image: ROUTE_IMAGES[id] }]),
) as Record<RouteId, RouteMeta>;

export function isRouteId(value: string): value is RouteId {
  return (ROUTES as ReadonlyArray<string>).includes(value);
}
