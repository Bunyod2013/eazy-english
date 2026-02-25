import { v } from "convex/values";
import { mutation } from "./_generated/server";

const MAX_DURATION = 30 * 60; // 30 minutes in seconds

export const recordPageView = mutation({
  args: {
    userId: v.string(),
    path: v.string(),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("pageViews", {
      userId: args.userId,
      path: args.path,
      enteredAt: Date.now(),
      duration: 0,
      sessionId: args.sessionId,
    });
    return id;
  },
});

export const updatePageViewDuration = mutation({
  args: {
    pageViewId: v.id("pageViews"),
    duration: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.pageViewId);
    if (!existing) return;

    const clampedDuration = Math.min(Math.max(0, args.duration), MAX_DURATION);
    await ctx.db.patch(args.pageViewId, { duration: clampedDuration });
  },
});
