import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import { playAudio } from '@/utils/audio';

interface WordBankQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export const WordBankQuestion: React.FC<WordBankQuestionProps> = ({
  question,
  prompt,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors } = useTheme();
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    question.wordBank || []
  );

  // Handle word selection
  const handleWordSelect = async (word: string) => {
    if (showFeedback) return;
    
    // ✅ Play audio when word is tapped!
    try {
      const audioPath = `words/${word.toLowerCase().replace(/ /g, '_')}.wav`;
      await playAudio(audioPath, word, false);
    } catch (error) {
      console.log('[WordBank] Audio play error:', error);
    }
    
    // Add word to selected
    setSelectedWords([...selectedWords, word]);
    
    // Remove from available
    setAvailableWords(availableWords.filter(w => w !== word));
    
    // Update answer
    const newAnswer = [...selectedWords, word].join(' ');
    setSelectedAnswer(newAnswer);
  };

  // Handle word removal
  const handleWordRemove = async (index: number) => {
    if (showFeedback) return;
    
    const word = selectedWords[index];
    
    // ✅ Play audio when removing word!
    try {
      const audioPath = `words/${word.toLowerCase().replace(/ /g, '_')}.wav`;
      await playAudio(audioPath, word, false);
    } catch (error) {
      console.log('[WordBank] Audio play error:', error);
    }
    
    // Remove from selected
    const newSelected = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(newSelected);
    
    // Add back to available
    setAvailableWords([...availableWords, word]);
    
    // Update answer
    setSelectedAnswer(newSelected.join(' '));
  };

  return (
    <View>
      {/* Selected Words Area (Answer Construction) */}
      <View style={{
        backgroundColor: colors.bg.card,
        borderRadius: 16,
        padding: 16,
        minHeight: 80,
        marginBottom: 24,
        borderWidth: 2,
        borderColor: selectedWords.length > 0 ? colors.green.primary : colors.border.primary,
      }}>
        <Text style={{
          fontSize: 12,
          fontWeight: '700',
          color: colors.text.tertiary,
          marginBottom: 12,
          textTransform: 'uppercase',
        }}>
          Javobingiz:
        </Text>
        
        {selectedWords.length === 0 ? (
          <View style={{ 
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center',
            paddingVertical: 16,
          }}>
            <Text style={{
              fontSize: 14,
              color: colors.text.tertiary,
              textAlign: 'center',
            }}>
              Pastdan so'zlarni tanlang
            </Text>
          </View>
        ) : (
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            {selectedWords.map((word, index) => (
              <TouchableOpacity
                key={`selected-${index}`}
                onPress={() => handleWordRemove(index)}
                disabled={showFeedback}
                style={{
                  backgroundColor: colors.green.primary,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 3,
                  borderBottomColor: colors.green.dark,
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#ffffff',
                }}>
                  {word}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Available Words (Word Bank) */}
      <View style={{
        backgroundColor: colors.bg.secondary,
        borderRadius: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: colors.border.primary,
      }}>
        <Text style={{
          fontSize: 12,
          fontWeight: '700',
          color: colors.text.tertiary,
          marginBottom: 12,
          textTransform: 'uppercase',
        }}>
          So'zlar:
        </Text>
        
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          {availableWords.length === 0 ? (
            <View style={{
              width: '100%',
              paddingVertical: 20,
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 14,
                color: colors.text.tertiary,
              }}>
                Barcha so'zlar tanlandi ✓
              </Text>
            </View>
          ) : (
            availableWords.map((word, index) => (
              <TouchableOpacity
                key={`available-${word}-${index}`}
                onPress={() => handleWordSelect(word)}
                disabled={showFeedback}
                style={{
                  backgroundColor: colors.bg.card,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderWidth: 2,
                  borderColor: colors.border.primary,
                  borderBottomWidth: 3,
                  borderBottomColor: colors.border.primary,
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text.primary,
                }}>
                  {word}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>

      {/* Hint */}
      {question.hintsUz && question.hintsUz.length > 0 && (
        <View style={{
          backgroundColor: colors.stats.xp.bg,
          borderRadius: 12,
          padding: 12,
          marginTop: 16,
          borderWidth: 1,
          borderColor: colors.stats.xp.border,
        }}>
          <Text style={{
            fontSize: 13,
            color: colors.text.secondary,
            textAlign: 'center',
          }}>
            💡 {question.hintsUz[0]}
          </Text>
        </View>
      )}
    </View>
  );
};
