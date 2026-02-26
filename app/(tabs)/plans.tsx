import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserStore } from '@/store/userStore';
import { useTheme } from '@/utils/theme';
import { TargetIcon, CheckIcon } from '@/components/icons';
import { parsePlanText, getPlanEndDate } from '@/utils/parsePlan';

function ProgressBar({ progress, color, bgColor }: { progress: number; color: string; bgColor: string }) {
  return (
    <View style={{ height: 8, borderRadius: 4, backgroundColor: bgColor, overflow: 'hidden' }}>
      <View style={{ height: '100%', width: `${Math.min(progress * 100, 100)}%`, backgroundColor: color, borderRadius: 4 }} />
    </View>
  );
}

export default function PlansScreen() {
  const { user } = useUserStore();
  const { colors } = useTheme();
  const [inputText, setInputText] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const planHistory = useQuery(api.plans.getPlanHistory, user ? { guestId: user.id } : "skip");
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

  const handleDelete = async (planId: any) => {
    try {
      await deletePlanMutation({ guestId: user.id, planId });
    } catch (e) {
      console.error('Failed to delete plan:', e);
    }
  };

  const activePlan = planHistory?.find(p => p.isActive);
  const pastPlans = planHistory?.filter(p => !p.isActive) ?? [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={{ padding: 16, paddingTop: 24, alignItems: 'center' }}>
          <TargetIcon size={48} color={colors.green.primary} />
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text.primary, marginTop: 12 }}>
            Rejalar
          </Text>
          <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: 4 }}>
            Kunlik va haftalik maqsadlaringiz
          </Text>
        </View>

        {/* Create Plan Input */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View style={{
            backgroundColor: colors.bg.card || colors.bg.secondary,
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.text.primary, marginBottom: 10 }}>
              Yangi reja yozing
            </Text>

            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Masalan: Bugun 20 ta so'z va 5 ta dars"
              placeholderTextColor={colors.text.tertiary || colors.text.secondary}
              style={{
                backgroundColor: colors.bg.primary,
                borderRadius: 12,
                paddingHorizontal: 14,
                paddingVertical: 12,
                fontSize: 15,
                color: colors.text.primary,
                borderWidth: 1,
                borderColor: colors.border.primary,
                marginBottom: 10,
              }}
              returnKeyType="done"
              onSubmitEditing={hasGoal ? handleCreate : undefined}
            />

            {/* Parsed preview */}
            {parsed && hasGoal && (
              <View style={{
                backgroundColor: colors.green.bg || 'rgba(34,197,94,0.08)',
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <CheckIcon size={16} color="#22c55e" />
                <Text style={{ fontSize: 13, color: colors.text.secondary, marginLeft: 8 }}>
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
                backgroundColor: hasGoal ? (colors.green.primary || '#58cc02') : colors.border.primary,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: 'center',
                opacity: hasGoal && !isCreating ? 1 : 0.5,
                borderBottomWidth: hasGoal ? 3 : 0,
                borderBottomColor: colors.green.dark || '#58a700',
              }}
            >
              {isCreating ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Yaratish</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Plan */}
        {activePlan && (
          <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: 10 }}>
              Faol reja
            </Text>
            <PlanCard
              plan={activePlan}
              colors={colors}
              isActive
              onDelete={() => handleDelete(activePlan._id)}
            />
          </View>
        )}

        {/* Plan History */}
        {!planHistory ? (
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <ActivityIndicator size="small" color={colors.green.primary} />
          </View>
        ) : pastPlans.length > 0 ? (
          <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text.primary, marginBottom: 10 }}>
              Tarix
            </Text>
            <View style={{ gap: 10 }}>
              {pastPlans.map((plan) => (
                <PlanCard key={plan._id} plan={plan} colors={colors} />
              ))}
            </View>
          </View>
        ) : !activePlan ? (
          <View style={{ alignItems: 'center', paddingVertical: 32 }}>
            <Text style={{ fontSize: 14, color: colors.text.secondary }}>
              Hali rejalar yo'q
            </Text>
          </View>
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
}

function PlanCard({
  plan,
  colors,
  isActive = false,
  onDelete,
}: {
  plan: any;
  colors: any;
  isActive?: boolean;
  onDelete?: () => void;
}) {
  const allDone = plan.allCompleted || plan.progressPercent >= 100;

  return (
    <View style={{
      backgroundColor: colors.bg.card || colors.bg.secondary,
      borderRadius: 16,
      padding: 16,
      borderWidth: isActive ? 2 : 1,
      borderColor: allDone
        ? '#22c55e'
        : plan.isExpired
          ? '#ef4444'
          : isActive
            ? colors.green.border
            : colors.border.primary,
    }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <TargetIcon size={16} color={allDone ? '#22c55e' : (isActive ? colors.green.primary : colors.text.secondary)} />
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text.primary, marginLeft: 6 }}>
            {plan.type === 'weekly' ? 'Haftalik reja' : 'Kunlik reja'}
          </Text>
          {allDone && (
            <View style={{
              backgroundColor: 'rgba(34,197,94,0.12)',
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 2,
              marginLeft: 8,
            }}>
              <Text style={{ fontSize: 12, color: '#22c55e', fontWeight: 'bold' }}>Bajarildi</Text>
            </View>
          )}
          {plan.isExpired && !allDone && (
            <View style={{
              backgroundColor: 'rgba(239,68,68,0.12)',
              borderRadius: 8,
              paddingHorizontal: 8,
              paddingVertical: 2,
              marginLeft: 8,
            }}>
              <Text style={{ fontSize: 12, color: '#ef4444', fontWeight: 'bold' }}>Muddati tugadi</Text>
            </View>
          )}
        </View>
        {isActive && onDelete && (
          <TouchableOpacity onPress={onDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={{ fontSize: 20, color: colors.text.tertiary || colors.text.secondary, fontWeight: '300' }}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Original text */}
      <Text style={{ fontSize: 13, color: colors.text.secondary, marginBottom: 10, fontStyle: 'italic' }}>
        "{plan.originalText}"
      </Text>

      {/* Date */}
      <Text style={{ fontSize: 11, color: colors.text.tertiary || colors.text.secondary, marginBottom: 10 }}>
        {plan.startDate}{plan.startDate !== plan.endDate ? ` — ${plan.endDate}` : ''}
      </Text>

      {/* Overall progress */}
      <View style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text style={{ fontSize: 12, color: colors.text.secondary }}>Umumiy</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: allDone ? '#22c55e' : colors.text.secondary }}>{plan.progressPercent}%</Text>
        </View>
        <ProgressBar progress={plan.progressPercent / 100} color={allDone ? '#22c55e' : colors.green.primary} bgColor={colors.border.primary} />
      </View>

      {/* Words & Lessons */}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {plan.wordsGoal > 0 && (
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 11, color: colors.text.secondary }}>So'zlar</Text>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: plan.currentWords >= plan.wordsGoal ? '#22c55e' : '#a855f7' }}>
                {plan.currentWords}/{plan.wordsGoal}
              </Text>
            </View>
            <ProgressBar
              progress={plan.currentWords / plan.wordsGoal}
              color={plan.currentWords >= plan.wordsGoal ? '#22c55e' : '#a855f7'}
              bgColor={colors.border.primary}
            />
          </View>
        )}
        {plan.lessonsGoal > 0 && (
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontSize: 11, color: colors.text.secondary }}>Darslar</Text>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: plan.currentLessons >= plan.lessonsGoal ? '#22c55e' : '#3b82f6' }}>
                {plan.currentLessons}/{plan.lessonsGoal}
              </Text>
            </View>
            <ProgressBar
              progress={plan.currentLessons / plan.lessonsGoal}
              color={plan.currentLessons >= plan.lessonsGoal ? '#22c55e' : '#3b82f6'}
              bgColor={colors.border.primary}
            />
          </View>
        )}
      </View>
    </View>
  );
}
