import { query } from "./_generated/server";

// Admin stats - aggregate counts across all users
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const totalUsers = users.length;

    const progress = await ctx.db.query("userProgress").collect();
    const totalLessonsCompleted = progress.reduce(
      (sum, p) => sum + p.totalLessonsCompleted,
      0
    );
    const totalXPEarned = progress.reduce(
      (sum, p) => sum + p.totalXPEarned,
      0
    );

    return {
      totalUsers,
      totalLessonsCompleted,
      totalXPEarned,
    };
  },
});
