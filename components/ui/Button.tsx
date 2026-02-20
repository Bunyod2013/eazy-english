import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { triggerLight } from '@/utils/haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  className = '',
}) => {
  const handlePress = () => {
    if (!disabled && !loading) {
      triggerLight();
      onPress();
    }
  };

  const variantStyles = {
    primary: 'bg-[#58cc02]',
    secondary: 'bg-white border-2 border-[#e5e5e5]',
    outline: 'bg-transparent border-2 border-[#58cc02]',
    danger: 'bg-[#ff4b4b]',
  };

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-[#3c3c3c]',
    outline: 'text-[#58cc02]',
    danger: 'text-white',
  };

  const sizeStyles = {
    small: 'px-4 py-2',
    medium: 'px-6 py-3',
    large: 'px-8 py-4',
  };

  const textSizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const disabledStyle = disabled || loading ? 'opacity-50' : '';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyle}
        ${widthStyle}
        rounded-2xl
        items-center
        justify-center
        ${className}
      `}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: variant === 'secondary' ? 0.08 : 0.2,
        shadowRadius: 4,
        elevation: variant === 'secondary' ? 1 : 3,
        borderBottomWidth: (variant === 'primary' || variant === 'danger') && !disabled ? 4 : 0,
        borderBottomColor: variant === 'primary' ? '#58a700' : variant === 'danger' ? '#d63939' : 'transparent',
      }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? '#ffffff' : '#58cc02'}
        />
      ) : (
        <View className="flex-row items-center">
          {icon && <Text className="text-xl mr-2">{icon}</Text>}
          <Text className={`${textStyles[variant]} ${textSizeStyles[size]} font-bold`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
