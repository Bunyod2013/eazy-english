import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Animated, ActivityIndicator, Image, Easing } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/store/userStore';
import { useProgressStore } from '@/store/progressStore';
import { useTheme } from '@/utils/theme';

const JAKE = require('@/assets/characters/character5.png');

const AVATARS = ['🦁', '🐻', '🦊', '🐼', '🐸', '🦉', '🐱', '🐶'];

export default function UsernameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const language = (params.language as string) || 'uz';
  const skillLevel = (params.skillLevel as 'beginner' | 'elementary' | 'intermediate') || 'beginner';
  const dailyGoal = parseInt(params.dailyGoal as string) || 20;
  const purposes = ((params.purposes as string) || 'general').split(',');
  const { colors, isDark } = useTheme();

  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');
  const [isLoading, setIsLoading] = useState(false);
  const { createUser } = useUserStore();
  const { initializeProgress } = useProgressStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const charScale = useRef(new Animated.Value(0)).current;
  const charBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    Animated.spring(charScale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }).start();

    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(charBounce, { toValue: -6, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(charBounce, { toValue: 6, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    floatAnim.start();
    return () => floatAnim.stop();
  }, []);

  const handleComplete = async () => {
    if (!username.trim()) return;
    setIsLoading(true);
    try {
      await createUser(username.trim(), language, skillLevel, purposes);
      await initializeProgress(Date.now().toString());
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canContinue = username.trim().length >= 2;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.secondary }}>
      {/* Progress Bar */}
      <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 }}>
        <View style={{ height: 6, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0', borderRadius: 3 }}>
          <View style={{ width: '100%', height: '100%', backgroundColor: colors.green.primary, borderRadius: 3 }} />
        </View>
        <Text style={{ fontSize: 13, color: colors.text.tertiary, textAlign: 'right', marginTop: 6 }}>5 / 5</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header + Character */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 28 }}>
            <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
              <Text style={{ fontSize: 30, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.5, marginBottom: 8 }}>
                Profilingizni{'\n'}yarating
              </Text>
              <Text style={{ fontSize: 16, color: colors.text.secondary, lineHeight: 22 }}>
                Ismingiz va avatarni tanlang
              </Text>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: charScale }, { translateY: charBounce }], marginLeft: 8 }}>
              <Image source={JAKE} style={{ width: 80, height: 95 }} resizeMode="contain" />
            </Animated.View>
          </View>

          {/* Avatar Selection */}
          <Animated.View style={{ opacity: fadeAnim, marginBottom: 28 }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={{
                width: 88, height: 88, borderRadius: 30,
                backgroundColor: colors.green.bg, borderWidth: 3, borderColor: colors.green.primary,
                alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                shadowColor: colors.green.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
              }}>
                <Text style={{ fontSize: 44 }}>{selectedAvatar}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
              {AVATARS.map((avatar) => {
                const isActive = selectedAvatar === avatar;
                return (
                  <TouchableOpacity
                    key={avatar}
                    activeOpacity={0.7}
                    onPress={() => setSelectedAvatar(avatar)}
                    style={{
                      width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
                      backgroundColor: isActive ? colors.green.bg : isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f7',
                      borderWidth: 2, borderColor: isActive ? colors.green.primary : 'transparent',
                    }}
                  >
                    <Text style={{ fontSize: 28 }}>{avatar}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          {/* Name Input */}
          <Animated.View style={{ opacity: fadeAnim, marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text.secondary, marginBottom: 8, marginLeft: 4 }}>
              Ismingiz
            </Text>
            <View style={{
              backgroundColor: colors.bg.card, borderRadius: 18, borderWidth: 2, overflow: 'hidden',
              borderColor: username.length > 0 ? colors.green.primary : isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
            }}>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Masalan: Aziz"
                placeholderTextColor={colors.text.tertiary}
                style={{ paddingHorizontal: 18, paddingVertical: 16, fontSize: 18, fontWeight: '500', color: colors.text.primary }}
                maxLength={20}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
            <Text style={{ fontSize: 12, color: colors.text.tertiary, marginTop: 6, marginLeft: 4 }}>{username.length}/20</Text>
          </Animated.View>

          {/* Settings Summary */}
          <Animated.View style={{
            opacity: fadeAnim, backgroundColor: colors.bg.card, borderRadius: 20, padding: 20,
            borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text.secondary, marginBottom: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Sozlamalar
            </Text>
            {[
              { label: 'Til', value: language === 'uz' ? "O'zbekcha" : language === 'ru' ? 'Русский' : 'English', emoji: '🌍' },
              { label: 'Daraja', value: skillLevel === 'beginner' ? "Boshlang'ich" : skillLevel === 'elementary' ? 'Elementar' : "O'rta", emoji: '📊' },
              { label: 'Kunlik maqsad', value: `${dailyGoal} XP`, emoji: '🎯' },
            ].map((item, i) => (
              <View key={i} style={{
                flexDirection: 'row', alignItems: 'center', paddingVertical: 10,
                borderTopWidth: i > 0 ? 1 : 0, borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              }}>
                <Text style={{ fontSize: 18, marginRight: 12 }}>{item.emoji}</Text>
                <Text style={{ fontSize: 15, color: colors.text.secondary, flex: 1 }}>{item.label}</Text>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text.primary }}>{item.value}</Text>
              </View>
            ))}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Button */}
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16,
        backgroundColor: colors.bg.secondary,
        borderTopWidth: 1, borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!canContinue || isLoading}
          onPress={handleComplete}
          style={{
            backgroundColor: canContinue ? colors.green.primary : isDark ? '#333' : '#e0e0e0',
            borderRadius: 18, paddingVertical: 17, alignItems: 'center',
            flexDirection: 'row', justifyContent: 'center', gap: 8,
            shadowColor: canContinue ? colors.green.primary : 'transparent',
            shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12,
            elevation: canContinue ? 6 : 0,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={{ fontSize: 17, fontWeight: '700', color: canContinue ? '#fff' : colors.text.tertiary }}>
              Boshlaymiz!
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
