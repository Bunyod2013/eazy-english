import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { triggerSuccess, triggerError, triggerWarning } from '@/utils/haptics';
import { CheckIcon, XIcon } from '@/components/icons';
import Svg, { Path, Circle } from 'react-native-svg';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onHide?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onHide,
}) => {
  const translateY = React.useRef(new Animated.Value(-100)).current;

  const typeStyles = {
    success: { 
      bg: 'bg-[#58cc02]', 
      icon: <CheckIcon size={24} color="#fff" />, 
      haptic: triggerSuccess 
    },
    error: { 
      bg: 'bg-[#ff4b4b]', 
      icon: <XIcon size={24} color="#fff" />, 
      haptic: triggerError 
    },
    warning: { 
      bg: 'bg-[#ffc800]', 
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="10" fill="#fff" />
          <Path d="M12 7v6M12 16h.01" stroke="#ffc800" strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      ), 
      haptic: triggerWarning 
    },
    info: { 
      bg: 'bg-[#1cb0f6]', 
      icon: (
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <Circle cx="12" cy="12" r="10" fill="#fff" />
          <Path d="M11 11h2v6h-2z" fill="#1cb0f6" />
          <Circle cx="12" cy="8" r="1.5" fill="#1cb0f6" />
        </Svg>
      ), 
      haptic: () => {} 
    },
  };

  const { bg, icon, haptic } = typeStyles[type];

  useEffect(() => {
    // Trigger haptic feedback
    haptic();

    // Animate in
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 100,
    }).start();

    // Auto-hide after duration
    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (onHide) {
          onHide();
        }
      });
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      className={`absolute top-12 left-4 right-4 ${bg} rounded-2xl p-4 shadow-lg z-50`}
      style={{
        transform: [{ translateY }],
      }}
        >
          <View className="flex-row items-center">
            <View className="mr-3">{icon}</View>
            <Text className="text-white font-semibold text-base flex-1">
              {message}
            </Text>
          </View>
        </Animated.View>
  );
};

// Toast manager for global toast display
class ToastManager {
  private static listener: ((props: ToastProps) => void) | null = null;

  static setListener(listener: (props: ToastProps) => void) {
    this.listener = listener;
  }

  static show(message: string, type: ToastProps['type'] = 'info', duration?: number) {
    if (this.listener) {
      this.listener({ message, type, duration });
    }
  }

  static success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  static error(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  static warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  static info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }
}

export { ToastManager };
