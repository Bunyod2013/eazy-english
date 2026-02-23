import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * User Management Functions
 */

// Register a guest user (no auth required)
export const registerGuestUser = mutation({
  args: {
    guestId: v.string(),
    username: v.string(),
    preferredLanguage: v.union(v.literal("uz"), v.literal("en")),
    skillLevel: v.union(
      v.literal("beginner"),
      v.literal("elementary"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    dailyGoal: v.number(),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if this guest already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", `guest_${args.guestId}`))
      .first();

    if (existing) return { success: true, userId: existing.userId };

    const now = Date.now();
    const userId = `guest_${args.guestId}`;

    await ctx.db.insert("users", {
      userId,
      email: `${userId}@guest.local`,
      username: args.username,
      avatar: args.avatar,
      preferredLanguage: args.preferredLanguage,
      skillLevel: args.skillLevel,
      totalXP: 0,
      currentLevel: 1,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: new Date().toISOString().split("T")[0],
      dailyGoal: args.dailyGoal,
      soundEnabled: true,
      vibrationEnabled: true,
      notificationsEnabled: true,
      theme: "auto",
      createdAt: now,
      updatedAt: now,
    });

    // Initialize progress
    await ctx.db.insert("userProgress", {
      userId,
      completedLessons: [],
      totalLessonsCompleted: 0,
      totalXPEarned: 0,
      xpByCategory: {
        vocabulary: 0,
        grammar: 0,
        listening: 0,
        speaking: 0,
        reading: 0,
      },
      lastUpdated: now,
    });

    return { success: true, userId };
  },
});

// Get current user profile
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    return user;
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    username: v.optional(v.string()),
    displayName: v.optional(v.string()),
    avatar: v.optional(v.string()),
    preferredLanguage: v.optional(v.union(v.literal("uz"), v.literal("en"))),
    skillLevel: v.optional(
      v.union(
        v.literal("beginner"),
        v.literal("elementary"),
        v.literal("intermediate")
      )
    ),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      ...args,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Update user settings
export const updateSettings = mutation({
  args: {
    soundEnabled: v.optional(v.boolean()),
    vibrationEnabled: v.optional(v.boolean()),
    notificationsEnabled: v.optional(v.boolean()),
    theme: v.optional(v.union(v.literal("light"), v.literal("dark"), v.literal("auto"))),
    dailyGoal: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      ...args,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get user by username (for profiles)
export const getUserByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (!user) return null;

    // Return public profile only
    return {
      username: user.username,
      displayName: user.displayName,
      avatar: user.avatar,
      totalXP: user.totalXP,
      currentLevel: user.currentLevel,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
    };
  },
});

// Add XP to user
export const addXP = mutation({
  args: {
    amount: v.number(),
    category: v.optional(
      v.union(
        v.literal("vocabulary"),
        v.literal("grammar"),
        v.literal("listening"),
        v.literal("speaking"),
        v.literal("reading")
      )
    ),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!user) throw new Error("User not found");

    // Update user XP
    const newTotalXP = user.totalXP + args.amount;
    const newLevel = Math.floor(newTotalXP / 100) + 1;

    await ctx.db.patch(user._id, {
      totalXP: newTotalXP,
      currentLevel: newLevel,
      updatedAt: Date.now(),
    });

    // Update progress
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (progress && args.category) {
      await ctx.db.patch(progress._id, {
        totalXPEarned: progress.totalXPEarned + args.amount,
        xpByCategory: {
          ...progress.xpByCategory,
          [args.category]: progress.xpByCategory[args.category] + args.amount,
        },
        lastUpdated: Date.now(),
      });
    }

    // Update leaderboard
    await ctx.db.insert("leaderboard", {
      userId,
      username: user.username,
      avatar: user.avatar,
      totalXP: newTotalXP,
      weeklyXP: args.amount, // Simplified - would need more logic for weekly tracking
      monthlyXP: args.amount,
      lastUpdated: Date.now(),
    });

    return {
      newTotalXP,
      newLevel,
      leveledUp: newLevel > user.currentLevel,
    };
  },
});
