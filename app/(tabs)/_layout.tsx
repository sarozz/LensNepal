import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';

export default function TabsLayout() {
  const { t } = useTranslation('tabs');
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.inkSubtle,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tabs.Screen name="explore" options={{ title: t('explore') }} />
      <Tabs.Screen name="routes" options={{ title: t('routes') }} />
      <Tabs.Screen name="collection" options={{ title: t('collection') }} />
      <Tabs.Screen name="guide" options={{ title: t('guide') }} />
    </Tabs>
  );
}
