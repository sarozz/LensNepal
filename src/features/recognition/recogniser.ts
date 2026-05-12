import { type ElementId, type Match, RECOGNITION_DATASET } from './dataset';

const THINKING_DELAY_MS = 600;

function randomElement(): ElementId {
  const index = Math.min(
    Math.floor(Math.random() * RECOGNITION_DATASET.length),
    RECOGNITION_DATASET.length - 1,
  );
  const picked = RECOGNITION_DATASET[index];
  return picked ?? RECOGNITION_DATASET[0];
}

export async function recognise(_photoUri: string): Promise<Match> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, THINKING_DELAY_MS);
  });
  return {
    elementId: randomElement(),
    confidence: 0.5 + Math.random() * 0.5,
  };
}
