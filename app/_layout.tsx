import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import { ConvexReactClient } from 'convex/react';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { authClient } from '@/lib/auth-client';
import { useUserStore } from '@/store/userStore';
import { useProgressStore } from '@/store/progressStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useLessonStore } from '@/store/lessonStore';
import { Loader } from '@/components/ui';
import { useTheme } from '@/utils/theme';
import '../global.css';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL as string, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { loadUser, isLoading: userLoading } = useUserStore();
  const { loadProgress } = useProgressStore();
  const { loadSettings } = useSettingsStore();
  const { loadLessons } = useLessonStore();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    const initialize = async () => {
      try {
        // ✅ CRITICAL: Configure audio mode FIRST!
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,        // ← THE FIX!
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          interruptionModeIOS: 1,
          shouldDuckAndroid: true,
        });
        console.log('✅ [App] Audio mode configured at startup');
        
        // Load all stores
        await Promise.all([
          loadUser(),
          loadSettings(),
        ]);
        
        // Load lessons from local data
        loadLessons();
        
        setIsInitialized(true);
      } catch (error) {
        console.error('❌ [App] Error initializing:', error);
        setIsInitialized(true);
      }
    };

    initialize();
  }, []);

  if (!isInitialized || userLoading) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
          <Loader fullScreen message="Loading EazyEnglish..." />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      <SafeAreaProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.bg.primary },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </ConvexBetterAuthProvider>
  );
}
