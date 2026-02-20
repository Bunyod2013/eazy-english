import { Stack } from 'expo-router';
import { useTheme } from '@/utils/theme';

export default function OnboardingLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg.secondary },
        animation: 'slide_from_right',
      }}
    />
  );
}
