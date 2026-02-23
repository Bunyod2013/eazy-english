import { useEffect, useState, useRef } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, Text, View } from 'react-native';
import { ConvexReactClient, useMutation } from 'convex/react';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { api } from '@/convex/_generated/api';
import { authClient } from '@/lib/auth-client';
import { useUserStore } from '@/store/userStore';
import { useProgressStore } from '@/store/progressStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useLessonStore } from '@/store/lessonStore';
import { Loader } from '@/components/ui';
import { useTheme } from '@/utils/theme';
import '../global.css';

// Syncs existing local guest users to Convex DB
function GuestSync() {
  const user = useUserStore((s) => s.user);
  const registerGuestUser = useMutation(api.users.registerGuestUser);
  const synced = useRef(false);

  useEffect(() => {
    if (!user || synced.current) return;
    synced.current = true;

    registerGuestUser({
      guestId: user.id,
      username: user.username,
      preferredLanguage: user.preferredLanguage,
      skillLevel: user.skillLevel,
      dailyGoal: user.dailyGoal || 50,
      avatar: undefined,
    }).catch(() => {});
  }, [user]);

  return null;
}

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  console.error('EXPO_PUBLIC_CONVEX_URL is not set!');
}
const convex = convexUrl
  ? new ConvexReactClient(convexUrl, { unsavedChangesWarning: false })
  : null;

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { loadUser, isLoading: userLoading, user } = useUserStore();
  const { loadProgress } = useProgressStore();
  const { loadSettings } = useSettingsStore();
  const { loadLessons } = useLessonStore();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    const initialize = async () => {
      try {
        // Configure audio mode (native only - not available on web)
        if (Platform.OS !== 'web') {
          const { Audio } = require('expo-av');
          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: 1,
            shouldDuckAndroid: true,
          });
        }

        // Load all stores
        await Promise.all([
          loadUser(),
          loadSettings(),
        ]);
        
        // Load lessons from local data (will reload with user data below)
        loadLessons();
        
        setIsInitialized(true);
      } catch (error) {
        console.error('❌ [App] Error initializing:', error);
        setIsInitialized(true);
      }
    };

    initialize();
  }, []);

  // Reload lessons when user data becomes available (with purpose/level)
  useEffect(() => {
    if (user && user.learningPurpose && user.learningPurpose.length > 0) {
      loadLessons(user.learningPurpose, user.skillLevel);
    }
  }, [user?.id]);

  if (!convex || !authClient) {
    const missing = [
      !convexUrl && 'EXPO_PUBLIC_CONVEX_URL',
      !authClient && 'EXPO_PUBLIC_CONVEX_SITE_URL',
    ].filter(Boolean).join(', ');
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'red', fontSize: 16, textAlign: 'center', padding: 20 }}>
            Configuration error: {missing} not set
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

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
      <GuestSync />
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
