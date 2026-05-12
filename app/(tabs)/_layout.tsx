import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from '@/components/primitives';
import { useTheme } from '@/hooks/useTheme';

function HelpButton() {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <Pressable
      onPress={() => router.push('/etiquette')}
      accessibilityLabel={t('openEtiquette')}
      accessibilityRole="button"
      style={{ paddingHorizontal: 16, paddingVertical: 4 }}
    >
      <Text variant="title2" color="accent">
        {t('helpGlyph')}
      </Text>
    </Pressable>
  );
}

export default function TabsLayout() {
  const { t } = useTranslation('tabs');
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: theme.colors.ink,
          fontSize: theme.typography.title3.latin.fontSize,
          fontWeight: '600',
        },
        headerShadowVisible: false,
        headerRight: () => <HelpButton />,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.inkSubtle,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.caption.latin.fontSize,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: t('explore'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: t('routes'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: t('collection'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: t('guide'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
