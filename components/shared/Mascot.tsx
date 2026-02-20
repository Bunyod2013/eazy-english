import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { LionIcon } from '@/components/icons';

interface MascotProps {
  mood?: 'happy' | 'excited' | 'neutral' | 'sad' | 'thinking';
  message?: string;
  messageUz?: string;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  message,
  messageUz,
  onPress,
  size = 'medium',
}) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const sizeStyles = {
    small: { width: 40, height: 40, iconSize: 32 },
    medium: { width: 60, height: 60, iconSize: 48 },
    large: { width: 80, height: 80, iconSize: 64 },
  };

  useEffect(() => {
    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePress = () => {
    // Pulse animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 10,
      }),
    ]).start();

    if (onPress) {
      onPress();
    }
  };

  return (
    <View className="items-center">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={!onPress}
      >
        <Animated.View
          className="bg-primary rounded-full items-center justify-center shadow-lg"
            style={{
              width: sizeStyles[size].width,
              height: sizeStyles[size].height,
              transform: [
                { translateY: bounceAnim },
                { scale: scaleAnim },
              ],
            }}
          >
            <LionIcon size={sizeStyles[size].iconSize} />
          </Animated.View>
      </TouchableOpacity>

      {/* Speech Bubble */}
      {(message || messageUz) && (
        <View className="mt-3 bg-white rounded-2xl px-4 py-3 shadow-md max-w-[250px]">
          <View className="absolute -top-2 left-1/2 -ml-2 w-4 h-4 bg-white transform rotate-45" />
          {messageUz && (
            <Text className="text-sm text-gray-700 font-medium mb-1">
              {messageUz}
            </Text>
          )}
          {message && (
            <Text className="text-xs text-gray-500">{message}</Text>
          )}
        </View>
      )}
    </View>
  );
};
