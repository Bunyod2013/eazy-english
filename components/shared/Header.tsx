import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  rightElement,
}) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      {/* Left: Back button or empty space */}
      <View className="w-10">
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Center: Title */}
      <Text className="text-xl font-bold text-gray-800">
        {title}
      </Text>

      {/* Right: Custom element or empty space */}
      <View className="w-10">
        {rightElement}
      </View>
    </View>
  );
};
