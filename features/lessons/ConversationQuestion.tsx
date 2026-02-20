import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { CheckIcon, XIcon } from '@/components/icons';

interface ConversationQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export const ConversationQuestion: React.FC<ConversationQuestionProps> = ({
  question,
  prompt,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();
  const dialogue = question.dialogue || [];

  return (
    <View>
      {/* Instruction */}
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: colors.text.tertiary,
          textTransform: 'uppercase',
          marginBottom: 16,
          letterSpacing: 0.5,
          textAlign: 'center',
        }}
      >
        Eng mos javobni tanlang
      </Text>

      {/* Dialogue bubbles */}
      <View style={{ marginBottom: 20, gap: 8 }}>
        {dialogue.map((line, index) => {
          const isOther = index % 2 === 0;
          return (
            <View
              key={index}
              style={{
                alignSelf: isOther ? 'flex-start' : 'flex-end',
                maxWidth: '80%',
              }}
            >
              <View
                style={{
                  backgroundColor: isOther ? colors.bg.card : colors.stats.lessons.bg,
                  borderRadius: 16,
                  borderTopLeftRadius: isOther ? 4 : 16,
                  borderTopRightRadius: isOther ? 16 : 4,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: isOther ? colors.border.primary : colors.stats.lessons.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.text.primary,
                    lineHeight: 22,
                  }}
                >
                  {line}
                </Text>
              </View>
              <Text style={{ fontSize: 10, color: colors.text.tertiary, marginTop: 2, marginLeft: 8 }}>
                {isOther ? '🧑 Suhbatdosh' : '🧑‍🎓 Siz'}
              </Text>
            </View>
          );
        })}

        {/* Blank response indicator */}
        <View style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
          <View
            style={{
              backgroundColor: colors.stats.xp.bg,
              borderRadius: 16,
              borderTopRightRadius: 4,
              padding: 14,
              borderWidth: 2,
              borderColor: colors.stats.xp.border,
              borderStyle: 'dashed',
            }}
          >
            <Text style={{ fontSize: 16, color: colors.text.tertiary, fontStyle: 'italic' }}>
              {selectedAnswer || '???'}
            </Text>
          </View>
          <Text style={{ fontSize: 10, color: colors.text.tertiary, marginTop: 2, marginLeft: 8 }}>
            🧑‍🎓 Sizning javobingiz
          </Text>
        </View>
      </View>

      {/* Response options */}
      <View style={{ gap: 10 }}>
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === question.correctAnswer;

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
            bgColor = colors.stats.lessons.bg;
            borderCol = colors.stats.lessons.border;
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
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: borderCol,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: '600',
                    color: showFeedback && isCorrectAnswer
                      ? colors.green.primary
                      : showFeedback && isSelected && !isCorrect
                      ? '#dc2626'
                      : colors.text.primary,
                  }}
                >
                  {option}
                </Text>

                {showFeedback && isCorrectAnswer && (
                  <View style={{
                    width: 28, height: 28, borderRadius: 14,
                    backgroundColor: colors.green.primary,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckIcon size={18} color="#ffffff" />
                  </View>
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <View style={{
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
        })}
      </View>
    </View>
  );
};
