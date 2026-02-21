import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Animated, ActivityIndicator, Image, Easing } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/store/userStore';
import { useProgressStore } from '@/store/progressStore';
import { LionIcon, StarIcon, DiamondIcon, TrophyIcon, SparkleIcon, HeartIcon, CatIcon, TurtleIcon, WorldIcon, TargetIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

const JAKE = require('@/assets/characters/character5.png');

const AVATARS = [
  { id: 'lion', icon: LionIcon, color: '#f59e0b' },
  { id: 'star', icon: StarIcon, color: '#ffc800' },
  { id: 'diamond', icon: DiamondIcon, color: '#1cb0f6' },
  { id: 'trophy', icon: TrophyIcon, color: '#ffc800' },
  { id: 'sparkle', icon: SparkleIcon, color: '#8b5cf6' },
  { id: 'heart', icon: HeartIcon, color: '#ef4444' },
  { id: 'cat', icon: CatIcon, color: '#f59e0b' },
  { id: 'turtle', icon: TurtleIcon, color: '#10b981' },
];

export default function UsernameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const language = (params.language as string) || 'uz';
  const skillLevel = (params.skillLevel as 'beginner' | 'elementary' | 'intermediate') || 'beginner';
  const dailyGoal = parseInt(params.dailyGoal as string) || 20;
  const purposes = ((params.purposes as string) || 'general').split(',');
  const { colors, isDark } = useTheme();

  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('lion');
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
  const activeAvatar = AVATARS.find(a => a.id === selectedAvatar) || AVATARS[0];
  const ActiveIcon = activeAvatar.icon;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.secondary }}>
      {/* Progress Bar */}
      <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 }}>
        <View style={{ height: 6, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#f0f0f0', borderRadius: 3 }}>
          <View style={{ width: '100%', height: '100%', backgroundColor: '#2563eb', borderRadius: 3 }} />
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 22 }}>
            <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
              <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.5, marginBottom: 6 }}>
                Profilingizni{'\n'}yarating
              </Text>
              <Text style={{ fontSize: 14, color: colors.text.secondary, lineHeight: 20 }}>
                Ismingiz va avatarni tanlang
              </Text>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: charScale }, { translateY: charBounce }], marginLeft: 8 }}>
              <Image source={JAKE} style={{ width: 68, height: 80 }} resizeMode="contain" />
            </Animated.View>
          </View>

          {/* Avatar Selection */}
          <Animated.View style={{ opacity: fadeAnim, marginBottom: 22 }}>
            <View style={{ alignItems: 'center', marginBottom: 14 }}>
              <View style={{
                width: 72, height: 72, borderRadius: 24,
                backgroundColor: colors.green.bg, borderWidth: 2.5, borderColor: activeAvatar.color,
                alignItems: 'center', justifyContent: 'center', marginBottom: 12,
                shadowColor: activeAvatar.color, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 3,
              }}>
                <ActiveIcon size={38} color={activeAvatar.color} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
              {AVATARS.map((avatar) => {
                const isActive = selectedAvatar === avatar.id;
                const AvatarIcon = avatar.icon;
                return (
                  <TouchableOpacity
                    key={avatar.id}
                    activeOpacity={0.7}
                    onPress={() => setSelectedAvatar(avatar.id)}
                    style={{
                      width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
                      backgroundColor: isActive ? colors.green.bg : isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f7',
                      borderWidth: 2, borderColor: isActive ? avatar.color : 'transparent',
                    }}
                  >
                    <AvatarIcon size={22} color={avatar.color} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          {/* Name Input */}
          <Animated.View style={{ opacity: fadeAnim, marginBottom: 18 }}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text.secondary, marginBottom: 6, marginLeft: 4 }}>
              Ismingiz
            </Text>
            <View style={{
              backgroundColor: colors.bg.card, borderRadius: 14, borderWidth: 2, overflow: 'hidden',
              borderColor: username.length > 0 ? '#2563eb' : isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
            }}>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Masalan: Aziz"
                placeholderTextColor={colors.text.tertiary}
                style={{ paddingHorizontal: 14, paddingVertical: 13, fontSize: 16, fontWeight: '500', color: colors.text.primary }}
                maxLength={20}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
            <Text style={{ fontSize: 11, color: colors.text.tertiary, marginTop: 4, marginLeft: 4 }}>{username.length}/20</Text>
          </Animated.View>

          {/* Settings Summary */}
          <Animated.View style={{
            opacity: fadeAnim, backgroundColor: colors.bg.card, borderRadius: 14, padding: 14,
            borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: colors.text.secondary, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Sozlamalar
            </Text>
            {[
              { label: 'Til', value: language === 'uz' ? "O'zbekcha" : language === 'ru' ? 'Русский' : 'English', icon: WorldIcon, iconColor: '#3b82f6' },
              { label: 'Daraja', value: skillLevel === 'beginner' ? "Boshlang'ich" : skillLevel === 'elementary' ? 'Elementar' : "O'rta", icon: TargetIcon, iconColor: '#8b5cf6' },
              { label: 'Kunlik maqsad', value: `${dailyGoal} XP`, icon: DiamondIcon, iconColor: '#f59e0b' },
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <View key={i} style={{
                  flexDirection: 'row', alignItems: 'center', paddingVertical: 8,
                  borderTopWidth: i > 0 ? 1 : 0, borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                }}>
                  <View style={{ marginRight: 10 }}>
                    <ItemIcon size={18} color={item.iconColor} />
                  </View>
                  <Text style={{ fontSize: 13, color: colors.text.secondary, flex: 1 }}>{item.label}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text.primary }}>{item.value}</Text>
                </View>
              );
            })}
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
            backgroundColor: canContinue ? '#2563eb' : isDark ? '#333' : '#e0e0e0',
            borderRadius: 14, paddingVertical: 14, alignItems: 'center',
            flexDirection: 'row', justifyContent: 'center', gap: 8,
            maxWidth: 400, alignSelf: 'center', width: '100%',
            shadowColor: canContinue ? '#2563eb' : 'transparent',
            shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 10,
            elevation: canContinue ? 4 : 0,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={{ fontSize: 15, fontWeight: '700', color: canContinue ? '#fff' : colors.text.tertiary }}>
              Boshlaymiz!
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
