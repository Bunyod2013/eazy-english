"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const GOALS = [
  {
    xp: 10,
    emoji: "🐢",
    title: "Oson",
    sub: "Kuniga 5 daqiqa",
    desc: "Sekin lekin izchil",
    color: "#22c55e",
  },
  {
    xp: 20,
    emoji: "🐇",
    title: "Normal",
    sub: "Kuniga 10 daqiqa",
    desc: "Ko'pchilik uchun mos",
    color: "#3b82f6",
    recommended: true,
  },
  {
    xp: 30,
    emoji: "🦊",
    title: "Jiddiy",
    sub: "Kuniga 15 daqiqa",
    desc: "Tez rivojlanish",
    color: "#f59e0b",
  },
  {
    xp: 50,
    emoji: "🦁",
    title: "Qattiq",
    sub: "Kuniga 20+ daqiqa",
    desc: "Maksimal natija",
    color: "#ef4444",
  },
];

function DailyGoalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = searchParams.get("language") || "uz";
  const skillLevel = searchParams.get("skillLevel") || "beginner";
  const [selected, setSelected] = useState(20);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-5 py-6 flex flex-col min-h-screen">
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div
              className="h-full bg-[#58cc02] rounded-full transition-all duration-300"
              style={{ width: "80%" }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right mt-1.5">4 / 5</p>
        </div>

        {/* Header */}
        <div className="mt-2 mb-7">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
            Kunlik maqsadingiz
            <br />
            qanday bo&apos;lsin?
          </h1>
          <p className="text-base text-gray-500">
            Har kuni qancha vaqt ajratasiz?
          </p>
        </div>

        {/* Goal Cards */}
        <div className="flex flex-col gap-3">
          {GOALS.map((goal) => {
            const isSelected = selected === goal.xp;
            return (
              <button
                key={goal.xp}
                onClick={() => setSelected(goal.xp)}
                className={`rounded-2xl border-2 p-4.5 flex items-center text-left transition-all hover:shadow-md ${
                  isSelected
                    ? "shadow-sm"
                    : "border-gray-100 bg-white"
                }`}
                style={{
                  borderColor: isSelected ? goal.color : undefined,
                  backgroundColor: isSelected
                    ? `${goal.color}08`
                    : undefined,
                }}
              >
                {/* Emoji */}
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center mr-3.5 shrink-0"
                  style={{ backgroundColor: `${goal.color}12`, width: 52, height: 52 }}
                >
                  <span className="text-3xl">{goal.emoji}</span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-gray-900 tracking-tight">
                      {goal.title}
                    </p>
                    {goal.recommended && (
                      <span
                        className="text-white text-[11px] font-bold px-2 py-0.5 rounded-lg"
                        style={{ backgroundColor: goal.color }}
                      >
                        Tavsiya
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {goal.sub} — {goal.desc}
                  </p>
                </div>

                {/* XP Badge */}
                <div
                  className="rounded-xl px-2.5 py-1.5 flex flex-col items-center min-w-[50px] shrink-0"
                  style={{
                    backgroundColor: isSelected ? goal.color : "#f5f5f7",
                  }}
                >
                  <span
                    className="text-sm font-extrabold"
                    style={{
                      color: isSelected ? "#fff" : "#9ca3af",
                    }}
                  >
                    {goal.xp}
                  </span>
                  <span
                    className="text-[10px] font-semibold -mt-0.5"
                    style={{
                      color: isSelected
                        ? "rgba(255,255,255,0.8)"
                        : "#9ca3af",
                    }}
                  >
                    XP
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Streak Info */}
        <div className="mt-6 bg-orange-50 rounded-2xl p-4 flex items-center border border-orange-200">
          <span className="text-xl mr-3">🔥</span>
          <p className="text-sm text-gray-600 flex-1 leading-relaxed">
            Har kuni maqsadga erishsangiz, streak (ketma-ketlik) oshadi va
            bonus XP olasiz!
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Button */}
        <div className="pb-8 pt-4">
          <button
            onClick={() =>
              router.push(
                `/onboarding/username?language=${language}&skillLevel=${skillLevel}&dailyGoal=${selected}`
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

export default function DailyGoalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#58cc02] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DailyGoalContent />
    </Suspense>
  );
}
