import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserStore } from '@/store/userStore';
import { useTheme } from '@/utils/theme';
import { TargetIcon } from '@/components/icons';

function MiniBar({ progress, color, bgColor }: { progress: number; color: string; bgColor: string }) {
  return (
    <View style={{ height: 4, borderRadius: 2, backgroundColor: bgColor, overflow: 'hidden' }}>
      <View style={{ height: '100%', width: `${Math.min(progress * 100, 100)}%`, backgroundColor: color, borderRadius: 2 }} />
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

  // Show only the first active plan in compact form
  const plan = activePlans[0];
  const allDone = plan.progressPercent >= 100;

  return (
    <View style={{
      position: 'absolute',
      top: 8,
      left: 12,
      zIndex: 10,
      width: 120,
      backgroundColor: colors.bg.card || colors.bg.secondary,
      borderRadius: 12,
      padding: 10,
      borderWidth: 1,
      borderColor: allDone ? '#22c55e' : colors.border.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <TargetIcon size={12} color={allDone ? '#22c55e' : colors.green.primary} />
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: allDone ? '#22c55e' : colors.text.secondary }}>
          {plan.progressPercent}%
        </Text>
      </View>

      {/* Progress bars */}
      <View style={{ gap: 5 }}>
        {plan.wordsGoal > 0 && (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
              <Text style={{ fontSize: 9, color: colors.text.secondary }}>So'z</Text>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: plan.currentWords >= plan.wordsGoal ? '#22c55e' : '#a855f7' }}>
                {plan.currentWords}/{plan.wordsGoal}
              </Text>
            </View>
            <MiniBar
              progress={plan.currentWords / plan.wordsGoal}
              color={plan.currentWords >= plan.wordsGoal ? '#22c55e' : '#a855f7'}
              bgColor={colors.border.primary}
            />
          </View>
        )}
        {plan.lessonsGoal > 0 && (
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
              <Text style={{ fontSize: 9, color: colors.text.secondary }}>Dars</Text>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: plan.currentLessons >= plan.lessonsGoal ? '#22c55e' : '#3b82f6' }}>
                {plan.currentLessons}/{plan.lessonsGoal}
              </Text>
            </View>
            <MiniBar
              progress={plan.currentLessons / plan.lessonsGoal}
              color={plan.currentLessons >= plan.lessonsGoal ? '#22c55e' : '#3b82f6'}
              bgColor={colors.border.primary}
            />
          </View>
        )}
      </View>

      {/* Extra plans indicator */}
      {activePlans.length > 1 && (
        <Text style={{ fontSize: 8, color: colors.text.tertiary || colors.text.secondary, textAlign: 'center', marginTop: 4 }}>
          +{activePlans.length - 1} reja
        </Text>
      )}
    </View>
  );
}
