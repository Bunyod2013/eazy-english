import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
}) => {
  const { width } = Dimensions.get('window');
  
  const sizeStyles = {
    small: width * 0.7,
    medium: width * 0.85,
    large: width * 0.95,
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <View
          className="bg-white rounded-3xl p-6 max-h-[80%]"
          style={{ width: sizeStyles[size] }}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <View className="flex-row justify-between items-center mb-4">
              {title && (
                <Text className="text-2xl font-bold text-gray-800 flex-1">
                  {title}
                </Text>
              )}
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
                >
                  <Text className="text-gray-600 text-lg">✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Content */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>
      </View>
    </RNModal>
  );
};
