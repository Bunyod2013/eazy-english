"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";
import { useLessonStore } from "@/store/lessonStore";

const CATEGORY_EMOJI: Record<string, string> = {
  alphabet: "🔤",
  greetings: "👋",
  numbers: "🔢",
  colors: "🎨",
  family: "👨‍👩‍👧‍👦",
  food: "🍽️",
  animals: "🐾",
  daily_life: "☀️",
  school: "🏫",
  travel: "✈️",
  work: "💼",
  grammar: "📝",
  vocabulary: "📚",
};

export default function HomePage() {
  const router = useRouter();
  const { user, loadUser, updateStreak } = useUserStore();
  const { progress, loadProgress } = useProgressStore();
  const { lessons, loadLessons } = useLessonStore();

  useEffect(() => {
    loadUser();
    loadLessons();
  }, []);

  useEffect(() => {
    if (user) {
      loadProgress(user.id);
      updateStreak();
    }
  }, [user]);

  // Redirect to login if no user
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        const { user: currentUser, isLoading } = useUserStore.getState();
        if (!currentUser && !isLoading) {
          router.replace("/auth/login");
        }
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [user, router]);

  if (!user || !progress) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#58cc02] flex items-center justify-center animate-pulse">
            <span className="text-4xl">🦁</span>
          </div>
          <p className="text-gray-500 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const completedLessonIds = progress.completedLessons.map((l) => l.lessonId);
  const totalCompleted = completedLessonIds.length;

  // Determine which lessons are unlocked
  const getStatus = (
    lessonId: string,
    requiredXP: number
  ): "completed" | "unlocked" | "locked" => {
    if (completedLessonIds.includes(lessonId)) return "completed";
    if (user.totalXP >= requiredXP) return "unlocked";
    return "locked";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-5 py-6">
        {/* Stats Row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-xl px-3 py-1.5">
            <span className="text-sm">🔥</span>
            <span className="text-sm font-bold text-orange-600">
              {user.currentStreak}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-xl px-3 py-1.5">
            <span className="text-sm">💎</span>
            <span className="text-sm font-bold text-purple-600">
              {user.totalXP}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5">
            <span className="text-sm">📚</span>
            <span className="text-sm font-bold text-blue-600">
              {totalCompleted}
            </span>
          </div>
        </div>

        {/* Greeting Card */}
        <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200 flex items-center justify-between mb-6">
          <div className="flex items-center flex-1">
            <div className="w-12 h-12 bg-[#58cc02] rounded-xl flex items-center justify-center mr-3">
              <span className="text-2xl">🦁</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">
                Ajoyib ketdingiz!
              </p>
              <p className="text-xl font-bold text-gray-900">
                Salom, {user.username}!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const firstUnlocked = lessons.find(
                (l) => !completedLessonIds.includes(l.id) && user.totalXP >= l.requiredXP
              );
              if (firstUnlocked) {
                router.push(`/lesson/${firstUnlocked.id}`);
              }
            }}
            className="bg-[#58cc02] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#4db302] transition-colors shadow-sm shrink-0"
          >
            DAVOM ETISH
          </button>
        </div>

        {/* Lesson Grid */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Darslar
          </h2>
        </div>

        {lessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="text-5xl mb-4">🦁</span>
            <p className="text-lg font-bold text-gray-800 mb-1">
              Darslar yuklanmoqda...
            </p>
            <p className="text-gray-500 text-center text-sm">
              Iltimos, kuting
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5 pb-8">
            {lessons.slice(0, 30).map((lesson) => {
              const status = getStatus(lesson.id, lesson.requiredXP);
              const emoji =
                CATEGORY_EMOJI[lesson.category] || "📖";

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    if (status !== "locked") {
                      router.push(`/lesson/${lesson.id}`);
                    }
                  }}
                  disabled={status === "locked"}
                  className={`rounded-2xl border-2 p-4 flex items-center text-left transition-all ${
                    status === "completed"
                      ? "border-green-200 bg-green-50 hover:shadow-md"
                      : status === "unlocked"
                      ? "border-gray-200 bg-white hover:shadow-md hover:border-[#58cc02]"
                      : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                  }`}
                >
                  {/* Lesson Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mr-3.5 shrink-0 ${
                      status === "completed"
                        ? "bg-[#58cc02]"
                        : status === "unlocked"
                        ? "bg-gray-100"
                        : "bg-gray-200"
                    }`}
                  >
                    {status === "completed" ? (
                      <span className="text-white text-xl font-bold">
                        ✓
                      </span>
                    ) : status === "locked" ? (
                      <span className="text-gray-400 text-xl">🔒</span>
                    ) : (
                      <span className="text-2xl">{emoji}</span>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-base font-semibold tracking-tight truncate ${
                        status === "locked"
                          ? "text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {lesson.titleUz}
                    </p>
                    <p
                      className={`text-sm truncate ${
                        status === "locked"
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      {lesson.title}
                    </p>
                  </div>

                  {/* XP Badge */}
                  <div
                    className={`rounded-lg px-2.5 py-1 shrink-0 ${
                      status === "completed"
                        ? "bg-[#58cc02]"
                        : status === "unlocked"
                        ? "bg-gray-100"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${
                        status === "completed"
                          ? "text-white"
                          : status === "unlocked"
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {lesson.xpReward} XP
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
