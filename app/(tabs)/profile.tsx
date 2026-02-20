import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Modal, ProgressBar } from '@/components/ui';
import { Mascot } from '@/components/shared';
import { useUserStore } from '@/store/userStore';
import { useProgressStore } from '@/store/progressStore';
import { calculateLevelFromXP, getXPProgressInCurrentLevel, getXPForLevel } from '@/utils/xp';
import { triggerSuccess } from '@/utils/haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { FireIcon, StarIcon, BookIcon, TargetIcon, TrophyIcon, DiamondIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

export default function ProfileScreen() {
  const { user, resetUser } = useUserStore();
  const { progress, resetProgress, isLessonCompleted } = useProgressStore();
  const [showResetModal, setShowResetModal] = useState(false);
  const { colors, isDark } = useTheme();

  if (!user || !progress) {
    return null;
  }

  const currentLevel = calculateLevelFromXP(user.totalXP);
  const levelProgressData = getXPProgressInCurrentLevel(user.totalXP);
  const xpNeeded = levelProgressData.nextLevelXP - levelProgressData.currentLevelXP;

  const completedLessonsCount = progress.completedLessons.length;
  const totalAccuracy =
    completedLessonsCount > 0
      ? progress.completedLessons.reduce((sum, l) => sum + l.accuracy, 0) /
        completedLessonsCount
      : 0;

  const handleReset = async () => {
    try {
      await resetProgress(user.id);
      await resetUser();
      setShowResetModal(false);
      Alert.alert('Reset Complete', 'Your progress has been reset!');
    } catch (error) {
      Alert.alert('Error', 'Failed to reset progress');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Top Stats Bar - Same as Learn */}
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text.primary }}>
              Profil
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ 
                marginRight: 8, 
                backgroundColor: colors.stats.streak.bg, 
                borderRadius: 12, 
                paddingHorizontal: 12, 
                paddingVertical: 6, 
                flexDirection: 'row', 
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.stats.streak.border
              }}>
                <FireIcon size={16} />
                <Text style={{ color: colors.stats.streak.text, fontSize: 14, fontWeight: 'bold', marginLeft: 6 }}>{user.currentStreak}</Text>
              </View>
              <View style={{ 
                backgroundColor: colors.stats.lessons.bg, 
                borderRadius: 12, 
                paddingHorizontal: 12, 
                paddingVertical: 6, 
                flexDirection: 'row', 
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.stats.lessons.border
              }}>
                <DiamondIcon size={16} />
                <Text style={{ color: colors.stats.lessons.text, fontSize: 14, fontWeight: 'bold', marginLeft: 6 }}>{user.totalXP}</Text>
              </View>
            </View>
          </View>
          
          {/* User Info Card */}
          <View style={{
            backgroundColor: colors.green.bg,
            borderRadius: 16,
            padding: 16,
            borderWidth: 2,
            borderColor: colors.green.border,
            marginBottom: 12,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 60,
                height: 60,
                backgroundColor: colors.green.primary,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff' }}>
                  {currentLevel}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary }}>
                  {user.username}
                </Text>
                <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: 2 }}>
                  Level {currentLevel} • {user.totalXP} XP
                </Text>
              </View>
            </View>
          </View>
          
          {/* Level Progress Card */}
          <View style={{
            backgroundColor: colors.bg.card,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border.primary,
            marginBottom: 12,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text.secondary }}>
                Level {currentLevel}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text.secondary }}>
                Level {currentLevel + 1}
              </Text>
            </View>
            <View style={{
              borderRadius: 12,
              height: 12,
              backgroundColor: colors.border.primary,
              overflow: 'hidden',
            }}>
              <View style={{
                height: '100%',
                width: `${levelProgressData.progress * 100}%`,
                backgroundColor: '#58cc02',
                borderRadius: 12,
              }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
              <Text style={{ fontSize: 12, color: '#9ca3af' }}>
                {Math.round(levelProgressData.currentLevelXP)} XP
              </Text>
              <Text style={{ fontSize: 12, color: '#9ca3af' }}>
                {Math.round(levelProgressData.nextLevelXP)} XP
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics - Apple Bento Grid */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: 12 }}>
            Statistika
          </Text>
          
          {/* Bento Grid - Asymmetric Apple Style */}
          <View style={{ gap: 10 }}>
            {/* Row 1: Large Total XP (full width) */}
            <View style={{
              backgroundColor: colors.stats.xp.bg,
              borderRadius: 20,
              padding: 24,
              borderWidth: 1,
              borderColor: colors.stats.xp.border,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontSize: 14, color: colors.text.secondary, fontWeight: '600', marginBottom: 8 }}>
                    JAMI XP
                  </Text>
                  <Text style={{ fontSize: 48, fontWeight: 'bold', color: colors.stats.xp.text }}>
                    {user.totalXP}
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.text.secondary, marginTop: 4 }}>
                    Level {currentLevel} • {Math.round(levelProgressData.progress * 100)}% keyingisiga
                  </Text>
                </View>
                <StarIcon size={64} color={colors.stats.xp.text} />
              </View>
            </View>
            
            {/* Row 2: Streak (60%) + Accuracy (40%) */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{
                flex: 1.5,
                backgroundColor: colors.stats.streak.bg,
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: colors.stats.streak.border,
              }}>
                <FireIcon size={40} />
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: colors.stats.streak.text, marginTop: 12 }}>
                  {user.currentStreak}
                </Text>
                <Text style={{ fontSize: 13, color: colors.text.secondary, fontWeight: '600', marginTop: 4 }}>
                  Kunlik Davomiylik
                </Text>
              </View>
              
              <View style={{
                flex: 1,
                backgroundColor: colors.stats.accuracy.bg,
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: colors.stats.accuracy.border,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TargetIcon size={36} />
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.stats.accuracy.text, marginTop: 8 }}>
                  {Math.round(totalAccuracy)}%
                </Text>
                <Text style={{ fontSize: 11, color: colors.text.secondary, fontWeight: '600', marginTop: 4 }}>
                  To'g'rilik
                </Text>
              </View>
            </View>
            
            {/* Row 3: Lessons (40%) + Best Streak (60%) */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{
                flex: 1,
                backgroundColor: colors.stats.lessons.bg,
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: colors.stats.lessons.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <BookIcon size={36} />
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.stats.lessons.text, marginTop: 8 }}>
                  {completedLessonsCount}
                </Text>
                <Text style={{ fontSize: 11, color: colors.text.secondary, fontWeight: '600', marginTop: 4 }}>
                  Bajarilgan
                </Text>
              </View>
              
              <View style={{
                flex: 1.5,
                backgroundColor: colors.stats.trophy.bg,
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: colors.stats.trophy.border,
              }}>
                <TrophyIcon size={40} />
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: colors.stats.trophy.text, marginTop: 12 }}>
                  {user.longestStreak}
                </Text>
                <Text style={{ fontSize: 13, color: colors.text.secondary, fontWeight: '600', marginTop: 4 }}>
                  Eng Zo'r Davomiylik
                </Text>
              </View>
            </View>
            
            {/* Row 4: Daily Goal (full width, compact) */}
            <View style={{
              backgroundColor: colors.stats.goal.bg,
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.stats.goal.border,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <DiamondIcon size={28} color={colors.stats.goal.text} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.stats.goal.text }}>
                    {user.dailyGoal} XP
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.text.secondary, fontWeight: '600' }}>
                    Kunlik Maqsad
                  </Text>
                </View>
              </View>
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}>
                <Text style={{ fontSize: 11, color: '#db2777', fontWeight: 'bold' }}>
                  {user.dailyXP}/{user.dailyGoal}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Achievements Preview */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 }}>
            Yutuqlar
          </Text>
          <View style={{
            backgroundColor: '#fef3c7',
            borderRadius: 16,
            padding: 24,
            borderWidth: 2,
            borderColor: '#fde68a',
            alignItems: 'center',
          }}>
            <TrophyIcon size={64} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginTop: 12 }}>
              Tez kunda!
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginTop: 4 }}>
              O'rganish davomida yutuqlarga ega bo'ling
            </Text>
          </View>
        </View>


        {/* Reset Button */}
        <View style={{ padding: 16, paddingBottom: 32 }}>
          <TouchableOpacity
            onPress={() => setShowResetModal(true)}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#fee2e2',
              borderRadius: 16,
              padding: 14,
              borderWidth: 2,
              borderColor: '#fecaca',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#dc2626', fontSize: 14, fontWeight: 'bold' }}>
              Progress'ni Qayta Boshlash
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Reset Confirmation Modal */}
      <Modal
        visible={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Progress?"
      >
        <View className="py-4">
          <Text className="text-gray-700 text-center mb-6">
            Are you sure you want to reset all your progress?{'\n'}
            This action cannot be undone.
          </Text>
          <Text className="text-gray-500 text-sm text-center mb-6">
            Barcha progressingiz o'chib ketadi!
          </Text>
          <View className="space-y-3">
            <Button
              title="Yes, Reset"
              onPress={handleReset}
              variant="danger"
              size="medium"
              fullWidth
            />
            <Button
              title="Cancel"
              onPress={() => setShowResetModal(false)}
              variant="outline"
              size="medium"
              fullWidth
            />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
