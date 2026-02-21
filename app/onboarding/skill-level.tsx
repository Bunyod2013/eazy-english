import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Image, Easing } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/utils/theme';

const CUBBY = require('@/assets/characters/character4.png');

type SkillLevel = 'beginner' | 'elementary' | 'intermediate';

const LEVELS = [
  { level: 'beginner' as SkillLevel, emoji: '🌱', title: "Boshlang'ich", sub: 'Beginner', desc: "Men hozirgina boshlayman. ABC dan boshlaymiz!", color: '#22c55e', bgColor: '#f0fdf4', borderColor: '#bbf7d0' },
  { level: 'elementary' as SkillLevel, emoji: '📖', title: 'Elementar', sub: 'Elementary', desc: "Bir necha oddiy so'z va iboralarni bilaman", color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#bfdbfe' },
  { level: 'intermediate' as SkillLevel, emoji: '🚀', title: "O'rta daraja", sub: 'Intermediate', desc: "Oddiy jumlalar tuza olaman va suhbatlarni tushunaman", color: '#8b5cf6', bgColor: '#f3e8ff', borderColor: '#e9d5ff' },
];

export default function SkillLevelScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const language = (params.language as string) || 'uz';
  const purposes = (params.purposes as string) || 'general';
  const { colors, isDark } = useTheme();
  const [selected, setSelected] = useState<SkillLevel>('beginner');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const charScale = useRef(new Animated.Value(0)).current;
  const charBounce = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(LEVELS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    Animated.spring(charScale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }).start();
    Animated.stagger(120, cardAnims.map(a =>
      Animated.spring(a, { toValue: 1, useNativeDriver: true, damping: 14 })
    )).start();

    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(charBounce, { toValue: -5, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(charBounce, { toValue: 5, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    floatAnim.start();
    return () => floatAnim.stop();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.secondary }}>
      {/* Progress Bar */}
      <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 }}>
        <View style={{ height: 6, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0', borderRadius: 3 }}>
          <View style={{ width: '60%', height: '100%', backgroundColor: '#3b82f6', borderRadius: 3 }} />
        </View>
        <Text style={{ fontSize: 13, color: colors.text.tertiary, textAlign: 'right', marginTop: 6 }}>3 / 5</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}>
        {/* Header + Character */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 28 }}>
          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <Text style={{ fontSize: 30, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.5, marginBottom: 8 }}>
              Ingliz tili{'\n'}darajangiz qanday?
            </Text>
            <Text style={{ fontSize: 16, color: colors.text.secondary, lineHeight: 22 }}>
              Sizga mos darslarni tanlaymiz
            </Text>
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: charScale }, { translateY: charBounce }], marginLeft: 8 }}>
            <Image source={CUBBY} style={{ width: 75, height: 100 }} resizeMode="contain" />
          </Animated.View>
        </View>

        {/* Level Cards */}
        <View style={{ gap: 14 }}>
          {LEVELS.map((item, i) => {
            const isSelected = selected === item.level;
            return (
              <Animated.View key={item.level} style={{
                opacity: cardAnims[i],
                transform: [{ translateY: cardAnims[i].interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
              }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelected(item.level)}
                  style={{
                    backgroundColor: isSelected ? (isDark ? `${item.color}15` : item.bgColor) : colors.bg.card,
                    borderRadius: 22, padding: 20, borderWidth: 2,
                    borderColor: isSelected ? item.color : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    shadowColor: isSelected ? item.color : '#000',
                    shadowOffset: { width: 0, height: isSelected ? 4 : 2 },
                    shadowOpacity: isSelected ? 0.15 : 0.04, shadowRadius: isSelected ? 12 : 4,
                    elevation: isSelected ? 4 : 1,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 16,
                      backgroundColor: isDark ? `${item.color}20` : item.bgColor,
                      borderWidth: 1, borderColor: isDark ? `${item.color}30` : item.borderColor,
                    }}>
                      <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 19, fontWeight: '700', color: colors.text.primary, letterSpacing: -0.3 }}>{item.title}</Text>
                      <Text style={{ fontSize: 13, color: item.color, fontWeight: '600', marginTop: 2 }}>{item.sub}</Text>
                    </View>
                    <View style={{
                      width: 26, height: 26, borderRadius: 13, borderWidth: 2, alignItems: 'center', justifyContent: 'center',
                      borderColor: isSelected ? item.color : isDark ? 'rgba(255,255,255,0.2)' : '#d4d4d4',
                      backgroundColor: isSelected ? item.color : 'transparent',
                    }}>
                      {isSelected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' }} />}
                    </View>
                  </View>
                  <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: 12, marginLeft: 72, lineHeight: 20 }}>{item.desc}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Tip */}
        <Animated.View style={{
          opacity: fadeAnim, marginTop: 24,
          backgroundColor: isDark ? 'rgba(251,191,36,0.1)' : '#fffbeb',
          borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center',
          borderWidth: 1, borderColor: isDark ? 'rgba(251,191,36,0.2)' : '#fde68a',
        }}>
          <Text style={{ fontSize: 20, marginRight: 12 }}>💡</Text>
          <Text style={{ fontSize: 14, color: colors.text.secondary, flex: 1, lineHeight: 20 }}>
            Ishonchingiz komil bo'lmasa, boshlang'ich darajadan boshlang. Tez rivojlanasiz!
          </Text>
        </Animated.View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16,
        backgroundColor: colors.bg.secondary,
        borderTopWidth: 1, borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push({ pathname: '/onboarding/daily-goal', params: { language, skillLevel: selected, purposes } })}
          style={{
            backgroundColor: '#3b82f6', borderRadius: 18, paddingVertical: 17, alignItems: 'center',
            maxWidth: 440, alignSelf: 'center', width: '100%',
            shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#fff' }}>Davom etish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
