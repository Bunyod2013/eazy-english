import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { CheckIcon, XIcon } from '@/components/icons';

interface FillBlankChoiceQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export const FillBlankChoiceQuestion: React.FC<FillBlankChoiceQuestionProps> = ({
  question,
  prompt,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();

  // Split prompt by ___ to find the blank
  const parts = question.prompt.split('___');

  return (
    <View>
      {/* Sentence card with blank */}
      <View
        style={{
          backgroundColor: colors.bg.card,
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          borderWidth: 2,
          borderColor: showFeedback
            ? isCorrect
              ? colors.green.primary
              : '#dc2626'
            : colors.border.primary,
          shadowColor: showFeedback ? (isCorrect ? colors.green.primary : '#dc2626') : colors.border.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: showFeedback ? 0.2 : 0.05,
          shadowRadius: 4,
          elevation: showFeedback ? 4 : 1,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: colors.text.tertiary,
            textTransform: 'uppercase',
            marginBottom: 16,
            letterSpacing: 0.5,
          }}
        >
          To'g'ri so'zni tanlang
        </Text>

        {/* Sentence with highlighted blank */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.text.primary,
                  fontWeight: '500',
                  lineHeight: 32,
                }}
              >
                {part}
              </Text>
              {index < parts.length - 1 && (
                <View
                  style={{
                    marginHorizontal: 4,
                    backgroundColor: selectedAnswer
                      ? showFeedback
                        ? isCorrect
                          ? colors.stats.accuracy.bg
                          : '#fee2e2'
                        : colors.stats.lessons.bg
                      : colors.bg.elevated,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderBottomWidth: 3,
                    borderBottomColor: selectedAnswer
                      ? showFeedback
                        ? isCorrect
                          ? colors.green.primary
                          : '#dc2626'
                        : colors.stats.lessons.text
                      : colors.text.tertiary,
                    minWidth: 80,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: selectedAnswer
                        ? showFeedback
                          ? isCorrect
                            ? colors.green.primary
                            : '#dc2626'
                          : colors.stats.lessons.text
                        : colors.text.tertiary,
                    }}
                  >
                    {selectedAnswer || '___'}
                  </Text>
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Option chips */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === question.correctAnswer;

          let bgColor = colors.bg.card;
          let borderCol = colors.border.primary;
          let textColor = colors.text.primary;

          if (showFeedback) {
            if (isCorrectAnswer) {
              bgColor = colors.stats.accuracy.bg;
              borderCol = colors.green.primary;
              textColor = colors.green.primary;
            } else if (isSelected && !isCorrect) {
              bgColor = '#fee2e2';
              borderCol = '#dc2626';
              textColor = '#dc2626';
            }
          } else if (isSelected) {
            bgColor = colors.stats.lessons.bg;
            borderCol = colors.stats.lessons.border;
            textColor = colors.stats.lessons.text;
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={() => !showFeedback && setSelectedAnswer(option)}
              disabled={showFeedback}
              activeOpacity={0.8}
            >
              <View
                style={{
                  backgroundColor: bgColor,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: borderCol,
                  paddingHorizontal: 24,
                  paddingVertical: 14,
                  minWidth: 80,
                  alignItems: 'center',
                  shadowColor: borderCol,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isSelected ? 0.15 : 0.05,
                  shadowRadius: 4,
                  elevation: isSelected ? 3 : 1,
                  borderBottomWidth: showFeedback ? 2 : 4,
                  borderBottomColor: showFeedback
                    ? borderCol
                    : isSelected
                    ? colors.stats.lessons.text
                    : colors.border.primary,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: textColor,
                  }}
                >
                  {option}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
