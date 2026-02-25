import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import { usePathname } from 'expo-router';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserStore } from '@/store/userStore';
import type { Id } from '@/convex/_generated/dataModel';

// One session per app launch
const SESSION_ID = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export function usePageTracking() {
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);

  const recordPageView = useMutation(api.pageViews.recordPageView);
  const updateDuration = useMutation(api.pageViews.updatePageViewDuration);

  const currentRef = useRef<{
    pageViewId: Id<"pageViews"> | null;
    enteredAt: number;
    path: string;
  }>({ pageViewId: null, enteredAt: 0, path: '' });

  // Flush duration for the current page view
  const flushDuration = () => {
    const { pageViewId, enteredAt } = currentRef.current;
    if (!pageViewId || !enteredAt) return;

    const duration = Math.round((Date.now() - enteredAt) / 1000);
    if (duration > 0) {
      updateDuration({ pageViewId, duration }).catch(() => {});
    }
    currentRef.current = { pageViewId: null, enteredAt: 0, path: '' };
  };

  // Track pathname changes
  useEffect(() => {
    if (!user?.id || !pathname) return;

    // Flush previous page
    flushDuration();

    // Record new page view
    const enteredAt = Date.now();
    currentRef.current = { pageViewId: null, enteredAt, path: pathname };

    recordPageView({
      userId: user.id,
      path: pathname,
      sessionId: SESSION_ID,
    })
      .then((id) => {
        // Only set if we're still on the same page
        if (currentRef.current.path === pathname) {
          currentRef.current.pageViewId = id;
        }
      })
      .catch(() => {});
  }, [pathname, user?.id]);

  // AppState listener — flush on background
  useEffect(() => {
    const handleAppState = (nextState: AppStateStatus) => {
      if (nextState !== 'active') {
        flushDuration();
      }
    };

    const sub = AppState.addEventListener('change', handleAppState);
    return () => sub.remove();
  }, []);
}
