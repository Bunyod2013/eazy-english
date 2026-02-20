import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Modal } from '@/components/ui';
import { StarIcon, TrophyIcon, FireIcon } from '@/components/icons';

interface DailyGoalModalProps {
  visible: boolean;
  onClose: () => void;
  xpEarned: number;
  goalReached: boolean;
}

export const DailyGoalModal: React.FC<DailyGoalModalProps> = ({
  visible,
  onClose,
  xpEarned,
  goalReached,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 10,
        stiffness: 100,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} onClose={onClose} showCloseButton={false}>
      <View className="items-center py-6">
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View className="w-32 h-32 bg-primary rounded-full items-center justify-center mb-6">
            {goalReached ? (
              <TrophyIcon size={72} color="#fff" />
            ) : (
              <StarIcon size={72} color="#fff" />
            )}
          </View>
        </Animated.View>

        <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">
          {goalReached ? 'Goal Reached!' : 'Great Progress!'}
        </Text>
        <Text className="text-xl text-gray-600 mb-8 text-center">
          {goalReached ? 'Ajoyib! Kunlik maqsadga yetdingiz!' : 'Davom eting!'}
        </Text>

        <View className="bg-yellow-50 rounded-2xl p-6 w-full mb-6">
          <View className="flex-row items-center justify-center">
            <Text className="text-6xl font-bold text-primary">+{xpEarned}</Text>
            <Text className="text-2xl text-gray-600 ml-2">XP</Text>
          </View>
        </View>

        {goalReached && (
          <View className="bg-primary/10 rounded-2xl p-4 w-full mb-6 flex-row items-center justify-center">
            <FireIcon size={20} />
            <Text className="text-sm text-center text-gray-700 ml-2">
              Streak davom etmoqda!{'\n'}
              Ertaga ham dars qiling!
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={onClose}
          className="bg-primary rounded-2xl px-8 py-4 w-full"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold text-lg text-center">
            Continue / Davom etish
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
