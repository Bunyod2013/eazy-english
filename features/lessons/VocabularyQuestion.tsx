import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { 
  BookIcon, SoundIcon, TurtleIcon, PeopleIcon, HomeIcon, TrophyIcon, StarIcon,
  PencilIcon, WorldIcon, FireIcon, DiamondIcon, TargetIcon, LionIcon, WaveIcon,
  PrayIcon, HeartIcon, DropIcon, BreadIcon, MilkIcon, WomanIcon, ManIcon,
  BoyIcon, GirlIcon, SunriseIcon, CatIcon, FishIcon, PlateIcon, WalkIcon,
  StudyIcon, TeacherIcon, NumberOneIcon, ColorCircleIcon, LightBulbIcon,
  MusicIcon, TreasureIcon,
} from '@/components/icons';
import { playAudio } from '@/utils/audio';

interface VocabularyQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

// Emoji → icon name mapping
const EMOJI_TO_ICON: Record<string, string> = {
  '👋': 'wave', '🙏': 'pray', '💚': 'heart', '❤️': 'heart',
  '💧': 'drop', '🍞': 'bread', '🥛': 'milk', '👩': 'woman',
  '👨': 'man', '👦': 'boy', '👧': 'girl', '🌅': 'sunrise',
  '🐱': 'cat', '🐟': 'fish', '🍽️': 'plate', '🚶': 'walk',
  '📚': 'study', '👨‍🏫': 'teacher', '1️⃣': 'number1', '🔴': 'red',
  '🟢': 'green', '📝': 'pencil', '🌍': 'world', '🔥': 'fire',
  '💎': 'diamond', '🎯': 'target', '⭐': 'star', '🏠': 'home',
  '🏆': 'trophy', '💡': 'bulb', '🎵': 'music', '📖': 'book',
};

// Icon component selector based on icon name or emoji
const IconComponent = ({ iconName, size, color }: { iconName?: string; size: number; color: string }) => {
  // Convert emoji to icon name if needed
  const name = iconName ? (EMOJI_TO_ICON[iconName] ?? iconName) : 'book';

  switch (name) {
    case 'wave': return <WaveIcon size={size} color={color} />;
    case 'pray': return <PrayIcon size={size} color={color} />;
    case 'heart': return <HeartIcon size={size} color="#ef4444" />;
    case 'drop': return <DropIcon size={size} color="#1cb0f6" />;
    case 'bread': return <BreadIcon size={size} color="#d97706" />;
    case 'milk': return <MilkIcon size={size} color="#1cb0f6" />;
    case 'woman': return <WomanIcon size={size} color="#8b5cf6" />;
    case 'man': return <ManIcon size={size} color="#3b82f6" />;
    case 'boy': return <BoyIcon size={size} color="#06b6d4" />;
    case 'girl': return <GirlIcon size={size} color="#ec4899" />;
    case 'sunrise': return <SunriseIcon size={size} color={color} />;
    case 'cat': return <CatIcon size={size} color="#f59e0b" />;
    case 'fish': return <FishIcon size={size} color="#1cb0f6" />;
    case 'plate': return <PlateIcon size={size} color="#6b7280" />;
    case 'walk': return <WalkIcon size={size} color="#58cc02" />;
    case 'study': return <StudyIcon size={size} color="#3b82f6" />;
    case 'teacher': return <TeacherIcon size={size} color="#6b7280" />;
    case 'number1': return <NumberOneIcon size={size} color="#58cc02" />;
    case 'red': return <ColorCircleIcon size={size} color="#ef4444" />;
    case 'green': return <ColorCircleIcon size={size} color="#22c55e" />;
    case 'people': return <PeopleIcon size={size} color={color} />;
    case 'home': return <HomeIcon size={size} color="#58cc02" />;
    case 'trophy': return <TrophyIcon size={size} color="#ffc800" />;
    case 'star': return <StarIcon size={size} color="#ffc800" />;
    case 'world': return <WorldIcon size={size} color="#3b82f6" />;
    case 'fire': return <FireIcon size={size} color="#ff9600" />;
    case 'diamond': return <DiamondIcon size={size} color="#1cb0f6" />;
    case 'target': return <TargetIcon size={size} color="#ef4444" />;
    case 'pencil': return <PencilIcon size={size} color="#f59e0b" />;
    case 'bulb': return <LightBulbIcon size={size} color="#ffc800" />;
    case 'music': return <MusicIcon size={size} color="#8b5cf6" />;
    case 'treasure': return <TreasureIcon size={size} color="#d97706" />;
    case 'lion': return <LionIcon size={size} />;
    case 'book': return <BookIcon size={size} color="#58cc02" />;
    default: return <BookIcon size={size} color="#58cc02" />;
  }
};

export const VocabularyQuestion: React.FC<VocabularyQuestionProps> = ({
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

  React.useEffect(() => {
    // Auto-select the correct answer for vocabulary type
    if (!showFeedback) {
      setSelectedAnswer(question.correctAnswer as string);
    }
  }, [question]);

  // Play audio function - uses audio file if available, TTS as fallback
  const handlePlayAudio = async (slow: boolean = false) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    try {
      const audioPath = slow ? question.audioSlow : question.audio;
      const text = question.word || question.prompt;
      
      await playAudio(audioPath, text, slow);
      
      // Wait a bit before allowing another play
      setTimeout(() => setIsPlaying(false), 1000);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  return (
    <View style={{
      backgroundColor: colors.bg.card,
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.border.primary,
    }}>
      {/* Icon */}
      <IconComponent iconName={question.image} size={64} color="#FFA500" />

      {/* Word */}
      <Text style={{
        fontSize: 36, fontWeight: 'bold', color: colors.text.primary,
        marginTop: 16, marginBottom: 8, letterSpacing: 0.5,
      }}>
        {question.word || question.prompt}
      </Text>

      {/* Pronunciation */}
      {question.pronunciation && (
        <Text style={{
          fontSize: 15, color: colors.text.tertiary, fontStyle: 'italic',
          marginBottom: 8,
        }}>
          {question.pronunciation}
        </Text>
      )}

      {/* Translation */}
      {question.translation && (
        <Text style={{
          fontSize: 22, fontWeight: '700', color: '#2E7D32',
          marginBottom: 12,
        }}>
          {question.translation}
        </Text>
      )}

      {/* Audio Buttons */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 14 }}>
        <TouchableOpacity
          onPress={() => handlePlayAudio(false)}
          disabled={isPlaying}
          style={{
            flexDirection: 'row', alignItems: 'center', gap: 6,
            paddingHorizontal: 14, paddingVertical: 10,
            backgroundColor: isPlaying ? colors.green.dark : colors.green.primary,
            borderRadius: 20,
          }}
        >
          <SoundIcon size={20} color="#ffffff" />
          <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 13 }}>Oddiy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePlayAudio(true)}
          disabled={isPlaying}
          style={{
            flexDirection: 'row', alignItems: 'center', gap: 6,
            paddingHorizontal: 14, paddingVertical: 10,
            backgroundColor: isPlaying ? '#FFA500' : '#FFB84D',
            borderRadius: 20,
          }}
        >
          <TurtleIcon size={20} color="#ffffff" />
          <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 13 }}>Sekin</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};
