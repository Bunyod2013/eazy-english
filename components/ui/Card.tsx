import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  className = '',
  style,
}) => {
  const variantStyles = {
    default: 'bg-white border-2 border-[#e5e5e5]',
    elevated: 'bg-white',
    outlined: 'bg-white border-2 border-[#e5e5e5]',
    ghost: 'bg-transparent',
  };

  const baseStyle = `${variantStyles[variant]} rounded-2xl p-4 ${className}`;

  const shadowStyle = variant === 'elevated' ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  } : {};

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className={baseStyle}
        style={[shadowStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={baseStyle} style={[shadowStyle, style]}>
      {children}
    </View>
  );
};
