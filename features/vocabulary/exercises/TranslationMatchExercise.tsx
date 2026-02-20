import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/utils/theme';
import { CheckIcon, XIcon } from '@/components/icons';

interface TranslationMatchExerciseProps {
  word: string;
  correctTranslation: string;
  options: string[];
  onAnswer: (correct: boolean) => void;
}

export const TranslationMatchExercise: React.FC<TranslationMatchExerciseProps> = ({
  word,
  correctTranslation,
  options,
  onAnswer,
}) => {
  const { colors } = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionPress = (option: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(option);
    setShowFeedback(true);
    
    const isCorrect = option === correctTranslation;
    
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  const getOptionStyle = (option: string) => {
    if (!showFeedback) {
      return {
        bg: colors.bg.secondary,
        border: selectedAnswer === option ? colors.green.primary : colors.border.primary,
        borderWidth: selectedAnswer === option ? 3 : 2,
      };
    }

    if (option === correctTranslation) {
      return {
        bg: colors.stats.xp.bg,
        border: colors.stats.xp.border,
        borderWidth: 3,
      };
    }

    if (option === selectedAnswer && option !== correctTranslation) {
      return {
        bg: '#fee',
        border: '#f88',
        borderWidth: 3,
      };
    }

    return {
      bg: colors.bg.secondary,
      border: colors.border.primary,
      borderWidth: 2,
    };
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {/* Question Card */}
      <View style={{
        backgroundColor: colors.bg.secondary,
        borderRadius: 20,
        padding: 24,
        marginBottom: 32,
        borderWidth: 2,
        borderColor: colors.border.primary,
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '700',
          color: colors.text.tertiary,
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          Bu so'zning tarjimasini toping
        </Text>

        <Text style={{
          fontSize: 42,
          fontWeight: 'bold',
          color: colors.text.primary,
          textAlign: 'center',
        }}>
          {word}
        </Text>
      </View>

      {/* Options */}
      <View style={{ gap: 12, flex: 1 }}>
        {options.map((option, index) => {
          const style = getOptionStyle(option);
          const isCorrect = option === correctTranslation;
          const isSelected = option === selectedAnswer;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              disabled={showFeedback}
              activeOpacity={0.7}
              style={{
                backgroundColor: style.bg,
                borderRadius: 16,
                padding: 20,
                borderWidth: style.borderWidth,
                borderColor: style.border,
                borderBottomWidth: style.borderWidth + 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
                <View style={{
                  width: 32,
                  height: 32,
                  backgroundColor: colors.bg.primary,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: style.border,
                }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: colors.text.primary,
                  }}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>

                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.text.primary,
                  flex: 1,
                }}>
                  {option}
                </Text>
              </View>

              {showFeedback && (
                <View>
                  {isCorrect ? (
                    <CheckIcon size={28} color={colors.stats.xp.text} />
                  ) : isSelected ? (
                    <XIcon size={28} color="#f44" />
                  ) : null}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Feedback */}
      {showFeedback && (
        <View style={{
          marginTop: 24,
          backgroundColor: selectedAnswer === correctTranslation ? colors.stats.xp.bg : '#fee',
          borderRadius: 16,
          padding: 20,
          borderWidth: 3,
          borderColor: selectedAnswer === correctTranslation ? colors.stats.xp.border : '#f88',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {selectedAnswer === correctTranslation ? (
              <CheckIcon size={32} color={colors.stats.xp.text} />
            ) : (
              <XIcon size={32} color="#f44" />
            )}
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: selectedAnswer === correctTranslation ? colors.stats.xp.text : '#c44',
              flex: 1,
            }}>
              {selectedAnswer === correctTranslation ? "To'g'ri!" : "Noto'g'ri!"}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
