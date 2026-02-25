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

// Detailed stats for admin analytics dashboard
export const getDetailedStats = query({
  args: {},
  handler: async (ctx) => {
    const [users, progress, lessonCompletions, streaks] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db.query("userProgress").collect(),
      ctx.db.query("lessonCompletions").collect(),
      ctx.db.query("streaks").collect(),
    ]);

    const totalUsers = users.length;

    const today = new Date().toISOString().split("T")[0];

    // Daily active users (unique users with streak entry today)
    const todayStreaks = streaks.filter((s) => s.date === today);
    const dailyActiveUsers = new Set(todayStreaks.map((s) => s.userId)).size;

    // Lessons & XP totals
    const totalLessonsCompleted = progress.reduce(
      (sum, p) => sum + p.totalLessonsCompleted,
      0
    );
    const totalXPEarned = progress.reduce(
      (sum, p) => sum + p.totalXPEarned,
      0
    );

    // Time spent (sum of timeTaken from all lesson completions)
    const totalTimeSpent = lessonCompletions.reduce(
      (sum, lc) => sum + lc.timeTaken,
      0
    );

    // Average accuracy
    const avgAccuracy =
      lessonCompletions.length > 0
        ? lessonCompletions.reduce((sum, lc) => sum + lc.accuracy, 0) /
          lessonCompletions.length
        : 0;

    // Average time per lesson
    const avgTimePerLesson =
      lessonCompletions.length > 0
        ? totalTimeSpent / lessonCompletions.length
        : 0;

    // XP by category
    const xpByCategory = {
      vocabulary: 0,
      grammar: 0,
      listening: 0,
      speaking: 0,
      reading: 0,
    };
    for (const p of progress) {
      xpByCategory.vocabulary += p.xpByCategory.vocabulary;
      xpByCategory.grammar += p.xpByCategory.grammar;
      xpByCategory.listening += p.xpByCategory.listening;
      xpByCategory.speaking += p.xpByCategory.speaking;
      xpByCategory.reading += p.xpByCategory.reading;
    }

    // Users by skill level
    const usersBySkillLevel = {
      beginner: 0,
      elementary: 0,
      intermediate: 0,
      advanced: 0,
    };
    for (const u of users) {
      usersBySkillLevel[u.skillLevel]++;
    }

    // Users by language
    const usersByLanguage = { uz: 0, en: 0 };
    for (const u of users) {
      usersByLanguage[u.preferredLanguage]++;
    }

    // New users today
    const todayStart = new Date(today).getTime();
    const newUsersToday = users.filter((u) => u.createdAt >= todayStart).length;

    // New users this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newUsersThisWeek = users.filter(
      (u) => u.createdAt >= weekAgo.getTime()
    ).length;

    // Average streak
    const avgStreak =
      users.length > 0
        ? users.reduce((sum, u) => sum + u.currentStreak, 0) / users.length
        : 0;

    // Engagement rate (DAU / total)
    const engagementRate =
      totalUsers > 0 ? (dailyActiveUsers / totalUsers) * 100 : 0;

    return {
      totalUsers,
      dailyActiveUsers,
      totalLessonsCompleted,
      totalXPEarned,
      totalTimeSpent,
      avgAccuracy: Math.round(avgAccuracy * 10) / 10,
      avgTimePerLesson: Math.round(avgTimePerLesson),
      xpByCategory,
      usersBySkillLevel,
      usersByLanguage,
      newUsersToday,
      newUsersThisWeek,
      avgStreak: Math.round(avgStreak * 10) / 10,
      engagementRate: Math.round(engagementRate * 10) / 10,
      totalLessonAttempts: lessonCompletions.length,
    };
  },
});

// Daily active users for the last 14 days (for bar chart)
export const getDailyActiveUsers = query({
  args: {},
  handler: async (ctx) => {
    const streaks = await ctx.db.query("streaks").collect();

    const days: { date: string; count: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      const uniqueUsers = new Set(
        streaks.filter((s) => s.date === dateStr).map((s) => s.userId)
      );
      days.push({ date: dateStr, count: uniqueUsers.size });
    }

    return days;
  },
});

// Top 5 users by XP
export const getTopUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    return users
      .sort((a, b) => b.totalXP - a.totalXP)
      .slice(0, 5)
      .map((u, index) => ({
        rank: index + 1,
        username: u.username,
        totalXP: u.totalXP,
        currentLevel: u.currentLevel,
        currentStreak: u.currentStreak,
        skillLevel: u.skillLevel,
      }));
  },
});
