import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 12,
  showPercentage = false,
  color = '#58cc02',
  backgroundColor = '#e5e5e5',
  animated = true,
  className = '',
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.spring(animatedValue, {
        toValue: progress,
        useNativeDriver: false,
        damping: 15,
        stiffness: 100,
      }).start();
    } else {
      animatedValue.setValue(progress);
    }
  }, [progress, animated]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className={className}>
      <View
        className="rounded-full overflow-hidden"
        style={{ height, backgroundColor }}
      >
        <Animated.View
          className="h-full rounded-full"
          style={{ backgroundColor: color, width }}
        />
      </View>
      {showPercentage && (
        <Text className="text-sm text-[#3c3c3c] text-center mt-1 font-bold">
          {Math.round(progress)}%
        </Text>
      )}
    </View>
  );
};
