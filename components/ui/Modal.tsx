import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/utils/theme';

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
  const { colors, isDark } = useTheme();

  const sizeWidth = {
    small: width * 0.7,
    medium: width * 0.85,
    large: width * 0.95,
  }[size];

  const modalWidth = Math.min(sizeWidth, 480);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 16,
      }}>
        <View
          style={{
            backgroundColor: colors.bg.card,
            borderRadius: 24,
            padding: 24,
            maxHeight: '80%',
            width: modalWidth,
          }}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              {title && (
                <Text style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: colors.text.primary,
                  flex: 1,
                }}>
                  {title}
                </Text>
              )}
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: isDark ? colors.bg.elevated : colors.bg.secondary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: colors.text.secondary, fontSize: 18 }}>✕</Text>
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
