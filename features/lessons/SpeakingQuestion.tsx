import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { SoundIcon, MicrophoneIcon, LionIcon, TurtleIcon } from '@/components/icons';
import { playAudio } from '@/utils/audio';
import * as Speech from 'expo-speech';

interface SpeakingQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

/**
 * Speaking Question
 * User listens to Falstaff and repeats the phrase
 * Like in Duolingo screenshot 3
 */
export const SpeakingQuestion: React.FC<SpeakingQuestionProps> = ({
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
  const [isRecording, setIsRecording] = useState(false);
  const [canCheck, setCanCheck] = useState(false);

  // Auto-play audio when question loads
  useEffect(() => {
    handlePlayAudio();
  }, [question.id]);

  // Play audio
  const handlePlayAudio = async (slow: boolean = false) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    try {
      const audioPath = slow ? question.audioSlow : question.audio;
      const text = question.targetPhrase || question.audioText || (question.correctAnswer as string);
      
      await playAudio(audioPath, text, slow);
      
      setTimeout(() => setIsPlaying(false), 1500);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  // Handle recording (simplified - just mark as attempted)
  const handleRecord = () => {
    if (showFeedback) return;
    
    setIsRecording(true);
    
    // Simulate recording for 2 seconds
    setTimeout(() => {
      setIsRecording(false);
      setCanCheck(true);
      
      // Auto-answer as correct (since we can't do real speech recognition)
      setSelectedAnswer(question.correctAnswer as string);
      onAnswer(question.correctAnswer as string);
    }, 2000);
  };

  return (
    <View style={{ gap: 24, alignItems: 'center' }}>
      {/* Title */}
      <Text style={{
        fontSize: 24,
        fontWeight: '700',
        color: colors.text.primary,
        textAlign: 'center',
      }}>
        {question.promptUz || 'Aytib ko\'ring'}
      </Text>

      {/* Falstaff Character */}
      <View style={{
        width: 200,
        height: 280,
        backgroundColor: colors.bg.card,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.border.primary,
        padding: 20,
      }}>
        {/* Lion mascot character */}
        <View style={{
          width: 160,
          height: 160,
          borderRadius: 80,
          backgroundColor: '#58cc02',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
          borderWidth: 4,
          borderColor: '#3d8c00',
          shadowColor: '#58cc02',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 8,
        }}>
          <LionIcon size={120} />
        </View>

        {/* Speech bubble with text */}
        <View style={{
          backgroundColor: '#FFFFFF',
          padding: 12,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: colors.border.primary,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
          <TouchableOpacity onPress={() => handlePlayAudio(false)}>
            <SoundIcon size={20} color={colors.blue.primary} />
          </TouchableOpacity>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.text.primary,
          }}>
            {question.targetPhrase || question.audioText}
          </Text>
        </View>
      </View>

      {/* Slow speed button */}
      {question.audioSlow && (
        <TouchableOpacity
          onPress={() => handlePlayAudio(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: colors.bg.card,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: colors.border.primary,
          }}
        >
          <TurtleIcon size={24} color={colors.stats.streak.text} />
          <SoundIcon size={20} color={colors.blue.primary} />
        </TouchableOpacity>
      )}

      {/* Microphone Button */}
      <TouchableOpacity
        onPress={handleRecord}
        disabled={isRecording || showFeedback}
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          backgroundColor: isRecording ? colors.red.primary : colors.blue.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 16,
          shadowColor: colors.text.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <MicrophoneIcon size={40} color="#FFFFFF" />
      </TouchableOpacity>

      {/* "Can't Speak Now" button */}
      <TouchableOpacity
        onPress={() => {
          setCanCheck(true);
          setSelectedAnswer(question.correctAnswer as string);
          onAnswer(question.correctAnswer as string);
        }}
        style={{ marginTop: 8 }}
      >
        <Text style={{
          fontSize: 14,
          fontWeight: '600',
          color: colors.text.tertiary,
          textAlign: 'center',
          textTransform: 'uppercase',
        }}>
          HOZIR AYTA OLMAYMAN
        </Text>
      </TouchableOpacity>
    </View>
  );
};
