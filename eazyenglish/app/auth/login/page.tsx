"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

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
            Ingliz tilini o&apos;yin orqali o&apos;rganing
          </p>
        </div>

        {/* Notice */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center">
          <p className="text-sm font-semibold text-amber-800">
            Hozircha Google va Apple orqali kirish ishlamaydi
          </p>
          <p className="text-xs text-amber-600 mt-1">
            Iltimos, &quot;Ro&apos;yxatdan o&apos;tmasdan sinash&quot; tugmasini bosing
          </p>
        </div>

        {/* Auth Cards */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Google Sign In - disabled */}
          <div className="w-full bg-white rounded-[1.75rem] p-6 shadow-sm border border-gray-100 opacity-50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#4285F4] rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl text-white font-semibold">G</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900 tracking-tight">
                  Gmail bilan kirish
                </p>
                <p className="text-sm text-gray-400">
                  Tez orada ishga tushadi
                </p>
              </div>
            </div>
          </div>

          {/* Apple Sign In - disabled */}
          <div className="w-full bg-white rounded-[1.75rem] p-6 shadow-sm border border-gray-100 opacity-50">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl text-white font-semibold"></span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900 tracking-tight">
                  Apple bilan kirish
                </p>
                <p className="text-sm text-gray-400">
                  Tez orada ishga tushadi
                </p>
              </div>
            </div>
          </div>

          {/* Guest Mode - primary action */}
          <button
            onClick={handleGuestMode}
            className="w-full bg-[#58cc02] rounded-[1.75rem] p-5 shadow-md shadow-green-300/30 hover:bg-[#4db302] transition-all text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <span className="text-xl">👋</span>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-white tracking-tight">
                  Ro&apos;yxatdan o&apos;tmasdan sinash
                </p>
                <p className="text-sm text-white/80">
                  Hoziroq boshlang!
                </p>
              </div>
              <span className="text-xl text-white/60">&rsaquo;</span>
            </div>
          </button>
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
