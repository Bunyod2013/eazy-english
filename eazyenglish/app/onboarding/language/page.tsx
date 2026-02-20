"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Language = "uz" | "ru" | "en";

const LANGUAGES = [
  {
    code: "uz" as Language,
    name: "O'zbekcha",
    sub: "Ona tilida tushuntirish",
    flag: "🇺🇿",
    recommended: true,
  },
  {
    code: "ru" as Language,
    name: "Русский",
    sub: "Объяснения на русском",
    flag: "🇷🇺",
    recommended: false,
  },
  {
    code: "en" as Language,
    name: "English",
    sub: "For advanced learners",
    flag: "🇬🇧",
    recommended: false,
  },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Language>("uz");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-5 py-6 flex flex-col min-h-screen">
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div
              className="h-full bg-[#58cc02] rounded-full transition-all duration-300"
              style={{ width: "40%" }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right mt-1.5">2 / 5</p>
        </div>

        {/* Header */}
        <div className="mt-2 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
            Qaysi tilda
            <br />
            o&apos;rganmoqchisiz?
          </h1>
          <p className="text-base text-gray-500">
            Tushuntirishlar shu tilda bo&apos;ladi
          </p>
        </div>

        {/* Language Cards */}
        <div className="flex flex-col gap-3">
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`rounded-2xl border-2 p-5 flex items-center text-left transition-all hover:shadow-md ${
                  isSelected
                    ? "border-[#58cc02] bg-green-50 shadow-sm"
                    : "border-gray-100 bg-white"
                }`}
              >
                {/* Flag */}
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mr-4 text-4xl shrink-0">
                  {lang.flag}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-gray-900 tracking-tight">
                      {lang.name}
                    </p>
                    {lang.recommended && (
                      <span className="bg-[#58cc02] text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
                        Tavsiya
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{lang.sub}</p>
                </div>

                {/* Radio */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "border-[#58cc02] bg-[#58cc02]"
                      : "border-gray-300 bg-transparent"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tip */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-4 flex items-center border border-blue-100">
          <span className="text-xl mr-3">💡</span>
          <p className="text-sm text-gray-600 flex-1 leading-relaxed">
            O&apos;zbekchani tanlasangiz, darslar sizga tanish tilda
            tushuntiriladi
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Button */}
        <div className="pb-8 pt-4">
          <button
            onClick={() =>
              router.push(`/onboarding/skill-level?language=${selected}`)
            }
            className="bg-[#58cc02] text-white rounded-xl py-4 font-bold text-lg hover:bg-[#4db302] transition-colors w-full"
          >
            Davom etish
          </button>
        </div>
      </div>
    </div>
  );
}
