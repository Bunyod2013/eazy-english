"use client";

import { Question } from "@/types";

export interface QuestionComponentProps {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export default function ImageChoiceQuestion({
  question,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}: QuestionComponentProps) {
  const options = question.options || [];
  const images = question.images || question.options || [];
  const title = question.word || question.prompt;
  const correctAnswer = Array.isArray(question.correctAnswer)
    ? question.correctAnswer[0]
    : question.correctAnswer;

  const getCardStyle = (option: string) => {
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

  return (
    <div
      className={`flex flex-col gap-5 w-full max-w-md mx-auto ${
        showFeedback ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        {title}
      </h2>

      {/* Instruction */}
      <p className="text-sm font-medium text-gray-500 text-center -mt-2">
        Rasm tanlang
      </p>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => {
          const image = images[index] || option;

          return (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              disabled={showFeedback}
              className={`
                flex flex-col items-center justify-center gap-3
                aspect-square rounded-2xl border-2 p-4
                cursor-pointer transition-all
                ${getCardStyle(option)}
              `}
            >
              {/* Emoji / Image */}
              <span className="text-5xl leading-none">{image}</span>

              {/* Label */}
              <span className="text-sm font-medium text-gray-700 text-center">
                {option}
              </span>

              {/* Feedback indicators */}
              {showFeedback && option === correctAnswer && (
                <span className="text-green-600 font-bold text-base">✓</span>
              )}
              {showFeedback &&
                selectedAnswer === option &&
                !isCorrect &&
                option !== correctAnswer && (
                  <span className="text-red-600 font-bold text-base">✗</span>
                )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
