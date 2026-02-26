import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserStore } from '@/store/userStore';
import { useTheme } from '@/utils/theme';
import { parsePlanText, getPlanEndDate } from '@/utils/parsePlan';
import { TargetIcon } from '@/components/icons';

function ProgressBar({ progress, color, bgColor }: { progress: number; color: string; bgColor: string }) {
  return (
    <View style={{ height: 8, borderRadius: 4, backgroundColor: bgColor, overflow: 'hidden' }}>
      <View style={{ height: '100%', width: `${Math.min(progress * 100, 100)}%`, backgroundColor: color, borderRadius: 4 }} />
    </View>
  );
}

export function PlanWidget() {
  const { user } = useUserStore();
  const { colors } = useTheme();
  const [inputText, setInputText] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const activePlan = useQuery(api.plans.getActivePlan, user ? { guestId: user.id } : "skip");
  const createPlanMutation = useMutation(api.plans.createPlan);
  const deletePlanMutation = useMutation(api.plans.deletePlan);

  if (!user) return null;

  const parsed = inputText.trim() ? parsePlanText(inputText) : null;
  const hasGoal = parsed && (parsed.wordsGoal > 0 || parsed.lessonsGoal > 0);

  const handleCreate = async () => {
    if (!parsed || !hasGoal) return;
    setIsCreating(true);
    try {
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = getPlanEndDate(startDate, parsed.type);
      await createPlanMutation({
        guestId: user.id,
        type: parsed.type,
        wordsGoal: parsed.wordsGoal,
        lessonsGoal: parsed.lessonsGoal,
        originalText: inputText.trim(),
        startDate,
        endDate,
      });
      setInputText('');
    } catch (e) {
      console.error('Failed to create plan:', e);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!activePlan) return;
    try {
      await deletePlanMutation({ guestId: user.id, planId: activePlan._id });
    } catch (e) {
      console.error('Failed to delete plan:', e);
    }
  };

  // Active plan view
  if (activePlan) {
    const allDone = activePlan.progressPercent >= 100;

    return (
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        <View style={{
          backgroundColor: colors.bg.card || colors.bg.secondary,
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: allDone ? '#22c55e' : (activePlan.isExpired ? '#ef4444' : colors.border.primary),
        }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TargetIcon size={18} color={allDone ? '#22c55e' : colors.text.secondary} />
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text.primary, marginLeft: 6 }}>
                {activePlan.type === 'weekly' ? 'Haftalik reja' : 'Kunlik reja'}
              </Text>
              {allDone && (
                <Text style={{ fontSize: 13, color: '#22c55e', fontWeight: 'bold', marginLeft: 8 }}>
                  Bajarildi!
                </Text>
              )}
              {activePlan.isExpired && !allDone && (
                <Text style={{ fontSize: 13, color: '#ef4444', fontWeight: 'bold', marginLeft: 8 }}>
                  Muddati tugadi
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={handleDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={{ fontSize: 18, color: colors.text.tertiary || colors.text.secondary, fontWeight: '300' }}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Overall progress */}
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 12, color: colors.text.secondary }}>Umumiy</Text>
              <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors.text.secondary }}>{activePlan.progressPercent}%</Text>
            </View>
            <ProgressBar progress={activePlan.progressPercent / 100} color="#22c55e" bgColor={colors.border.primary} />
          </View>

          {/* Words progress */}
          {activePlan.wordsGoal > 0 && (
            <View style={{ marginBottom: activePlan.lessonsGoal > 0 ? 8 : 0 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 12, color: colors.text.secondary }}>So'zlar</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: activePlan.wordsCompleted ? '#22c55e' : '#a855f7' }}>
                  {activePlan.currentWords}/{activePlan.wordsGoal}
                </Text>
              </View>
              <ProgressBar
                progress={activePlan.currentWords / activePlan.wordsGoal}
                color={activePlan.wordsCompleted ? '#22c55e' : '#a855f7'}
                bgColor={colors.border.primary}
              />
            </View>
          )}

          {/* Lessons progress */}
          {activePlan.lessonsGoal > 0 && (
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 12, color: colors.text.secondary }}>Darslar</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: activePlan.lessonsCompleted ? '#22c55e' : '#3b82f6' }}>
                  {activePlan.currentLessons}/{activePlan.lessonsGoal}
                </Text>
              </View>
              <ProgressBar
                progress={activePlan.currentLessons / activePlan.lessonsGoal}
                color={activePlan.lessonsCompleted ? '#22c55e' : '#3b82f6'}
                bgColor={colors.border.primary}
              />
            </View>
          )}

          {/* Expired prompt */}
          {activePlan.isExpired && !allDone && (
            <TouchableOpacity
              onPress={handleDelete}
              style={{
                marginTop: 12,
                backgroundColor: colors.green?.primary || '#58cc02',
                borderRadius: 10,
                paddingVertical: 8,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 13, fontWeight: 'bold' }}>Yangi reja yaratish</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // Input view — no active plan
  return (
    <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
      <View style={{
        backgroundColor: colors.bg.card || colors.bg.secondary,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border.primary,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <TargetIcon size={16} color={colors.text.secondary} />
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: colors.text.primary, marginLeft: 6 }}>
            Bugungi reja
          </Text>
        </View>

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Masalan: Bugun 20 ta so'z va 5 ta dars"
          placeholderTextColor={colors.text.tertiary || colors.text.secondary}
          style={{
            backgroundColor: colors.bg.primary,
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 14,
            color: colors.text.primary,
            borderWidth: 1,
            borderColor: colors.border.primary,
            marginBottom: 8,
          }}
          returnKeyType="done"
          onSubmitEditing={hasGoal ? handleCreate : undefined}
        />

        {/* Parsed preview */}
        {parsed && hasGoal && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
            <Text style={{ fontSize: 12, color: colors.text.secondary }}>
              {parsed.type === 'weekly' ? 'Haftalik' : 'Kunlik'}
              {parsed.wordsGoal > 0 ? ` · ${parsed.wordsGoal} so'z` : ''}
              {parsed.lessonsGoal > 0 ? ` · ${parsed.lessonsGoal} dars` : ''}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleCreate}
          disabled={!hasGoal || isCreating}
          style={{
            backgroundColor: hasGoal ? (colors.green?.primary || '#58cc02') : colors.border.primary,
            borderRadius: 10,
            paddingVertical: 10,
            alignItems: 'center',
            opacity: hasGoal && !isCreating ? 1 : 0.5,
          }}
        >
          {isCreating ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Yaratish</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
