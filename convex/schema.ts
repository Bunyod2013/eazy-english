import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

const schema = defineSchema({
  // User profiles
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    emailVerified: v.optional(v.boolean()),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    
    // App-specific fields
    username: v.string(),
    displayName: v.optional(v.string()),
    avatar: v.optional(v.string()),
    
    // Learning preferences
    preferredLanguage: v.union(v.literal("uz"), v.literal("en")),
    skillLevel: v.union(
      v.literal("beginner"),
      v.literal("elementary"),
      v.literal("intermediate"),
      v.literal("advanced")
    ),
    
    // Progress stats
    totalXP: v.number(),
    currentLevel: v.number(),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastActiveDate: v.string(),
    
    // Settings
    dailyGoal: v.number(),
    soundEnabled: v.boolean(),
    vibrationEnabled: v.boolean(),
    notificationsEnabled: v.boolean(),
    theme: v.union(v.literal("light"), v.literal("dark"), v.literal("auto")),
    
    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"])
    .index("by_username", ["username"]),
  
  // User progress tracking
  userProgress: defineTable({
    userId: v.string(),
    
    // Lesson tracking
    completedLessons: v.array(v.string()),
    totalLessonsCompleted: v.number(),
    currentLesson: v.optional(v.string()),
    
    // XP breakdown
    totalXPEarned: v.number(),
    xpByCategory: v.object({
      vocabulary: v.number(),
      grammar: v.number(),
      listening: v.number(),
      speaking: v.number(),
      reading: v.number(),
    }),
    
    // Timestamps
    lastUpdated: v.number(),
  })
    .index("by_userId", ["userId"]),
  
  // Detailed lesson completions
  lessonCompletions: defineTable({
    userId: v.string(),
    lessonId: v.string(),
    
    // Performance metrics
    xpEarned: v.number(),
    accuracy: v.number(),
    timeTaken: v.number(),  // Changed from timeSpent
    completedAt: v.number(),
    
    // Question results
    totalQuestions: v.number(),
    correctAnswers: v.number(),
    incorrectAnswers: v.number(),
    heartsLost: v.number(),
    attemptNumber: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_lessonId", ["userId", "lessonId"]),
  
  // Vocabulary learning (spaced repetition)
  vocabulary: defineTable({
    userId: v.string(),
    lessonId: v.string(),
    word: v.string(),
    translation: v.string(),
    pronunciation: v.optional(v.string()),
    partOfSpeech: v.optional(v.string()),
    
    // Learning status
    learned: v.boolean(),
    learnedAt: v.optional(v.number()),
    
    // Learning stats
    timesReviewed: v.number(),
    lastReviewedAt: v.optional(v.number()),
    nextReviewDate: v.optional(v.number()),
    
    // Spaced repetition
    difficulty: v.number(),  // 1-5 scale
    
    // Timestamps
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_word", ["userId", "word"]),
  
  // Daily activity streaks
  streaks: defineTable({
    userId: v.string(),
    date: v.string(), // YYYY-MM-DD format
    
    // Daily metrics
    xpEarned: v.number(),
    lessonsCompleted: v.number(),
    vocabularyLearned: v.number(),
    
    // Streak tracking
    streakCount: v.number(),
    
    // Timestamp
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_date", ["userId", "date"]),
  
  // Leaderboard (global rankings)
  leaderboard: defineTable({
    userId: v.string(),
    username: v.string(),
    avatar: v.optional(v.string()),
    
    // Stats
    totalXP: v.number(),
    weeklyXP: v.number(),
    monthlyXP: v.number(),
    
    // Timestamp
    lastUpdated: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_totalXP", ["totalXP"])
    .index("by_weeklyXP", ["weeklyXP"])
    .index("by_monthlyXP", ["monthlyXP"]),
});

export default schema;
