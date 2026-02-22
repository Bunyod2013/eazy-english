import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/utils/theme';

const JAKE = require('@/assets/characters/character5.png');

export default function LoginScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const mascotScale = useRef(new Animated.Value(0)).current;
  const mascotBounce = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(15)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(20)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(mascotScale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(titleTranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(buttonsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(buttonsTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
        Animated.timing(footerOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();

    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(mascotBounce, { toValue: -8, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(mascotBounce, { toValue: 8, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    floatAnim.start();
    return () => floatAnim.stop();
  }, []);

  const handleGuestMode = () => {
    router.replace('/onboarding/welcome');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? colors.bg.primary : '#f8f9fb' }}>
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>

        {/* Jake Mascot */}
        <Animated.View style={{
          alignItems: 'center',
          marginBottom: 12,
          transform: [{ scale: mascotScale }, { translateY: mascotBounce }],
        }}>
          <Image source={JAKE} style={{ width: 160, height: 190 }} resizeMode="contain" />
        </Animated.View>

        {/* Title */}
        <Animated.View style={{
          alignItems: 'center',
          marginBottom: 32,
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }],
        }}>
          <Text style={{ fontSize: 34, fontWeight: '800', color: colors.text.primary, letterSpacing: -1.2, marginBottom: 6 }}>
            EazyEnglish
          </Text>
          <Text style={{ fontSize: 16, color: colors.text.secondary, fontWeight: '500', letterSpacing: -0.2 }}>
            Ingliz tilini o'yin orqali o'rganing
          </Text>
        </Animated.View>

        {/* Start Button */}
        <Animated.View style={{
          gap: 12,
          marginBottom: 24,
          opacity: buttonsOpacity,
          transform: [{ translateY: buttonsTranslateY }],
          maxWidth: 400,
          alignSelf: 'center',
          width: '100%',
        }}>
          <TouchableOpacity
            onPress={handleGuestMode}
            activeOpacity={0.8}
            style={{
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#58cc02', borderRadius: 16,
              paddingVertical: 18, paddingHorizontal: 24,
              shadowColor: '#58cc02', shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#ffffff', letterSpacing: -0.3 }}>
              Boshlash
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <Animated.View style={{ opacity: footerOpacity, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 11, color: colors.text.tertiary, textAlign: 'center', lineHeight: 16, letterSpacing: -0.1 }}>
            Davom etish orqali{' '}
            <Text style={{ color: colors.text.secondary, fontWeight: '500' }}>Foydalanish shartlari</Text>
            {' '}va{' '}
            <Text style={{ color: colors.text.secondary, fontWeight: '500' }}>Maxfiylik siyosati</Text>
            ga rozilik bildirasiz
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
