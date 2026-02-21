import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { CheckIcon } from '@/components/icons';

interface MatchingQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export const MatchingQuestion: React.FC<MatchingQuestionProps> = ({
  question,
  prompt,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();
  const pairs = question.pairs || [];

  const [selectedEN, setSelectedEN] = useState<string | null>(null);
  const [selectedUZ, setSelectedUZ] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [wrongFlash, setWrongFlash] = useState<{ en?: string; uz?: string } | null>(null);

  // Shuffle tiles once on mount
  const [shuffledEN] = useState(() => pairs.map(p => p.en).sort(() => Math.random() - 0.5));
  const [shuffledUZ] = useState(() => pairs.map(p => p.uz).sort(() => Math.random() - 0.5));

  // When all pairs matched, auto-submit
  useEffect(() => {
    if (matchedPairs.size === pairs.length * 2 && pairs.length > 0 && !showFeedback) {
      const answer = mistakes === 0 ? 'perfect' : `${mistakes} mistakes`;
      setSelectedAnswer(answer);
      onAnswer(question.correctAnswer as string);
    }
  }, [matchedPairs.size]);

  const handleTapEN = (word: string) => {
    if (showFeedback || matchedPairs.has(word)) return;
    setSelectedEN(word);
    if (selectedUZ) {
      tryMatch(word, selectedUZ);
    }
  };

  const handleTapUZ = (word: string) => {
    if (showFeedback || matchedPairs.has(word)) return;
    setSelectedUZ(word);
    if (selectedEN) {
      tryMatch(selectedEN, word);
    }
  };

  const tryMatch = (en: string, uz: string) => {
    const isMatch = pairs.some(p => p.en === en && p.uz === uz);
    if (isMatch) {
      setMatchedPairs(prev => {
        const next = new Set(prev);
        next.add(en);
        next.add(uz);
        return next;
      });
    } else {
      setMistakes(m => m + 1);
      setWrongFlash({ en, uz });
      setTimeout(() => setWrongFlash(null), 500);
    }
    setSelectedEN(null);
    setSelectedUZ(null);
  };

  const renderTile = (word: string, isEN: boolean) => {
    const isMatched = matchedPairs.has(word);
    const isSelected = isEN ? selectedEN === word : selectedUZ === word;
    const isWrong = wrongFlash && (isEN ? wrongFlash.en === word : wrongFlash.uz === word);

    if (isMatched) {
      return (
        <View
          key={word}
          style={{
            flex: 1,
            minWidth: '45%',
            padding: 14,
            margin: 4,
            borderRadius: 12,
            backgroundColor: colors.stats.accuracy.bg,
            borderWidth: 2,
            borderColor: colors.green.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.6,
          }}
        >
          <CheckIcon size={18} color={colors.green.primary} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={word}
        onPress={() => isEN ? handleTapEN(word) : handleTapUZ(word)}
        disabled={showFeedback}
        style={{
          flex: 1,
          minWidth: '45%',
          padding: 14,
          margin: 4,
          borderRadius: 12,
          backgroundColor: isWrong
            ? '#fee2e2'
            : isSelected
            ? colors.stats.lessons.bg
            : colors.bg.card,
          borderWidth: 2,
          borderColor: isWrong
            ? '#dc2626'
            : isSelected
            ? colors.stats.lessons.border
            : colors.border.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: isWrong ? '#dc2626' : isSelected ? colors.stats.lessons.text : colors.text.primary,
            textAlign: 'center',
          }}
        >
          {word}
        </Text>
        <Text style={{ fontSize: 10, color: colors.text.tertiary, marginTop: 2 }}>
          {isEN ? '🇬🇧 English' : '🇺🇿 O\'zbekcha'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* Instruction */}
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: colors.text.tertiary,
          textTransform: 'uppercase',
          marginBottom: 12,
          letterSpacing: 0.5,
          textAlign: 'center',
        }}
      >
        Juftliklarni toping
      </Text>

      {/* Progress */}
      <Text style={{ fontSize: 14, color: colors.text.secondary, textAlign: 'center', marginBottom: 16 }}>
        {matchedPairs.size / 2} / {pairs.length} juftlik topildi
      </Text>

      {/* Two columns: EN and UZ */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {/* English column */}
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: colors.text.tertiary, textAlign: 'center', marginBottom: 4 }}>
            ENGLISH
          </Text>
          {shuffledEN.map(word => renderTile(word, true))}
        </View>

        {/* Uzbek column */}
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: colors.text.tertiary, textAlign: 'center', marginBottom: 4 }}>
            O'ZBEKCHA
          </Text>
          {shuffledUZ.map(word => renderTile(word, false))}
        </View>
      </View>

      {mistakes > 0 && (
        <Text style={{ fontSize: 12, color: '#dc2626', textAlign: 'center', marginTop: 12 }}>
          Xatolar: {mistakes}
        </Text>
      )}
    </View>
  );
};
