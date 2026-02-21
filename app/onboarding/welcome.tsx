import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, Image, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TargetIcon, TrophyIcon, BookIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';

const JAKE = require('@/assets/characters/character5.png');

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mascotScale = useRef(new Animated.Value(0)).current;
  const mascotBounce = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const cardAnim1 = useRef(new Animated.Value(0)).current;
  const cardAnim2 = useRef(new Animated.Value(0)).current;
  const cardAnim3 = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(mascotScale, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 120 }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
      Animated.stagger(120, [
        Animated.spring(cardAnim1, { toValue: 1, useNativeDriver: true, damping: 14 }),
        Animated.spring(cardAnim2, { toValue: 1, useNativeDriver: true, damping: 14 }),
        Animated.spring(cardAnim3, { toValue: 1, useNativeDriver: true, damping: 14 }),
      ]),
      Animated.spring(btnAnim, { toValue: 1, useNativeDriver: true, damping: 14 }),
    ]).start();

    const floatAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(mascotBounce, { toValue: -6, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(mascotBounce, { toValue: 6, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    floatAnim.start();
    return () => floatAnim.stop();
  }, []);

  const cardStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) },
      { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
    ],
  });

  const features = [
    { icon: <TargetIcon size={28} color="#fff" />, bg: '#ff6b6b', title: 'Interaktiv darslar', sub: 'Interactive lessons' },
    { icon: <TrophyIcon size={28} color="#fff" />, bg: '#fbbf24', title: "O'yin shaklidagi ta'lim", sub: 'Gamified learning' },
    { icon: <BookIcon size={28} color="#fff" />, bg: '#1cb0f6', title: 'Progressni kuzating', sub: 'Track your progress' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.green.primary }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        {/* Hero */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
          <Animated.View style={{
            transform: [{ scale: mascotScale }, { translateY: mascotBounce }],
            marginBottom: 20,
          }}>
            <Image source={JAKE} style={{ width: 140, height: 165 }} resizeMode="contain" />
          </Animated.View>

          <Animated.View style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 42, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 8, letterSpacing: -1 }}>
              EazyEnglish
            </Text>
            <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', fontWeight: '500', marginBottom: 4 }}>
              Ingliz tilini oson o'rganing
            </Text>
            <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontWeight: '400' }}>
              Learn English the fun way
            </Text>
          </Animated.View>
        </View>

        {/* Feature Cards */}
        <View style={{ gap: 10, marginBottom: 24 }}>
          {features.map((f, i) => (
            <Animated.View key={i} style={cardStyle([cardAnim1, cardAnim2, cardAnim3][i])}>
              <View style={{
                flexDirection: 'row', alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20,
                padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
              }}>
                <View style={{
                  width: 48, height: 48, borderRadius: 16,
                  backgroundColor: f.bg, alignItems: 'center', justifyContent: 'center', marginRight: 14,
                }}>
                  {f.icon}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 17, fontWeight: '600', color: '#fff', letterSpacing: -0.3 }}>{f.title}</Text>
                  <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{f.sub}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* CTA */}
        <Animated.View style={{
          opacity: btnAnim,
          transform: [{ translateY: btnAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
          paddingBottom: 16,
        }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/onboarding/purpose')}
            style={{
              backgroundColor: '#fff', borderRadius: 20, paddingVertical: 18, alignItems: 'center',
              shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 6,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.green.primary, letterSpacing: -0.3 }}>
              Boshlash
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
