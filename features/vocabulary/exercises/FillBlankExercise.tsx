import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@/utils/theme';
import { CheckIcon, XIcon } from '@/components/icons';

interface FillBlankExerciseProps {
  sentence: string;
  correctAnswer: string;
  sentenceUz: string;
  onAnswer: (correct: boolean) => void;
}

export const FillBlankExercise: React.FC<FillBlankExerciseProps> = ({
  sentence,
  correctAnswer,
  sentenceUz,
  onAnswer,
}) => {
  const { colors } = useTheme();
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheck = () => {
    if (userAnswer.trim() === '') return;
    
    const correct = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  // Split sentence at blank (marked with ___)
  const parts = sentence.split('___');

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {/* Instructions */}
      <View style={{
        backgroundColor: colors.bg.secondary,
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        borderWidth: 2,
        borderColor: colors.border.primary,
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '700',
          color: colors.text.tertiary,
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Bo'sh joyni to'ldiring
        </Text>
        <Text style={{
          fontSize: 14,
          color: colors.text.secondary,
        }}>
          {sentenceUz}
        </Text>
      </View>

      {/* Sentence with Blank */}
      <View style={{
        backgroundColor: colors.bg.secondary,
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        borderWidth: 3,
        borderColor: showFeedback ? (isCorrect ? colors.stats.xp.border : '#f88') : colors.border.primary,
        borderBottomWidth: 6,
        borderBottomColor: showFeedback ? (isCorrect ? colors.stats.xp.text : '#f44') : colors.border.secondary,
      }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
          <Text style={{
            fontSize: 24,
            color: colors.text.primary,
            lineHeight: 40,
          }}>
            {parts[0]}
          </Text>
          
          <TextInput
            value={userAnswer}
            onChangeText={setUserAnswer}
            editable={!showFeedback}
            placeholder="___"
            placeholderTextColor={colors.text.tertiary}
            style={{
              minWidth: 100,
              borderBottomWidth: 3,
              borderBottomColor: showFeedback ? (isCorrect ? colors.stats.xp.border : '#f88') : colors.green.primary,
              paddingHorizontal: 12,
              paddingVertical: 4,
              marginHorizontal: 8,
              fontSize: 24,
              fontWeight: 'bold',
              color: showFeedback ? (isCorrect ? colors.stats.xp.text : '#f44') : colors.text.primary,
              backgroundColor: showFeedback ? (isCorrect ? colors.stats.xp.bg : '#fee') : 'transparent',
              borderRadius: 8,
              textAlign: 'center',
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <Text style={{
            fontSize: 24,
            color: colors.text.primary,
            lineHeight: 40,
          }}>
            {parts[1]}
          </Text>
        </View>

        {showFeedback && !isCorrect && (
          <View style={{
            marginTop: 20,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: colors.border.primary,
          }}>
            <Text style={{
              fontSize: 14,
              color: colors.text.tertiary,
              marginBottom: 4,
            }}>
              To'g'ri javob:
            </Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.stats.xp.text,
            }}>
              {correctAnswer}
            </Text>
          </View>
        )}
      </View>

      {/* Check Button */}
      {!showFeedback && (
        <TouchableOpacity
          onPress={handleCheck}
          disabled={userAnswer.trim() === ''}
          activeOpacity={0.8}
          style={{
            backgroundColor: userAnswer.trim() === '' ? colors.border.primary : colors.green.primary,
            borderRadius: 16,
            padding: 18,
            alignItems: 'center',
            borderBottomWidth: 5,
            borderBottomColor: userAnswer.trim() === '' ? colors.border.secondary : colors.green.dark,
            shadowColor: colors.green.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#ffffff',
            textTransform: 'uppercase',
          }}>
            TEKSHIRISH
          </Text>
        </TouchableOpacity>
      )}

      {/* Feedback */}
      {showFeedback && (
        <View style={{
          backgroundColor: isCorrect ? colors.stats.xp.bg : '#fee',
          borderRadius: 16,
          padding: 20,
          borderWidth: 3,
          borderColor: isCorrect ? colors.stats.xp.border : '#f88',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {isCorrect ? (
              <CheckIcon size={32} color={colors.stats.xp.text} />
            ) : (
              <XIcon size={32} color="#f44" />
            )}
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: isCorrect ? colors.stats.xp.text : '#c44',
              flex: 1,
            }}>
              {isCorrect ? "To'g'ri!" : "Noto'g'ri!"}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
