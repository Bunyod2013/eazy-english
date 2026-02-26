import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createPlan = mutation({
  args: {
    guestId: v.optional(v.string()),
    type: v.union(v.literal("daily"), v.literal("weekly")),
    wordsGoal: v.number(),
    lessonsGoal: v.number(),
    originalText: v.string(),
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    const authId = await ctx.auth
      .getUserIdentity()
      .then((id) => id?.subject ?? null);
    const userId = authId || (args.guestId ? `guest_${args.guestId}` : null);
    if (!userId) throw new Error("Not authenticated");

    // Deactivate any existing active plans
    const activePlans = await ctx.db
      .query("plans")
      .withIndex("by_userId_active", (q) =>
        q.eq("userId", userId).eq("isActive", true)
      )
      .collect();

    for (const plan of activePlans) {
      await ctx.db.patch(plan._id, { isActive: false });
    }

    // Create new plan
    const planId = await ctx.db.insert("plans", {
      userId,
      type: args.type,
      wordsGoal: args.wordsGoal,
      lessonsGoal: args.lessonsGoal,
      originalText: args.originalText,
      startDate: args.startDate,
      endDate: args.endDate,
      isActive: true,
      createdAt: Date.now(),
    });

    return { planId };
  },
});

export const deletePlan = mutation({
  args: {
    guestId: v.optional(v.string()),
    planId: v.id("plans"),
  },
  handler: async (ctx, args) => {
    const authId = await ctx.auth
      .getUserIdentity()
      .then((id) => id?.subject ?? null);
    const userId = authId || (args.guestId ? `guest_${args.guestId}` : null);
    if (!userId) throw new Error("Not authenticated");

    const plan = await ctx.db.get(args.planId);
    if (!plan || plan.userId !== userId) {
      throw new Error("Plan not found");
    }

    await ctx.db.patch(args.planId, { isActive: false });
    return { success: true };
  },
});

// Get all plans (active + past) for history
export const getPlanHistory = query({
  args: {
    guestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const authId = await ctx.auth
      .getUserIdentity()
      .then((id) => id?.subject ?? null);
    const userId = authId || (args.guestId ? `guest_${args.guestId}` : null);
    if (!userId) return [];

    const plans = await ctx.db
      .query("plans")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    // Sort by createdAt descending (newest first)
    plans.sort((a, b) => b.createdAt - a.createdAt);

    const today = new Date().toISOString().split("T")[0];

    // For each plan, compute progress
    const completions = await ctx.db
      .query("lessonCompletions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const allWords = await ctx.db
      .query("vocabulary")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    return plans.map((plan) => {
      const startTs = new Date(plan.startDate).getTime();
      const endTs = new Date(plan.endDate + "T23:59:59.999Z").getTime();
      const isExpired = today > plan.endDate;

      const completionsInRange = completions.filter(
        (c) => c.completedAt >= startTs && c.completedAt <= endTs
      );
      const uniqueLessonIds = new Set(completionsInRange.map((c) => c.lessonId));
      const currentLessons = uniqueLessonIds.size;

      const wordsInRange = allWords.filter(
        (w) =>
          w.learned === true &&
          w.learnedAt !== undefined &&
          w.learnedAt >= startTs &&
          w.learnedAt <= endTs
      );
      const currentWords = wordsInRange.length;

      const wordsProgress =
        plan.wordsGoal > 0 ? Math.min(currentWords / plan.wordsGoal, 1) : 1;
      const lessonsProgress =
        plan.lessonsGoal > 0 ? Math.min(currentLessons / plan.lessonsGoal, 1) : 1;
      const totalGoals =
        (plan.wordsGoal > 0 ? 1 : 0) + (plan.lessonsGoal > 0 ? 1 : 0);
      const progressPercent =
        totalGoals > 0
          ? Math.round(
              ((wordsProgress * (plan.wordsGoal > 0 ? 1 : 0) +
                lessonsProgress * (plan.lessonsGoal > 0 ? 1 : 0)) /
                totalGoals) *
                100
            )
          : 100;

      const allCompleted =
        (plan.wordsGoal === 0 || currentWords >= plan.wordsGoal) &&
        (plan.lessonsGoal === 0 || currentLessons >= plan.lessonsGoal);

      return {
        _id: plan._id,
        type: plan.type,
        wordsGoal: plan.wordsGoal,
        lessonsGoal: plan.lessonsGoal,
        originalText: plan.originalText,
        startDate: plan.startDate,
        endDate: plan.endDate,
        isActive: plan.isActive,
        createdAt: plan.createdAt,
        currentWords,
        currentLessons,
        progressPercent,
        allCompleted,
        isExpired,
      };
    });
  },
});

export const getActivePlan = query({
  args: {
    guestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const authId = await ctx.auth
      .getUserIdentity()
      .then((id) => id?.subject ?? null);
    const userId = authId || (args.guestId ? `guest_${args.guestId}` : null);
    if (!userId) return null;

    const plan = await ctx.db
      .query("plans")
      .withIndex("by_userId_active", (q) =>
        q.eq("userId", userId).eq("isActive", true)
      )
      .first();

    if (!plan) return null;

    // Check if plan is expired
    const today = new Date().toISOString().split("T")[0];
    const isExpired = today > plan.endDate;

    // Count lessons completed in date range
    const startTs = new Date(plan.startDate).getTime();
    const endTs = new Date(plan.endDate + "T23:59:59.999Z").getTime();

    const completions = await ctx.db
      .query("lessonCompletions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const completionsInRange = completions.filter(
      (c) => c.completedAt >= startTs && c.completedAt <= endTs
    );

    // Count unique lessons
    const uniqueLessonIds = new Set(completionsInRange.map((c) => c.lessonId));
    const currentLessons = uniqueLessonIds.size;

    // Count words learned in date range
    const allWords = await ctx.db
      .query("vocabulary")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const wordsInRange = allWords.filter(
      (w) =>
        w.learned === true &&
        w.learnedAt !== undefined &&
        w.learnedAt >= startTs &&
        w.learnedAt <= endTs
    );
    const currentWords = wordsInRange.length;

    // Calculate overall progress
    const wordsProgress =
      plan.wordsGoal > 0
        ? Math.min(currentWords / plan.wordsGoal, 1)
        : 1;
    const lessonsProgress =
      plan.lessonsGoal > 0
        ? Math.min(currentLessons / plan.lessonsGoal, 1)
        : 1;

    const totalGoals =
      (plan.wordsGoal > 0 ? 1 : 0) + (plan.lessonsGoal > 0 ? 1 : 0);
    const progressPercent =
      totalGoals > 0
        ? Math.round(
            ((wordsProgress * (plan.wordsGoal > 0 ? 1 : 0) +
              lessonsProgress * (plan.lessonsGoal > 0 ? 1 : 0)) /
              totalGoals) *
              100
          )
        : 100;

    return {
      _id: plan._id,
      type: plan.type,
      wordsGoal: plan.wordsGoal,
      lessonsGoal: plan.lessonsGoal,
      originalText: plan.originalText,
      startDate: plan.startDate,
      endDate: plan.endDate,
      currentWords,
      currentLessons,
      progressPercent,
      wordsCompleted: plan.wordsGoal > 0 && currentWords >= plan.wordsGoal,
      lessonsCompleted:
        plan.lessonsGoal > 0 && currentLessons >= plan.lessonsGoal,
      isExpired,
    };
  },
});
