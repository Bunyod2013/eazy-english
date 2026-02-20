import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { SoundIcon, SparkleIcon, StarIcon } from '@/components/icons';
import { playAudio } from '@/utils/audio';

interface ImageChoiceQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

/**
 * Image Choice Question
 * User sees 4 images with labels and selects the correct one
 * Like in Duolingo screenshot 2
 */
export const ImageChoiceQuestion: React.FC<ImageChoiceQuestionProps> = ({
  question,
  prompt,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();

  // Play audio for the word
  const handlePlayAudio = async () => {
    try {
      const audioPath = question.audio;
      const text = question.word || (question.correctAnswer as string);
      
      await playAudio(audioPath, text, false);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // Handle image selection
  const handleSelect = (label: string) => {
    if (showFeedback) return;
    setSelectedAnswer(label);
    onAnswer(label);
  };

  // Image options with labels
  const imageOptions = question.options || [];

  return (
    <View style={{ gap: 24 }}>
      {/* Badge */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 8,
      }}>
        <View style={{
          backgroundColor: `${colors.purple.primary}20`,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        }}>
          <SparkleIcon size={22} color={colors.purple.primary} />
          <Text style={{
            fontSize: 13,
            fontWeight: '700',
            color: colors.purple.primary,
            textTransform: 'uppercase',
          }}>
            Новое слово
          </Text>
        </View>

        {/* Audio button */}
        <TouchableOpacity
          onPress={handlePlayAudio}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: colors.blue.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SoundIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={{
        fontSize: 22,
        fontWeight: '700',
        color: colors.text.primary,
      }}>
        {question.promptUz || 'Выберите верную картинку'}
      </Text>

      {/* Word with audio */}
      <TouchableOpacity
        onPress={handlePlayAudio}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 8,
        }}
      >
        <SoundIcon size={24} color={colors.blue.primary} />
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          color: colors.blue.primary,
        }}>
          {question.word || question.correctAnswer}
        </Text>
      </TouchableOpacity>

      {/* Image Grid (2x2) */}
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        {imageOptions.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const showCorrect = showFeedback && option === question.correctAnswer;
          const showWrong = showFeedback && isSelected && !isCorrect;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}
              disabled={showFeedback}
              style={{
                width: '48%',
                aspectRatio: 1,
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
                padding: 12,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {/* Image/Icon */}
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                backgroundColor: showCorrect
                  ? `${colors.green.primary}20`
                  : showWrong
                  ? `${colors.red.primary}20`
                  : isSelected
                  ? `${colors.blue.primary}15`
                  : colors.bg.secondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <StarIcon size={52} color={
                  showCorrect ? colors.green.primary
                  : showWrong ? colors.red.primary
                  : isSelected ? colors.blue.primary
                  : '#ffc800'
                } />
              </View>
              
              {/* Label */}
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: showCorrect
                  ? colors.green.primary
                  : showWrong
                  ? colors.red.primary
                  : colors.text.primary,
                textAlign: 'center',
              }}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
