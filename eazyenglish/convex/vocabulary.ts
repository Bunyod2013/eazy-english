import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Vocabulary Management Functions
 */

// Add word to user's vocabulary
export const addWord = mutation({
  args: {
    word: v.string(),
    translation: v.string(),
    pronunciation: v.optional(v.string()),
    partOfSpeech: v.optional(v.string()),
    lessonId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) throw new Error("Not authenticated");

    // Check if word already exists
    const existing = await ctx.db
      .query("vocabulary")
      .withIndex("by_userId_word", (q) =>
        q.eq("userId", userId).eq("word", args.word)
      )
      .first();

    if (existing) {
      // Update existing word
      await ctx.db.patch(existing._id, {
        timesReviewed: existing.timesReviewed + 1,
        lastReviewedAt: Date.now(),
      });
      return { wordId: existing._id, isNew: false };
    }

    // Add new word
    const wordId = await ctx.db.insert("vocabulary", {
      userId,
      word: args.word,
      translation: args.translation,
      pronunciation: args.pronunciation,
      partOfSpeech: args.partOfSpeech,
      learned: true,
      learnedAt: Date.now(),
      timesReviewed: 1,
      lastReviewedAt: Date.now(),
      nextReviewDate: Date.now() + 24 * 60 * 60 * 1000, // Next day
      difficulty: 1,
      lessonId: args.lessonId,
      createdAt: Date.now(),
    });

    return { wordId, isNew: true };
  },
});

// Get user's vocabulary
export const getUserVocabulary = query({
  args: {
    learned: v.optional(v.boolean()),
    lessonId: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) return [];

    let queryBuilder = ctx.db
      .query("vocabulary")
      .withIndex("by_userId", (q) => q.eq("userId", userId));

    const vocabulary = await queryBuilder
      .order("desc")
      .take(args.limit || 1000);

    // Filter by learned status if provided
    if (args.learned !== undefined) {
      return vocabulary.filter((v) => v.learned === args.learned);
    }

    // Filter by lesson if provided
    if (args.lessonId) {
      return vocabulary.filter((v) => v.lessonId === args.lessonId);
    }

    return vocabulary;
  },
});

// Get words due for review (spaced repetition)
export const getWordsForReview = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) return [];

    const now = Date.now();
    const allWords = await ctx.db
      .query("vocabulary")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    // Return words that are due for review
    return allWords.filter(
      (word) => word.nextReviewDate && word.nextReviewDate <= now
    );
  },
});

// Review a word (spaced repetition)
export const reviewWord = mutation({
  args: {
    wordId: v.id("vocabulary"),
    correct: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) throw new Error("Not authenticated");

    const word = await ctx.db.get(args.wordId);
    if (!word || word.userId !== userId) {
      throw new Error("Word not found");
    }

    // Update difficulty based on correctness
    const newDifficulty = args.correct
      ? Math.max(1, word.difficulty - 1)
      : Math.min(5, word.difficulty + 1);

    // Calculate next review date (spaced repetition)
    const intervals = [
      1, // 1 day
      3, // 3 days
      7, // 1 week
      14, // 2 weeks
      30, // 1 month
    ];
    const daysUntilNext = intervals[5 - newDifficulty] || 1;
    const nextReview = Date.now() + daysUntilNext * 24 * 60 * 60 * 1000;

    await ctx.db.patch(args.wordId, {
      timesReviewed: word.timesReviewed + 1,
      lastReviewedAt: Date.now(),
      nextReviewDate: nextReview,
      difficulty: newDifficulty,
    });

    return {
      newDifficulty,
      nextReviewDate: nextReview,
    };
  },
});

// Get vocabulary statistics
export const getVocabularyStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity().then((id) => id?.subject ?? null);
    if (!userId) return null;

    const vocabulary = await ctx.db
      .query("vocabulary")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const totalWords = vocabulary.length;
    const learnedWords = vocabulary.filter((w) => w.learned).length;
    const reviewingWords = vocabulary.filter((w) => w.timesReviewed > 1).length;

    const averageDifficulty =
      vocabulary.reduce((sum, w) => sum + w.difficulty, 0) / (totalWords || 1);

    return {
      totalWords,
      learnedWords,
      reviewingWords,
      averageDifficulty: Math.round(averageDifficulty * 10) / 10,
    };
  },
});
