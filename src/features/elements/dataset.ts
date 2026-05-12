import type { ImageSourcePropType } from 'react-native';

export const ELEMENTS = [
  'boudha',
  'pashupatinath',
  'swayambhu',
  'lionGate',
  'lotusMotif',
] as const satisfies readonly [string, ...string[]];

export type ElementId = (typeof ELEMENTS)[number];

export type ElementMeta = {
  id: ElementId;
  tint: string;
  image?: ImageSourcePropType;
  source: { url: string; labelKey: 'sources.wikipedia' };
};

export const ELEMENT_META: Record<ElementId, ElementMeta> = {
  boudha: {
    id: 'boudha',
    tint: '#F2EDE4',
    source: { url: 'https://en.wikipedia.org/wiki/Boudhanath', labelKey: 'sources.wikipedia' },
  },
  pashupatinath: {
    id: 'pashupatinath',
    tint: '#A8331C',
    source: {
      url: 'https://en.wikipedia.org/wiki/Pashupatinath_Temple',
      labelKey: 'sources.wikipedia',
    },
  },
  swayambhu: {
    id: 'swayambhu',
    tint: '#2E5C8A',
    source: { url: 'https://en.wikipedia.org/wiki/Swayambhunath', labelKey: 'sources.wikipedia' },
  },
  lionGate: {
    id: 'lionGate',
    tint: '#A89B85',
    source: {
      url: 'https://en.wikipedia.org/wiki/Newar_architecture',
      labelKey: 'sources.wikipedia',
    },
  },
  lotusMotif: {
    id: 'lotusMotif',
    tint: '#C9A227',
    source: {
      url: 'https://en.wikipedia.org/wiki/Padma_(attribute)',
      labelKey: 'sources.wikipedia',
    },
  },
};

export function isElementId(value: string): value is ElementId {
  return (ELEMENTS as ReadonlyArray<string>).includes(value);
}
