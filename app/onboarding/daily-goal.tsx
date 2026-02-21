import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/utils/theme';

const GOALS = [
  {
    xp: 10,
    emoji: '🐢',
    title: 'Oson',
    sub: 'Kuniga 5 daqiqa',
    desc: 'Sekin lekin izchil',
    color: '#22c55e',
  },
  {
    xp: 20,
    emoji: '🐇',
    title: 'Normal',
    sub: 'Kuniga 10 daqiqa',
    desc: 'Ko\'pchilik uchun mos',
    color: '#3b82f6',
    recommended: true,
  },
  {
    xp: 30,
    emoji: '🦊',
    title: 'Jiddiy',
    sub: 'Kuniga 15 daqiqa',
    desc: 'Tez rivojlanish',
    color: '#f59e0b',
  },
  {
    xp: 50,
    emoji: '🦁',
    title: 'Qattiq',
    sub: 'Kuniga 20+ daqiqa',
    desc: 'Maksimal natija',
    color: '#ef4444',
  },
];

export default function DailyGoalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const language = (params.language as string) || 'uz';
  const skillLevel = (params.skillLevel as string) || 'beginner';
  const purposes = (params.purposes as string) || 'general';
  const { colors, isDark } = useTheme();
  const [selected, setSelected] = useState(20);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(GOALS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    Animated.stagger(100, cardAnims.map(a =>
      Animated.spring(a, { toValue: 1, useNativeDriver: true, damping: 14 })
    )).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.secondary }}>
      {/* Progress Bar */}
      <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 }}>
        <View style={{ height: 6, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0', borderRadius: 3 }}>
          <View style={{ width: '80%', height: '100%', backgroundColor: colors.green.primary, borderRadius: 3 }} />
        </View>
        <Text style={{ fontSize: 13, color: colors.text.tertiary, textAlign: 'right', marginTop: 6 }}>4 / 5</Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        {/* Header */}
        <Animated.View style={{ opacity: fadeAnim, marginTop: 8, marginBottom: 28 }}>
          <Text style={{
            fontSize: 30,
            fontWeight: '800',
            color: colors.text.primary,
            letterSpacing: -0.5,
            marginBottom: 8,
          }}>
            Kunlik maqsadingiz{'\n'}qanday bo'lsin?
          </Text>
          <Text style={{ fontSize: 16, color: colors.text.secondary, lineHeight: 22 }}>
            Har kuni qancha vaqt ajratasiz?
          </Text>
        </Animated.View>

        {/* Goal Cards */}
        <View style={{ gap: 12 }}>
          {GOALS.map((goal, i) => {
            const isSelected = selected === goal.xp;
            return (
              <Animated.View
                key={goal.xp}
                style={{
                  opacity: cardAnims[i],
                  transform: [{
                    translateY: cardAnims[i].interpolate({ inputRange: [0, 1], outputRange: [24, 0] }),
                  }],
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelected(goal.xp)}
                  style={{
                    backgroundColor: isSelected
                      ? (isDark ? `${goal.color}15` : `${goal.color}08`)
                      : colors.bg.card,
                    borderRadius: 22,
                    padding: 18,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: isSelected ? goal.color : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    shadowColor: isSelected ? goal.color : '#000',
                    shadowOffset: { width: 0, height: isSelected ? 4 : 1 },
                    shadowOpacity: isSelected ? 0.15 : 0.03,
                    shadowRadius: isSelected ? 12 : 2,
                    elevation: isSelected ? 4 : 1,
                  }}
                >
                  {/* Emoji */}
                  <View style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: isDark ? `${goal.color}20` : `${goal.color}12`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 14,
                  }}>
                    <Text style={{ fontSize: 28 }}>{goal.emoji}</Text>
                  </View>

                  {/* Text */}
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Text style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: colors.text.primary,
                        letterSpacing: -0.3,
                      }}>
                        {goal.title}
                      </Text>
                      {goal.recommended && (
                        <View style={{
                          backgroundColor: goal.color,
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 8,
                        }}>
                          <Text style={{ fontSize: 11, fontWeight: '700', color: '#fff' }}>Tavsiya</Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: 2 }}>
                      {goal.sub} — {goal.desc}
                    </Text>
                  </View>

                  {/* XP Badge */}
                  <View style={{
                    backgroundColor: isSelected ? goal.color : isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f7',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 10,
                    minWidth: 50,
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: '800',
                      color: isSelected ? '#fff' : colors.text.tertiary,
                    }}>
                      {goal.xp}
                    </Text>
                    <Text style={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: isSelected ? 'rgba(255,255,255,0.8)' : colors.text.tertiary,
                      marginTop: -1,
                    }}>
                      XP
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Info */}
        <Animated.View style={{
          opacity: fadeAnim,
          marginTop: 24,
          backgroundColor: colors.stats.streak.bg,
          borderRadius: 16,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.stats.streak.border,
        }}>
          <Text style={{ fontSize: 20, marginRight: 12 }}>🔥</Text>
          <Text style={{ fontSize: 14, color: colors.text.secondary, flex: 1, lineHeight: 20 }}>
            Har kuni maqsadga erishsangiz, streak (ketma-ketlik) oshadi va bonus XP olasiz!
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Button */}
      <View style={{
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 16,
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push({
            pathname: '/onboarding/username',
            params: { language, skillLevel, dailyGoal: selected.toString(), purposes },
          })}
          style={{
            backgroundColor: colors.green.primary,
            borderRadius: 18,
            paddingVertical: 17,
            alignItems: 'center',
            shadowColor: colors.green.primary,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#fff' }}>
            Davom etish
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
