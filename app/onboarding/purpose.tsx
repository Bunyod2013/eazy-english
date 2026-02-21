import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Image, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TreasureIcon, StudyIcon, WorldIcon, SparkleIcon, PeopleIcon, VideoIcon, MusicIcon, DiamondIcon, StarIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

const IZZY = require('@/assets/characters/character1.png');

const PURPOSES = [
  { id: 'work', icon: TreasureIcon, iconColor: '#d97706', label: 'Ish uchun', sub: 'Career & business' },
  { id: 'study', icon: StudyIcon, iconColor: '#3b82f6', label: "O'qish uchun", sub: 'Education' },
  { id: 'travel', icon: WorldIcon, iconColor: '#10b981', label: 'Sayohat', sub: 'Travel the world' },
  { id: 'startup', icon: SparkleIcon, iconColor: '#8b5cf6', label: 'Startup', sub: 'Tech & business' },
  { id: 'friends', icon: PeopleIcon, iconColor: '#3b82f6', label: "Do'stlar", sub: 'Social connections' },
  { id: 'movies', icon: VideoIcon, iconColor: '#ef4444', label: 'Kino & serial', sub: 'Entertainment' },
  { id: 'music', icon: MusicIcon, iconColor: '#8b5cf6', label: 'Musiqa', sub: 'Songs & lyrics' },
  { id: 'games', icon: DiamondIcon, iconColor: '#06b6d4', label: "O'yinlar", sub: 'Gaming & esports' },
  { id: 'general', icon: StarIcon, iconColor: '#f59e0b', label: 'Umumiy bilim', sub: 'General knowledge' },
];

export default function PurposeScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [selected, setSelected] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const charBounce = useRef(new Animated.Value(0)).current;
  const charScale = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(PURPOSES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    Animated.spring(charScale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }).start();
    Animated.stagger(50, cardAnims.map(a =>
      Animated.spring(a, { toValue: 1, useNativeDriver: true, damping: 14 })
    )).start();

    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(charBounce, { toValue: -5, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(charBounce, { toValue: 5, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    floatAnim.start();
    return () => floatAnim.stop();
  }, []);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.secondary }}>
      {/* Progress Bar */}
      <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 }}>
        <View style={{ height: 6, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0', borderRadius: 3 }}>
          <View style={{ width: '20%', height: '100%', backgroundColor: '#ec4899', borderRadius: 3 }} />
        </View>
        <Text style={{ fontSize: 13, color: colors.text.tertiary, textAlign: 'right', marginTop: 6 }}>1 / 5</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
      >
        {/* Character + Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, marginTop: 6 }}>
          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.5, marginBottom: 6 }}>
              Nima uchun ingliz tili{'\n'}o'rganmoqchisiz?
            </Text>
            <Text style={{ fontSize: 14, color: colors.text.secondary, lineHeight: 20 }}>
              Bir nechta variantni tanlashingiz mumkin
            </Text>
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: charScale }, { translateY: charBounce }], marginLeft: 8 }}>
            <Image source={IZZY} style={{ width: 68, height: 90 }} resizeMode="contain" />
          </Animated.View>
        </View>

        {/* Purpose Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 18, gap: 8 }}>
          {PURPOSES.map((purpose, i) => {
            const isSelected = selected.includes(purpose.id);
            const IconComponent = purpose.icon;
            return (
              <Animated.View
                key={purpose.id}
                style={{
                  opacity: cardAnims[i],
                  transform: [{ translateY: cardAnims[i].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
                  width: '48%',
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggle(purpose.id)}
                  style={{
                    backgroundColor: isSelected ? colors.green.bg : colors.bg.card,
                    borderRadius: 16, padding: 12, borderWidth: 2, minHeight: 92,
                    borderColor: isSelected ? colors.green.primary : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{
                      width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
                      backgroundColor: isSelected ? `${colors.green.primary}20` : isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f7',
                    }}>
                      <IconComponent size={20} color={purpose.iconColor} />
                    </View>
                    {isSelected && (
                      <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: colors.green.primary, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>✓</Text>
                      </View>
                    )}
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text.primary, letterSpacing: -0.2 }}>{purpose.label}</Text>
                    <Text style={{ fontSize: 11, color: colors.text.tertiary, marginTop: 1 }}>{purpose.sub}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16,
        backgroundColor: colors.bg.secondary,
        borderTopWidth: 1, borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={selected.length === 0}
          onPress={() => router.push({ pathname: '/onboarding/language', params: { purposes: selected.join(',') } })}
          style={{
            backgroundColor: selected.length > 0 ? '#ec4899' : isDark ? '#333' : '#e0e0e0',
            borderRadius: 14, paddingVertical: 14, alignItems: 'center',
            maxWidth: 400, alignSelf: 'center', width: '100%',
            shadowColor: selected.length > 0 ? '#ec4899' : 'transparent',
            shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 10,
            elevation: selected.length > 0 ? 4 : 0,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '700', color: selected.length > 0 ? '#fff' : colors.text.tertiary }}>
            Davom etish {selected.length > 0 ? `(${selected.length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
