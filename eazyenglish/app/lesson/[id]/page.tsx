"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLessonStore } from "@/store/lessonStore";
import { useProgressStore } from "@/store/progressStore";
import { useUserStore } from "@/store/userStore";
import { calculateLessonXP } from "@/utils/xp";
import { Question, QuestionAnswer } from "@/types";
// Question components
import VocabularyQuestion from "@/components/questions/VocabularyQuestion";
import MultipleChoiceQuestion from "@/components/questions/MultipleChoiceQuestion";
import TranslationQuestion from "@/components/questions/TranslationQuestion";
import FillBlankQuestion from "@/components/questions/FillBlankQuestion";
import WordBankQuestion from "@/components/questions/WordBankQuestion";
import ImageChoiceQuestion from "@/components/questions/ImageChoiceQuestion";

// Shared props interface for all question components
export interface QuestionComponentProps {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

// Question types that are not supported on web -- skip them automatically
const UNSUPPORTED_TYPES = new Set([
  "listening",
  "speaking",
  "listening_discrimination",
  "matching",
]);

// Map question type to Uzbek badge label
const TYPE_BADGES: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  vocabulary: {
    label: "So'z",
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  multiple_choice: {
    label: "Tanlang",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  translation: {
    label: "Tarjima",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  fill_blank: {
    label: "To'ldiring",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  word_bank: {
    label: "Jumla",
    bg: "bg-rose-100",
    text: "text-rose-700",
  },
  image_choice: {
    label: "Rasm",
    bg: "bg-teal-100",
    text: "text-teal-700",
  },
};

export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  // Stores
  const { lessons, loadLessons, getLessonById, startLesson, answerQuestion, currentSession } =
    useLessonStore();
  const { completeLesson } = useProgressStore();
  const { addXP } = useUserStore();

  // Core state
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showHint, setShowHint] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [lessonStartTime] = useState(Date.now());
  const [isInitialized, setIsInitialized] = useState(false);

  // Ref to track if we already auto-skipped for the current index
  const skipProcessedRef = useRef(-1);

  // Load lessons and start session on mount
  useEffect(() => {
    if (lessons.length === 0) {
      loadLessons();
    }
  }, [lessons.length, loadLessons]);

  useEffect(() => {
    if (lessons.length > 0 && lessonId && !isInitialized) {
      const lesson = getLessonById(lessonId);
      if (lesson) {
        startLesson(lessonId);
        setQuestionStartTime(Date.now());
        setIsInitialized(true);
      }
    }
  }, [lessons.length, lessonId, isInitialized, getLessonById, startLesson]);

  // Get the current lesson and question
  const lesson = getLessonById(lessonId);
  const session = currentSession;

  // Filter out unsupported question types to get the playable questions
  const playableQuestions =
    lesson?.questions.filter((q) => !UNSUPPORTED_TYPES.has(q.type)) ?? [];
  const totalPlayable = playableQuestions.length;

  // Map the session's currentQuestionIndex to the actual playable question
  // We need to track our own playable index
  const [playableIndex, setPlayableIndex] = useState(0);
  const currentQuestion = playableQuestions[playableIndex] ?? null;

  // Auto-skip unsupported question types from the store's session index
  // Also, for vocabulary type, auto-select the correct answer
  useEffect(() => {
    if (!currentQuestion) return;

    // For vocabulary type, auto-select the correct answer (it's a teaching card)
    if (currentQuestion.type === "vocabulary") {
      const answer = Array.isArray(currentQuestion.correctAnswer)
        ? currentQuestion.correctAnswer[0]
        : currentQuestion.correctAnswer;
      setSelectedAnswer(answer);
    }
  }, [currentQuestion]);

  // Check answer logic
  const checkAnswer = useCallback(() => {
    if (!currentQuestion || !selectedAnswer) return;

    const correctAnswer = currentQuestion.correctAnswer;
    let correct = false;

    if (Array.isArray(correctAnswer)) {
      correct = correctAnswer.some(
        (a) => a.toLowerCase().trim() === selectedAnswer.toLowerCase().trim()
      );
    } else {
      correct =
        correctAnswer.toLowerCase().trim() ===
        selectedAnswer.toLowerCase().trim();
    }

    setIsCorrect(correct);
    setShowFeedback(true);
  }, [currentQuestion, selectedAnswer]);

  // Go to next question
  const goNext = useCallback(() => {
    if (!currentQuestion || !session) return;

    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);

    // Record the answer in the store
    const answer: QuestionAnswer = {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      isCorrect,
      timeTaken,
    };
    answerQuestion(answer);

    // Check if this was the last playable question
    if (playableIndex >= totalPlayable - 1) {
      // Lesson complete
      handleLessonComplete();
      return;
    }

    // Advance to next playable question
    setPlayableIndex((prev) => prev + 1);
    resetQuestionState();
  }, [
    currentQuestion,
    session,
    questionStartTime,
    selectedAnswer,
    isCorrect,
    answerQuestion,
    playableIndex,
    totalPlayable,
  ]);

  // Skip question
  const skipQuestion = useCallback(() => {
    if (!currentQuestion || !session) return;

    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);

    // Record as wrong answer
    const answer: QuestionAnswer = {
      questionId: currentQuestion.id,
      userAnswer: "",
      isCorrect: false,
      timeTaken,
    };
    answerQuestion(answer);

    if (playableIndex >= totalPlayable - 1) {
      handleLessonComplete();
      return;
    }

    setPlayableIndex((prev) => prev + 1);
    resetQuestionState();
  }, [currentQuestion, session, questionStartTime, answerQuestion, playableIndex, totalPlayable]);

  const resetQuestionState = () => {
    setSelectedAnswer("");
    setShowFeedback(false);
    setIsCorrect(false);
    setShowHint(false);
    setQuestionStartTime(Date.now());
  };

  const handleLessonComplete = () => {
    if (!session || !lesson) return;

    const totalTime = Math.round((Date.now() - lessonStartTime) / 1000);
    const allAnswers = session.answers;
    const correctCount = allAnswers.filter((a) => a.isCorrect).length + (isCorrect ? 1 : 0);
    const totalAnswered = allAnswers.length + 1;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const xpEarned = calculateLessonXP(lesson.xpReward, accuracy, totalTime);

    // Record completion
    completeLesson({
      lessonId: lesson.id,
      completedAt: new Date().toISOString(),
      xpEarned,
      accuracy,
      timeTaken: totalTime,
    });

    addXP(xpEarned);

    setShowCompletion(true);
  };

  // Format seconds as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get correct answer as string for display
  const getCorrectAnswerDisplay = (): string => {
    if (!currentQuestion) return "";
    const ca = currentQuestion.correctAnswer;
    return Array.isArray(ca) ? ca[0] : ca;
  };

  // Compute stats for completion screen
  const getCompletionStats = () => {
    if (!session || !lesson) return { accuracy: 0, xpEarned: 0, timeTaken: 0 };
    const totalTime = Math.round((Date.now() - lessonStartTime) / 1000);
    const allAnswers = session.answers;
    const correctCount = allAnswers.filter((a) => a.isCorrect).length;
    const totalAnswered = allAnswers.length;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const xpEarned = calculateLessonXP(lesson.xpReward, accuracy, totalTime);
    return { accuracy, xpEarned, timeTaken: totalTime };
  };

  // Progress percentage
  const progressPercent =
    totalPlayable > 0 ? Math.round((playableIndex / totalPlayable) * 100) : 0;

  // Render the appropriate question component
  const renderQuestionComponent = () => {
    if (!currentQuestion) return null;

    const props: QuestionComponentProps = {
      question: currentQuestion,
      selectedAnswer,
      setSelectedAnswer,
      showFeedback,
      isCorrect,
    };

    switch (currentQuestion.type) {
      case "vocabulary":
        return <VocabularyQuestion {...props} />;
      case "multiple_choice":
        return <MultipleChoiceQuestion {...props} />;
      case "translation":
        return <TranslationQuestion {...props} />;
      case "fill_blank":
        return <FillBlankQuestion {...props} />;
      case "word_bank":
        return <WordBankQuestion {...props} />;
      case "image_choice":
        return <ImageChoiceQuestion {...props} />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>Bu savol turi qo&apos;llab-quvvatlanmaydi.</p>
          </div>
        );
    }
  };

  // --- Loading State ---
  if (!lesson || !session || !isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#58cc02] flex items-center justify-center animate-pulse">
            <span className="text-3xl">📚</span>
          </div>
          <p className="text-gray-500 text-lg font-medium">Dars yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // --- No playable questions ---
  if (totalPlayable === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-5 text-center">
          <span className="text-5xl block mb-4">😔</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Savol topilmadi
          </h2>
          <p className="text-gray-500 mb-6">
            Bu darsda web uchun mos savollar yo&apos;q.
          </p>
          <button
            onClick={() => router.push("/home")}
            className="px-6 py-3 bg-[#58cc02] text-white font-bold rounded-xl hover:bg-[#4db800] transition-colors"
          >
            Bosh sahifaga
          </button>
        </div>
      </div>
    );
  }

  // --- Completion Modal ---
  if (showCompletion) {
    const stats = getCompletionStats();
    return (
      <div className="min-h-screen bg-black/60 fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all duration-500 animate-[scaleIn_0.4s_ease-out]">
          {/* Celebration emoji */}
          <div className="text-center mb-6">
            <span className="text-7xl block mb-2 animate-bounce">🎉</span>
            <h2 className="text-2xl font-extrabold text-gray-800">
              Ajoyib!
            </h2>
            <p className="text-lg text-gray-500 mt-1">
              Dars tugallandi!
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-3 mb-8">
            {/* Accuracy */}
            <div className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span className="text-gray-700 font-medium">Aniqlik</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {stats.accuracy}%
              </span>
            </div>

            {/* XP */}
            <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <span className="text-gray-700 font-medium">XP olindi</span>
              </div>
              <span className="text-xl font-bold text-green-600">
                +{stats.xpEarned}
              </span>
            </div>

            {/* Time */}
            <div className="flex items-center justify-between bg-purple-50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <span className="text-gray-700 font-medium">Vaqt</span>
              </div>
              <span className="text-xl font-bold text-purple-600">
                {formatTime(stats.timeTaken)}
              </span>
            </div>
          </div>

          {/* Home button */}
          <button
            onClick={() => router.push("/home")}
            className="w-full py-4 bg-[#58cc02] text-white font-bold text-lg rounded-2xl hover:bg-[#4db800] active:scale-[0.98] transition-all shadow-lg shadow-green-200"
          >
            Bosh sahifaga
          </button>
        </div>
      </div>
    );
  }

  // --- Main Lesson UI ---
  const badge = TYPE_BADGES[currentQuestion?.type ?? ""] ?? {
    label: currentQuestion?.type ?? "",
    bg: "bg-gray-100",
    text: "text-gray-700",
  };
  const hintText =
    currentQuestion?.hintsUz?.[0] ||
    currentQuestion?.hints?.[0] ||
    null;
  const isLastQuestion = playableIndex >= totalPlayable - 1;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* --- Top Bar --- */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          {/* Close button */}
          <button
            onClick={() => setShowExitConfirm(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            aria-label="Chiqish"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Progress bar */}
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#58cc02] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1 min-w-[50px] justify-end">
            <span className="text-red-500 text-lg">❤️</span>
            <span className="text-red-500 font-bold text-sm">
              {session.hearts}
            </span>
          </div>
        </div>
      </div>

      {/* --- Exit Confirmation Modal --- */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
              Darsni tark etmoqchimisiz?
            </h3>
            <p className="text-gray-500 text-center text-sm mb-6">
              Jarayoningiz saqlanmaydi.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
              >
                Yo&apos;q
              </button>
              <button
                onClick={() => router.push("/home")}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
              >
                Ha, chiqish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Question Area (scrollable middle) --- */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-6">
          {/* Question type badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}
            >
              {badge.label}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {playableIndex + 1} / {totalPlayable}
            </span>
          </div>

          {/* Question prompt */}
          <h2 className="text-xl font-bold text-gray-800 mb-1 leading-snug">
            {currentQuestion.promptUz || currentQuestion.prompt}
          </h2>
          {currentQuestion.promptUz && currentQuestion.prompt && (
            <p className="text-sm text-gray-400 mb-4">
              {currentQuestion.prompt}
            </p>
          )}

          {/* Hint button and area */}
          {hintText && (
            <div className="mb-4">
              <button
                onClick={() => setShowHint((prev) => !prev)}
                className="flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                <span className="text-base">💡</span>
                {showHint ? "Maslahatni yashirish" : "Maslahat"}
              </button>
              {showHint && (
                <div className="mt-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 animate-[fadeIn_0.2s_ease-out]">
                  {hintText}
                </div>
              )}
            </div>
          )}

          {/* Question component */}
          <div className="mt-2">{renderQuestionComponent()}</div>

          {/* Feedback card */}
          <div
            className={`mt-4 overflow-hidden transition-all duration-300 ${
              showFeedback
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {showFeedback && isCorrect && (
              <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-green-700">To&apos;g&apos;ri!</p>
                  <p className="text-sm text-green-600">+10 XP</p>
                </div>
              </div>
            )}
            {showFeedback && !isCorrect && (
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-red-700">Noto&apos;g&apos;ri</p>
                  <p className="text-sm text-red-600">
                    To&apos;g&apos;ri javob:{" "}
                    <span className="font-semibold">
                      {getCorrectAnswerDisplay()}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Bottom Bar (fixed) --- */}
      <div className="sticky bottom-0 z-40 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto px-4 py-4">
          {!showFeedback ? (
            <div className="flex gap-3">
              {/* Skip button */}
              <button
                onClick={skipQuestion}
                className="px-5 py-3.5 rounded-2xl border-2 border-gray-200 text-gray-400 font-semibold text-sm hover:border-gray-300 hover:text-gray-500 transition-all active:scale-[0.98]"
              >
                O&apos;tkazib yuborish
              </button>

              {/* Check button */}
              <button
                onClick={checkAnswer}
                disabled={!selectedAnswer}
                className={`flex-1 py-3.5 rounded-2xl font-bold text-base transition-all active:scale-[0.98] ${
                  selectedAnswer
                    ? "bg-[#58cc02] text-white shadow-lg shadow-green-200 hover:bg-[#4db800]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Tekshirish
              </button>
            </div>
          ) : (
            <button
              onClick={isLastQuestion ? goNext : goNext}
              className={`w-full py-3.5 rounded-2xl font-bold text-base transition-all active:scale-[0.98] ${
                isCorrect
                  ? "bg-[#58cc02] text-white shadow-lg shadow-green-200 hover:bg-[#4db800]"
                  : "bg-[#ff4b4b] text-white shadow-lg shadow-red-200 hover:bg-[#e63e3e]"
              }`}
            >
              {isLastQuestion ? "Yakunlash" : "Keyingi"}
            </button>
          )}
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx global>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
