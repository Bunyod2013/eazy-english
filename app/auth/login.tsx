import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { authClient } from '@/lib/auth-client';
import { LionIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      setLoadingProvider('google');

      console.log('[Auth] Starting Google sign in...');

      // The expo client plugin handles the browser flow automatically:
      // 1. Sends request to server → gets Google auth URL
      // 2. Opens browser via expo-authorization-proxy
      // 3. Handles callback and stores cookies
      const result = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      });

      console.log('[Auth] signIn.social result:', JSON.stringify(result));

      if (result?.error) {
        const errMsg = typeof result.error === 'string'
          ? result.error
          : result.error?.message || result.error?.code || JSON.stringify(result.error);
        console.error('[Auth] Server error:', errMsg);
        throw new Error(errMsg);
      }

      // The expo plugin handled the browser flow and stored cookies
      // Check if we now have a valid session
      const session = await authClient.getSession();
      console.log('[Auth] Session after sign in:', JSON.stringify(session?.data ? { user: session.data.user?.email } : null));

      if (session?.data) {
        console.log('[Auth] Auth successful, navigating...');
        router.replace('/');
      } else {
        console.log('[Auth] No session after sign in (user may have cancelled)');
      }
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
      
      // TODO: Implement Apple Sign In
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.secondary }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, padding: 20, paddingTop: 60, paddingBottom: 40 }}
      >
        {/* Hero Section - Apple Minimal Style */}
        <View style={{ alignItems: 'center', marginBottom: 48 }}>
          {/* Mascot - Apple Style Float */}
          <View style={{
            width: 120,
            height: 120,
            backgroundColor: colors.green.primary,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.15,
            shadowRadius: 24,
            elevation: 8,
          }}>
            <LionIcon size={70} color="#ffffff" />
          </View>
          
          <Text style={{ 
            fontSize: 34, 
            fontWeight: '700',
            color: colors.text.primary,
            textAlign: 'center',
            marginBottom: 6,
            letterSpacing: -0.5,
          }}>
            EazyEnglish
          </Text>
          <Text style={{ 
            fontSize: 17, 
            color: colors.text.secondary, 
            textAlign: 'center',
            fontWeight: '400',
            letterSpacing: -0.2,
          }}>
            Learn English. Have fun.
          </Text>
        </View>

        {/* Apple Bento Grid - Auth Cards */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          {/* Row 1: Google Sign In - Full Width, Large */}
          <TouchableOpacity
            onPress={handleGoogleAuth}
            disabled={isLoading}
            activeOpacity={0.7}
            style={{
              backgroundColor: '#fff',
              borderRadius: 28,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 4,
              borderWidth: 1,
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {loadingProvider === 'google' ? (
                <ActivityIndicator color="#4285F4" size="small" style={{ marginRight: 16 }} />
              ) : (
                <View style={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#4285F4',
                  borderRadius: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  <Text style={{ fontSize: 24, color: '#fff', fontWeight: '600' }}>G</Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginBottom: 3, letterSpacing: -0.3 }}>
                  Gmail bilan kirish
                </Text>
                <Text style={{ fontSize: 14, color: '#8e8e93', fontWeight: '400' }}>
                  Google account orqali
                </Text>
              </View>
              <Text style={{ fontSize: 20, color: '#c7c7cc' }}>›</Text>
            </View>
          </TouchableOpacity>

          {/* Row 2: Apple + Guest - 2 Column Bento */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {/* Apple Sign In - Left Card */}
            <TouchableOpacity
              onPress={handleAppleAuth}
              disabled={isLoading}
              activeOpacity={0.7}
              style={{
                flex: 1,
                backgroundColor: '#000',
                borderRadius: 28,
                padding: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 4,
                minHeight: 140,
                justifyContent: 'space-between',
              }}
            >
              {loadingProvider === 'apple' ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#1c1c1e',
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ fontSize: 22 }}>🍎</Text>
                  </View>
                  <View style={{ marginTop: 12 }}>
                    <Text style={{ fontSize: 17, fontWeight: '600', color: '#fff', marginBottom: 3, letterSpacing: -0.3 }}>
                      Apple ID
                    </Text>
                    <Text style={{ fontSize: 13, color: '#8e8e93', fontWeight: '400' }}>
                      Coming soon
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>

            {/* Guest Mode - Right Card */}
            <TouchableOpacity
              onPress={handleGuestMode}
              disabled={isLoading}
              activeOpacity={0.7}
              style={{
                flex: 1,
                backgroundColor: colors.stats.lessons.bg,
                borderRadius: 28,
                padding: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.06,
                shadowRadius: 12,
                elevation: 3,
                minHeight: 140,
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: colors.stats.lessons.border,
              }}
            >
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 22 }}>👋</Text>
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text.primary, marginBottom: 3, letterSpacing: -0.3 }}>
                  Mehmon
                </Text>
                <Text style={{ fontSize: 13, color: colors.text.secondary, fontWeight: '400' }}>
                  Test rejim
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Bento Card - Apple Style */}
        <View style={{
          marginTop: 20,
          padding: 24,
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f5f5f7',
          borderRadius: 28,
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{
              width: 36,
              height: 36,
              backgroundColor: colors.stats.xp.bg,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
              borderWidth: 1,
              borderColor: colors.stats.xp.border,
            }}>
              <Text style={{ fontSize: 18 }}>✨</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text.primary, marginBottom: 8, letterSpacing: -0.2 }}>
                Nega ro'yxatdan o'tish kerak?
              </Text>
              <View style={{ gap: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.green.primary, marginRight: 8 }} />
                  <Text style={{ fontSize: 14, color: colors.text.secondary, flex: 1, lineHeight: 20 }}>
                    Progress'ni saqlash
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.green.primary, marginRight: 8 }} />
                  <Text style={{ fontSize: 14, color: colors.text.secondary, flex: 1, lineHeight: 20 }}>
                    Barcha qurilmalarda sync
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.green.primary, marginRight: 8 }} />
                  <Text style={{ fontSize: 14, color: colors.text.secondary, flex: 1, lineHeight: 20 }}>
                    Yutuqlar va leaderboard
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Footer - Apple Style Legal */}
        <View style={{ marginTop: 32, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 11, color: colors.text.tertiary, textAlign: 'center', lineHeight: 16, letterSpacing: -0.1 }}>
            Davom etish orqali siz{' '}
            <Text style={{ fontWeight: '500' }}>Foydalanish shartlari</Text>
            {' '}va{' '}
            <Text style={{ fontWeight: '500' }}>Maxfiylik siyosati</Text>
            ga rozilik bildirasiz
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
