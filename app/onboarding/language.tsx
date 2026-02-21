import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, Easing } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlagUzIcon, FlagEnIcon, FlagRuIcon } from '@/components/icons';
import { LightBulbIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

const MUSICIANS = require('@/assets/characters/character2.png');

type Language = 'uz' | 'ru' | 'en';

const LANGUAGES = [
  { code: 'uz' as Language, name: "O'zbekcha", sub: 'Ona tilida tushuntirish', flag: FlagUzIcon, recommended: true },
  { code: 'ru' as Language, name: 'Русский', sub: 'Объяснения на русском', flag: FlagRuIcon, recommended: false },
  { code: 'en' as Language, name: 'English', sub: 'For advanced learners', flag: FlagEnIcon, recommended: false },
];

export default function LanguageScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const purposes = (params.purposes as string) || 'general';
  const { colors, isDark } = useTheme();
  const [selected, setSelected] = useState<Language>('uz');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const charScale = useRef(new Animated.Value(0)).current;
  const charBounce = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(LANGUAGES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    Animated.spring(charScale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }).start();
    Animated.stagger(100, cardAnims.map(a =>
      Animated.spring(a, { toValue: 1, useNativeDriver: true, damping: 14 })
    )).start();

    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(charBounce, { toValue: -4, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(charBounce, { toValue: 4, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
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
          <View style={{ width: '40%', height: '100%', backgroundColor: '#d97706', borderRadius: 3 }} />
        </View>
        <Text style={{ fontSize: 13, color: colors.text.tertiary, textAlign: 'right', marginTop: 6 }}>2 / 5</Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        {/* Header + Character */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 24 }}>
          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.5, marginBottom: 6 }}>
              Qaysi tilda{'\n'}o'rganmoqchisiz?
            </Text>
            <Text style={{ fontSize: 14, color: colors.text.secondary, lineHeight: 20 }}>
              Tushuntirishlar shu tilda bo'ladi
            </Text>
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: charScale }, { translateY: charBounce }], marginLeft: 8 }}>
            <Image source={MUSICIANS} style={{ width: 72, height: 68 }} resizeMode="contain" />
          </Animated.View>
        </View>

        {/* Language Cards */}
        <View style={{ gap: 10 }}>
          {LANGUAGES.map((lang, i) => {
            const isSelected = selected === lang.code;
            const FlagComponent = lang.flag;
            return (
              <Animated.View key={lang.code} style={{
                opacity: cardAnims[i],
                transform: [{ translateY: cardAnims[i].interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
              }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelected(lang.code)}
                  style={{
                    backgroundColor: isSelected ? colors.green.bg : colors.bg.card,
                    borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center',
                    borderWidth: 2, borderColor: isSelected ? colors.green.primary : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    shadowColor: isSelected ? colors.green.primary : '#000',
                    shadowOffset: { width: 0, height: isSelected ? 3 : 1 },
                    shadowOpacity: isSelected ? 0.12 : 0.03, shadowRadius: isSelected ? 8 : 3,
                    elevation: isSelected ? 3 : 1,
                  }}
                >
                  <View style={{
                    width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f7', overflow: 'hidden',
                  }}>
                    <FlagComponent size={32} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text.primary, letterSpacing: -0.3 }}>{lang.name}</Text>
                      {lang.recommended && (
                        <View style={{ backgroundColor: colors.green.primary, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 }}>
                          <Text style={{ fontSize: 10, fontWeight: '700', color: '#fff' }}>Tavsiya</Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ fontSize: 13, color: colors.text.secondary, marginTop: 2 }}>{lang.sub}</Text>
                  </View>
                  <View style={{
                    width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center',
                    borderColor: isSelected ? colors.green.primary : isDark ? 'rgba(255,255,255,0.2)' : '#d4d4d4',
                    backgroundColor: isSelected ? colors.green.primary : 'transparent',
                  }}>
                    {isSelected && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' }} />}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Tip */}
        <Animated.View style={{
          opacity: fadeAnim, marginTop: 18,
          backgroundColor: colors.blue.bg, borderRadius: 12, padding: 12,
          flexDirection: 'row', alignItems: 'center',
          borderWidth: 1, borderColor: colors.blue.border,
        }}>
          <View style={{ marginRight: 10 }}>
            <LightBulbIcon size={20} color="#ffc800" />
          </View>
          <Text style={{ fontSize: 13, color: colors.text.secondary, flex: 1, lineHeight: 18 }}>
            O'zbekchani tanlasangiz, darslar sizga tanish tilda tushuntiriladi
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Button */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push({ pathname: '/onboarding/skill-level', params: { language: selected, purposes } })}
          style={{
            backgroundColor: '#d97706', borderRadius: 14, paddingVertical: 14, alignItems: 'center',
            maxWidth: 400, alignSelf: 'center', width: '100%',
            shadowColor: '#d97706', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 4,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#fff' }}>Davom etish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
