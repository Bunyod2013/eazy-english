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

export default function WordBankQuestion({
  question,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}: QuestionComponentProps) {
  const allWords = question.wordBank || [];
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(allWords);

  // Reset when selectedAnswer is cleared externally
  useEffect(() => {
    if (selectedAnswer === "" && selectedWords.length > 0) {
      setSelectedWords([]);
      setAvailableWords(allWords);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer]);

  const addWord = (word: string, bankIndex: number) => {
    if (showFeedback) return;
    const updated = [...selectedWords, word];
    setSelectedWords(updated);
    const newAvailable = [...availableWords];
    newAvailable.splice(bankIndex, 1);
    setAvailableWords(newAvailable);
    setSelectedAnswer(updated.join(" "));
  };

  const removeWord = (word: string, selectedIndex: number) => {
    if (showFeedback) return;
    const updated = [...selectedWords];
    updated.splice(selectedIndex, 1);
    setSelectedWords(updated);
    setAvailableWords([...availableWords, word]);
    setSelectedAnswer(updated.join(" "));
  };

  const getSelectedAreaBorder = () => {
    if (showFeedback) {
      return isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50";
    }
    if (selectedWords.length > 0) {
      return "border-gray-300 bg-white";
    }
    return "border-dashed border-gray-300 bg-gray-50";
  };

  return (
    <div
      className={`flex flex-col gap-5 w-full max-w-md mx-auto ${
        showFeedback ? "pointer-events-none opacity-80" : ""
      }`}
    >
      {/* Selected Words Area */}
      <div
        className={`
          min-h-[80px] w-full rounded-2xl border-2 px-4 py-3
          flex flex-wrap items-start gap-2 content-start
          transition-all
          ${getSelectedAreaBorder()}
        `}
      >
        {selectedWords.length === 0 ? (
          <p className="text-gray-400 text-sm m-auto">
            Bu yerga so&apos;zlarni qo&apos;shing
          </p>
        ) : (
          selectedWords.map((word, index) => (
            <button
              key={`selected-${index}`}
              onClick={() => removeWord(word, index)}
              className="
                px-4 py-2 rounded-xl
                bg-[#58cc02] text-white font-medium text-sm
                shadow-sm cursor-pointer
                transition-all hover:bg-green-600
                active:scale-95
              "
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Word Bank */}
      <div className="flex flex-wrap gap-2">
        {availableWords.map((word, index) => (
          <button
            key={`bank-${index}`}
            onClick={() => addWord(word, index)}
            className="
              px-4 py-2 rounded-xl
              bg-white border-2 border-gray-200
              text-gray-800 font-medium text-sm
              shadow-sm cursor-pointer
              transition-all hover:border-gray-300 hover:bg-gray-50
              active:scale-95
            "
          >
            {word}
          </button>
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
