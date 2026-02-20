"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/userStore";

export default function IndexPage() {
  const router = useRouter();
  const { user, isLoading, loadUser } = useUserStore();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session?.data);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setSessionChecked(true);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (isLoading || !sessionChecked) return;

    if (user) {
      router.replace("/home");
    } else if (isAuthenticated) {
      router.replace("/onboarding/purpose");
    } else {
      router.replace("/auth/login");
    }
  }, [user, isLoading, sessionChecked, isAuthenticated, router]);

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
