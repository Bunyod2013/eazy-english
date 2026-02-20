import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Progress Tracking Functions
 */

// Get user progress
export const getUserProgress = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) return null;

    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    return progress;
  },
});

// Complete a lesson
export const completeLesson = mutation({
  args: {
    lessonId: v.string(),
    timeTaken: v.number(),
    accuracy: v.number(),
    xpEarned: v.number(),
    totalQuestions: v.number(),
    correctAnswers: v.number(),
    incorrectAnswers: v.number(),
    heartsLost: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) throw new Error("Not authenticated");

    // Get progress
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!progress) throw new Error("Progress not found");

    // Check if lesson already completed
    const existingCompletion = await ctx.db
      .query("lessonCompletions")
      .withIndex("by_userId_lessonId", (q) =>
        q.eq("userId", userId).eq("lessonId", args.lessonId)
      )
      .first();

    const attemptNumber = existingCompletion
      ? existingCompletion.attemptNumber + 1
      : 1;

    // Record completion
    await ctx.db.insert("lessonCompletions", {
      userId,
      lessonId: args.lessonId,
      completedAt: Date.now(),
      timeTaken: args.timeTaken,
      accuracy: args.accuracy,
      xpEarned: args.xpEarned,
      totalQuestions: args.totalQuestions,
      correctAnswers: args.correctAnswers,
      incorrectAnswers: args.incorrectAnswers,
      heartsLost: args.heartsLost,
      attemptNumber,
    });

    // Update progress
    const isNewLesson = !progress.completedLessons.includes(args.lessonId);
    const newCompletedLessons = isNewLesson
      ? [...progress.completedLessons, args.lessonId]
      : progress.completedLessons;

    await ctx.db.patch(progress._id, {
      completedLessons: newCompletedLessons,
      totalLessonsCompleted: isNewLesson
        ? progress.totalLessonsCompleted + 1
        : progress.totalLessonsCompleted,
      totalXPEarned: progress.totalXPEarned + args.xpEarned,
      lastUpdated: Date.now(),
    });

    // Update streak
    const today = new Date().toISOString().split("T")[0];
    const todayStreak = await ctx.db
      .query("streaks")
      .withIndex("by_userId_date", (q) => q.eq("userId", userId).eq("date", today))
      .first();

    if (todayStreak) {
      await ctx.db.patch(todayStreak._id, {
        xpEarned: todayStreak.xpEarned + args.xpEarned,
        lessonsCompleted: todayStreak.lessonsCompleted + 1,
      });
    } else {
      // Calculate streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split("T")[0];

      const yesterdayStreak = await ctx.db
        .query("streaks")
        .withIndex("by_userId_date", (q) =>
          q.eq("userId", userId).eq("date", yesterdayDate)
        )
        .first();

      const streakCount = yesterdayStreak ? yesterdayStreak.streakCount + 1 : 1;

      await ctx.db.insert("streaks", {
        userId,
        date: today,
        xpEarned: args.xpEarned,
        lessonsCompleted: 1,
        vocabularyLearned: 0,
        streakCount,
        createdAt: Date.now(),
      });

      // Update user streak
      const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .first();

      if (user) {
        await ctx.db.patch(user._id, {
          currentStreak: streakCount,
          longestStreak: Math.max(user.longestStreak, streakCount),
          lastActiveDate: today,
          updatedAt: Date.now(),
        });
      }
    }

    return {
      success: true,
      isNewLesson,
      attemptNumber,
    };
  },
});

// Get lesson completions
export const getLessonCompletions = query({
  args: {
    lessonId: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) return [];

    let completions;

    if (args.lessonId) {
      const lessonId = args.lessonId; // TypeScript narrowing
      completions = await ctx.db
        .query("lessonCompletions")
        .withIndex("by_userId_lessonId", (q) =>
          q.eq("userId", userId).eq("lessonId", lessonId)
        )
        .order("desc")
        .take(args.limit || 100);
    } else {
      completions = await ctx.db
        .query("lessonCompletions")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .order("desc")
        .take(args.limit || 100);
    }

    return completions;
  },
});

// Get streak data
export const getStreaks = query({
  args: {
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) return [];

    const streaks = await ctx.db
      .query("streaks")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .take(args.days || 30);

    return streaks;
  },
});
