import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { authClient } from '@/lib/auth-client';
import { Card, ConfirmModal } from '@/components/ui';
import { Mascot } from '@/components/shared';
import { useSettingsStore } from '@/store/settingsStore';
import { useUserStore } from '@/store/userStore';
import { SoundIcon, MusicIcon, VibrateIcon, SunIcon, MoonIcon, FlagUzIcon, FlagEnIcon, LionIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

export default function SettingsScreen() {
  const { settings, toggleSound, toggleMusic, toggleVibration, setTheme, setExplanationLanguage } =
    useSettingsStore();
  const { user, clearUser } = useUserStore();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [signOutModalVisible, setSignOutModalVisible] = useState(false);

  if (!user) {
    return null;
  }

  const handleSignOut = () => {
    setSignOutModalVisible(true);
  };

  const confirmSignOut = async () => {
    setSignOutModalVisible(false);
    try {
      await authClient.signOut();
      await clearUser();
      router.replace('/auth/login');
    } catch (error) {
      console.error('Sign out error:', error);
      await clearUser();
      router.replace('/auth/login');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.secondary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header - Hero Card */}
        <View style={{ padding: 16, paddingTop: 24 }}>
          <View style={{
            backgroundColor: colors.green.bg,
            borderRadius: 24,
            padding: 24,
            borderWidth: 1,
            borderColor: colors.green.border,
            alignItems: 'center',
          }}>
            <LionIcon size={64} />
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginTop: 12 }}>
              Sozlamalar
            </Text>
            <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: 4 }}>
              O'z tajribangizni sozlang
            </Text>
          </View>
        </View>

        {/* Audio Settings - Bento Grid */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: 12 }}>
            Tovush
          </Text>
          
          <View style={{ gap: 10 }}>
            {/* Sound Effects - Full Width */}
            <View style={{
              backgroundColor: colors.stats.lessons.bg,
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.stats.lessons.border,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SoundIcon size={32} />
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text.primary }}>
                    Sound Effects
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.text.secondary, marginTop: 2 }}>
                    Tovush effektlari
                  </Text>
                </View>
              </View>
              <Switch
                value={settings.soundEnabled}
                onValueChange={toggleSound}
                trackColor={{ false: colors.border.primary, true: '#86efac' }}
                thumbColor={settings.soundEnabled ? colors.green.primary : colors.bg.card}
              />
            </View>

            {/* Music + Vibration - 50/50 Split */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{
                flex: 1,
                backgroundColor: colors.stats.xp.bg,
                borderRadius: 20,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.stats.xp.border,
              }}>
                <View style={{ alignItems: 'center' }}>
                  <MusicIcon size={36} />
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text.primary, marginTop: 12, textAlign: 'center' }}>
                    Fon Musiqasi
                  </Text>
                  <View style={{ marginTop: 12 }}>
                    <Switch
                      value={settings.musicEnabled}
                      onValueChange={toggleMusic}
                      trackColor={{ false: colors.border.primary, true: colors.stats.xp.border }}
                      thumbColor={settings.musicEnabled ? colors.stats.xp.text : colors.bg.card}
                    />
                  </View>
                </View>
              </View>

              <View style={{
                flex: 1,
                backgroundColor: colors.stats.goal.bg,
                borderRadius: 20,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.stats.goal.border,
              }}>
                <View style={{ alignItems: 'center' }}>
                  <VibrateIcon size={36} />
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text.primary, marginTop: 12, textAlign: 'center' }}>
                    Tebranish
                  </Text>
                  <View style={{ marginTop: 12 }}>
                    <Switch
                      value={settings.vibrationEnabled}
                      onValueChange={toggleVibration}
                      trackColor={{ false: colors.border.primary, true: colors.stats.goal.border }}
                      thumbColor={settings.vibrationEnabled ? colors.stats.goal.text : colors.bg.card}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Appearance - Bento Grid */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: 12 }}>
            Ko'rinish
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {/* Light Mode - 60% */}
            <TouchableOpacity
              onPress={() => setTheme('light')}
              activeOpacity={0.8}
              style={{ flex: 1.5 }}
            >
              <View style={{
                backgroundColor: settings.theme === 'light' ? colors.stats.streak.bg : colors.bg.card,
                borderRadius: 20,
                padding: 20,
                borderWidth: settings.theme === 'light' ? 2 : 1,
                borderColor: settings.theme === 'light' ? colors.stats.streak.border : colors.border.primary,
                position: 'relative',
              }}>
                <SunIcon size={40} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginTop: 12 }}>
                  Yorug' Rejim
                </Text>
                <Text style={{ fontSize: 12, color: colors.text.secondary, marginTop: 4 }}>
                  Light Mode
                </Text>
                {settings.theme === 'light' && (
                  <View style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 28,
                    height: 28,
                    backgroundColor: colors.stats.streak.text,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* Dark Mode - 40% */}
            <TouchableOpacity
              onPress={() => setTheme('dark')}
              activeOpacity={0.8}
              style={{ flex: 1 }}
            >
              <View style={{
                backgroundColor: settings.theme === 'dark' ? colors.stats.trophy.bg : colors.bg.card,
                borderRadius: 20,
                padding: 20,
                borderWidth: settings.theme === 'dark' ? 2 : 1,
                borderColor: settings.theme === 'dark' ? colors.stats.trophy.border : colors.border.primary,
                position: 'relative',
              }}>
                <MoonIcon size={36} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text.primary, marginTop: 12 }}>
                  Qorong'i
                </Text>
                <Text style={{ fontSize: 10, color: colors.text.secondary, marginTop: 4 }}>
                  Yashil & Qora
                </Text>
                {settings.theme === 'dark' && (
                  <View style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 24,
                    height: 24,
                    backgroundColor: colors.stats.trophy.text,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Language - Bento Grid */}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: 12 }}>
            Tushuntirish Tili
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {/* Uzbek - 40% */}
            <TouchableOpacity
              onPress={() => setExplanationLanguage('uz')}
              activeOpacity={0.8}
              style={{ flex: 1 }}
            >
              <View style={{
                backgroundColor: settings.explanationLanguage === 'uz' ? colors.stats.lessons.bg : colors.bg.card,
                borderRadius: 20,
                padding: 20,
                borderWidth: settings.explanationLanguage === 'uz' ? 2 : 1,
                borderColor: settings.explanationLanguage === 'uz' ? colors.stats.lessons.border : colors.border.primary,
                position: 'relative',
              }}>
                <FlagUzIcon size={36} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text.primary, marginTop: 12 }}>
                  O'zbekcha
                </Text>
                <Text style={{ fontSize: 10, color: colors.text.secondary, marginTop: 4 }}>
                  Ana tili
                </Text>
                {settings.explanationLanguage === 'uz' && (
                  <View style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 24,
                    height: 24,
                    backgroundColor: colors.stats.lessons.text,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* English - 60% */}
            <TouchableOpacity
              onPress={() => setExplanationLanguage('en')}
              activeOpacity={0.8}
              style={{ flex: 1.5 }}
            >
              <View style={{
                backgroundColor: settings.explanationLanguage === 'en' ? colors.green.bg : colors.bg.card,
                borderRadius: 20,
                padding: 20,
                borderWidth: settings.explanationLanguage === 'en' ? 2 : 1,
                borderColor: settings.explanationLanguage === 'en' ? colors.green.border : colors.border.primary,
                position: 'relative',
              }}>
                <FlagEnIcon size={40} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginTop: 12 }}>
                  English
                </Text>
                <Text style={{ fontSize: 12, color: colors.text.secondary, marginTop: 4 }}>
                  For advanced learners
                </Text>
                {settings.explanationLanguage === 'en' && (
                  <View style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 28,
                    height: 28,
                    backgroundColor: colors.green.primary,
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info - Hero Card */}
        <View style={{ padding: 16 }}>
          <View style={{
            backgroundColor: colors.stats.trophy.bg,
            borderRadius: 24,
            padding: 28,
            borderWidth: 1,
            borderColor: colors.stats.trophy.border,
            alignItems: 'center',
          }}>
            <LionIcon size={72} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text.primary, marginTop: 16 }}>
              EazyEnglish
            </Text>
            <Text style={{ fontSize: 13, color: colors.stats.trophy.text, fontWeight: '600', marginTop: 4 }}>
              Version 1.0.0 • MVP
            </Text>
            <Text style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', marginTop: 12, lineHeight: 18 }}>
              Learn English the fun way!{'\n'}
              Ingliz tilini qiziqarli o'rganing!
            </Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <View style={{ padding: 16, paddingBottom: 32 }}>
          <TouchableOpacity
            onPress={handleSignOut}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#fee2e2',
              borderRadius: 20,
              padding: 20,
              borderWidth: 2,
              borderColor: '#fecaca',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 24, marginRight: 12 }}>🚪</Text>
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#dc2626' }}>
                Chiqish
              </Text>
              <Text style={{ fontSize: 12, color: '#991b1b', marginTop: 2 }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={signOutModalVisible}
        onClose={() => setSignOutModalVisible(false)}
        onConfirm={confirmSignOut}
        title="Chiqish"
        message="Haqiqatan ham chiqmoqchimisiz?"
        confirmText="Chiqish"
        cancelText="Bekor qilish"
        variant="danger"
      />
    </SafeAreaView>
  );
}
