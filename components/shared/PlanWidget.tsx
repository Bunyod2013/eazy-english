import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserStore } from '@/store/userStore';
import { useTheme } from '@/utils/theme';
import { TargetIcon } from '@/components/icons';

function MiniBar({ progress, color, bgColor }: { progress: number; color: string; bgColor: string }) {
  return (
    <View style={{ height: 6, borderRadius: 3, backgroundColor: bgColor, overflow: 'hidden', flex: 1 }}>
      <View style={{ height: '100%', width: `${Math.min(progress * 100, 100)}%`, backgroundColor: color, borderRadius: 3 }} />
    </View>
  );
}

export function PlanWidget() {
  const { user } = useUserStore();
  const { colors } = useTheme();

  const planHistory = useQuery(api.plans.getPlanHistory, user ? { guestId: user.id } : "skip");

  if (!user || !planHistory) return null;

  const activePlans = planHistory.filter(p => p.isActive && !p.allCompleted && !p.isExpired);

  if (activePlans.length === 0) return null;

  return (
    <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
      <View style={{
        backgroundColor: colors.bg.card || colors.bg.secondary,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border.primary,
        gap: 8,
      }}>
        {activePlans.map((plan) => {
          const allDone = plan.progressPercent >= 100;

          return (
            <View key={plan._id}>
              {/* Plan header row */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TargetIcon size={14} color={allDone ? '#22c55e' : colors.green.primary} />
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors.text.primary, marginLeft: 5 }}>
                    {plan.type === 'weekly' ? 'Haftalik' : 'Kunlik'}
                  </Text>
                </View>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: allDone ? '#22c55e' : colors.text.secondary }}>
                  {plan.progressPercent}%
                </Text>
              </View>

              {/* Progress rows */}
              <View style={{ gap: 5 }}>
                {plan.wordsGoal > 0 && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 11, color: colors.text.secondary, width: 42 }}>So'zlar</Text>
                    <MiniBar
                      progress={plan.currentWords / plan.wordsGoal}
                      color={plan.currentWords >= plan.wordsGoal ? '#22c55e' : '#a855f7'}
                      bgColor={colors.border.primary}
                    />
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: plan.currentWords >= plan.wordsGoal ? '#22c55e' : '#a855f7', width: 36, textAlign: 'right' }}>
                      {plan.currentWords}/{plan.wordsGoal}
                    </Text>
                  </View>
                )}
                {plan.lessonsGoal > 0 && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 11, color: colors.text.secondary, width: 42 }}>Darslar</Text>
                    <MiniBar
                      progress={plan.currentLessons / plan.lessonsGoal}
                      color={plan.currentLessons >= plan.lessonsGoal ? '#22c55e' : '#3b82f6'}
                      bgColor={colors.border.primary}
                    />
                    <Text style={{ fontSize: 11, fontWeight: 'bold', color: plan.currentLessons >= plan.lessonsGoal ? '#22c55e' : '#3b82f6', width: 36, textAlign: 'right' }}>
                      {plan.currentLessons}/{plan.lessonsGoal}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
