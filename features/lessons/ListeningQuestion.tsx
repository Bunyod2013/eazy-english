import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { SoundIcon } from '@/components/icons';
import { playAudio } from '@/utils/audio';

interface ListeningQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

/**
 * Listening exercise: audio + 2 options to choose the word heard.
 * Design: large blue audio button, question, 2 variants below.
 */
export const ListeningQuestion: React.FC<ListeningQuestionProps> = ({
  question,
  prompt,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const options = question.options || [];
  const isTwoOptions = options.length === 2;

  const handlePlayAudio = async (slow: boolean = false) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      const audioPath = slow ? question.audioSlow : question.audio;
      await playAudio(audioPath, question.audioText, slow);
      setTimeout(() => setIsPlaying(false), 1000);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  return (
    <View style={{ gap: 24 }}>
      {/* Question */}
      <Text style={{
        fontSize: 22,
        fontWeight: '700',
        color: colors.text.primary,
        textAlign: 'center',
      }}>
        {prompt}
      </Text>

      {/* Large Blue Audio Button */}
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <TouchableOpacity
          onPress={() => handlePlayAudio(false)}
          disabled={isPlaying}
          style={{
            width: 140,
            height: 140,
            borderRadius: 28,
            backgroundColor: colors.blue.primary,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: colors.blue.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <SoundIcon size={64} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 2 Options - side by side */}
      {options.length > 0 && (
        <View style={{
          flexDirection: isTwoOptions ? 'row' : 'column',
          gap: 12,
        }}>
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const showCorrect = showFeedback && option === question.correctAnswer;
            const showWrong = showFeedback && isSelected && !isCorrect;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => !showFeedback && setSelectedAnswer(option)}
                disabled={showFeedback}
                style={{
                  flex: isTwoOptions ? 1 : undefined,
                  backgroundColor:
                    showCorrect ? colors.stats.accuracy.bg :
                    showWrong ? '#fee2e2' :
                    isSelected ? colors.stats.lessons.bg :
                    colors.bg.card,
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 3,
                  borderColor:
                    showCorrect ? colors.stats.accuracy.border :
                    showWrong ? '#fecaca' :
                    isSelected ? colors.stats.lessons.border :
                    colors.border.primary,
                }}
              >
                <Text style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color:
                    showCorrect ? colors.green.primary :
                    showWrong ? '#dc2626' :
                    colors.text.primary,
                  textAlign: 'center',
                }}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* ESHITOLMAYAPMAN - I can't listen */}
      <TouchableOpacity
        style={{
          marginTop: 8,
          alignItems: 'center',
          paddingVertical: 12,
        }}
      >
        <Text style={{
          fontSize: 14,
          color: colors.text.tertiary,
          textTransform: 'uppercase',
          fontWeight: '600',
        }}>
          ESHITOLMAYAPMAN
        </Text>
      </TouchableOpacity>
    </View>
  );
};
