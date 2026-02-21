import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/utils/theme';

const PURPOSES = [
  { id: 'work', emoji: '💼', label: 'Ish uchun', sub: 'Career & business' },
  { id: 'study', emoji: '📚', label: "O'qish uchun", sub: 'Education' },
  { id: 'travel', emoji: '✈️', label: 'Sayohat', sub: 'Travel the world' },
  { id: 'startup', emoji: '🚀', label: 'Startup', sub: 'Tech & business' },
  { id: 'friends', emoji: '👥', label: "Do'stlar", sub: 'Social connections' },
  { id: 'movies', emoji: '🎬', label: 'Kino & serial', sub: 'Entertainment' },
  { id: 'music', emoji: '🎵', label: 'Musiqa', sub: 'Songs & lyrics' },
  { id: 'games', emoji: '🎮', label: "O'yinlar", sub: 'Gaming & esports' },
  { id: 'general', emoji: '🌟', label: 'Umumiy bilim', sub: 'General knowledge' },
];

export default function PurposeScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [selected, setSelected] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(PURPOSES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    Animated.stagger(50, cardAnims.map(a =>
      Animated.spring(a, { toValue: 1, useNativeDriver: true, damping: 14 })
    )).start();
  }, []);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.secondary }}>
      {/* Progress Bar */}
      <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 }}>
        <View style={{ height: 6, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0', borderRadius: 3 }}>
          <View style={{ width: '20%', height: '100%', backgroundColor: colors.green.primary, borderRadius: 3 }} />
        </View>
        <Text style={{ fontSize: 13, color: colors.text.tertiary, textAlign: 'right', marginTop: 6 }}>1 / 5</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
      >
        {/* Header */}
        <Animated.View style={{ opacity: fadeAnim, marginBottom: 8, marginTop: 8 }}>
          <Text style={{
            fontSize: 30,
            fontWeight: '800',
            color: colors.text.primary,
            letterSpacing: -0.5,
            marginBottom: 8,
          }}>
            Nima uchun ingliz tili{'\n'}o'rganmoqchisiz?
          </Text>
          <Text style={{ fontSize: 16, color: colors.text.secondary, lineHeight: 22 }}>
            Bir nechta variantni tanlashingiz mumkin
          </Text>
        </Animated.View>

        {/* Purpose Grid - 2 columns */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: 24,
          gap: 10,
        }}>
          {PURPOSES.map((purpose, i) => {
            const isSelected = selected.includes(purpose.id);
            return (
              <Animated.View
                key={purpose.id}
                style={{
                  opacity: cardAnims[i],
                  transform: [{
                    translateY: cardAnims[i].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
                  }],
                  width: '48%',
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggle(purpose.id)}
                  style={{
                    backgroundColor: isSelected ? colors.green.bg : colors.bg.card,
                    borderRadius: 20,
                    padding: 16,
                    borderWidth: 2,
                    borderColor: isSelected ? colors.green.primary : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    minHeight: 110,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      backgroundColor: isSelected
                        ? `${colors.green.primary}20`
                        : isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f7',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Text style={{ fontSize: 24 }}>{purpose.emoji}</Text>
                    </View>
                    {isSelected && (
                      <View style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: colors.green.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700' }}>✓</Text>
                      </View>
                    )}
                  </View>
                  <View style={{ marginTop: 12 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: colors.text.primary,
                      letterSpacing: -0.2,
                    }}>
                      {purpose.label}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.text.tertiary, marginTop: 2 }}>
                      {purpose.sub}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 16,
        backgroundColor: colors.bg.secondary,
        borderTopWidth: 1,
        borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={selected.length === 0}
          onPress={() => router.push({ pathname: '/onboarding/language', params: { purposes: selected.join(',') } })}
          style={{
            backgroundColor: selected.length > 0 ? colors.green.primary : isDark ? '#333' : '#e0e0e0',
            borderRadius: 18,
            paddingVertical: 17,
            alignItems: 'center',
            shadowColor: selected.length > 0 ? colors.green.primary : 'transparent',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: selected.length > 0 ? 6 : 0,
          }}
        >
          <Text style={{
            fontSize: 17,
            fontWeight: '700',
            color: selected.length > 0 ? '#fff' : colors.text.tertiary,
          }}>
            Davom etish {selected.length > 0 ? `(${selected.length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
