import PostHog from 'posthog-react-native';
import { readEnv } from './env';

let client: PostHog | null = null;

export function initAnalytics(): boolean {
  if (client !== null) return false;
  const { posthogApiKey, posthogHost } = readEnv();
  if (!posthogApiKey) return false;
  client = new PostHog(posthogApiKey, {
    host: posthogHost,
    personProfiles: 'identified_only',
    disableSurveys: true,
  });
  return true;
}
