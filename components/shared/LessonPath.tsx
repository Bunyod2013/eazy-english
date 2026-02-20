import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Lesson } from '@/types';

interface LessonPathProps {
  lessons: Lesson[];
  completedLessons: string[];
  currentXP: number;
  onLessonPress: (lessonId: string) => void;
}

export const LessonPath: React.FC<LessonPathProps> = ({
  lessons,
  completedLessons,
  currentXP,
  onLessonPress,
}) => {
  const { width } = Dimensions.get('window');
  const centerX = width / 2;

  // Duolingo-style path - zigzag pattern
  const getPositionForIndex = (index: number) => {
    const verticalSpacing = 140;
    const horizontalOffset = 60;
    
    // Zigzag pattern: left, center, right, center, left...
    const pattern = [0, -1, 0, 1, 0, -1, 0, 1];
    const offset = pattern[index % pattern.length] * horizontalOffset;
    
    return {
      top: index * verticalSpacing,
      left: centerX + offset - 40, // 40 is half of tile width
    };
  };

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
      weather: '🌤️',
      health: '🏥',
      sports: '⚽',
      clothing: '👕',
      time: '⏰',
      emotions: '😊',
      verbs: '🏃',
    };
    return icons[category] || '📚';
  };

  return (
    <ScrollView 
      className="flex-1" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={{ height: lessons.length * 140 + 200, position: 'relative' }}>
        {/* Path Line */}
        <View 
          className="absolute w-1 bg-gray-200"
          style={{
            left: centerX - 2,
            top: 0,
            height: '100%',
          }}
        />

        {/* Lesson Nodes */}
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isUnlocked = lesson.requiredXP <= currentXP;
          const isNext = !isCompleted && isUnlocked;
          const position = getPositionForIndex(index);

          return (
            <View
              key={lesson.id}
              style={{
                position: 'absolute',
                ...position,
              }}
            >
              {/* Connecting Line Segment */}
              {index > 0 && (
                <View
                  className={`absolute h-1 ${isCompleted ? 'bg-primary' : 'bg-gray-200'}`}
                  style={{
                    width: Math.abs(position.left - getPositionForIndex(index - 1).left) + 40,
                    top: 40,
                    left: position.left > getPositionForIndex(index - 1).left ? -Math.abs(position.left - getPositionForIndex(index - 1).left) : 0,
                  }}
                />
              )}

              {/* Lesson Tile */}
              <TouchableOpacity
                onPress={() => isUnlocked && onLessonPress(lesson.id)}
                disabled={!isUnlocked}
                activeOpacity={0.8}
                className="items-center"
              >
                {/* Main Circle */}
                <View
                  className={`
                    w-20 h-20 rounded-full items-center justify-center
                    ${isCompleted ? 'bg-primary border-4 border-primary-light' :
                      isNext ? 'bg-white border-4 border-primary shadow-lg' :
                      isUnlocked ? 'bg-white border-4 border-gray-300' :
                      'bg-gray-200 border-4 border-gray-300'}
                  `}
                  style={{
                    shadowColor: isNext ? '#22c55e' : '#000',
                    shadowOffset: { width: 0, height: isNext ? 4 : 2 },
                    shadowOpacity: isNext ? 0.4 : 0.1,
                    shadowRadius: isNext ? 8 : 4,
                    elevation: isNext ? 8 : 2,
                  }}
                >
                  {isCompleted ? (
                    <View className="items-center">
                      <Text className="text-3xl">⭐</Text>
                    </View>
                  ) : (
                    <Text className="text-3xl">
                      {isUnlocked ? getCategoryIcon(lesson.category) : '🔒'}
                    </Text>
                  )}
                </View>

                {/* Lesson Info */}
                <View className="items-center mt-2 max-w-[120px]">
                  <Text 
                    className={`text-sm font-bold text-center ${
                      isCompleted ? 'text-primary' :
                      isUnlocked ? 'text-gray-800' :
                      'text-gray-400'
                    }`}
                    numberOfLines={2}
                  >
                    {lesson.titleUz}
                  </Text>
                  
                  {/* Level Badge */}
                  <View className={`mt-1 px-2 py-0.5 rounded-full ${
                    isCompleted ? 'bg-primary/20' :
                    isUnlocked ? 'bg-gray-100' :
                    'bg-gray-200'
                  }`}>
                    <Text className={`text-xs font-semibold ${
                      isCompleted ? 'text-primary' :
                      isUnlocked ? 'text-gray-600' :
                      'text-gray-400'
                    }`}>
                      Level {lesson.level}
                    </Text>
                  </View>

                  {/* XP Badge */}
                  {isUnlocked && !isCompleted && (
                    <View className="mt-1 bg-yellow-100 px-2 py-0.5 rounded-full">
                      <Text className="text-yellow-600 font-bold text-xs">
                        +{lesson.xpReward} XP
                      </Text>
                    </View>
                  )}

                  {/* Completed Check */}
                  {isCompleted && (
                    <View className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full items-center justify-center border-2 border-white">
                      <Text className="text-white text-xs font-bold">✓</Text>
                    </View>
                  )}

                  {/* Pulse Animation for Next Lesson */}
                  {isNext && (
                    <View className="absolute -inset-2 bg-primary/20 rounded-full animate-pulse" />
                  )}
                </View>
              </TouchableOpacity>

              {/* Achievement Star (every 5th lesson) */}
              {index > 0 && index % 5 === 0 && (
                <View className="absolute -bottom-16 left-1/2 -ml-8">
                  <View className={`w-16 h-16 rounded-full items-center justify-center ${
                    isCompleted ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}>
                    <Text className="text-3xl">{isCompleted ? '👑' : '⭐'}</Text>
                  </View>
                  <Text className="text-xs text-center text-gray-600 mt-1">
                    Unit {Math.floor(index / 5)}
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Mascot (Duo-style) at the end */}
        <View
          style={{
            position: 'absolute',
            top: lessons.length * 140 + 50,
            left: centerX - 30,
          }}
        >
          <View className="w-16 h-16 bg-primary rounded-full items-center justify-center">
            <Text className="text-3xl">🦉</Text>
          </View>
          <Text className="text-sm font-bold text-primary text-center mt-2">
            Continue!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
