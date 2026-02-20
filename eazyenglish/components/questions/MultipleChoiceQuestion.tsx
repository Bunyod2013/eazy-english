"use client";

import { Question } from "@/types";

export interface QuestionComponentProps {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

const LETTERS = ["A", "B", "C", "D"];

export default function MultipleChoiceQuestion({
  question,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}: QuestionComponentProps) {
  const options = question.options || [];
  const correctAnswer = Array.isArray(question.correctAnswer)
    ? question.correctAnswer[0]
    : question.correctAnswer;

  const getOptionStyle = (option: string) => {
    const isSelected = selectedAnswer === option;
    const isCorrectOption = option === correctAnswer;

    if (showFeedback) {
      if (isCorrectOption) {
        return "border-green-500 bg-green-50";
      }
      if (isSelected && !isCorrect) {
        return "border-red-500 bg-red-50";
      }
      return "border-gray-200 bg-white opacity-60";
    }

    if (isSelected) {
      return "border-[#58cc02] bg-green-50";
    }

    return "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50";
  };

  const getLetterBadgeStyle = (option: string) => {
    const isSelected = selectedAnswer === option;
    const isCorrectOption = option === correctAnswer;

    if (showFeedback) {
      if (isCorrectOption) {
        return "bg-green-500 text-white";
      }
      if (isSelected && !isCorrect) {
        return "bg-red-500 text-white";
      }
      return "bg-gray-200 text-gray-500";
    }

    if (isSelected) {
      return "bg-[#58cc02] text-white";
    }

    return "bg-gray-100 text-gray-600";
  };

  const getIcon = (option: string) => {
    const isSelected = selectedAnswer === option;
    const isCorrectOption = option === correctAnswer;

    if (!showFeedback) return null;

    if (isCorrectOption) {
      return (
        <span className="ml-auto text-green-600 font-bold text-lg flex-shrink-0">
          ✓
        </span>
      );
    }

    if (isSelected && !isCorrect) {
      return (
        <span className="ml-auto text-red-600 font-bold text-lg flex-shrink-0">
          ✗
        </span>
      );
    }

    return null;
  };

  return (
    <div
      className={`flex flex-col gap-3 w-full max-w-md mx-auto ${
        showFeedback ? "pointer-events-none" : ""
      }`}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => setSelectedAnswer(option)}
          disabled={showFeedback}
          className={`
            flex items-center gap-4 w-full px-5 py-4
            rounded-2xl border-2 transition-all cursor-pointer
            ${getOptionStyle(option)}
            ${showFeedback ? "opacity-80" : ""}
          `}
        >
          {/* Letter Badge */}
          <span
            className={`
              w-9 h-9 rounded-lg flex items-center justify-center
              text-sm font-bold flex-shrink-0 transition-all
              ${getLetterBadgeStyle(option)}
            `}
          >
            {LETTERS[index] || String(index + 1)}
          </span>

          {/* Option Text */}
          <span className="text-base font-medium text-gray-800 text-left flex-1">
            {option}
          </span>

          {/* Feedback Icon */}
          {getIcon(option)}
        </button>
      ))}
    </div>
  );
}
