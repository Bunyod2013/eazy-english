import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from '@/components/ui';

interface LeaderboardProps {
  currentUserXP: number;
  currentUserName: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  currentUserXP,
  currentUserName,
}) => {
  // Mock leaderboard data (will be replaced with real data in the future)
  const mockLeaderboard = [
    { rank: 1, name: 'Ali', xp: 15000, avatar: '👨' },
    { rank: 2, name: 'Malika', xp: 12500, avatar: '👩' },
    { rank: 3, name: 'Rustam', xp: 10800, avatar: '👨‍💼' },
    { rank: 4, name: currentUserName, xp: currentUserXP, avatar: '🦉', isCurrentUser: true },
    { rank: 5, name: 'Dilnoza', xp: 7200, avatar: '👩‍🎓' },
    { rank: 6, name: 'Aziz', xp: 6500, avatar: '👨‍🎓' },
    { rank: 7, name: 'Shaxnoza', xp: 5800, avatar: '👩‍💻' },
  ];

  return (
    <View className="flex-1">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">Leaderboard</Text>
        <Text className="text-sm text-gray-500 mt-1">
          Coming soon: Real-time rankings
        </Text>
      </View>

      <ScrollView className="flex-1 bg-gray-50">
        <View className="px-6 py-4">
          {mockLeaderboard.map((user, index) => (
            <Card
              key={index}
              className={`mb-3 ${user.isCurrentUser ? 'border-2 border-primary bg-primary/5' : ''}`}
              variant={user.isCurrentUser ? 'elevated' : 'default'}
            >
              <View className="flex-row items-center py-2">
                {/* Rank */}
                <View className={`w-10 h-10 rounded-full items-center justify-center ${
                  user.rank === 1 ? 'bg-yellow-400' :
                  user.rank === 2 ? 'bg-gray-300' :
                  user.rank === 3 ? 'bg-orange-400' :
                  'bg-gray-100'
                }`}>
                  <Text className={`font-bold ${
                    user.rank <= 3 ? 'text-white' : 'text-gray-600'
                  }`}>
                    {user.rank}
                  </Text>
                </View>

                {/* Avatar */}
                <View className="mx-4">
                  <Text className="text-3xl">{user.avatar}</Text>
                </View>

                {/* Name and XP */}
                <View className="flex-1">
                  <Text className={`text-lg font-semibold ${
                    user.isCurrentUser ? 'text-primary' : 'text-gray-800'
                  }`}>
                    {user.name}
                    {user.isCurrentUser && ' (You)'}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {user.xp.toLocaleString()} XP
                  </Text>
                </View>

                {/* Trophy for top 3 */}
                {user.rank <= 3 && (
                  <Text className="text-2xl">
                    {user.rank === 1 ? '🏆' : user.rank === 2 ? '🥈' : '🥉'}
                  </Text>
                )}
              </View>
            </Card>
          ))}

          {/* Coming Soon Message */}
          <View className="mt-6 p-6 bg-blue-50 rounded-2xl items-center">
            <Text className="text-4xl mb-3">🚀</Text>
            <Text className="text-lg font-bold text-gray-800 mb-2">
              Leaderboard Coming Soon!
            </Text>
            <Text className="text-sm text-gray-600 text-center">
              Compete with friends and learners worldwide.{'\n'}
              O'rtoqlaringiz bilan raqobatlashing!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
