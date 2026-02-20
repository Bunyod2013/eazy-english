"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<"google" | null>(null);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      setLoadingProvider("google");

      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result?.error) {
        const errMsg =
          typeof result.error === "string"
            ? result.error
            : result.error?.message ||
              result.error?.code ||
              JSON.stringify(result.error);
        console.error("[Auth] Server error:", errMsg);
        throw new Error(errMsg);
      }

      const session = await authClient.getSession();
      if (session?.data) {
        router.replace("/");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown error";
      console.error("[Auth] Error:", message);
      alert("Google orqali kirishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleGuestMode = () => {
    router.push("/onboarding/purpose");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-5 py-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center pt-12 pb-12">
          {/* Mascot */}
          <div className="w-28 h-28 bg-[#58cc02] rounded-[2rem] flex items-center justify-center mb-6 shadow-lg shadow-green-300/30">
            <span className="text-6xl">🦁</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 text-center tracking-tight mb-1">
            EazyEnglish
          </h1>
          <p className="text-lg text-gray-500 text-center">
            Learn English. Have fun.
          </p>
        </div>

        {/* Auth Cards - Bento Grid */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Google Sign In - Full Width */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full bg-white rounded-[1.75rem] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left disabled:opacity-60"
          >
            <div className="flex items-center">
              {loadingProvider === "google" ? (
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mr-4">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-[#4285F4] rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-white font-semibold">G</span>
                </div>
              )}
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900 tracking-tight">
                  Gmail bilan kirish
                </p>
                <p className="text-sm text-gray-400">
                  Google account orqali
                </p>
              </div>
              <span className="text-xl text-gray-300">&rsaquo;</span>
            </div>
          </button>

          {/* Guest Mode */}
          <button
            onClick={handleGuestMode}
            disabled={isLoading}
            className="w-full bg-green-50 rounded-[1.75rem] p-5 border border-green-100 hover:shadow-md transition-all text-left disabled:opacity-60"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/60 rounded-xl flex items-center justify-center mr-4">
                <span className="text-xl">👋</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900 tracking-tight">
                  Mehmon rejimi
                </p>
                <p className="text-sm text-gray-500">
                  Ro&apos;yxatdan o&apos;tmasdan sinash / Test without signing up
                </p>
              </div>
              <span className="text-xl text-gray-300">&rsaquo;</span>
            </div>
          </button>
        </div>

        {/* Info Card */}
        <div className="mt-5 p-6 bg-gray-100 rounded-[1.75rem] border border-gray-200/50">
          <div className="flex items-start">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mr-3.5 border border-amber-100 shrink-0">
              <span className="text-lg">✨</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-2 tracking-tight">
                Nega ro&apos;yxatdan o&apos;tish kerak?
              </p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center">
                  <div className="w-1 h-1 rounded-full bg-[#58cc02] mr-2 shrink-0" />
                  <p className="text-sm text-gray-500">
                    Progress&apos;ni saqlash / Save your progress
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-1 h-1 rounded-full bg-[#58cc02] mr-2 shrink-0" />
                  <p className="text-sm text-gray-500">
                    Barcha qurilmalarda sync / Sync across devices
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-1 h-1 rounded-full bg-[#58cc02] mr-2 shrink-0" />
                  <p className="text-sm text-gray-500">
                    Yutuqlar va leaderboard / Achievements & leaderboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 px-5">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Davom etish orqali siz{" "}
            <span className="font-medium">Foydalanish shartlari</span> va{" "}
            <span className="font-medium">Maxfiylik siyosati</span>ga rozilik
            bildirasiz
          </p>
        </div>
      </div>
    </div>
  );
}
