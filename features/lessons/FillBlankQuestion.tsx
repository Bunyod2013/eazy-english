import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Card } from '@/components/ui';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';

interface FillBlankQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export const FillBlankQuestion: React.FC<FillBlankQuestionProps> = ({
  question,
  prompt,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();
  
  // Split the prompt by ___ to show the blank
  const parts = question.prompt.split('___');

  return (
    <View>
      {/* Sentence Card with Blank - Gamified */}
      <View
        style={{
          backgroundColor: colors.bg.card,
          borderRadius: 16,
          padding: 24,
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
        {/* Instruction */}
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
          Bo'sh joyni to'ldiring
        </Text>

        {/* Sentence with Blank Input */}
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
                <View style={{ marginHorizontal: 8, marginVertical: 4 }}>
                  <TextInput
                    value={selectedAnswer}
                    onChangeText={setSelectedAnswer}
                    placeholder="___"
                    placeholderTextColor={colors.text.tertiary}
                    style={{
                      borderBottomWidth: 3,
                      borderBottomColor: showFeedback
                        ? isCorrect
                          ? colors.green.primary
                          : '#dc2626'
                        : colors.stats.lessons.text,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: showFeedback
                        ? isCorrect
                          ? colors.green.primary
                          : '#dc2626'
                        : colors.text.primary,
                      textAlign: 'center',
                      minWidth: 100,
                      backgroundColor: colors.bg.elevated,
                      borderRadius: 4,
                    }}
                    editable={!showFeedback}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};
