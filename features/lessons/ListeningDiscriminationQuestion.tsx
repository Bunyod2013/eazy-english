import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { SoundIcon } from '@/components/icons';
import { playAudio } from '@/utils/audio';

interface ListeningDiscriminationQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

/**
 * Listening Discrimination Question
 * User listens and chooses between similar sounding words (e.g., mall vs mail)
 * Like in Duolingo screenshot 1
 */
export const ListeningDiscriminationQuestion: React.FC<ListeningDiscriminationQuestionProps> = ({
  question,
  prompt,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  // Play audio for the correct answer
  const handlePlayAudio = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    try {
      const audioPath = question.audio;
      const text = question.correctAnswer as string;
      
      await playAudio(audioPath, text, false);
      
      setTimeout(() => setIsPlaying(false), 1000);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  // Handle option selection
  const handleSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedAnswer(option);
    onAnswer(option);
  };

  const options = question.options || [
    question.correctAnswer as string,
    question.distractorWord || '',
  ];

  return (
    <View style={{ gap: 24 }}>
      {/* Title */}
      <Text style={{
        fontSize: 24,
        fontWeight: '700',
        color: colors.text.primary,
        textAlign: 'center',
      }}>
        {question.promptUz || 'Что вы услышали?'}
      </Text>

      {/* Audio Button - Large like in Duolingo */}
      <View style={{ alignItems: 'center', marginVertical: 32 }}>
        <TouchableOpacity
          onPress={handlePlayAudio}
          disabled={isPlaying}
          style={{
            width: 120,
            height: 120,
            borderRadius: 30,
            backgroundColor: colors.blue.primary,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: colors.text.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <SoundIcon size={56} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Options */}
      <View style={{ gap: 12 }}>
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const showCorrect = showFeedback && option === question.correctAnswer;
          const showWrong = showFeedback && isSelected && !isCorrect;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}
              disabled={showFeedback}
              style={{
                padding: 20,
                borderRadius: 16,
                borderWidth: 3,
                borderColor: showCorrect 
                  ? colors.green.primary 
                  : showWrong 
                  ? colors.red.primary 
                  : isSelected 
                  ? colors.blue.primary 
                  : colors.border.primary,
                backgroundColor: showCorrect
                  ? `${colors.green.primary}15`
                  : showWrong
                  ? `${colors.red.primary}15`
                  : isSelected
                  ? `${colors.blue.primary}10`
                  : colors.bg.card,
              }}
            >
              <Text style={{
                fontSize: 20,
                fontWeight: '600',
                color: showCorrect
                  ? colors.green.primary
                  : showWrong
                  ? colors.red.primary
                  : isSelected
                  ? colors.blue.primary
                  : colors.text.primary,
                textAlign: 'center',
              }}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* "Can't Listen" button */}
      <TouchableOpacity style={{ marginTop: 16 }}>
        <Text style={{
          fontSize: 14,
          fontWeight: '600',
          color: colors.text.tertiary,
          textAlign: 'center',
          textTransform: 'uppercase',
        }}>
          Не могу слушать
        </Text>
      </TouchableOpacity>
    </View>
  );
};
