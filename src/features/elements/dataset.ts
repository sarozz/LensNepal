import type { ImageSourcePropType } from 'react-native';
import { ELEMENT_IMAGES } from './images';

export const ELEMENTS = [
  'boudha',
  'pashupatinath',
  'swayambhu',
  'lionGate',
  'lotusMotif',
  'patanDurbar',
  'bhaktapurDurbar',
  'newariWindow',
  'torana',
  'prayerWheel',
  'bell',
  'diyo',
] as const satisfies readonly [string, ...string[]];

export type ElementId = (typeof ELEMENTS)[number];

export type ElementMeta = {
  id: ElementId;
  tint: string;
  image?: ImageSourcePropType | undefined;
  source: { url: string; labelKey: 'sources.wikipedia' };
};

type ElementSeed = Omit<ElementMeta, 'image'>;

const SEED: Record<ElementId, ElementSeed> = {
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
  patanDurbar: {
    id: 'patanDurbar',
    tint: '#D67A60',
    source: {
      url: 'https://en.wikipedia.org/wiki/Patan_Durbar_Square',
      labelKey: 'sources.wikipedia',
    },
  },
  bhaktapurDurbar: {
    id: 'bhaktapurDurbar',
    tint: '#B05545',
    source: {
      url: 'https://en.wikipedia.org/wiki/Bhaktapur_Durbar_Square',
      labelKey: 'sources.wikipedia',
    },
  },
  newariWindow: {
    id: 'newariWindow',
    tint: '#5A4A3B',
    source: {
      url: 'https://en.wikipedia.org/wiki/Newar_architecture',
      labelKey: 'sources.wikipedia',
    },
  },
  torana: {
    id: 'torana',
    tint: '#C09556',
    source: {
      url: 'https://en.wikipedia.org/wiki/Torana',
      labelKey: 'sources.wikipedia',
    },
  },
  prayerWheel: {
    id: 'prayerWheel',
    tint: '#B05F2C',
    source: {
      url: 'https://en.wikipedia.org/wiki/Prayer_wheel',
      labelKey: 'sources.wikipedia',
    },
  },
  bell: {
    id: 'bell',
    tint: '#8A6A3C',
    source: {
      url: 'https://en.wikipedia.org/wiki/Bell_(instrument)',
      labelKey: 'sources.wikipedia',
    },
  },
  diyo: {
    id: 'diyo',
    tint: '#E07A4A',
    source: {
      url: 'https://en.wikipedia.org/wiki/Diya_(lamp)',
      labelKey: 'sources.wikipedia',
    },
  },
};

export const ELEMENT_META: Record<ElementId, ElementMeta> = Object.fromEntries(
  ELEMENTS.map((id) => [id, { ...SEED[id], image: ELEMENT_IMAGES[id] }]),
) as Record<ElementId, ElementMeta>;

export function isElementId(value: string): value is ElementId {
  return (ELEMENTS as ReadonlyArray<string>).includes(value);
}
