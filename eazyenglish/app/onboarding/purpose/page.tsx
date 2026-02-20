"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PURPOSES = [
  { id: "work", emoji: "💼", label: "Ish uchun", sub: "Career & business" },
  { id: "study", emoji: "📚", label: "O'qish uchun", sub: "Education" },
  { id: "travel", emoji: "✈️", label: "Sayohat", sub: "Travel the world" },
  { id: "startup", emoji: "🚀", label: "Startup", sub: "Tech & business" },
  { id: "friends", emoji: "👥", label: "Do'stlar", sub: "Social connections" },
  { id: "movies", emoji: "🎬", label: "Kino & serial", sub: "Entertainment" },
  { id: "music", emoji: "🎵", label: "Musiqa", sub: "Songs & lyrics" },
  { id: "games", emoji: "🎮", label: "O'yinlar", sub: "Gaming & esports" },
  { id: "general", emoji: "🌟", label: "Umumiy bilim", sub: "General knowledge" },
];

export default function PurposePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-5 py-6">
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div
              className="h-full bg-[#58cc02] rounded-full transition-all duration-300"
              style={{ width: "20%" }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right mt-1.5">1 / 5</p>
        </div>

        {/* Header */}
        <div className="mb-6 mt-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
            Nima uchun ingliz tili
            <br />
            o&apos;rganmoqchisiz?
          </h1>
          <p className="text-base text-gray-500">
            Bir nechta variantni tanlashingiz mumkin
          </p>
        </div>

        {/* Purpose Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-2.5 pb-28">
          {PURPOSES.map((purpose) => {
            const isSelected = selected.includes(purpose.id);
            return (
              <button
                key={purpose.id}
                onClick={() => toggle(purpose.id)}
                className={`rounded-2xl border-2 p-4 text-left min-h-[110px] flex flex-col justify-between transition-all hover:shadow-md ${
                  isSelected
                    ? "border-[#58cc02] bg-green-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-[#58cc02]/10" : "bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl">{purpose.emoji}</span>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#58cc02] flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        ✓
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-base font-semibold text-gray-900 tracking-tight">
                    {purpose.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {purpose.sub}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-100 px-5 pb-8 pt-4">
          <div className="max-w-md mx-auto">
            <button
              disabled={selected.length === 0}
              onClick={() => router.push("/onboarding/language")}
              className={`w-full rounded-xl py-4 font-bold text-lg transition-colors ${
                selected.length > 0
                  ? "bg-[#58cc02] text-white hover:bg-[#4db302]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Davom etish{selected.length > 0 ? ` (${selected.length})` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
