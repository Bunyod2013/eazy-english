import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { StarIcon } from '@/components/icons';

interface XPCelebrationProps {
  xpEarned: number;
  onComplete?: () => void;
}

export const XPCelebration: React.FC<XPCelebrationProps> = ({
  xpEarned,
  onComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 100,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
      }),
    ]).start();

    // Exit animation after 2 seconds
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onComplete) {
          onComplete();
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      className="absolute top-1/3 left-0 right-0 items-center justify-center z-50"
      style={{
        transform: [{ scale: scaleAnim }, { translateY }],
        opacity: fadeAnim,
      }}
    >
      <View className="bg-white rounded-3xl p-8 shadow-2xl items-center border-4 border-primary">
        <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-4">
          <StarIcon size={48} color="#fff" />
        </View>
        <Text className="text-6xl font-bold text-primary mb-2">+{xpEarned}</Text>
        <Text className="text-xl text-gray-600 font-semibold">XP Earned!</Text>
        <View className="flex-row mt-4 gap-2">
          <StarIcon size={32} />
          <StarIcon size={32} />
          <StarIcon size={32} />
        </View>
      </View>
    </Animated.View>
  );
};
