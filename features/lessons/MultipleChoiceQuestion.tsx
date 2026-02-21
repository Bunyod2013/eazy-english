import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { CheckIcon, XIcon } from '@/components/icons';

interface MultipleChoiceQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  prompt,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();

  return (
    <View style={{ gap: 8 }}>
      {question.options?.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isCorrectAnswer = option === question.correctAnswer;
        
        // Determine card style based on state
        let backgroundColor = colors.bg.card;
        let borderColor = colors.border.primary;
        let borderWidth = 2;
        let shadowOpacity = 0.05;
        let elevation = 1;
        
        if (showFeedback) {
          if (isCorrectAnswer) {
            backgroundColor = colors.stats.accuracy.bg;
            borderColor = colors.green.primary;
            borderWidth = 3;
            shadowOpacity = 0.3;
            elevation = 6;
          } else if (isSelected && !isCorrect) {
            backgroundColor = '#fee2e2';
            borderColor = '#dc2626';
            borderWidth = 3;
            shadowOpacity = 0.2;
            elevation = 4;
          }
        } else if (isSelected) {
          backgroundColor = colors.stats.lessons.bg;
          borderColor = colors.stats.lessons.border;
          borderWidth = 2;
          shadowOpacity = 0.15;
          elevation = 3;
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
                backgroundColor,
                borderRadius: 14,
                borderWidth,
                borderColor,
                padding: 12,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: borderColor,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity,
                shadowRadius: 4,
                elevation,
                minHeight: 48,
              }}
            >
              {/* Letter Badge */}
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: showFeedback && isCorrectAnswer
                    ? colors.green.primary
                    : showFeedback && isSelected && !isCorrect
                    ? '#dc2626'
                    : isSelected
                    ? colors.stats.lessons.text
                    : colors.border.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: isSelected || (showFeedback && (isCorrectAnswer || (isSelected && !isCorrect)))
                      ? '#ffffff'
                      : colors.text.tertiary,
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>

              {/* Option Text */}
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: '600',
                  color: showFeedback && isCorrectAnswer
                    ? colors.green.primary
                    : showFeedback && isSelected && !isCorrect
                    ? '#dc2626'
                    : colors.text.primary,
                  lineHeight: 24,
                }}
              >
                {option}
              </Text>

              {/* Checkmark or Cross Icon */}
              {showFeedback && isCorrectAnswer && (
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: colors.green.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 8,
                  }}
                >
                  <CheckIcon size={16} color="#ffffff" />
                </View>
              )}
              {showFeedback && isSelected && !isCorrect && (
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: '#dc2626',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 8,
                  }}
                >
                  <XIcon size={16} color="#ffffff" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
