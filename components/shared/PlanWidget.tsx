import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

function PlanRow({ plan, colors }: { plan: any; colors: any }) {
  const allDone = plan.progressPercent >= 100;

  return (
    <View style={{ gap: 5 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TargetIcon size={10} color={allDone ? '#22c55e' : colors.green.primary} />
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.text.primary, marginLeft: 3 }}>
            {plan.type === 'weekly' ? 'Haftalik' : 'Kunlik'}
          </Text>
        </View>
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: allDone ? '#22c55e' : colors.text.secondary }}>
          {plan.progressPercent}%
        </Text>
      </View>

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
  );
}

export function PlanWidget() {
  const { user } = useUserStore();
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const planHistory = useQuery(api.plans.getPlanHistory, user ? { guestId: user.id } : "skip");

  if (!user || !planHistory) return null;

  const activePlans = planHistory.filter(p => p.isActive && !p.allCompleted && !p.isExpired);

  if (activePlans.length === 0) return null;

  const firstPlan = activePlans[0];
  const firstAllDone = firstPlan.progressPercent >= 100;
  const hasMore = activePlans.length > 1;

  return (
    <View style={{
      position: 'absolute',
      top: 8,
      left: 12,
      zIndex: 10,
      width: expanded ? 160 : 120,
      backgroundColor: colors.bg.card || colors.bg.secondary,
      borderRadius: 12,
      padding: 10,
      borderWidth: 1,
      borderColor: firstAllDone ? '#22c55e' : colors.border.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 4,
    }}>
      {expanded ? (
        <>
          {/* Expanded: show all plans */}
          <View style={{ gap: 10 }}>
            {activePlans.map((plan, i) => (
              <View key={plan._id}>
                {i > 0 && (
                  <View style={{ height: 1, backgroundColor: colors.border.primary, marginBottom: 6 }} />
                )}
                <PlanRow plan={plan} colors={colors} />
              </View>
            ))}
          </View>

          {/* Collapse button */}
          <TouchableOpacity
            onPress={() => setExpanded(false)}
            style={{ marginTop: 8, alignItems: 'center' }}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Text style={{ fontSize: 9, fontWeight: '600', color: colors.green.primary }}>
              Yopish
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Compact: show first plan only */}
          <PlanRow plan={firstPlan} colors={colors} />

          {/* Show all button */}
          {hasMore && (
            <TouchableOpacity
              onPress={() => setExpanded(true)}
              style={{ marginTop: 6, alignItems: 'center' }}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Text style={{ fontSize: 9, fontWeight: '600', color: colors.green.primary }}>
                Hammasini ko'rish ({activePlans.length})
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}
