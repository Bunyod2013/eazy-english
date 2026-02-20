import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Lesson } from '@/types';
import { Card } from '@/components/ui';

interface LessonTileProps {
  lesson: Lesson;
  isCompleted: boolean;
  isUnlocked: boolean;
  onPress: () => void;
}

export const LessonTile: React.FC<LessonTileProps> = ({
  lesson,
  isCompleted,
  isUnlocked,
  onPress,
}) => {
  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      alphabet: '🔤',
      greetings: '👋',
      numbers: '🔢',
      colors: '🎨',
      family: '👨‍👩‍👧‍👦',
      food: '🍎',
      animals: '🐱',
      daily_life: '🌅',
      school: '📚',
      travel: '✈️',
      work: '💼',
      grammar: '📝',
      vocabulary: '📖',
    };
    return icons[category] || '📚';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isUnlocked}
      activeOpacity={0.8}
      className="mb-4"
    >
      <Card
        variant="elevated"
        className={`
          ${!isUnlocked ? 'opacity-50 bg-gray-100' : ''}
          ${isCompleted ? 'border-2 border-primary' : ''}
        `}
      >
        <View className="flex-row items-center">
          {/* Icon */}
          <View
            className={`
              w-16 h-16 rounded-2xl items-center justify-center mr-4
              ${isUnlocked ? 'bg-primary/10' : 'bg-gray-200'}
            `}
          >
            <Text className="text-3xl">
              {isUnlocked ? getCategoryIcon(lesson.category) : '🔒'}
            </Text>
          </View>

          {/* Content */}
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Text className="text-xs font-semibold text-gray-500 uppercase">
                Level {lesson.level}
              </Text>
              {isCompleted && (
                <View className="ml-2 bg-primary rounded-full px-2 py-0.5">
                  <Text className="text-xs text-white font-bold">✓ Completed</Text>
                </View>
              )}
            </View>
            <Text className="text-lg font-bold text-gray-800 mb-1">
              {lesson.title}
            </Text>
            <Text className="text-sm text-gray-600">
              {lesson.titleUz}
            </Text>
          </View>

          {/* XP Badge */}
          <View className="items-center">
            <View className="bg-yellow-100 rounded-full px-3 py-1">
              <Text className="text-yellow-600 font-bold text-sm">
                +{lesson.xpReward} XP
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
