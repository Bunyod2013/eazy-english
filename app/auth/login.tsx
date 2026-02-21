import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, ActivityIndicator, Alert, Image, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { authClient } from '@/lib/auth-client';
import { SparkleIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

const JAKE = require('@/assets/characters/character5.png');

export default function LoginScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null);

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

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      setLoadingProvider('google');
      const result = await authClient.signIn.social({ provider: 'google', callbackURL: '/' });
      if (result?.error) {
        const errMsg = typeof result.error === 'string'
          ? result.error
          : result.error?.message || result.error?.code || JSON.stringify(result.error);
        throw new Error(errMsg);
      }
      const session = await authClient.getSession();
      if (session?.data) router.replace('/');
    } catch (error: any) {
      console.error('[Auth] Error:', error?.message || error);
      Alert.alert('Xatolik', 'Google orqali kirishda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleAppleAuth = async () => {
    try {
      setIsLoading(true);
      setLoadingProvider('apple');
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Coming Soon', 'Apple Sign In tez orada qo\'shiladi');
    } catch (error) {
      console.error('Apple sign in error:', error);
      Alert.alert('Xatolik', 'Apple orqali kirishda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

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

        {/* Auth Buttons */}
        <Animated.View style={{
          gap: 12,
          marginBottom: 24,
          opacity: buttonsOpacity,
          transform: [{ translateY: buttonsTranslateY }],
          maxWidth: 400,
          alignSelf: 'center',
          width: '100%',
        }}>
          {/* Google */}
          <TouchableOpacity
            onPress={handleGoogleAuth}
            disabled={isLoading}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff', borderRadius: 16,
              paddingVertical: 16, paddingHorizontal: 24,
              borderWidth: 1, borderColor: isDark ? colors.border.primary : '#e8eaed',
              shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDark ? 0.3 : 0.06, shadowRadius: 8, elevation: 3,
            }}
          >
            {loadingProvider === 'google' ? (
              <ActivityIndicator color={colors.text.primary} size="small" />
            ) : (
              <>
                <View style={{ width: 24, height: 24, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                  <GoogleIcon />
                </View>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text.primary, letterSpacing: -0.2 }}>
                  Google bilan davom etish
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity
            onPress={handleAppleAuth}
            disabled={isLoading}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
              backgroundColor: isDark ? '#ffffff' : '#000000', borderRadius: 16,
              paddingVertical: 16, paddingHorizontal: 24,
              shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1, shadowRadius: 8, elevation: 3,
            }}
          >
            {loadingProvider === 'apple' ? (
              <ActivityIndicator color={isDark ? '#000' : '#fff'} size="small" />
            ) : (
              <>
                <AppleIcon color={isDark ? '#000000' : '#ffffff'} />
                <Text style={{ fontSize: 16, fontWeight: '600', color: isDark ? '#000000' : '#ffffff', letterSpacing: -0.2, marginLeft: 10 }}>
                  Apple bilan davom etish
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: isDark ? colors.border.primary : '#e8eaed' }} />
            <Text style={{ marginHorizontal: 16, fontSize: 13, color: colors.text.tertiary, fontWeight: '500' }}>yoki</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: isDark ? colors.border.primary : '#e8eaed' }} />
          </View>

          {/* Guest */}
          <TouchableOpacity
            onPress={handleGuestMode}
            disabled={isLoading}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
              borderRadius: 16, paddingVertical: 16, paddingHorizontal: 24,
              borderWidth: 1.5, borderColor: isDark ? colors.border.primary : '#d1d5db',
            }}
          >
            <SparkleIcon size={18} color={colors.text.secondary} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text.secondary, letterSpacing: -0.2, marginLeft: 10 }}>
              Ro'yxatdan o'tmasdan sinash
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

function GoogleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </Svg>
  );
}

function AppleIcon({ color = '#000' }: { color?: string }) {
  return (
    <Svg width={18} height={20} viewBox="0 0 17 20" fill="none">
      <Path d="M14.94 10.57c-.02-2.27 1.86-3.37 1.94-3.42-1.06-1.54-2.7-1.76-3.28-1.78-1.39-.14-2.73.82-3.44.82-.72 0-1.82-.81-3-.78-1.54.02-2.96.9-3.76 2.27-1.61 2.79-.41 6.92 1.15 9.19.77 1.11 1.68 2.36 2.88 2.31 1.16-.05 1.6-.74 3-.74 1.39 0 1.79.74 3 .72 1.25-.02 2.03-1.13 2.78-2.24.88-1.28 1.24-2.52 1.26-2.58-.03-.01-2.42-.93-2.44-3.68l-.09-.09zM12.62 3.57C13.26 2.8 13.7 1.74 13.57.66c-.91.04-2.03.61-2.68 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.51 2.69-1.26z" fill={color} />
    </Svg>
  );
}
