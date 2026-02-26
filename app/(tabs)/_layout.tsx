import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/navigation/CustomTabBar';
import { useIsDesktop } from '@/utils/useIsDesktop';

export default function TabLayout() {
  const isDesktop = useIsDesktop();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarPosition: isDesktop ? 'left' : 'bottom',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "O'rganish" }}
      />
      <Tabs.Screen
        name="plans"
        options={{ title: 'Rejalar' }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{ title: 'Reyting' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profil' }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Ko'proq" }}
      />
    </Tabs>
  );
}
