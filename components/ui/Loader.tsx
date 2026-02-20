import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '@/utils/theme';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color,
  message,
  fullScreen = false,
}) => {
  const { colors } = useTheme();
  const loaderColor = color || colors.green.primary;
  
  const content = (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={size} color={loaderColor} />
      {message && (
        <Text style={{ color: colors.text.secondary, marginTop: 12, textAlign: 'center' }}>
          {message}
        </Text>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg.primary }}>
        {content}
      </View>
    );
  }

  return content;
};
