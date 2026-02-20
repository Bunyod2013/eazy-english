import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/store/userStore';
import { TrophyIcon, FireIcon, DiamondIcon, StarIcon, LionIcon } from '@/components/icons';
import { useTheme } from '@/utils/theme';
import { ScreenContainer } from '@/components/ui';

// Mock data - replace with real data later
const generateLeaderboardData = (currentUserXP: number, currentUserName: string) => {
  const names = [
    'Aziz', 'Jasur', 'Nilufar', 'Shaxzod', 'Malika',
    'Bobur', 'Diyora', 'Sardor', 'Zarina', 'Timur',
    'Fotima', 'Rustam', 'Gulnora', 'Jahongir', 'Madina'
  ];
  
  const users = names.map((name, index) => ({
    id: `user-${index}`,
    username: name,
    totalXP: Math.floor(Math.random() * 3000) + 500,
    currentStreak: Math.floor(Math.random() * 30) + 1,
    avatar: '🦁',
  }));
  
  // Add current user
  users.push({
    id: 'current-user',
    username: currentUserName,
    totalXP: currentUserXP,
    currentStreak: 5,
    avatar: '🦁',
  });
  
  // Sort by XP
  return users.sort((a, b) => b.totalXP - a.totalXP);
};

export default function LeaderboardScreen() {
  const { user } = useUserStore();
  const { colors, isDark } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');
  
  if (!user) {
    return null;
  }
  
  const leaderboardData = generateLeaderboardData(user.totalXP, user.username);
  const currentUserRank = leaderboardData.findIndex(u => u.id === 'current-user') + 1;
  const currentUserData = leaderboardData.find(u => u.id === 'current-user');
  
  const top3 = leaderboardData.slice(0, 3);
  const restOfList = leaderboardData.slice(3);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenContainer>
        {/* Header */}
        <View style={{ padding: 16, paddingTop: 24 }}>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <TrophyIcon size={56} color={colors.stats.xp.text} />
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.text.primary, marginTop: 12 }}>
              Reyting Jadvali
            </Text>
            <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: 4 }}>
              Eng zo'r o'quvchilar
            </Text>
          </View>
          
          {/* Period Toggle */}
          <View style={{ 
            flexDirection: 'row', 
            backgroundColor: colors.bg.card, 
            borderRadius: 16,
            padding: 4,
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}>
            <TouchableOpacity
              onPress={() => setSelectedPeriod('weekly')}
              style={{
                flex: 1,
                backgroundColor: selectedPeriod === 'weekly' ? colors.green.primary : 'transparent',
                paddingVertical: 10,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ 
                color: selectedPeriod === 'weekly' ? '#ffffff' : colors.text.secondary,
                fontSize: 13,
                fontWeight: '600',
              }}>
                Haftalik
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setSelectedPeriod('monthly')}
              style={{
                flex: 1,
                backgroundColor: selectedPeriod === 'monthly' ? colors.green.primary : 'transparent',
                paddingVertical: 10,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ 
                color: selectedPeriod === 'monthly' ? '#ffffff' : colors.text.secondary,
                fontSize: 13,
                fontWeight: '600',
              }}>
                Oylik
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => setSelectedPeriod('alltime')}
              style={{
                flex: 1,
                backgroundColor: selectedPeriod === 'alltime' ? colors.green.primary : 'transparent',
                paddingVertical: 10,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ 
                color: selectedPeriod === 'alltime' ? '#ffffff' : colors.text.secondary,
                fontSize: 13,
                fontWeight: '600',
              }}>
                Hamma Vaqt
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Rank Card - Gamified Hero Card */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View style={{
            backgroundColor: colors.stats.xp.bg,
            borderRadius: 20,
            padding: 20,
            borderWidth: 2,
            borderColor: colors.stats.xp.border,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative Elements */}
            <View style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
              <TrophyIcon size={120} color={colors.stats.xp.text} />
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: colors.text.secondary, fontWeight: '600', marginBottom: 4 }}>
                  SIZNING O'RNINGIZ
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 48, fontWeight: 'bold', color: colors.stats.xp.text }}>
                    #{currentUserRank}
                  </Text>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text.primary }}>
                      {user.username}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <DiamondIcon size={16} color={colors.stats.xp.text} />
                      <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.stats.xp.text, marginLeft: 4 }}>
                        {user.totalXP} XP
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              
              <View style={{
                backgroundColor: colors.green.primary,
                width: 64,
                height: 64,
                borderRadius: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <LionIcon size={40} color="#ffffff" />
              </View>
            </View>
          </View>
        </View>

        {/* Top 3 Podium - Gamified Cards */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: 12 }}>
            🏆 Top 3
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }}>
            {/* 2nd Place - Left */}
            {top3[1] && (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  backgroundColor: colors.stats.lessons.bg,
                  borderRadius: 20,
                  padding: 16,
                  borderWidth: 2,
                  borderColor: colors.stats.lessons.border,
                  width: '100%',
                  alignItems: 'center',
                  minHeight: 140,
                }}>
                  <View style={{
                    position: 'absolute',
                    top: -12,
                    backgroundColor: colors.stats.lessons.text,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: colors.bg.primary,
                  }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff' }}>2</Text>
                  </View>
                  
                  <View style={{
                    width: 56,
                    height: 56,
                    backgroundColor: colors.stats.lessons.text,
                    borderRadius: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 12,
                    marginBottom: 8,
                  }}>
                    <LionIcon size={32} color="#ffffff" />
                  </View>
                  
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text.primary, textAlign: 'center' }} numberOfLines={1}>
                    {top3[1].username}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <DiamondIcon size={14} color={colors.stats.lessons.text} />
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors.stats.lessons.text, marginLeft: 4 }}>
                      {top3[1].totalXP}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            
            {/* 1st Place - Center (Larger) */}
            {top3[0] && (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  backgroundColor: colors.stats.xp.bg,
                  borderRadius: 24,
                  padding: 20,
                  borderWidth: 3,
                  borderColor: colors.stats.xp.border,
                  width: '100%',
                  alignItems: 'center',
                  minHeight: 180,
                  shadowColor: colors.stats.xp.text,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8,
                }}>
                  <View style={{
                    position: 'absolute',
                    top: -16,
                    backgroundColor: colors.stats.xp.text,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderColor: colors.bg.primary,
                  }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>👑</Text>
                  </View>
                  
                  <View style={{
                    width: 72,
                    height: 72,
                    backgroundColor: colors.stats.xp.text,
                    borderRadius: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 16,
                    marginBottom: 12,
                    borderWidth: 3,
                    borderColor: colors.bg.primary,
                  }}>
                    <LionIcon size={44} color="#ffffff" />
                  </View>
                  
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text.primary, textAlign: 'center' }} numberOfLines={1}>
                    {top3[0].username}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                    <DiamondIcon size={16} color={colors.stats.xp.text} />
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.stats.xp.text, marginLeft: 4 }}>
                      {top3[0].totalXP}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            
            {/* 3rd Place - Right */}
            {top3[2] && (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{
                  backgroundColor: colors.stats.streak.bg,
                  borderRadius: 20,
                  padding: 16,
                  borderWidth: 2,
                  borderColor: colors.stats.streak.border,
                  width: '100%',
                  alignItems: 'center',
                  minHeight: 140,
                }}>
                  <View style={{
                    position: 'absolute',
                    top: -12,
                    backgroundColor: colors.stats.streak.text,
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: colors.bg.primary,
                  }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff' }}>3</Text>
                  </View>
                  
                  <View style={{
                    width: 56,
                    height: 56,
                    backgroundColor: colors.stats.streak.text,
                    borderRadius: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 12,
                    marginBottom: 8,
                  }}>
                    <LionIcon size={32} color="#ffffff" />
                  </View>
                  
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text.primary, textAlign: 'center' }} numberOfLines={1}>
                    {top3[2].username}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <DiamondIcon size={14} color={colors.stats.streak.text} />
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors.stats.streak.text, marginLeft: 4 }}>
                      {top3[2].totalXP}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Rest of Leaderboard - Compact Cards */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: 12 }}>
            Qolgan O'quvchilar
          </Text>
          
          <View style={{ gap: 8 }}>
            {restOfList.map((userData, index) => {
              const rank = index + 4;
              const isCurrentUser = userData.id === 'current-user';
              
              return (
                <View
                  key={userData.id}
                  style={{
                    backgroundColor: isCurrentUser ? colors.green.bg : colors.bg.card,
                    borderRadius: 16,
                    padding: 16,
                    borderWidth: isCurrentUser ? 2 : 1,
                    borderColor: isCurrentUser ? colors.green.border : colors.border.primary,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {/* Rank Badge */}
                  <View style={{
                    width: 36,
                    height: 36,
                    backgroundColor: colors.bg.elevated,
                    borderRadius: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    borderWidth: 1,
                    borderColor: colors.border.primary,
                  }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text.primary }}>
                      {rank}
                    </Text>
                  </View>
                  
                  {/* Avatar */}
                  <View style={{
                    width: 44,
                    height: 44,
                    backgroundColor: isCurrentUser ? colors.green.primary : colors.stats.accuracy.bg,
                    borderRadius: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}>
                    <LionIcon size={28} color="#ffffff" />
                  </View>
                  
                  {/* User Info */}
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.text.primary }}>
                      {userData.username}
                      {isCurrentUser && ' (Siz)'}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                      <FireIcon size={14} color={colors.stats.streak.text} />
                      <Text style={{ fontSize: 12, color: colors.text.secondary, marginLeft: 4 }}>
                        {userData.currentStreak} kun
                      </Text>
                    </View>
                  </View>
                  
                  {/* XP Badge */}
                  <View style={{
                    backgroundColor: isCurrentUser ? colors.green.primary : colors.stats.xp.bg,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: isCurrentUser ? colors.green.dark : colors.stats.xp.border,
                  }}>
                    <DiamondIcon size={14} color={isCurrentUser ? '#ffffff' : colors.stats.xp.text} />
                    <Text style={{ 
                      fontSize: 13, 
                      fontWeight: 'bold', 
                      color: isCurrentUser ? '#ffffff' : colors.stats.xp.text,
                      marginLeft: 4,
                    }}>
                      {userData.totalXP}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        </ScreenContainer>
      </ScrollView>
    </SafeAreaView>
  );
}
