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

  // Detect OTT on client side (useEffect, not useState, because window is
  // unavailable during SSR and useState initializer won't re-run on hydration)
  const [hasOtt, setHasOtt] = useState(true); // default true to prevent flash redirect
  const [ottChecked, setOttChecked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHasOtt(params.has("ott"));
    setOttChecked(true);
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (isLoading || isSessionPending || !ottChecked) return;

    if (user) {
      router.replace("/home");
    } else if (session) {
      router.replace("/onboarding/purpose");
    } else if (!hasOtt) {
      router.replace("/auth/login");
    }
    // If hasOtt is true, wait for ConvexBetterAuthProvider to process OTT
  }, [user, isLoading, isSessionPending, session, hasOtt, ottChecked, router]);

  // Fallback timeout: if OTT processing takes too long, redirect to login
  useEffect(() => {
    if (hasOtt && ottChecked && !session && !isSessionPending) {
      const timeout = setTimeout(() => {
        router.replace("/auth/login");
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [hasOtt, ottChecked, session, isSessionPending, router]);

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
