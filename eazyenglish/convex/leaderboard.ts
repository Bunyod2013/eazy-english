import { v } from "convex/values";
import { query } from "./_generated/server";

/**
 * Leaderboard Functions
 */

// Get global leaderboard
export const getGlobalLeaderboard = query({
  args: {
    limit: v.optional(v.number()),
    timeframe: v.optional(
      v.union(v.literal("weekly"), v.literal("monthly"), v.literal("allTime"))
    ),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 100;
    const timeframe = args.timeframe || "allTime";

    let leaderboard;

    if (timeframe === "weekly") {
      leaderboard = await ctx.db
        .query("leaderboard")
        .withIndex("by_weeklyXP")
        .order("desc")
        .take(limit);
    } else if (timeframe === "monthly") {
      leaderboard = await ctx.db
        .query("leaderboard")
        .withIndex("by_monthlyXP")
        .order("desc")
        .take(limit);
    } else {
      leaderboard = await ctx.db
        .query("leaderboard")
        .withIndex("by_totalXP")
        .order("desc")
        .take(limit);
    }

    // Add ranks
    return leaderboard.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  },
});

// Get user's rank
export const getUserRank = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Get user's leaderboard entry
    const userEntry = await ctx.db
      .query("leaderboard")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!userEntry) {
      return {
        rank: null,
        totalUsers: 0,
      };
    }

    // Count users with higher XP
    const allUsers = await ctx.db
      .query("leaderboard")
      .withIndex("by_totalXP")
      .order("desc")
      .collect();

    const rank =
      allUsers.findIndex((entry) => entry.userId === args.userId) + 1;

    return {
      rank,
      totalUsers: allUsers.length,
      userEntry,
    };
  },
});

// Get nearby users on leaderboard
export const getNearbyUsers = query({
  args: {
    userId: v.string(),
    range: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const range = args.range || 5;

    // Get all leaderboard entries
    const leaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_totalXP")
      .order("desc")
      .collect();

    // Find user's position
    const userIndex = leaderboard.findIndex(
      (entry) => entry.userId === args.userId
    );

    if (userIndex === -1) return [];

    // Get users around the position
    const start = Math.max(0, userIndex - range);
    const end = Math.min(leaderboard.length, userIndex + range + 1);

    return leaderboard.slice(start, end).map((entry, index) => ({
      ...entry,
      rank: start + index + 1,
    }));
  },
});

// Get friends leaderboard (placeholder - requires friend system)
export const getFriendsLeaderboard = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Implement friend system
    // For now, return empty array
    return [];
  },
});
