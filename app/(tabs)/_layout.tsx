import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { HomeIcon, PeopleIcon, SettingsIcon, TrophyIcon, BookIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

export default function TabLayout() {
  const { colors, isDark } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bg.elevated,
          borderTopWidth: 1,
          borderTopColor: colors.border.primary,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 10,
          shadowColor: isDark ? '#ffffff' : '#000000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.2 : 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: colors.green.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              backgroundColor: focused ? (isDark ? 'rgba(88, 204, 2, 0.2)' : 'rgba(34, 197, 94, 0.1)') : 'transparent',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 20,
            }}>
              <HomeIcon size={24} color={focused ? colors.green.primary : colors.text.tertiary} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Reyting',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              backgroundColor: focused ? (isDark ? 'rgba(88, 204, 2, 0.2)' : 'rgba(34, 197, 94, 0.1)') : 'transparent',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 20,
            }}>
              <TrophyIcon size={24} color={focused ? colors.green.primary : colors.text.tertiary} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              backgroundColor: focused ? (isDark ? 'rgba(88, 204, 2, 0.2)' : 'rgba(34, 197, 94, 0.1)') : 'transparent',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 20,
            }}>
              <PeopleIcon size={24} color={focused ? colors.green.primary : colors.text.tertiary} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              backgroundColor: focused ? (isDark ? 'rgba(88, 204, 2, 0.2)' : 'rgba(34, 197, 94, 0.1)') : 'transparent',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 20,
            }}>
              <SettingsIcon size={24} color={focused ? colors.green.primary : colors.text.tertiary} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
