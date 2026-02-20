"use client";

import { useState, useEffect } from "react";
import { Question } from "@/types";

export interface QuestionComponentProps {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export default function FillBlankQuestion({
  question,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}: QuestionComponentProps) {
  const parts = question.prompt.split("___");
  const blankCount = parts.length - 1;

  const [blanks, setBlanks] = useState<string[]>(
    Array(blankCount).fill("")
  );

  // Sync blanks from selectedAnswer when it changes externally (e.g. reset)
  useEffect(() => {
    if (selectedAnswer === "") {
      setBlanks(Array(blankCount).fill(""));
    }
  }, [selectedAnswer, blankCount]);

  const handleBlankChange = (index: number, value: string) => {
    const updated = [...blanks];
    updated[index] = value;
    setBlanks(updated);
    // Join all blanks with pipe separator for multi-blank; single blank just uses the value
    const answer = blankCount === 1 ? updated[0] : updated.join("|");
    setSelectedAnswer(answer);
  };

  const getInputStyle = () => {
    if (showFeedback) {
      return isCorrect
        ? "border-b-green-500 text-green-700"
        : "border-b-red-500 text-red-700";
    }
    return "border-b-gray-400 text-gray-800 focus:border-b-[#58cc02]";
  };

  return (
    <div
      className={`flex flex-col gap-5 w-full max-w-md mx-auto ${
        showFeedback ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Instruction */}
      <p className="text-base font-semibold text-gray-700">
        Bo&apos;sh joyni to&apos;ldiring
      </p>

      {/* Sentence with blanks */}
      <div className="flex flex-wrap items-baseline gap-1 text-lg leading-loose">
        {parts.map((part, index) => (
          <span key={index} className="inline-flex items-baseline gap-1">
            <span className="text-gray-800 font-medium">{part}</span>
            {index < blankCount && (
              <input
                type="text"
                value={blanks[index]}
                onChange={(e) => handleBlankChange(index, e.target.value)}
                disabled={showFeedback}
                className={`
                  inline-block w-28 px-1 py-0.5 text-lg font-medium text-center
                  bg-transparent border-0 border-b-2 outline-none
                  transition-all
                  placeholder:text-gray-300
                  disabled:cursor-not-allowed
                  ${getInputStyle()}
                `}
                placeholder="..."
              />
            )}
          </span>
        ))}
      </div>

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
