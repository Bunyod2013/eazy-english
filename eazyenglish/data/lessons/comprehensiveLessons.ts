/**
 * Comprehensive Lesson Generation System
 * 500+ lessons integrating 5000+ vocabulary words
 * Lessons organized by CEFR level (A1 → C2) with progressive difficulty
 */

import { Lesson, LessonCategory, Question } from '@/types';
import { VOCABULARY_BY_LEVEL, ALL_VOCABULARY } from '@/data/vocabulary/comprehensiveVocabulary';
import type { VocabWord, CEFRLevel } from '@/data/vocabulary/comprehensiveVocabulary';

// Map vocabulary category to LessonCategory
const VOCAB_TO_LESSON_CATEGORY: Record<string, LessonCategory> = {
  basics: 'greetings',
  family: 'family',
  food: 'food',
  drinks: 'food',
  body: 'vocabulary',
  clothes: 'vocabulary',
  house: 'daily_life',
  work: 'work',
  business: 'work',
  education: 'school',
  travel: 'travel',
  nature: 'vocabulary',
  technology: 'vocabulary',
  sports: 'vocabulary',
  emotions: 'vocabulary',
  numbers: 'numbers',
  default: 'vocabulary',
};

function getLessonCategory(vocab: VocabWord): LessonCategory {
  return VOCAB_TO_LESSON_CATEGORY[vocab.category] ?? VOCAB_TO_LESSON_CATEGORY.default;
}

// Category-based icons for vocabulary questions (no emojis - use SVG icons in components)
const CATEGORY_ICON_NAME: Record<string, string> = {
  basics: 'book',
  family: 'people',
  food: 'food',
  drinks: 'drink',
  body: 'body',
  clothes: 'shirt',
  house: 'home',
  work: 'briefcase',
  business: 'chart',
  education: 'book',
  travel: 'plane',
  nature: 'tree',
  technology: 'laptop',
  sports: 'ball',
  emotions: 'heart',
  numbers: 'hash',
  default: 'book',
};

// Topic names for lesson titles by category
const TOPIC_NAMES: Record<string, { en: string; uz: string }> = {
  basics: { en: 'Basics', uz: 'Asoslar' },
  family: { en: 'Family', uz: 'Oila' },
  food: { en: 'Food & Drinks', uz: 'Ovqat va ichimliklar' },
  drinks: { en: 'Drinks', uz: 'Ichimliklar' },
  house: { en: 'Home', uz: 'Uy' },
  work: { en: 'Work', uz: 'Ish' },
  education: { en: 'Education', uz: "Ta'lim" },
  travel: { en: 'Travel', uz: 'Sayohat' },
  nature: { en: 'Nature', uz: 'Tabiat' },
  technology: { en: 'Technology', uz: 'Texnologiya' },
  sports: { en: 'Sports', uz: "Sport" },
  emotions: { en: 'Emotions', uz: 'His-tuyg\'ular' },
  business: { en: 'Business', uz: 'Biznes' },
  body: { en: 'Body', uz: 'Tana' },
  clothes: { en: 'Clothing', uz: 'Kiyim' },
  numbers: { en: 'Numbers', uz: 'Raqamlar' },
  default: { en: 'Vocabulary', uz: 'Lug\'at' },
};

// CEFR level to lesson range mapping
const CEFR_LESSON_RANGES: Record<CEFRLevel, { start: number; end: number }> = {
  A1: { start: 1, end: 100 },
  A2: { start: 101, end: 200 },
  B1: { start: 201, end: 300 },
  B2: { start: 301, end: 400 },
  C1: { start: 401, end: 450 },
  C2: { start: 451, end: 500 },
};

// Get distractor options from same-level vocabulary (excluding correct answer)
function getDistractors(
  correctWord: string,
  pool: VocabWord[],
  count: number = 3
): string[] {
  const candidates = pool
    .filter(w => w.word.toLowerCase() !== correctWord.toLowerCase())
    .map(w => w.word);
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Shuffle array
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Generate questions for a lesson from a set of vocabulary words
function generateLessonQuestions(
  lessonWords: VocabWord[],
  reviewWords: VocabWord[],
  lessonNum: number,
  level: CEFRLevel
): Question[] {
  const questions: Question[] = [];
  const allWords = [...lessonWords, ...reviewWords];
  const questionId = (i: number) => `comp-${lessonNum}-q${i}`;
  let qIndex = 0;

  // 2-3 vocabulary introduction questions
  const vocabCount = Math.min(3, lessonWords.length);
  for (let i = 0; i < vocabCount; i++) {
    const w = lessonWords[i];
    const topic = TOPIC_NAMES[w.category] ?? TOPIC_NAMES.default;
    questions.push({
      id: questionId(qIndex++),
      type: 'vocabulary',
      prompt: w.word,
      promptUz: `${w.translationUz}. Tarjima: ${w.translation}`,
      correctAnswer: w.word,
      image: CATEGORY_ICON_NAME[w.category] ?? CATEGORY_ICON_NAME.default,
      word: w.word,
      translation: w.translation,
      pronunciation: w.pronunciation,
      partOfSpeech: w.partOfSpeech,
      examples: w.examples,
    });
  }

  // 3-4 translation questions (EN → UZ or UZ → EN)
  const translationWords = shuffle(lessonWords).slice(0, 4);
  for (const w of translationWords) {
    const isEnToUz = Math.random() > 0.5;
    questions.push({
      id: questionId(qIndex++),
      type: 'translation',
      prompt: isEnToUz
        ? `Translate to Uzbek: ${w.word}`
        : `Translate to English: ${w.translation}`,
      promptUz: isEnToUz
        ? `O'zbekchaga tarjima qiling: ${w.word}`
        : `Inglizchaga tarjima qiling: ${w.translation}`,
      correctAnswer: isEnToUz ? w.translation : w.word,
      word: w.word,
      translation: w.translation,
    });
  }

  // 3-4 multiple choice questions
  const mcWords = shuffle([...lessonWords, ...reviewWords]).slice(0, 4);
  for (const w of mcWords) {
    const distractors = getDistractors(w.word, allWords, 3);
    const options = shuffle([w.word, ...distractors]);
    questions.push({
      id: questionId(qIndex++),
      type: 'multiple_choice',
      prompt: `What is the English word for "${w.translation}"?`,
      promptUz: `"${w.translation}" inglizcha qanday?`,
      correctAnswer: w.word,
      options,
      word: w.word,
      translation: w.translation,
    });
  }

  // 2-3 fill blank questions - use example sentences
  const fillWords = lessonWords.filter(w => w.examples?.length > 0).slice(0, 3);
  for (const w of fillWords) {
    const ex = w.examples[0];
    if (ex) {
      const sentence = ex.en;
      const wordEscaped = w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const wordRegex = new RegExp(`\\b${wordEscaped}\\b`, 'gi');
      const promptWithBlank = sentence.replace(wordRegex, '___');
      if (promptWithBlank.includes('___')) {
        questions.push({
          id: questionId(qIndex++),
          type: 'fill_blank',
          prompt: promptWithBlank,
          promptUz: `Bo'sh joyni to'ldiring. ${ex.uz}`,
          correctAnswer: w.word,
          hints: [w.translation],
          hintsUz: [w.translation],
          word: w.word,
        });
      }
    }
  }

  // 1-2 matching/sentence building (as translation - EN word → UZ meaning)
  const matchWords = lessonWords.slice(0, 2);
  for (const w of matchWords) {
    if (!questions.some(q => q.word === w.word && q.prompt?.includes('Match'))) {
      questions.push({
        id: questionId(qIndex++),
        type: 'translation',
        prompt: `Match the meaning: ${w.word}`,
        promptUz: `Ma'nosini toping: ${w.word}`,
        correctAnswer: w.translation,
        word: w.word,
        translation: w.translation,
      });
    }
  }

  // Ensure 10-15 questions
  return questions.slice(0, 15);
}

// Build all lessons from vocabulary
function buildComprehensiveLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  let lessonCounter = 0;
  let cumulativeXP = 0;

  // Track words used for review in higher levels
  const usedForReview: VocabWord[] = [];

  for (const level of levels) {
    const range = CEFR_LESSON_RANGES[level];
    let levelWords = VOCABULARY_BY_LEVEL[level];
    if (levelWords.length < 50) {
      levelWords = ALL_VOCABULARY.filter(w => w.level === level);
    }
    const wordsPerLesson = level === 'A1' ? 8 : level === 'C2' ? 6 : 7;
    const lessonCount = range.end - range.start + 1;

    // Split level words into lesson chunks (cycle if needed for 500+)
    let wordIndex = 0;
    for (let i = 0; i < lessonCount; i++) {
      if (levelWords.length === 0) break;
      lessonCounter++;
      const lessonNum = range.start + i;

      // Get new words for this lesson (cycle through if we run out)
      const startIdx = wordIndex % levelWords.length;
      const lessonWords: VocabWord[] = [];
      for (let j = 0; j < wordsPerLesson; j++) {
        lessonWords.push(levelWords[(startIdx + j) % levelWords.length]);
      }
      wordIndex += wordsPerLesson;

      if (lessonWords.length === 0) continue;

      // Get review words from previous levels
      const reviewCount = Math.min(5, usedForReview.length);
      const reviewWords = shuffle(usedForReview).slice(0, reviewCount);

      // Add current lesson words to review pool for next levels
      usedForReview.push(...lessonWords);
      if (usedForReview.length > 500) {
        usedForReview.splice(0, usedForReview.length - 400);
      }

      // Determine category from primary word
      const primaryCategory = getLessonCategory(lessonWords[0]);
      const topic = TOPIC_NAMES[lessonWords[0].category] ?? TOPIC_NAMES.default;

      // XP: 50 (A1) to 100 (C2)
      const xpReward = 50 + levels.indexOf(level) * 10;
      const requiredXP = cumulativeXP;
      cumulativeXP += xpReward * 0.8; // Slight overlap for unlock progression

      const questions = generateLessonQuestions(
        lessonWords,
        reviewWords,
        lessonNum,
        level
      );

      if (questions.length < 5) continue; // Skip if too few questions

      lessons.push({
        id: `comp-lesson-${lessonNum}`,
        title: `Lesson ${lessonNum}: ${topic.en}`,
        titleUz: `Dars ${lessonNum}: ${topic.uz}`,
        description: `Learn ${lessonWords.map(w => w.word).join(', ')} and more`,
        descriptionUz: `${lessonWords.map(w => w.word).join(', ')} va boshqa so'zlarni o'rganing`,
        level: lessonNum,
        requiredXP: Math.floor(requiredXP),
        xpReward,
        category: primaryCategory,
        isLocked: lessonNum > 1,
        questions,
      });
    }
  }

  return lessons;
}

// Generate and export
const COMPREHENSIVE_LESSONS = buildComprehensiveLessons();

// Export by CEFR level
export const LESSONS_BY_LEVEL: Record<CEFRLevel, Lesson[]> = {
  A1: COMPREHENSIVE_LESSONS.filter(
    l => l.level >= CEFR_LESSON_RANGES.A1.start && l.level <= CEFR_LESSON_RANGES.A1.end
  ),
  A2: COMPREHENSIVE_LESSONS.filter(
    l => l.level >= CEFR_LESSON_RANGES.A2.start && l.level <= CEFR_LESSON_RANGES.A2.end
  ),
  B1: COMPREHENSIVE_LESSONS.filter(
    l => l.level >= CEFR_LESSON_RANGES.B1.start && l.level <= CEFR_LESSON_RANGES.B1.end
  ),
  B2: COMPREHENSIVE_LESSONS.filter(
    l => l.level >= CEFR_LESSON_RANGES.B2.start && l.level <= CEFR_LESSON_RANGES.B2.end
  ),
  C1: COMPREHENSIVE_LESSONS.filter(
    l => l.level >= CEFR_LESSON_RANGES.C1.start && l.level <= CEFR_LESSON_RANGES.C1.end
  ),
  C2: COMPREHENSIVE_LESSONS.filter(
    l => l.level >= CEFR_LESSON_RANGES.C2.start && l.level <= CEFR_LESSON_RANGES.C2.end
  ),
};

export { COMPREHENSIVE_LESSONS };
export default COMPREHENSIVE_LESSONS;
