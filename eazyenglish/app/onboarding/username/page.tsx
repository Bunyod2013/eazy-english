"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";

const AVATARS = ["🦁", "🐻", "🦊", "🐼", "🐸", "🦉", "🐱", "🐶"];

function UsernameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = (searchParams.get("language") as "uz" | "en") || "uz";
  const skillLevel =
    (searchParams.get("skillLevel") as
      | "beginner"
      | "elementary"
      | "intermediate") || "beginner";
  const dailyGoal = parseInt(searchParams.get("dailyGoal") || "20");

  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🦁");
  const [isLoading, setIsLoading] = useState(false);
  const { createUser } = useUserStore();
  const { initializeProgress } = useProgressStore();

  const canContinue = username.trim().length >= 2;

  const handleComplete = async () => {
    if (!canContinue) return;
    setIsLoading(true);
    try {
      createUser(username.trim(), language, skillLevel);
      initializeProgress(Date.now().toString());
      router.replace("/home");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLanguageLabel = () => {
    if (language === "uz") return "O'zbekcha";
    if (language === "ru") return "Русский";
    return "English";
  };

  const getSkillLevelLabel = () => {
    if (skillLevel === "beginner") return "Boshlang'ich";
    if (skillLevel === "elementary") return "Elementar";
    return "O'rta";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-5 py-6 pb-32">
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div
              className="h-full bg-[#58cc02] rounded-full transition-all duration-300"
              style={{ width: "100%" }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right mt-1.5">5 / 5</p>
        </div>

        {/* Header */}
        <div className="mt-2 mb-7">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
            Profilingizni
            <br />
            yarating
          </h1>
          <p className="text-base text-gray-500">
            Ismingiz va avatarni tanlang
          </p>
        </div>

        {/* Avatar Selection */}
        <div className="mb-7">
          {/* Selected Avatar Preview */}
          <div className="flex justify-center mb-5">
            <div className="w-22 h-22 rounded-[1.75rem] bg-green-50 border-[3px] border-[#58cc02] flex items-center justify-center shadow-md shadow-green-200/40"
              style={{ width: 88, height: 88 }}
            >
              <span className="text-5xl">{selectedAvatar}</span>
            </div>
          </div>

          {/* Avatar Grid */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {AVATARS.map((avatar) => {
              const isActive = selectedAvatar === avatar;
              return (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    isActive
                      ? "bg-green-50 border-[#58cc02]"
                      : "bg-gray-50 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <span className="text-3xl">{avatar}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-500 mb-2 ml-1 block">
            Ismingiz
          </label>
          <div
            className={`bg-white rounded-2xl border-2 overflow-hidden transition-colors ${
              username.length > 0 ? "border-[#58cc02]" : "border-gray-200"
            }`}
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masalan: Aziz"
              maxLength={20}
              autoCapitalize="words"
              autoCorrect="off"
              className="w-full px-4 py-4 text-lg font-medium text-gray-900 placeholder-gray-300 outline-none bg-transparent"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5 ml-1">
            {username.length}/20
          </p>
        </div>

        {/* Settings Summary Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 mb-3.5 uppercase tracking-wider">
            Sozlamalar
          </p>

          {[
            {
              label: "Til",
              value: getLanguageLabel(),
              emoji: "🌍",
            },
            {
              label: "Daraja",
              value: getSkillLevelLabel(),
              emoji: "📊",
            },
            {
              label: "Kunlik maqsad",
              value: `${dailyGoal} XP`,
              emoji: "🎯",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center py-2.5 ${
                i > 0 ? "border-t border-gray-50" : ""
              }`}
            >
              <span className="text-lg mr-3">{item.emoji}</span>
              <span className="text-sm text-gray-500 flex-1">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-100 px-5 pb-8 pt-4">
        <div className="max-w-md mx-auto">
          <button
            disabled={!canContinue || isLoading}
            onClick={handleComplete}
            className={`w-full rounded-xl py-4 font-bold text-lg transition-colors flex items-center justify-center gap-2 ${
              canContinue
                ? "bg-[#58cc02] text-white hover:bg-[#4db302]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Boshlaymiz!"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UsernamePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#58cc02] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UsernameContent />
    </Suspense>
  );
}
