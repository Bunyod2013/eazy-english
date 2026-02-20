import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Lesson } from '@/types';
import { 
  BookIcon, 
  StarIcon, 
  LockIcon, 
  LionIcon, 
  TreasureIcon,
  VideoIcon,
  HeadphoneIcon,
  MicIcon,
  StoryIcon,
} from '@/components/icons';
import { useTheme } from '@/utils/theme';

interface DuolingoLessonPathProps {
  lessons: Lesson[];
  completedLessons: string[];
  currentXP: number;
  onLessonPress: (lessonId: string) => void;
}

export const DuolingoLessonPath: React.FC<DuolingoLessonPathProps> = ({
  lessons,
  completedLessons,
  currentXP,
  onLessonPress,
}) => {
  const { colors, isDark } = useTheme();
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const screenWidth = containerWidth;
  const BUTTON_SIZE = 75;
  const VERTICAL_SPACING = 110;
  const START_Y = 30;

  // Snake-style zigzag pattern - Duolingo style
  const getPositionForIndex = (index: number) => {
    // Simple 3-position snake: Center, Left, Right, repeat
    const xPositions = [0.5, 0.25, 0.75];
    const xIndex = index % 3;
    
    const x = screenWidth * xPositions[xIndex] - (BUTTON_SIZE / 2);
    const y = START_Y + (index * VERTICAL_SPACING);
    
    return { left: x, top: y };
  };

  // Get lesson type icon
  const getLessonIcon = (index: number, size: number = 34) => {
    const icons = [
      <BookIcon key={index} size={size} color="#fff" />,
      <VideoIcon key={index} size={size} color="#fff" />,
      <HeadphoneIcon key={index} size={size} color="#fff" />,
      <StoryIcon key={index} size={size} color="#fff" />,
      <MicIcon key={index} size={size} color="#fff" />,
    ];
    
    return icons[index % icons.length];
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg.secondary }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 150 }}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={{ height: lessons.length * VERTICAL_SPACING + 200, position: 'relative' }}>
        
        {/* Lesson Buttons */}
        {lessons.slice(0, 100).map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isUnlocked = index === 0 || completedLessons.includes(lessons[index - 1]?.id);
          const isNext = !isCompleted && isUnlocked;
          const position = getPositionForIndex(index);

          return (
            <View key={lesson.id} style={{ position: 'absolute', ...position }}>
              <TouchableOpacity
                onPress={() => isUnlocked && onLessonPress(lesson.id)}
                disabled={!isUnlocked}
                activeOpacity={0.8}
              >
                {/* Gamified Card Container */}
                <View style={{ alignItems: 'center' }}>
                  {/* Lesson Number Badge */}
                  <View style={{
                    position: 'absolute',
                    top: -8,
                    zIndex: 10,
                    backgroundColor: isCompleted ? '#fbbf24' : isNext ? '#1cb0f6' : colors.border.primary,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: colors.bg.primary,
                  }}>
                    <Text style={{ 
                      fontSize: 11, 
                      fontWeight: 'bold', 
                      color: isCompleted || isNext ? '#ffffff' : colors.text.tertiary,
                    }}>
                      {index + 1}
                    </Text>
                  </View>

                  {/* Main Gamified Card */}
                  <View
                    style={{
                      width: BUTTON_SIZE,
                      height: BUTTON_SIZE + 20,
                      borderRadius: 20,
                      backgroundColor: isCompleted ? colors.stats.accuracy.bg : isNext ? colors.stats.lessons.bg : colors.bg.card,
                      borderWidth: 3,
                      borderColor: isCompleted ? colors.stats.accuracy.border : isNext ? colors.stats.lessons.border : colors.border.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: isCompleted ? colors.stats.accuracy.text : isNext ? colors.stats.lessons.text : '#000',
                      shadowOffset: { width: 0, height: isCompleted || isNext ? 6 : 2 },
                      shadowOpacity: isCompleted || isNext ? 0.4 : 0.1,
                      shadowRadius: 12,
                      elevation: isCompleted || isNext ? 8 : 2,
                      overflow: 'visible',
                    }}
                  >
                    {/* Icon Circle */}
                    <View style={{
                      width: 56,
                      height: 56,
                      borderRadius: 28,
                      backgroundColor: isCompleted ? colors.green.primary : isNext ? colors.stats.lessons.text : colors.border.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                      borderWidth: 2,
                      borderColor: colors.bg.primary,
                    }}>
                      {!isUnlocked ? (
                        <LockIcon size={28} color="#9ca3af" />
                      ) : isCompleted ? (
                        <StarIcon size={32} color="#fff" />
                      ) : (
                        getLessonIcon(index, 28)
                      )}
                    </View>

                    {/* Stars or XP Badge */}
                    {isCompleted && (
                      <View style={{
                        position: 'absolute',
                        bottom: 4,
                        flexDirection: 'row',
                        gap: 2,
                      }}>
                        <Text style={{ fontSize: 10 }}>⭐</Text>
                        <Text style={{ fontSize: 10 }}>⭐</Text>
                        <Text style={{ fontSize: 10 }}>⭐</Text>
                      </View>
                    )}
                    
                    {isNext && (
                      <View style={{
                        position: 'absolute',
                        bottom: 4,
                        backgroundColor: colors.stats.xp.bg,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: colors.stats.xp.border,
                      }}>
                        <Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.stats.xp.text }}>
                          +{lesson.xpReward || 10} XP
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Glow Effect for Next Lesson */}
                  {isNext && (
                    <View style={{
                      position: 'absolute',
                      width: BUTTON_SIZE + 10,
                      height: BUTTON_SIZE + 30,
                      borderRadius: 25,
                      backgroundColor: colors.stats.lessons.text,
                      opacity: 0.2,
                      zIndex: -1,
                    }} />
                  )}

                  {/* Completion Checkmark */}
                  {isCompleted && (
                    <View style={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: colors.green.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: colors.bg.primary,
                      zIndex: 20,
                    }}>
                      <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
        
        {/* Treasure Chests - Gamified Every 3 lessons */}
        {lessons.slice(0, 100).map((lesson, index) => {
          if ((index + 1) % 3 === 0 && index < lessons.length - 1) {
            const isUnlocked = completedLessons.includes(lesson.id);
            const position = getPositionForIndex(index);

            const TREASURE_CARD_SIZE = 100;
            const centeredLeft = (screenWidth / 2) - (TREASURE_CARD_SIZE / 2);

            return (
              <View 
                key={`treasure-${index}`}
                style={{
                  position: 'absolute',
                  left: centeredLeft,
                  top: position.top + (BUTTON_SIZE / 2) - (TREASURE_CARD_SIZE / 2) - 70,
                }}
              >
                <TouchableOpacity
                  disabled={!isUnlocked}
                  activeOpacity={0.8}
                >
                  <View style={{
                    alignItems: 'center',
                    opacity: isUnlocked ? 1 : 0.3,
                  }}>
                    {/* "BONUS" Label */}
                    <View style={{
                      position: 'absolute',
                      top: -16,
                      zIndex: 10,
                      backgroundColor: colors.stats.xp.text,
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: colors.bg.primary,
                    }}>
                      <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#ffffff' }}>
                        BONUS
                      </Text>
                    </View>

                    {/* Treasure Card */}
                    <View style={{
                      width: TREASURE_CARD_SIZE,
                      height: TREASURE_CARD_SIZE,
                      borderRadius: 20,
                      backgroundColor: isUnlocked ? colors.stats.xp.bg : colors.bg.card,
                      borderWidth: 3,
                      borderColor: isUnlocked ? colors.stats.xp.border : colors.border.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: isUnlocked ? colors.stats.xp.text : '#000',
                      shadowOffset: { width: 0, height: isUnlocked ? 8 : 2 },
                      shadowOpacity: isUnlocked ? 0.5 : 0.1,
                      shadowRadius: 12,
                      elevation: isUnlocked ? 10 : 2,
                    }}>
                      <TreasureIcon size={60} color={isUnlocked ? '#d97706' : '#9ca3af'} />
                      
                      {/* Bonus XP Badge */}
                      {isUnlocked && (
                        <View style={{
                          position: 'absolute',
                          bottom: 6,
                          backgroundColor: colors.stats.xp.text,
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: colors.bg.primary,
                        }}>
                          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#ffffff' }}>
                            +50 XP
                          </Text>
                        </View>
                      )}
                    </View>
                    
                    {/* Sparkles for unlocked treasures */}
                    {isUnlocked && (
                      <>
                        <View style={{ position: 'absolute', top: -12, left: -8 }}>
                          <StarIcon size={20} color="#fbbf24" />
                        </View>
                        <View style={{ position: 'absolute', top: -8, right: -8 }}>
                          <StarIcon size={16} color="#fbbf24" />
                        </View>
                        <View style={{ position: 'absolute', bottom: -8, left: 12 }}>
                          <StarIcon size={18} color="#fbbf24" />
                        </View>
                        <View style={{ position: 'absolute', bottom: -6, right: 8 }}>
                          <StarIcon size={14} color="#fbbf24" />
                        </View>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
          
          return null;
        })}

      </View>
    </ScrollView>
  );
};
