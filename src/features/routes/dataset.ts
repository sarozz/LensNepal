export const ROUTES = ['patanDawn', 'boudhaKora', 'swayambhuClimb'] as const satisfies readonly [
  string,
  ...string[],
];

export type RouteId = (typeof ROUTES)[number];

export type RouteMeta = {
  id: RouteId;
  distanceKm: number;
  walkingMinutes: number;
};

export const ROUTE_META: Record<RouteId, RouteMeta> = {
  patanDawn: { id: 'patanDawn', distanceKm: 1.6, walkingMinutes: 45 },
  boudhaKora: { id: 'boudhaKora', distanceKm: 0.7, walkingMinutes: 30 },
  swayambhuClimb: { id: 'swayambhuClimb', distanceKm: 1.2, walkingMinutes: 40 },
};

export function isRouteId(value: string): value is RouteId {
  return (ROUTES as ReadonlyArray<string>).includes(value);
}
