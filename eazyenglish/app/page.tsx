"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/userStore";

export default function IndexPage() {
  const router = useRouter();
  const { user, isLoading, loadUser } = useUserStore();
  // Reactive session hook - updates when ConvexBetterAuthProvider processes OTT
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  // Detect if OTT is being processed (OAuth callback redirect)
  const [hasOtt] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).has("ott");
    }
    return false;
  });

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (isLoading || isSessionPending) return;

    if (user) {
      router.replace("/home");
    } else if (session) {
      router.replace("/onboarding/purpose");
    } else if (!hasOtt) {
      // Only redirect to login if NOT processing an OTT token
      // ConvexBetterAuthProvider will process OTT and update session reactively
      router.replace("/auth/login");
    }
  }, [user, isLoading, isSessionPending, session, hasOtt, router]);

  // Fallback timeout: if OTT processing takes too long, redirect to login
  useEffect(() => {
    if (hasOtt && !session && !isSessionPending) {
      const timeout = setTimeout(() => {
        router.replace("/auth/login");
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [hasOtt, session, isSessionPending, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-5 py-6 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#58cc02] flex items-center justify-center animate-pulse">
          <span className="text-4xl">🦁</span>
        </div>
        <p className="text-gray-500 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
