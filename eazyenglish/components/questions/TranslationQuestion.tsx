"use client";

import { Question } from "@/types";

export interface QuestionComponentProps {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export default function TranslationQuestion({
  question,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}: QuestionComponentProps) {
  const getBorderStyle = () => {
    if (showFeedback) {
      return isCorrect
        ? "border-green-500 bg-green-50 focus:ring-green-200"
        : "border-red-500 bg-red-50 focus:ring-red-200";
    }
    return "border-gray-300 bg-white focus:border-[#58cc02] focus:ring-green-100";
  };

  return (
    <div
      className={`flex flex-col gap-4 w-full max-w-md mx-auto ${
        showFeedback ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Instruction */}
      <label className="text-base font-semibold text-gray-700">
        Tarjima qiling:
      </label>

      {/* Text Input */}
      <input
        type="text"
        value={selectedAnswer}
        onChange={(e) => setSelectedAnswer(e.target.value)}
        disabled={showFeedback}
        placeholder="Javobni yozing..."
        className={`
          w-full px-5 py-4 text-lg font-medium text-gray-800
          rounded-xl border-2 outline-none
          transition-all
          focus:ring-4
          placeholder:text-gray-400
          disabled:cursor-not-allowed
          ${getBorderStyle()}
        `}
      />

      {/* Feedback text */}
      {showFeedback && !isCorrect && (
        <p className="text-sm text-red-600 font-medium">
          To&apos;g&apos;ri javob:{" "}
          <span className="font-bold">
            {Array.isArray(question.correctAnswer)
              ? question.correctAnswer.join(", ")
              : question.correctAnswer}
          </span>
        </p>
      )}
    </div>
  );
}
