import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/utils/theme';
import { SoundIcon } from '@/components/icons';

interface IntroductionExerciseProps {
  word: string;
  translation: string;
  translationUz: string;
  pronunciation: string;
  examples: { en: string; uz: string }[];
  onComplete: () => void;
}

export const IntroductionExercise: React.FC<IntroductionExerciseProps> = ({
  word,
  translation,
  translationUz,
  pronunciation,
  examples,
  onComplete,
}) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {/* Main Word Card */}
      <View style={{
        backgroundColor: colors.bg.secondary,
        borderRadius: 24,
        padding: 32,
        marginBottom: 24,
        borderWidth: 3,
        borderColor: colors.green.primary,
        borderBottomWidth: 6,
        borderBottomColor: colors.green.dark,
        alignItems: 'center',
        shadowColor: colors.green.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
      }}>
        <TouchableOpacity
          style={{
            width: 56,
            height: 56,
            backgroundColor: colors.stats.xp.bg,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            borderWidth: 2,
            borderColor: colors.stats.xp.border,
          }}
        >
          <SoundIcon size={28} color={colors.stats.xp.text} />
        </TouchableOpacity>

        <Text style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: colors.text.primary,
          marginBottom: 8,
          textAlign: 'center',
        }}>
          {word}
        </Text>

        <Text style={{
          fontSize: 18,
          color: colors.text.tertiary,
          marginBottom: 16,
          fontStyle: 'italic',
        }}>
          {pronunciation}
        </Text>

        <View style={{
          width: '100%',
          height: 2,
          backgroundColor: colors.green.primary,
          marginVertical: 16,
        }} />

        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: colors.green.primary,
          marginBottom: 8,
          textAlign: 'center',
        }}>
          {translation}
        </Text>

        <Text style={{
          fontSize: 16,
          color: colors.text.secondary,
          textAlign: 'center',
          lineHeight: 24,
        }}>
          {translationUz}
        </Text>
      </View>

      {/* Examples Card */}
      <View style={{
        backgroundColor: colors.bg.secondary,
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 2,
        borderColor: colors.border.primary,
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: colors.text.primary,
          marginBottom: 16,
        }}>
          Misollar:
        </Text>

        {examples.map((example, index) => (
          <View key={index} style={{ marginBottom: 16 }}>
            <Text style={{
              fontSize: 16,
              color: colors.text.primary,
              marginBottom: 4,
              fontWeight: '600',
            }}>
              {example.en}
            </Text>
            <Text style={{
              fontSize: 15,
              color: colors.text.secondary,
            }}>
              {example.uz}
            </Text>
          </View>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={onComplete}
        activeOpacity={0.8}
        style={{
          backgroundColor: colors.green.primary,
          borderRadius: 16,
          padding: 18,
          alignItems: 'center',
          borderBottomWidth: 5,
          borderBottomColor: colors.green.dark,
          shadowColor: colors.green.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
          marginTop: 'auto',
        }}
      >
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#ffffff',
          textTransform: 'uppercase',
        }}>
          DAVOM ETISH
        </Text>
      </TouchableOpacity>
    </View>
  );
};
