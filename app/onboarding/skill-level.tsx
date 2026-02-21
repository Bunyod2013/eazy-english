import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Image, Easing } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TurtleIcon, BookIcon, TargetIcon } from '@/components/icons';
import { LightBulbIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

const CUBBY = require('@/assets/characters/character4.png');

type SkillLevel = 'beginner' | 'elementary' | 'intermediate';

const LEVELS = [
  { level: 'beginner' as SkillLevel, icon: TurtleIcon, title: "Boshlang'ich", sub: 'Beginner', desc: "Men hozirgina boshlayman. ABC dan boshlaymiz!", color: '#22c55e', bgColor: '#f0fdf4', borderColor: '#bbf7d0' },
  { level: 'elementary' as SkillLevel, icon: BookIcon, title: 'Elementar', sub: 'Elementary', desc: "Bir necha oddiy so'z va iboralarni bilaman", color: '#3b82f6', bgColor: '#eff6ff', borderColor: '#bfdbfe' },
  { level: 'intermediate' as SkillLevel, icon: TargetIcon, title: "O'rta daraja", sub: 'Intermediate', desc: "Oddiy jumlalar tuza olaman va suhbatlarni tushunaman", color: '#8b5cf6', bgColor: '#f3e8ff', borderColor: '#e9d5ff' },
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 22 }}>
          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.5, marginBottom: 6 }}>
              Ingliz tili{'\n'}darajangiz qanday?
            </Text>
            <Text style={{ fontSize: 14, color: colors.text.secondary, lineHeight: 20 }}>
              Sizga mos darslarni tanlaymiz
            </Text>
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: charScale }, { translateY: charBounce }], marginLeft: 8 }}>
            <Image source={CUBBY} style={{ width: 64, height: 85 }} resizeMode="contain" />
          </Animated.View>
        </View>

        {/* Level Cards */}
        <View style={{ gap: 10 }}>
          {LEVELS.map((item, i) => {
            const isSelected = selected === item.level;
            const IconComponent = item.icon;
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
                    borderRadius: 16, padding: 14, borderWidth: 2,
                    borderColor: isSelected ? item.color : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    shadowColor: isSelected ? item.color : '#000',
                    shadowOffset: { width: 0, height: isSelected ? 3 : 1 },
                    shadowOpacity: isSelected ? 0.12 : 0.03, shadowRadius: isSelected ? 8 : 3,
                    elevation: isSelected ? 3 : 1,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12,
                      backgroundColor: isDark ? `${item.color}20` : item.bgColor,
                      borderWidth: 1, borderColor: isDark ? `${item.color}30` : item.borderColor,
                    }}>
                      <IconComponent size={24} color={item.color} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text.primary, letterSpacing: -0.3 }}>{item.title}</Text>
                      <Text style={{ fontSize: 12, color: item.color, fontWeight: '600', marginTop: 1 }}>{item.sub}</Text>
                    </View>
                    <View style={{
                      width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center',
                      borderColor: isSelected ? item.color : isDark ? 'rgba(255,255,255,0.2)' : '#d4d4d4',
                      backgroundColor: isSelected ? item.color : 'transparent',
                    }}>
                      {isSelected && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' }} />}
                    </View>
                  </View>
                  <Text style={{ fontSize: 13, color: colors.text.secondary, marginTop: 8, marginLeft: 58, lineHeight: 18 }}>{item.desc}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Tip */}
        <Animated.View style={{
          opacity: fadeAnim, marginTop: 18,
          backgroundColor: isDark ? 'rgba(251,191,36,0.1)' : '#fffbeb',
          borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center',
          borderWidth: 1, borderColor: isDark ? 'rgba(251,191,36,0.2)' : '#fde68a',
        }}>
          <View style={{ marginRight: 10 }}>
            <LightBulbIcon size={20} color="#ffc800" />
          </View>
          <Text style={{ fontSize: 13, color: colors.text.secondary, flex: 1, lineHeight: 18 }}>
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
            backgroundColor: '#3b82f6', borderRadius: 14, paddingVertical: 14, alignItems: 'center',
            maxWidth: 400, alignSelf: 'center', width: '100%',
            shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 4,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#fff' }}>Davom etish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
