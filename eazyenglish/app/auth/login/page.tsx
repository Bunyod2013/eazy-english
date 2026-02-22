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

        {/* Start Button */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={handleGuestMode}
            className="w-full bg-[#58cc02] rounded-[1.75rem] p-6 shadow-md shadow-green-300/30 hover:bg-[#4db302] active:scale-[0.98] transition-all text-center"
          >
            <p className="text-xl font-bold text-white tracking-tight">
              Boshlash
            </p>
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
