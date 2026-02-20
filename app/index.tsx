import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useQuery } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { useUserStore } from '@/store/userStore';
import { api } from '@/convex/_generated/api';
import { Loader } from '@/components/ui';

/**
 * Entry point - determines if user should see onboarding or main app
 */
export default function Index() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const { user, isLoading, loadUser } = useUserStore();

  // Query Convex user profile when authenticated
  const isAuthenticated = session !== null && session !== undefined;
  const convexUser = useQuery(
    api.users.getCurrentUser,
    isAuthenticated ? {} : "skip"
  );

  useEffect(() => {
    // Wait for user store and session to load
    if (isLoading || sessionLoading) return;
    // If authenticated, wait for Convex user query to complete
    if (isAuthenticated && convexUser === undefined) return;

    console.log('[Index] Routing:', {
      isAuthenticated,
      hasLocalUser: !!user,
      hasConvexUser: !!convexUser,
    });

    if (user) {
      // Local user exists → go to home
      router.replace('/(tabs)/home');
    } else if (isAuthenticated && convexUser) {
      // Authenticated + has Convex profile → restore local user and go to home
      console.log('[Index] Restoring user from Convex:', convexUser.username);
      // Populate local store with Convex data, then navigate
      loadUser().then(() => router.replace('/(tabs)/home'));
    } else if (isAuthenticated) {
      // Authenticated but no profile yet → onboarding
      router.replace('/onboarding/welcome');
    } else {
      // Not authenticated → login
      router.replace('/auth/login');
    }
  }, [session, sessionLoading, user, isLoading, convexUser]);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Loader size="large" message="Loading..." />
    </View>
  );
}
