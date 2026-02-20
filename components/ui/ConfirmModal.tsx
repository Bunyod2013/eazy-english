import React from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'default';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Tasdiqlash',
  cancelText = 'Bekor qilish',
  variant = 'default',
}) => {
  const { colors, isDark } = useTheme();

  const confirmColor = variant === 'danger' ? colors.red.primary : colors.green.primary;
  const confirmBg = variant === 'danger' ? colors.red.bg : colors.green.bg;

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.bg.card,
              borderColor: colors.border.primary,
            },
          ]}
        >
          <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
          {message && (
            <Text style={[styles.message, { color: colors.text.secondary }]}>{message}</Text>
          )}

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={[
                styles.button,
                {
                  backgroundColor: isDark ? colors.bg.elevated : colors.bg.secondary,
                  borderWidth: 1,
                  borderColor: colors.border.primary,
                },
              ]}
            >
              <Text style={[styles.buttonText, { color: colors.text.secondary }]}>
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              activeOpacity={0.7}
              style={[
                styles.button,
                {
                  backgroundColor: confirmBg,
                  borderWidth: 1,
                  borderColor: confirmColor,
                },
              ]}
            >
              <Text style={[styles.buttonText, { color: confirmColor, fontWeight: '700' }]}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
