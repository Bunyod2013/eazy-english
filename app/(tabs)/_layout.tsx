import { Tabs } from 'expo-router';
import { HomeIcon, PeopleIcon, SettingsIcon, TrophyIcon } from '@/components/icons';
import { CustomTabBar } from '@/components/navigation/CustomTabBar';
import { useIsDesktop } from '@/utils/useIsDesktop';
import { useTheme } from '@/utils/theme';

export default function TabLayout() {
  const isDesktop = useIsDesktop();
  const { colors } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      sceneContainerStyle={{ marginLeft: isDesktop ? 240 : 0 }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Learn' }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{ title: 'Reyting' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'More' }}
      />
    </Tabs>
  );
}
