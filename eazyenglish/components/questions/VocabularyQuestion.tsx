"use client";

import { useEffect } from "react";
import { Question } from "@/types";

export interface QuestionComponentProps {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export default function VocabularyQuestion({
  question,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}: QuestionComponentProps) {
  // Auto-set selectedAnswer to correctAnswer on mount
  useEffect(() => {
    const answer = Array.isArray(question.correctAnswer)
      ? question.correctAnswer[0]
      : question.correctAnswer;
    setSelectedAnswer(answer);
  }, [question.correctAnswer, setSelectedAnswer]);

  const word = question.word || question.prompt;
  const translation = question.translation || question.promptUz;
  const explanation = question.explanationUz || question.explanation;
  const image = question.image;

  const partOfSpeechColors: Record<string, string> = {
    noun: "bg-blue-100 text-blue-700",
    verb: "bg-orange-100 text-orange-700",
    adjective: "bg-purple-100 text-purple-700",
    adverb: "bg-yellow-100 text-yellow-700",
    pronoun: "bg-pink-100 text-pink-700",
    preposition: "bg-teal-100 text-teal-700",
    conjunction: "bg-indigo-100 text-indigo-700",
    interjection: "bg-red-100 text-red-700",
  };

  const posClass =
    question.partOfSpeech && partOfSpeechColors[question.partOfSpeech.toLowerCase()]
      ? partOfSpeechColors[question.partOfSpeech.toLowerCase()]
      : "bg-gray-100 text-gray-700";

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto">
      {/* Emoji / Icon Area */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-5xl shadow-sm">
        {image || "📚"}
      </div>

      {/* Word */}
      <h2 className="text-[28px] font-bold text-gray-900 text-center leading-tight">
        {word}
      </h2>

      {/* Pronunciation */}
      {question.pronunciation && (
        <p className="text-base italic text-gray-500 -mt-2">
          {question.pronunciation}
        </p>
      )}

      {/* Part of Speech Badge */}
      {question.partOfSpeech && (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${posClass}`}
        >
          {question.partOfSpeech}
        </span>
      )}

      {/* Uzbek Translation */}
      {translation && (
        <div className="w-full rounded-2xl bg-green-50 border-2 border-green-200 px-5 py-4 text-center">
          <p className="text-lg font-semibold text-green-800">{translation}</p>
        </div>
      )}

      {/* Explanation */}
      {explanation && (
        <p className="text-base text-gray-600 text-center leading-relaxed px-2">
          {explanation}
        </p>
      )}

      {/* Examples */}
      {question.examples && question.examples.length > 0 && (
        <div className="w-full flex flex-col gap-3 mt-1">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Misollar
          </h3>
          {question.examples.map((example, index) => (
            <div
              key={index}
              className="w-full rounded-2xl border-2 border-gray-100 bg-white px-5 py-4 transition-all hover:border-gray-200"
            >
              <p className="text-base font-medium text-gray-900">
                {example.en}
              </p>
              <p className="text-sm text-gray-500 mt-1">{example.uz}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
