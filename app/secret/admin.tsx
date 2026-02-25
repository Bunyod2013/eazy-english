import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useTheme } from '@/utils/theme';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'eazy2024';

export default function AdminPage() {
  const { colors } = useTheme();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const stats = useQuery(api.admin.getDetailedStats, isLoggedIn ? {} : "skip");
  const dailyActiveData = useQuery(api.admin.getDailyActiveUsers, isLoggedIn ? {} : "skip");
  const topUsers = useQuery(api.admin.getTopUsers, isLoggedIn ? {} : "skip");

  console.log('[Admin] isLoggedIn:', isLoggedIn, 'stats:', stats, 'daily:', dailyActiveData, 'top:', topUsers);

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Noto\'g\'ri login yoki parol');
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg.primary, justifyContent: 'center', padding: 24 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: 'absolute', top: 60, left: 20 }}
        >
          <Text style={{ color: colors.text.secondary, fontSize: 16 }}>← Orqaga</Text>
        </TouchableOpacity>

        <Text style={{ color: colors.text.primary, fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 32 }}>
          Admin Panel
        </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Login"
          placeholderTextColor={colors.text.tertiary}
          autoCapitalize="none"
          style={{
            backgroundColor: colors.bg.card,
            color: colors.text.primary,
            borderWidth: 1,
            borderColor: colors.border.primary,
            borderRadius: 12,
            padding: 16,
            fontSize: 16,
            marginBottom: 12,
          }}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Parol"
          placeholderTextColor={colors.text.tertiary}
          secureTextEntry
          style={{
            backgroundColor: colors.bg.card,
            color: colors.text.primary,
            borderWidth: 1,
            borderColor: colors.border.primary,
            borderRadius: 12,
            padding: 16,
            fontSize: 16,
            marginBottom: 16,
          }}
        />

        {error ? (
          <Text style={{ color: colors.red.primary, textAlign: 'center', marginBottom: 12 }}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: colors.green.primary,
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>Kirish</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isLoading = !stats || !dailyActiveData || !topUsers;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg.primary }}
      contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 40 }}
    >
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text style={{ color: colors.text.primary, fontSize: 28, fontWeight: '700' }}>
          Admin Dashboard
        </Text>
        <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
          <Text style={{ color: colors.red.primary, fontSize: 14 }}>Chiqish</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <ActivityIndicator color={colors.green.primary} size="large" />
          <Text style={{ color: colors.text.secondary, fontSize: 14, marginTop: 16 }}>
            Ma'lumotlar yuklanmoqda...
          </Text>
          <Text style={{ color: colors.text.tertiary, fontSize: 12, marginTop: 8 }}>
            stats: {stats ? 'OK' : 'loading'} | daily: {dailyActiveData ? 'OK' : 'loading'} | top: {topUsers ? 'OK' : 'loading'}
          </Text>
        </View>
      ) : (
        <View style={{ gap: 24 }}>

          {/* Section 1: Overview Stats */}
          <SectionHeader title="Umumiy ko'rsatkichlar" colors={colors} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <StatCard
              half
              label="Jami foydalanuvchilar"
              value={stats.totalUsers}
              colors={colors}
              accent={colors.stats.lessons}
            />
            <StatCard
              half
              label="Bugungi faol"
              value={stats.dailyActiveUsers}
              colors={colors}
              accent={colors.stats.streak}
            />
            <StatCard
              half
              label="Tugatilgan darslar"
              value={stats.totalLessonsCompleted}
              colors={colors}
              accent={colors.stats.accuracy}
            />
            <StatCard
              half
              label="Umumiy vaqt"
              value={formatTime(stats.totalTimeSpent)}
              colors={colors}
              accent={colors.stats.trophy}
            />
            <StatCard
              half
              label="Jami XP"
              value={stats.totalXPEarned.toLocaleString()}
              colors={colors}
              accent={colors.stats.xp}
            />
            <StatCard
              half
              label="O'rtacha aniqlik"
              value={`${stats.avgAccuracy}%`}
              colors={colors}
              accent={colors.stats.goal}
            />
          </View>

          {/* Section 2: Daily Active Users Chart */}
          <DailyActiveChart data={dailyActiveData} colors={colors} />

          {/* Section 3: Lessons Analytics */}
          <SectionHeader title="Darslar tahlili" colors={colors} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <StatCard
              half
              label="Jami urinishlar"
              value={stats.totalLessonAttempts}
              colors={colors}
              accent={colors.stats.lessons}
            />
            <StatCard
              half
              label="O'rtacha vaqt"
              value={formatTime(stats.avgTimePerLesson)}
              colors={colors}
              accent={colors.stats.trophy}
            />
          </View>

          {/* XP by Category */}
          <View style={{
            backgroundColor: colors.bg.card,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}>
            <Text style={{ color: colors.text.primary, fontSize: 16, fontWeight: '700', marginBottom: 16 }}>
              Kategoriya bo'yicha XP
            </Text>
            {[
              { label: "So'z boyligi", key: "vocabulary" as const, color: colors.green.primary },
              { label: "Grammatika", key: "grammar" as const, color: colors.blue.primary },
              { label: "Tinglash", key: "listening" as const, color: colors.purple.primary },
              { label: "Gapirish", key: "speaking" as const, color: colors.stats.streak.text },
              { label: "O'qish", key: "reading" as const, color: colors.red.primary },
            ].map((cat) => {
              const value = stats.xpByCategory[cat.key];
              const maxCatXP = Math.max(...Object.values(stats.xpByCategory), 1);
              const barWidth = (value / maxCatXP) * 100;
              return (
                <View key={cat.key} style={{ marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ color: colors.text.secondary, fontSize: 13 }}>{cat.label}</Text>
                    <Text style={{ color: colors.text.primary, fontSize: 13, fontWeight: '600' }}>
                      {value.toLocaleString()} XP
                    </Text>
                  </View>
                  <View style={{
                    height: 8,
                    backgroundColor: colors.border.primary,
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}>
                    <View style={{
                      height: '100%',
                      width: `${barWidth}%`,
                      backgroundColor: cat.color,
                      borderRadius: 4,
                    }} />
                  </View>
                </View>
              );
            })}
          </View>

          {/* Section 4: User Analytics */}
          <SectionHeader title="Foydalanuvchilar tahlili" colors={colors} />

          {/* Users by Skill Level */}
          <View style={{
            backgroundColor: colors.bg.card,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}>
            <Text style={{ color: colors.text.primary, fontSize: 16, fontWeight: '700', marginBottom: 16 }}>
              Daraja bo'yicha
            </Text>
            {[
              { label: "Boshlang'ich", key: "beginner" as const, color: colors.green.primary },
              { label: "Elementar", key: "elementary" as const, color: colors.blue.primary },
              { label: "O'rta", key: "intermediate" as const, color: colors.purple.primary },
              { label: "Yuqori", key: "advanced" as const, color: colors.stats.streak.text },
            ].map((level) => {
              const count = stats.usersBySkillLevel[level.key];
              const maxLevel = Math.max(...Object.values(stats.usersBySkillLevel), 1);
              const barWidth = (count / maxLevel) * 100;
              return (
                <View key={level.key} style={{ marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ color: colors.text.secondary, fontSize: 13 }}>{level.label}</Text>
                    <Text style={{ color: colors.text.primary, fontSize: 13, fontWeight: '600' }}>
                      {count} ta
                    </Text>
                  </View>
                  <View style={{
                    height: 8,
                    backgroundColor: colors.border.primary,
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}>
                    <View style={{
                      height: '100%',
                      width: `${barWidth}%`,
                      backgroundColor: level.color,
                      borderRadius: 4,
                    }} />
                  </View>
                </View>
              );
            })}
          </View>

          {/* Users by Language */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{
              flex: 1,
              backgroundColor: colors.blue.bg,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.blue.border,
            }}>
              <Text style={{ color: colors.text.secondary, fontSize: 13, marginBottom: 6 }}>
                O'zbekcha
              </Text>
              <Text style={{ color: colors.blue.primary, fontSize: 24, fontWeight: '700' }}>
                {stats.usersByLanguage.uz}
              </Text>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: colors.green.bg,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.green.border,
            }}>
              <Text style={{ color: colors.text.secondary, fontSize: 13, marginBottom: 6 }}>
                Inglizcha
              </Text>
              <Text style={{ color: colors.green.primary, fontSize: 24, fontWeight: '700' }}>
                {stats.usersByLanguage.en}
              </Text>
            </View>
          </View>

          {/* New Users */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <StatCard
              half
              label="Bugun yangi"
              value={stats.newUsersToday}
              colors={colors}
              accent={colors.stats.accuracy}
            />
            <StatCard
              half
              label="Bu hafta yangi"
              value={stats.newUsersThisWeek}
              colors={colors}
              accent={colors.stats.lessons}
            />
          </View>

          {/* Top 5 Users */}
          <View style={{
            backgroundColor: colors.bg.card,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}>
            <Text style={{ color: colors.text.primary, fontSize: 16, fontWeight: '700', marginBottom: 12 }}>
              Top 5 foydalanuvchilar
            </Text>
            {topUsers.map((user, i) => (
              <View
                key={user.rank}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderBottomWidth: i < topUsers.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border.secondary,
                }}
              >
                <Text style={{
                  width: 28,
                  fontSize: 16,
                  fontWeight: '700',
                  color: user.rank <= 3 ? colors.stats.xp.text : colors.text.tertiary,
                }}>
                  #{user.rank}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text.primary, fontSize: 15, fontWeight: '600' }}>
                    {user.username}
                  </Text>
                  <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                    Level {user.currentLevel} · {user.skillLevel}
                  </Text>
                </View>
                <Text style={{ color: colors.stats.xp.text, fontSize: 16, fontWeight: '700' }}>
                  {user.totalXP.toLocaleString()} XP
                </Text>
              </View>
            ))}
            {topUsers.length === 0 && (
              <Text style={{ color: colors.text.tertiary, fontSize: 14, textAlign: 'center', paddingVertical: 12 }}>
                Hali foydalanuvchilar yo'q
              </Text>
            )}
          </View>

          {/* Section 5: Engagement */}
          <SectionHeader title="Faollik" colors={colors} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <StatCard
              half
              label="O'rtacha davomiylik"
              value={`${stats.avgStreak} kun`}
              colors={colors}
              accent={colors.stats.streak}
            />
            <StatCard
              half
              label="Faollik darajasi"
              value={`${stats.engagementRate}%`}
              colors={colors}
              accent={colors.stats.goal}
            />
          </View>

        </View>
      )}
    </ScrollView>
  );
}

// --- Helper Components ---

function SectionHeader({ title, colors }: { title: string; colors: any }) {
  return (
    <Text style={{
      color: colors.text.primary,
      fontSize: 18,
      fontWeight: '700',
    }}>
      {title}
    </Text>
  );
}

function StatCard({
  label,
  value,
  colors,
  accent,
  half,
}: {
  label: string;
  value: string | number;
  colors: any;
  accent: { bg: string; border: string; text: string };
  half?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: accent.bg,
        borderWidth: 1,
        borderColor: accent.border,
        borderRadius: 16,
        padding: half ? 16 : 20,
        width: half ? '48.5%' : '100%',
      }}
    >
      <Text style={{ color: colors.text.secondary, fontSize: 13, marginBottom: 6 }}>
        {label}
      </Text>
      <Text style={{ color: accent.text, fontSize: half ? 24 : 36, fontWeight: '700' }}>
        {value}
      </Text>
    </View>
  );
}

function DailyActiveChart({
  data,
  colors,
}: {
  data: { date: string; count: number }[];
  colors: any;
}) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const BAR_MAX_HEIGHT = 120;

  return (
    <View style={{
      backgroundColor: colors.bg.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
    }}>
      <Text style={{
        color: colors.text.primary,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
      }}>
        Kunlik faol foydalanuvchilar (14 kun)
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: BAR_MAX_HEIGHT + 30,
      }}>
        {data.map((day) => {
          const barHeight = maxCount > 0
            ? (day.count / maxCount) * BAR_MAX_HEIGHT
            : 0;
          const dateLabel = day.date.slice(5).replace('-', '/');
          return (
            <View key={day.date} style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{
                color: colors.text.secondary,
                fontSize: 9,
                marginBottom: 2,
              }}>
                {day.count > 0 ? day.count : ''}
              </Text>
              <View style={{
                width: 14,
                height: Math.max(barHeight, 2),
                backgroundColor: day.count > 0
                  ? colors.green.primary
                  : colors.border.primary,
                borderRadius: 4,
              }} />
              <Text style={{
                color: colors.text.tertiary,
                fontSize: 7,
                marginTop: 4,
              }}>
                {dateLabel}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return `${hours}h ${mins}m`;
}
