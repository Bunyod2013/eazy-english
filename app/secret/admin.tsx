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

  const stats = useQuery(api.admin.getStats);

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

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg.primary }}
      contentContainerStyle={{ padding: 24, paddingTop: 60 }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <Text style={{ color: colors.text.primary, fontSize: 28, fontWeight: '700' }}>
          Admin Dashboard
        </Text>
        <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
          <Text style={{ color: colors.red.primary, fontSize: 14 }}>Chiqish</Text>
        </TouchableOpacity>
      </View>

      {!stats ? (
        <ActivityIndicator color={colors.green.primary} size="large" />
      ) : (
        <View style={{ gap: 16 }}>
          <StatCard
            label="Jami foydalanuvchilar"
            value={stats.totalUsers}
            colors={colors}
            accent={colors.stats.lessons}
          />
          <StatCard
            label="Jami tugatilgan darslar"
            value={stats.totalLessonsCompleted}
            colors={colors}
            accent={colors.stats.accuracy}
          />
          <StatCard
            label="Jami XP"
            value={stats.totalXPEarned.toLocaleString()}
            colors={colors}
            accent={colors.stats.xp}
          />
        </View>
      )}
    </ScrollView>
  );
}

function StatCard({
  label,
  value,
  colors,
  accent,
}: {
  label: string;
  value: string | number;
  colors: any;
  accent: { bg: string; border: string; text: string };
}) {
  return (
    <View
      style={{
        backgroundColor: accent.bg,
        borderWidth: 1,
        borderColor: accent.border,
        borderRadius: 16,
        padding: 20,
      }}
    >
      <Text style={{ color: colors.text.secondary, fontSize: 14, marginBottom: 8 }}>
        {label}
      </Text>
      <Text style={{ color: accent.text, fontSize: 36, fontWeight: '700' }}>
        {value}
      </Text>
    </View>
  );
}
