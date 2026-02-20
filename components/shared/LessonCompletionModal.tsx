import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { Modal } from '@/components/ui';
import { Mascot } from './Mascot';
import { LinearGradient } from 'expo-linear-gradient';
import { StarIcon, TrophyIcon, FireIcon, CheckIcon, LionIcon, TargetIcon, BookIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';
import { playCelebrationSound } from '@/utils/audio';

interface LessonCompletionModalProps {
  visible: boolean;
  onClose: () => void;
  onNextLesson?: () => void;
  onReview?: () => void;
  xpEarned: number;
  correctAnswers: number;
  totalQuestions: number;
  lessonTitle: string;
  lessonTitleUz: string;
  isLevelUp?: boolean;
  newLevel?: number;
  currentStreak?: number;
  streakBonus?: number;
}

export const LessonCompletionModal: React.FC<LessonCompletionModalProps> = ({
  visible,
  onClose,
  onNextLesson,
  onReview,
  xpEarned,
  correctAnswers,
  totalQuestions,
  lessonTitle,
  lessonTitleUz,
  isLevelUp = false,
  newLevel,
  currentStreak = 0,
  streakBonus = 0,
}) => {
  const { colors, isDark } = useTheme();
  
  const confettiAnims = useRef(
    Array.from({ length: 30 }, () => ({
      translateY: new Animated.Value(-100),
      translateX: new Animated.Value(Math.random() * Dimensions.get('window').width),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;

  const trophyScale = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(
    Array.from({ length: 5 }, () => new Animated.Value(0))
  ).current;

  const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

  // Firework particles: 2 groups (left + right), 8 particles each
  const FIREWORK_COLORS = ['#fbbf24', '#f59e0b', '#22c55e', '#ef4444', '#3b82f6', '#ec4899', '#f97316', '#a855f7'];
  const fireworkAnims = useRef(
    Array.from({ length: 2 }, (_, groupIdx) =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2; // spread evenly in a circle
        return {
          translateX: new Animated.Value(0),
          translateY: new Animated.Value(0),
          opacity: new Animated.Value(0),
          scale: new Animated.Value(0),
          // Pre-computed direction for burst
          targetX: Math.cos(angle) * (80 + Math.random() * 60),
          targetY: Math.sin(angle) * (80 + Math.random() * 60) - 40, // bias upward
          color: FIREWORK_COLORS[(groupIdx * 8 + i) % FIREWORK_COLORS.length],
        };
      })
    )
  ).current;

  // Launch position: trail going upward before burst
  const fireworkTrails = useRef(
    Array.from({ length: 2 }, () => ({
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current;

  const launchFireworkGroup = (groupIdx: number) => {
    const particles = fireworkAnims[groupIdx];
    const trail = fireworkTrails[groupIdx];

    // Trail: shoot upward from bottom edge
    trail.translateY.setValue(0);
    trail.opacity.setValue(1);

    Animated.sequence([
      // Trail shoots up
      Animated.parallel([
        Animated.timing(trail.translateY, {
          toValue: -180,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(trail.opacity, {
          toValue: 0.6,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      // Trail fades at burst point
      Animated.timing(trail.opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Particles burst after trail reaches top
    setTimeout(() => {
      particles.forEach((p) => {
        p.translateX.setValue(0);
        p.translateY.setValue(0);
        p.opacity.setValue(1);
        p.scale.setValue(1);

        Animated.parallel([
          Animated.timing(p.translateX, {
            toValue: p.targetX,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(p.translateY, {
            toValue: p.targetY,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(p.scale, {
              toValue: 1.4,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(p.scale, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(p.opacity, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 300);
  };

  useEffect(() => {
    if (visible) {
      // Trophy pop animation
      Animated.spring(trophyScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Cards stagger animation
      cardAnims.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          delay: 300 + index * 100,
          useNativeDriver: true,
        }).start();
      });

      // Confetti animation
      confettiAnims.forEach((anim, index) => {
        Animated.parallel([
          Animated.timing(anim.translateY, {
            toValue: Dimensions.get('window').height + 100,
            duration: 2500 + Math.random() * 1500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.rotate, {
            toValue: 360 * (3 + Math.random() * 3),
            duration: 2500 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]).start();
      });

      // Celebration haptic sequence at 300ms
      const hapticTimer = setTimeout(() => {
        playCelebrationSound();
      }, 300);

      // Fireworks at 500ms (left) and 800ms (right)
      const firework1Timer = setTimeout(() => {
        launchFireworkGroup(0);
      }, 500);

      const firework2Timer = setTimeout(() => {
        launchFireworkGroup(1);
      }, 800);

      return () => {
        clearTimeout(hapticTimer);
        clearTimeout(firework1Timer);
        clearTimeout(firework2Timer);
      };
    } else {
      // Reset animations
      trophyScale.setValue(0);
      cardAnims.forEach(anim => anim.setValue(0));
      confettiAnims.forEach(anim => {
        anim.translateY.setValue(-100);
        anim.opacity.setValue(1);
      });
      // Reset firework animations
      fireworkAnims.forEach(group => {
        group.forEach(p => {
          p.translateX.setValue(0);
          p.translateY.setValue(0);
          p.opacity.setValue(0);
          p.scale.setValue(0);
        });
      });
      fireworkTrails.forEach(trail => {
        trail.translateY.setValue(0);
        trail.opacity.setValue(0);
      });
    }
  }, [visible]);

  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const earnedStars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0;
  const isPerfect = accuracy === 100;

  // Confetti colors based on accuracy
  const confettiColors = isPerfect 
    ? ['#fbbf24', '#f59e0b', '#22c55e', '#10b981', '#3b82f6'] 
    : accuracy >= 70 
    ? ['#22c55e', '#10b981', '#84cc16'] 
    : ['#3b82f6', '#6366f1', '#8b5cf6'];

  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={false} size="large">
      {/* Animated Confetti */}
      {confettiAnims.map((anim, index) => (
        <Animated.View
          key={index}
          style={{
            position: 'absolute',
            width: index % 3 === 0 ? 14 : 10,
            height: index % 3 === 0 ? 14 : 10,
            backgroundColor: confettiColors[index % confettiColors.length],
            borderRadius: index % 2 === 0 ? 7 : 2,
            zIndex: 1000,
            opacity: anim.opacity,
            transform: [
              { translateY: anim.translateY },
              { translateX: anim.translateX },
              {
                rotate: anim.rotate.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                })
              },
            ],
          }}
        />
      ))}

      {/* Firework Animations */}
      {fireworkAnims.map((group, groupIdx) => {
        // Left group originates from bottom-left, right from bottom-right
        const originX = groupIdx === 0 ? SCREEN_W * 0.15 : SCREEN_W * 0.85;
        const originY = SCREEN_H * 0.7;

        return (
          <View key={`firework-group-${groupIdx}`} pointerEvents="none">
            {/* Trail */}
            <Animated.View
              style={{
                position: 'absolute',
                left: originX - 3,
                top: originY,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#fbbf24',
                zIndex: 1001,
                opacity: fireworkTrails[groupIdx].opacity,
                transform: [
                  { translateY: fireworkTrails[groupIdx].translateY },
                ],
              }}
            />
            {/* Burst particles */}
            {group.map((particle, pIdx) => (
              <Animated.View
                key={`fw-${groupIdx}-${pIdx}`}
                style={{
                  position: 'absolute',
                  left: originX - 5,
                  top: originY - 180,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: particle.color,
                  zIndex: 1001,
                  opacity: particle.opacity,
                  transform: [
                    { translateX: particle.translateX },
                    { translateY: particle.translateY },
                    { scale: particle.scale },
                  ],
                }}
              />
            ))}
          </View>
        );
      })}

      <ScrollView 
        style={{ flex: 1, backgroundColor: colors.bg.primary }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Trophy Hero Section */}
        <Animated.View 
          style={{ 
            alignItems: 'center', 
            marginBottom: 24,
            transform: [{ scale: trophyScale }],
          }}
        >
          <View style={{
            width: 140,
            height: 140,
            backgroundColor: colors.stats.xp.bg,
            borderRadius: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 6,
            borderColor: colors.stats.xp.border,
            marginBottom: 16,
            shadowColor: colors.stats.xp.text,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 12,
          }}>
            {isPerfect ? (
              <TrophyIcon size={64} color="#fbbf24" />
            ) : accuracy >= 80 ? (
              <StarIcon size={64} color="#fbbf24" />
            ) : accuracy >= 60 ? (
              <StarIcon size={64} color="#a3a3a3" />
            ) : (
              <BookIcon size={64} color="#6366f1" />
            )}
          </View>
          
          <Text style={{ 
            fontSize: 36, 
            fontWeight: 'bold', 
            color: colors.text.primary,
            marginBottom: 8,
          }}>
            {isPerfect ? 'Zo\'r!' : accuracy >= 80 ? 'Ajoyib!' : accuracy >= 60 ? 'Yaxshi!' : 'Tugallandi!'}
          </Text>
          
          <Text style={{ 
            fontSize: 16, 
            color: colors.text.secondary, 
            textAlign: 'center',
            marginBottom: 4,
          }}>
            {lessonTitleUz}
          </Text>
          
          <View style={{
            backgroundColor: colors.bg.card,
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}>
            <Text style={{ 
              fontSize: 13, 
              color: colors.text.tertiary,
              fontWeight: '600',
            }}>
              DARS YAKUNLANDI
            </Text>
          </View>
        </Animated.View>

        {/* Level Up Banner */}
        {isLevelUp && newLevel && (
          <Animated.View
            style={{
              opacity: cardAnims[0],
              transform: [{ 
                translateY: cardAnims[0].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                })
              }],
            }}
          >
            <View style={{
              backgroundColor: '#fbbf24',
              borderRadius: 16,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              borderWidth: 3,
              borderColor: '#f59e0b',
              shadowColor: '#fbbf24',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 12,
              elevation: 8,
            }}>
              <TrophyIcon size={32} color="#ffffff" />
              <Text style={{ 
                fontSize: 24, 
                fontWeight: 'bold', 
                color: '#ffffff',
                marginHorizontal: 12,
              }}>
                Level {newLevel}!
              </Text>
              <TrophyIcon size={32} color="#ffffff" />
            </View>
          </Animated.View>
        )}

        {/* Stars Row - Gamified Cards */}
        <Animated.View 
          style={{ 
            flexDirection: 'row', 
            justifyContent: 'center',
            marginBottom: 24,
            gap: 12,
            opacity: cardAnims[1],
            transform: [{ 
              translateY: cardAnims[1].interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })
            }],
          }}
        >
          {[1, 2, 3].map((star) => {
            const isEarned = star <= earnedStars;
            return (
              <View key={star} style={{
                width: 64,
                height: 64,
                backgroundColor: isEarned ? colors.stats.xp.bg : colors.bg.card,
                borderRadius: 32,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: isEarned ? colors.stats.xp.border : colors.border.primary,
                shadowColor: isEarned ? colors.stats.xp.text : 'transparent',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: isEarned ? 0.3 : 0,
                shadowRadius: 8,
                elevation: isEarned ? 6 : 1,
              }}>
                <StarIcon size={32} color={isEarned ? '#fbbf24' : colors.text.tertiary} />
              </View>
            );
          })}
        </Animated.View>

        {/* Stats Bento Grid - Gamified */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          {/* XP Card - Full Width */}
          <Animated.View
            style={{
              opacity: cardAnims[2],
              transform: [{ 
                translateY: cardAnims[2].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                })
              }],
            }}
          >
            <View style={{
              backgroundColor: colors.stats.xp.bg,
              borderRadius: 20,
              padding: 24,
              borderWidth: 3,
              borderColor: colors.stats.xp.border,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              shadowColor: colors.stats.xp.text,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 6,
            }}>
              <View>
                <Text style={{ 
                  fontSize: 14, 
                  color: colors.text.tertiary, 
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginBottom: 6,
                }}>
                  XP OLINDI
                </Text>
                <Text style={{ 
                  fontSize: 42, 
                  fontWeight: 'bold', 
                  color: colors.stats.xp.text,
                }}>
                  +{xpEarned}
                </Text>
                {streakBonus > 0 && (
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                  }}>
                    <FireIcon size={16} color={colors.stats.streak.text} />
                    <Text style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color: colors.text.secondary,
                      marginLeft: 4,
                    }}>
                      +{streakBonus} Bonus
                    </Text>
                  </View>
                )}
              </View>
              <StarIcon size={64} color={colors.stats.xp.text} />
            </View>
          </Animated.View>

          {/* Accuracy & Correct - 50/50 Grid */}
          <Animated.View
            style={{
              flexDirection: 'row',
              gap: 12,
              opacity: cardAnims[3],
              transform: [{ 
                translateY: cardAnims[3].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                })
              }],
            }}
          >
            {/* Accuracy Card */}
            <View style={{
              flex: 1,
              backgroundColor: colors.stats.accuracy.bg,
              borderRadius: 20,
              padding: 20,
              borderWidth: 2,
              borderColor: colors.stats.accuracy.border,
              alignItems: 'center',
              shadowColor: colors.stats.accuracy.text,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 4,
            }}>
              <TargetIcon size={48} color={colors.stats.accuracy.text} />
              <Text style={{ 
                fontSize: 32, 
                fontWeight: 'bold', 
                color: colors.stats.accuracy.text,
                marginTop: 12,
              }}>
                {accuracy}%
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: colors.text.tertiary,
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 6,
              }}>
                To'g'rilik
              </Text>
            </View>

            {/* Correct Answers Card */}
            <View style={{
              flex: 1,
              backgroundColor: colors.stats.lessons.bg,
              borderRadius: 20,
              padding: 20,
              borderWidth: 2,
              borderColor: colors.stats.lessons.border,
              alignItems: 'center',
              shadowColor: colors.stats.lessons.text,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 4,
            }}>
              <View style={{
                width: 52,
                height: 52,
                backgroundColor: colors.green.primary,
                borderRadius: 26,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <CheckIcon size={32} color="#ffffff" />
              </View>
              <Text style={{ 
                fontSize: 32, 
                fontWeight: 'bold', 
                color: colors.stats.lessons.text,
                marginTop: 12,
              }}>
                {correctAnswers}/{totalQuestions}
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: colors.text.tertiary,
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 6,
              }}>
                To'g'ri
              </Text>
            </View>
          </Animated.View>

          {/* Streak Bonus Card (if applicable) */}
          {currentStreak > 0 && (
            <Animated.View
              style={{
                opacity: cardAnims[4],
                transform: [{ 
                  translateY: cardAnims[4].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  })
                }],
              }}
            >
              <View style={{
                backgroundColor: colors.stats.streak.bg,
                borderRadius: 16,
                padding: 16,
                borderWidth: 2,
                borderColor: colors.stats.streak.border,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FireIcon size={28} color={colors.stats.streak.text} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ 
                      fontSize: 18, 
                      fontWeight: 'bold', 
                      color: colors.stats.streak.text,
                    }}>
                      {currentStreak} Kun Ketma-ket!
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      color: colors.text.tertiary,
                      marginTop: 2,
                    }}>
                      Ajoyib! Davom eting!
                    </Text>
                  </View>
                </View>
                <LionIcon size={36} color={colors.stats.streak.text} />
              </View>
            </Animated.View>
          )}
        </View>

        {/* Action Buttons - Gamified */}
        <View style={{ gap: 12, marginTop: 8 }}>
          {onNextLesson && (
            <TouchableOpacity
              onPress={onNextLesson}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.green.primary,
                borderRadius: 16,
                padding: 20,
                alignItems: 'center',
                borderBottomWidth: 5,
                borderBottomColor: colors.green.dark,
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
                letterSpacing: 1,
              }}>
                KEYINGI DARS
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={{
              backgroundColor: onNextLesson ? colors.bg.card : colors.green.primary,
              borderRadius: 16,
              padding: onNextLesson ? 18 : 20,
              alignItems: 'center',
              borderWidth: onNextLesson ? 2 : 0,
              borderColor: colors.border.primary,
              borderBottomWidth: onNextLesson ? 2 : 5,
              borderBottomColor: onNextLesson ? colors.border.primary : colors.green.dark,
              shadowColor: onNextLesson ? 'transparent' : colors.green.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: onNextLesson ? 0 : 8,
            }}
          >
            <Text style={{
              fontSize: onNextLesson ? 16 : 18,
              fontWeight: 'bold',
              color: onNextLesson ? colors.text.primary : '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              BOSH SAHIFA
            </Text>
          </TouchableOpacity>

          {(accuracy < 100 && onReview) && (
            <TouchableOpacity
              onPress={onReview}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.bg.card,
                borderRadius: 16,
                padding: 18,
                alignItems: 'center',
                borderWidth: 2,
                borderColor: colors.border.primary,
              }}
            >
              <Text style={{
                fontSize: 16,
                fontWeight: '700',
                color: colors.text.primary,
              }}>
                Qayta Ko'rib Chiqish
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};
