export const RECOGNITION_DATASET = [
  'boudha',
  'pashupatinath',
  'swayambhu',
  'lionGate',
  'lotusMotif',
] as const satisfies readonly [string, ...string[]];

export type ElementId = (typeof RECOGNITION_DATASET)[number];

export type Match = {
  elementId: ElementId;
  confidence: number;
};

export type RecognisedElement = {
  id: ElementId;
  source: { url: string; labelKey: 'sources.wikipedia' };
};

export const ELEMENT_SOURCES: Record<ElementId, RecognisedElement> = {
  boudha: {
    id: 'boudha',
    source: { url: 'https://en.wikipedia.org/wiki/Boudhanath', labelKey: 'sources.wikipedia' },
  },
  pashupatinath: {
    id: 'pashupatinath',
    source: {
      url: 'https://en.wikipedia.org/wiki/Pashupatinath_Temple',
      labelKey: 'sources.wikipedia',
    },
  },
  swayambhu: {
    id: 'swayambhu',
    source: { url: 'https://en.wikipedia.org/wiki/Swayambhunath', labelKey: 'sources.wikipedia' },
  },
  lionGate: {
    id: 'lionGate',
    source: {
      url: 'https://en.wikipedia.org/wiki/Newar_architecture',
      labelKey: 'sources.wikipedia',
    },
  },
  lotusMotif: {
    id: 'lotusMotif',
    source: {
      url: 'https://en.wikipedia.org/wiki/Padma_(attribute)',
      labelKey: 'sources.wikipedia',
    },
  },
};

export function isElementId(value: string): value is ElementId {
  return (RECOGNITION_DATASET as ReadonlyArray<string>).includes(value);
}
