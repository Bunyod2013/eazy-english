import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { CheckIcon, XIcon } from '@/components/icons';

interface TrueFalseQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  question,
  prompt,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();
  const statement = question.statement || question.prompt;

  const handleSelect = (answer: 'true' | 'false') => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const renderButton = (value: 'true' | 'false', label: string, emoji: string, color: string, darkColor: string) => {
    const isSelected = selectedAnswer === value;
    const isCorrectAnswer = question.correctAnswer === value;

    let bgColor = colors.bg.card;
    let borderCol = colors.border.primary;

    if (showFeedback) {
      if (isCorrectAnswer) {
        bgColor = colors.stats.accuracy.bg;
        borderCol = colors.green.primary;
      } else if (isSelected && !isCorrect) {
        bgColor = '#fee2e2';
        borderCol = '#dc2626';
      }
    } else if (isSelected) {
      bgColor = value === 'true' ? '#dcfce7' : '#fee2e2';
      borderCol = value === 'true' ? '#22c55e' : '#ef4444';
    }

    return (
      <TouchableOpacity
        onPress={() => handleSelect(value)}
        disabled={showFeedback}
        style={{ flex: 1 }}
        activeOpacity={0.8}
      >
        <View
          style={{
            backgroundColor: bgColor,
            borderRadius: 16,
            borderWidth: 3,
            borderColor: borderCol,
            padding: 24,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 120,
            shadowColor: borderCol,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isSelected ? 0.2 : 0.05,
            shadowRadius: 4,
            elevation: isSelected ? 4 : 1,
          }}
        >
          <Text style={{ fontSize: 40, marginBottom: 8 }}>{emoji}</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: showFeedback && isCorrectAnswer
                ? colors.green.primary
                : showFeedback && isSelected && !isCorrect
                ? '#dc2626'
                : colors.text.primary,
            }}
          >
            {label}
          </Text>

          {showFeedback && isCorrectAnswer && (
            <View style={{
              position: 'absolute', top: 8, right: 8,
              width: 28, height: 28, borderRadius: 14,
              backgroundColor: colors.green.primary,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <CheckIcon size={18} color="#ffffff" />
            </View>
          )}
          {showFeedback && isSelected && !isCorrect && (
            <View style={{
              position: 'absolute', top: 8, right: 8,
              width: 28, height: 28, borderRadius: 14,
              backgroundColor: '#dc2626',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <XIcon size={18} color="#ffffff" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* Statement card */}
      <View
        style={{
          backgroundColor: colors.bg.card,
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          borderWidth: 2,
          borderColor: colors.border.primary,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: colors.text.tertiary,
            textTransform: 'uppercase',
            marginBottom: 12,
            letterSpacing: 0.5,
          }}
        >
          To'g'ri yoki Noto'g'ri?
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: colors.text.primary,
            textAlign: 'center',
            lineHeight: 28,
          }}
        >
          {statement}
        </Text>
      </View>

      {/* True / False buttons */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {renderButton('true', "To'g'ri", '✅', '#22c55e', '#16a34a')}
        {renderButton('false', "Noto'g'ri", '❌', '#ef4444', '#dc2626')}
      </View>
    </View>
  );
};
