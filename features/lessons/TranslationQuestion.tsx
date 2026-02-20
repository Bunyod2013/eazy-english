import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Card } from '@/components/ui';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';

interface TranslationQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export const TranslationQuestion: React.FC<TranslationQuestionProps> = ({
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
    <View>
      {/* Input Card - Gamified */}
      <View
        style={{
          backgroundColor: colors.bg.card,
          borderRadius: 16,
          padding: 20,
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
            marginBottom: 12,
            letterSpacing: 0.5,
          }}
        >
          Sizning javobingiz:
        </Text>

        <TextInput
          value={selectedAnswer}
          onChangeText={setSelectedAnswer}
          placeholder="Javobni shu yerga yozing..."
          placeholderTextColor={colors.text.tertiary}
          style={{
            backgroundColor: colors.bg.elevated,
            borderWidth: 2,
            borderColor: colors.border.primary,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 18,
            fontWeight: '600',
            color: colors.text.primary,
          }}
          editable={!showFeedback}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );
};
