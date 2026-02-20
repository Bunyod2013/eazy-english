"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SkillLevel = "beginner" | "elementary" | "intermediate";

const LEVELS = [
  {
    level: "beginner" as SkillLevel,
    emoji: "🌱",
    title: "Boshlang'ich",
    sub: "Beginner",
    desc: "Men hozirgina boshlayman. ABC dan boshlaymiz!",
    color: "#22c55e",
    bgClass: "bg-green-50",
    borderClass: "border-green-200",
  },
  {
    level: "elementary" as SkillLevel,
    emoji: "📖",
    title: "Elementar",
    sub: "Elementary",
    desc: "Bir necha oddiy so'z va iboralarni bilaman",
    color: "#3b82f6",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200",
  },
  {
    level: "intermediate" as SkillLevel,
    emoji: "🚀",
    title: "O'rta daraja",
    sub: "Intermediate",
    desc: "Oddiy jumlalar tuza olaman va suhbatlarni tushunaman",
    color: "#8b5cf6",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-200",
  },
];

function SkillLevelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = searchParams.get("language") || "uz";
  const [selected, setSelected] = useState<SkillLevel>("beginner");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-5 py-6 flex flex-col min-h-screen">
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div
              className="h-full bg-[#58cc02] rounded-full transition-all duration-300"
              style={{ width: "60%" }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right mt-1.5">3 / 5</p>
        </div>

        {/* Header */}
        <div className="mt-2 mb-7">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
            Ingliz tili
            <br />
            darajangiz qanday?
          </h1>
          <p className="text-base text-gray-500">
            Sizga mos darslarni tanlaymiz
          </p>
        </div>

        {/* Level Cards */}
        <div className="flex flex-col gap-3.5">
          {LEVELS.map((item) => {
            const isSelected = selected === item.level;
            return (
              <button
                key={item.level}
                onClick={() => setSelected(item.level)}
                className={`rounded-2xl border-2 p-5 text-left transition-all hover:shadow-md ${
                  isSelected
                    ? `${item.bgClass} shadow-sm`
                    : "border-gray-100 bg-white"
                }`}
                style={{
                  borderColor: isSelected ? item.color : undefined,
                }}
              >
                <div className="flex items-center">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shrink-0 border ${item.bgClass} ${item.borderClass}`}
                  >
                    <span className="text-3xl">{item.emoji}</span>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-900 tracking-tight">
                      {item.title}
                    </p>
                    <p
                      className="text-sm font-semibold mt-0.5"
                      style={{ color: item.color }}
                    >
                      {item.sub}
                    </p>
                  </div>

                  {/* Radio */}
                  <div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: isSelected ? item.color : "#d4d4d4",
                      backgroundColor: isSelected ? item.color : "transparent",
                    }}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-3 ml-[4.5rem] leading-relaxed">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Tip */}
        <div className="mt-6 bg-amber-50 rounded-2xl p-4 flex items-center border border-amber-200">
          <span className="text-xl mr-3">💡</span>
          <p className="text-sm text-gray-600 flex-1 leading-relaxed">
            Ishonchingiz komil bo&apos;lmasa, boshlang&apos;ich darajadan
            boshlang. Tez rivojlanasiz!
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Button */}
        <div className="pb-8 pt-4">
          <button
            onClick={() =>
              router.push(
                `/onboarding/daily-goal?language=${language}&skillLevel=${selected}`
              )
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

export default function SkillLevelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#58cc02] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SkillLevelContent />
    </Suspense>
  );
}
