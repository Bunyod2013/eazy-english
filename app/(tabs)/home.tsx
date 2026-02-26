import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DuolingoLessonPath } from '@/components/shared/DuolingoLessonPath';
import { useUserStore } from '@/store/userStore';
import { useProgressStore } from '@/store/progressStore';
import { useLessonStore } from '@/store/lessonStore';
import { getStreakStatus } from '@/utils/date';
import { LionIcon, FireIcon, DiamondIcon, TargetIcon, BookIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';
import { PlanWidget } from '@/components/shared/PlanWidget';

export default function HomeScreen() {
  const router = useRouter();
  const { user, updateStreak } = useUserStore();
  const { progress, loadProgress } = useProgressStore();
  const { lessons, loadLessons } = useLessonStore();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    if (user) {
      loadProgress(user.id);
      const status = getStreakStatus(user.lastActiveDate);
      if (status === 'continue') {
        updateStreak();
      }
    }
  }, [user]);

  // Reload progress and lessons when screen comes into focus (after completing a lesson)
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        loadProgress(user.id);
        if (user.learningPurpose && user.learningPurpose.length > 0) {
          loadLessons(user.learningPurpose, user.skillLevel);
        }
      }
    }, [user])
  );

  if (!user || !progress) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg.secondary }}>
        <LionIcon size={64} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text.primary, marginTop: 16 }}>Loading...</Text>
      </View>
    );
  }

  const completedLessonsIds = progress.completedLessons.map(l => l.lessonId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top Bar - Stats on Right + Daily Goal */}

      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Daily Goal - Left Side in Div */}
          <View style={{
            backgroundColor: colors.stats.goal.bg,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: colors.stats.goal.border,
            flex: 1,
            marginRight: 12,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ color: colors.text.secondary, fontSize: 11, fontWeight: 'bold' }}>
                Kunlik Maqsad
              </Text>
              <Text style={{ color: colors.text.secondary, fontSize: 11, fontWeight: 'bold' }}>
                {user.dailyXP}/{user.dailyGoal} XP
              </Text>
            </View>
            <View style={{
              borderRadius: 10,
              height: 8,
              backgroundColor: colors.border.primary,
              overflow: 'hidden',
            }}>
              <View style={{
                height: '100%',
                width: `${Math.min((user.dailyXP / user.dailyGoal) * 100, 100)}%`,
                backgroundColor: colors.green.primary,
                borderRadius: 10,
              }} />
            </View>
          </View>
          
          {/* Stats - Right Side */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Streak */}
            <View style={{ 
              marginRight: 6, 
              backgroundColor: colors.stats.streak.bg, 
              borderRadius: 10, 
              paddingHorizontal: 10, 
              paddingVertical: 6, 
              flexDirection: 'row', 
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.stats.streak.border
            }}>
              <FireIcon size={14} />
              <Text style={{ color: colors.stats.streak.text, fontSize: 13, fontWeight: 'bold', marginLeft: 4 }}>{user.currentStreak}</Text>
            </View>

            {/* XP */}
            <View style={{ 
              marginRight: 6, 
              backgroundColor: colors.stats.lessons.bg, 
              borderRadius: 10, 
              paddingHorizontal: 10, 
              paddingVertical: 6, 
              flexDirection: 'row', 
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.stats.lessons.border
            }}>
              <DiamondIcon size={14} />
              <Text style={{ color: colors.stats.lessons.text, fontSize: 13, fontWeight: 'bold', marginLeft: 4 }}>{user.totalXP}</Text>
            </View>

            {/* Lessons */}
            <View style={{ 
              backgroundColor: colors.stats.accuracy.bg, 
              borderRadius: 10, 
              paddingHorizontal: 10, 
              paddingVertical: 6, 
              flexDirection: 'row', 
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.stats.accuracy.border
            }}>
              <BookIcon size={14} />
              <Text style={{ color: colors.stats.accuracy.text, fontSize: 13, fontWeight: 'bold', marginLeft: 4 }}>{completedLessonsIds.length}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Greeting Banner - In Div */}
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <View style={{
          backgroundColor: colors.green.bg,
          borderRadius: 16,
          padding: 16,
          borderWidth: 2,
          borderColor: colors.green.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{
              width: 48,
              height: 48,
              backgroundColor: colors.green.primary,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}>
              <LionIcon size={32} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text.secondary, fontSize: 12, fontWeight: '600' }}>
                Ajoyib ketdingiz!
              </Text>
              <Text style={{ color: colors.text.primary, fontSize: 18, fontWeight: 'bold' }}>
                {user.username}
              </Text>
            </View>
          </View>
          
          {/* Large CONTINUE Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.green.primary,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 16,
              borderBottomWidth: 4,
              borderBottomColor: colors.green.dark,
              shadowColor: colors.green.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 6,
            }}
            activeOpacity={0.8}
            onPress={() => {
              const firstUnlocked = lessons.find(l => !completedLessonsIds.includes(l.id));
              if (firstUnlocked) {
                router.push(`/lesson/${firstUnlocked.id}`);
              }
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold', letterSpacing: 0.5 }}>
              DAVOM ETISH
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Plan Widget */}
      <PlanWidget />

      {/* Lesson Path - Duolingo Style */}
      {lessons.length > 0 ? (
        <DuolingoLessonPath
          lessons={lessons}
          completedLessons={completedLessonsIds}
          currentXP={user.totalXP}
          onLessonPress={(lessonId) => router.push(`/lesson/${lessonId}`)}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-6">
          <LionIcon size={64} />
          <Text className="text-xl font-bold text-gray-800 mb-2 mt-4">
            Darslar yuklanmoqda...
          </Text>
          <Text className="text-gray-600 text-center">
            300 ta dars yuklanmoqda...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
