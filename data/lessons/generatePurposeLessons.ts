/**
 * PURPOSE-BASED LESSON GENERATOR
 * Generates personalized lessons based on user's learning purposes and skill level
 */

import { Lesson, LearningPurpose, SkillLevel } from '@/types';
import { PurposeWord, COMMON_WORDS } from './purposeWords/commonWords';
import { WORK_WORDS } from './purposeWords/workWords';
import { STUDY_WORDS } from './purposeWords/studyWords';
import { TRAVEL_WORDS } from './purposeWords/travelWords';
import { STARTUP_WORDS } from './purposeWords/startupWords';
import { FRIENDS_WORDS } from './purposeWords/friendsWords';
import { MOVIES_WORDS } from './purposeWords/moviesWords';
import { MUSIC_WORDS } from './purposeWords/musicWords';
import { GAMES_WORDS } from './purposeWords/gamesWords';
import { GENERAL_WORDS } from './purposeWords/generalWords';

// ==========================================
// WORD DATABASE MAPPING
// ==========================================
const PURPOSE_WORD_MAP: Record<LearningPurpose, PurposeWord[]> = {
  work: WORK_WORDS,
  study: STUDY_WORDS,
  travel: TRAVEL_WORDS,
  startup: STARTUP_WORDS,
  friends: FRIENDS_WORDS,
  movies: MOVIES_WORDS,
  music: MUSIC_WORDS,
  games: GAMES_WORDS,
  general: GENERAL_WORDS,
};

// ==========================================
// TAUGHT WORDS TRACKER (per generation)
// ==========================================
let taughtWords: Set<string>;

function teach(word: string) {
  taughtWords.add(word.toLowerCase());
}

function isTaught(word: string): boolean {
  return taughtWords.has(word.toLowerCase());
}

// ==========================================
// QUESTION GENERATORS
// ==========================================

function createLesson(
  level: number,
  title: string,
  titleUz: string,
  category: string,
  questions: any[]
): Lesson {
  return {
    id: `lesson-${level}`,
    title,
    titleUz,
    description: `Learn: ${title}`,
    descriptionUz: `O'rganamiz: ${titleUz}`,
    level,
    requiredXP: (level - 1) * 50,
    xpReward: 50 + Math.floor(level / 10) * 5,
    category: category as any,
    isLocked: level > 1,
    questions: questions.map((q, i) => ({
      ...q,
      id: `l${level}-q${i + 1}`,
    })),
  };
}

function vocab(word: string, translation: string, emoji: string, explanation: string) {
  teach(word);
  return {
    type: 'vocabulary',
    word,
    translation,
    image: emoji,
    audio: `words/${word.toLowerCase().replace(/ /g, '_')}.wav`,
    audioSlow: `words-slow/${word.toLowerCase().replace(/ /g, '_')}.wav`,
    audioText: word,
    prompt: word,
    promptUz: `"${word}" - ${translation}. ${explanation}`,
    correctAnswer: word,
    pronunciation: '',
    isNewWord: true,
  };
}

function mc(prompt: string, promptUz: string, correct: string, options: string[]) {
  return {
    type: 'multiple_choice',
    prompt,
    promptUz,
    correctAnswer: correct,
    options,
  };
}

function matching(pairs: [string, string][]) {
  return {
    type: 'matching',
    prompt: 'Match the pairs',
    promptUz: 'Juftliklarni toping',
    correctAnswer: 'matched',
    pairs: pairs.map(([en, uz]) => ({ en, uz })),
  };
}

function trueFalse(statement: string, statementUz: string, isTrue: boolean) {
  return {
    type: 'true_false',
    prompt: statement,
    promptUz: statementUz,
    statement,
    isTrue,
    correctAnswer: isTrue ? 'true' : 'false',
  };
}

function conversation(dialogue: string[], correctResponse: string, options: string[]) {
  return {
    type: 'conversation',
    prompt: 'Choose the best response',
    promptUz: 'Eng mos javobni tanlang',
    dialogue,
    correctAnswer: correctResponse,
    options,
  };
}

function fillBlankChoice(sentence: string, sentenceUz: string, correct: string, options: string[]) {
  return {
    type: 'fill_blank_choice',
    prompt: sentence,
    promptUz: sentenceUz,
    correctAnswer: correct,
    options,
  };
}

function wordBank(promptUz: string, correctAnswer: string, allTaughtWords: string[], hint: string) {
  const correctWords = correctAnswer.toLowerCase().split(' ');
  const safeWords = allTaughtWords.filter(w => isTaught(w));

  if (safeWords.length < 3) return null;

  const allWords = [...new Set([...correctWords, ...safeWords])];
  const finalBank = allWords.slice(0, 8);
  const shuffled = finalBank.sort(() => Math.random() - 0.5);

  return {
    type: 'word_bank',
    prompt: 'Build this sentence:',
    promptUz,
    correctAnswer: correctAnswer.toLowerCase(),
    wordBank: shuffled,
    hintsUz: [hint],
  };
}

function speaking(phrase: string, translation: string) {
  return {
    type: 'speaking',
    prompt: 'Repeat after Falstaff',
    promptUz: 'Takrorlang',
    correctAnswer: phrase,
    targetPhrase: phrase,
    audio: `phrases/${phrase.toLowerCase().replace(/ /g, '_')}.wav`,
    audioSlow: `phrases-slow/${phrase.toLowerCase().replace(/ /g, '_')}.wav`,
    audioText: phrase,
  };
}

function imageChoice(word: string, translation: string, emoji: string, distractors: PurposeWord[]) {
  const options = [
    { word, translation, emoji },
    ...distractors.slice(0, 3).map(d => ({ word: d.word, translation: d.translation, emoji: d.emoji })),
  ].sort(() => Math.random() - 0.5);

  return {
    type: 'image_choice',
    prompt: 'Select the correct image',
    promptUz: 'To\'g\'ri rasmni tanlang',
    word,
    translation,
    correctAnswer: translation,
    audio: `words/${word.toLowerCase().replace(/ /g, '_')}.wav`,
    audioText: word,
    options: options.map(o => o.translation),
    images: options.map(o => o.emoji),
  };
}

function listeningDiscrimination(word: string, translation: string, distractorWord: string) {
  return {
    type: 'listening_discrimination',
    prompt: 'What did you hear?',
    promptUz: 'Nima eshitdingiz?',
    correctAnswer: word,
    distractorWord,
    audio: `words/${word.toLowerCase().replace(/ /g, '_')}.wav`,
    audioText: word,
    options: [word, distractorWord],
  };
}

// ==========================================
// HELPER: Get distractor words for a word
// ==========================================
function getDistractors(currentWord: PurposeWord, allWords: PurposeWord[], count: number = 3): PurposeWord[] {
  return allWords
    .filter(w => w.word !== currentWord.word && w.category === currentWord.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function getRandomDistractors(currentWord: PurposeWord, allWords: PurposeWord[], count: number = 3): PurposeWord[] {
  const sameCat = getDistractors(currentWord, allWords, count);
  if (sameCat.length >= count) return sameCat;
  // Fill from other categories
  const others = allWords
    .filter(w => w.word !== currentWord.word && !sameCat.includes(w))
    .sort(() => Math.random() - 0.5)
    .slice(0, count - sameCat.length);
  return [...sameCat, ...others];
}

// ==========================================
// MAIN GENERATOR
// ==========================================
export function generatePurposeLessons(
  purposes: LearningPurpose[],
  skillLevel: SkillLevel
): Lesson[] {
  // Reset taught words for this generation
  taughtWords = new Set<string>();

  const lessons: Lesson[] = [];

  // Collect purpose words
  const purposeWords: PurposeWord[] = [];
  for (const purpose of purposes) {
    const words = PURPOSE_WORD_MAP[purpose];
    if (words) {
      purposeWords.push(...words);
    }
  }

  // Remove duplicates by word
  const seen = new Set<string>();
  const uniquePurposeWords = purposeWords.filter(w => {
    const key = w.word.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Also deduplicate common words against purpose words
  const purposeWordSet = new Set(uniquePurposeWords.map(w => w.word.toLowerCase()));
  const uniqueCommonWords = COMMON_WORDS.filter(w => !purposeWordSet.has(w.word.toLowerCase()));

  // Determine word sequence based on skill level
  let wordSequence: PurposeWord[];

  if (skillLevel === 'beginner') {
    // Beginners: common words first (lessons 1-30), then purpose words
    wordSequence = [...uniqueCommonWords, ...uniquePurposeWords];
  } else {
    // Elementary/Intermediate: purpose words first, then common words as supplement
    wordSequence = [...uniquePurposeWords, ...uniqueCommonWords];
  }

  // Generate lessons: ~5 words per lesson
  const WORDS_PER_LESSON = 5;
  const totalLessons = Math.ceil(wordSequence.length / WORDS_PER_LESSON);

  // Track all taught word strings for word bank
  const taughtWordsList: string[] = [];

  for (let lessonIdx = 0; lessonIdx < totalLessons; lessonIdx++) {
    const level = lessonIdx + 1;
    const startIdx = lessonIdx * WORDS_PER_LESSON;
    const batchWords = wordSequence.slice(startIdx, startIdx + WORDS_PER_LESSON);

    if (batchWords.length === 0) break;

    const questions: any[] = [];

    // 1. Vocabulary questions for each new word (3-5)
    for (const pw of batchWords) {
      questions.push(vocab(pw.word, pw.translation, pw.emoji, pw.explanation));
      taughtWordsList.push(pw.word.toLowerCase());
    }

    // 2. Multiple choice questions (1-2)
    const mcWord1 = batchWords[0];
    const distractors1 = getRandomDistractors(mcWord1, wordSequence);
    questions.push(mc(
      `"${mcWord1.translation}" inglizcha nima?`,
      `"${mcWord1.translation}" so'zini inglizcha tanlang`,
      mcWord1.word,
      [mcWord1.word, ...distractors1.map(d => d.word)].sort(() => Math.random() - 0.5)
    ));

    if (batchWords.length >= 3) {
      const mcWord2 = batchWords[2];
      const distractors2 = getRandomDistractors(mcWord2, wordSequence);
      questions.push(mc(
        `"${mcWord2.word}" o'zbekcha nima?`,
        `"${mcWord2.word}" so'zini o'zbekcha tanlang`,
        mcWord2.translation,
        [mcWord2.translation, ...distractors2.map(d => d.translation)].sort(() => Math.random() - 0.5)
      ));
    }

    // 3. Matching (every 3rd lesson)
    if (level % 3 === 0 && batchWords.length >= 3) {
      const matchPairs: [string, string][] = batchWords
        .slice(0, Math.min(5, batchWords.length))
        .map(w => [w.word, w.translation] as [string, string]);
      questions.push(matching(matchPairs));
    }

    // 4. Fill-blank-choice (every 4th lesson)
    if (level % 4 === 0 && batchWords.length >= 2) {
      const fbWord = batchWords[1];
      const fbDistractors = getRandomDistractors(fbWord, wordSequence, 3);
      questions.push(fillBlankChoice(
        `The ___ is important.`,
        `${fbWord.translation} muhim.`,
        fbWord.word.toLowerCase(),
        [fbWord.word.toLowerCase(), ...fbDistractors.map(d => d.word.toLowerCase())].sort(() => Math.random() - 0.5)
      ));
    }

    // 5. True/False (every 5th lesson)
    if (level % 5 === 0 && batchWords.length >= 2) {
      const tfWord = batchWords[0];
      const isTrue = Math.random() > 0.5;
      if (isTrue) {
        questions.push(trueFalse(
          `"${tfWord.word}" means "${tfWord.translation}"`,
          `"${tfWord.word}" - "${tfWord.translation}" degani`,
          true
        ));
      } else {
        const wrongWord = getRandomDistractors(tfWord, wordSequence, 1)[0];
        const wrongTranslation = wrongWord ? wrongWord.translation : 'noto\'g\'ri';
        questions.push(trueFalse(
          `"${tfWord.word}" means "${wrongTranslation}"`,
          `"${tfWord.word}" - "${wrongTranslation}" degani`,
          false
        ));
      }
    }

    // 6. Conversation (every 7th lesson, intermediate+ only)
    if (level % 7 === 0 && skillLevel !== 'beginner') {
      const convWord = batchWords[0];
      questions.push(conversation(
        [`Do you know what "${convWord.word}" means?`],
        `Yes, it means "${convWord.translation}"`,
        [
          `Yes, it means "${convWord.translation}"`,
          `No, I don't know`,
          `Maybe "${getRandomDistractors(convWord, wordSequence, 1)[0]?.translation || 'something'}"`,
        ]
      ));
    }

    // 7. Speaking (every 8th lesson)
    if (level % 8 === 0) {
      const spWord = batchWords[0];
      questions.push(speaking(spWord.word, spWord.translation));
    }

    // 8. Word bank (when 6+ words taught, every 6th lesson)
    if (level % 6 === 0 && taughtWordsList.length >= 6) {
      const wbWord = batchWords[0];
      const wb = wordBank(
        `${wbWord.translation}`,
        wbWord.word.toLowerCase(),
        taughtWordsList.slice(-15),
        `"${wbWord.word}" so'zini toping`
      );
      if (wb) questions.push(wb);
    }

    // 9. Image choice (every 3rd lesson, offset from matching)
    if (level % 3 === 1 && batchWords.length >= 1) {
      const icWord = batchWords[batchWords.length - 1];
      const icDistractors = getRandomDistractors(icWord, wordSequence, 3);
      if (icDistractors.length >= 3) {
        questions.push(imageChoice(icWord.word, icWord.translation, icWord.emoji, icDistractors));
      }
    }

    // 10. Listening discrimination (every 5th lesson, offset from true/false)
    if (level % 5 === 2 && batchWords.length >= 2) {
      const ldWord = batchWords[0];
      const ldDistractor = batchWords[1];
      questions.push(listeningDiscrimination(ldWord.word, ldWord.translation, ldDistractor.word));
    }

    // Determine lesson category and title
    const primaryCategory = batchWords[0].category;
    const categoryTitle = getCategoryTitle(primaryCategory);
    const wordsPreview = batchWords.slice(0, 3).map(w => w.word).join(', ');

    lessons.push(createLesson(
      level,
      `${categoryTitle}: ${wordsPreview}...`,
      `${getCategoryTitleUz(primaryCategory)}: ${batchWords.slice(0, 3).map(w => w.translation).join(', ')}...`,
      mapToLessonCategory(primaryCategory),
      questions
    ));
  }

  // Add review lessons after every 20 regular lessons
  const reviewLessons: Lesson[] = [];
  const totalRegular = lessons.length;

  for (let i = 20; i <= totalRegular; i += 20) {
    const reviewLevel = totalRegular + reviewLessons.length + 1;
    const reviewStart = (i - 20) * WORDS_PER_LESSON;
    const reviewEnd = i * WORDS_PER_LESSON;
    const reviewWords = wordSequence.slice(reviewStart, Math.min(reviewEnd, wordSequence.length));

    if (reviewWords.length < 5) continue;

    const questions: any[] = [];

    // Matching review with 5 random pairs
    const shuffledReview = [...reviewWords].sort(() => Math.random() - 0.5);
    const matchPairs: [string, string][] = shuffledReview
      .slice(0, 5)
      .map(w => [w.word, w.translation] as [string, string]);
    questions.push(matching(matchPairs));

    // Multiple choice review (3 questions)
    for (let j = 0; j < 3 && j < shuffledReview.length; j++) {
      const w = shuffledReview[j];
      const dist = getRandomDistractors(w, wordSequence);
      questions.push(mc(
        `"${w.translation}" inglizcha nima?`,
        `"${w.translation}" so'zini tanlang`,
        w.word,
        [w.word, ...dist.map(d => d.word)].sort(() => Math.random() - 0.5)
      ));
    }

    // True/false review
    const tfReview = shuffledReview[4] || shuffledReview[0];
    questions.push(trueFalse(
      `"${tfReview.word}" means "${tfReview.translation}"`,
      `"${tfReview.word}" - "${tfReview.translation}" degani`,
      true
    ));

    reviewLessons.push(createLesson(
      reviewLevel,
      `Review: Lessons ${i - 19}-${i}`,
      `Takrorlash: ${i - 19}-${i} darslar`,
      'vocabulary',
      questions
    ));
  }

  return [...lessons, ...reviewLessons];
}

// ==========================================
// CATEGORY HELPERS
// ==========================================

function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    greetings: 'Greetings', numbers: 'Numbers', colors: 'Colors',
    family: 'Family', food: 'Food', animals: 'Animals',
    body: 'Body', clothes: 'Clothes', actions: 'Actions',
    adjectives: 'Adjectives', pronouns: 'Pronouns', prepositions: 'Grammar',
    house: 'Home', office: 'Office', meetings: 'Meetings',
    career: 'Career', finance: 'Finance', communication: 'Communication',
    skills: 'Skills', positions: 'Positions', documents: 'Documents',
    workplace: 'Workplace', time: 'Time', school: 'School',
    university: 'University', subjects: 'Subjects', exams: 'Exams',
    research: 'Research', library: 'Library', writing: 'Writing',
    classroom: 'Classroom', academic: 'Academic', supplies: 'Supplies',
    transport: 'Transport', accommodation: 'Accommodation',
    airport: 'Airport', directions: 'Directions', sightseeing: 'Sightseeing',
    restaurant: 'Restaurant', shopping: 'Shopping', emergency: 'Emergency',
    weather: 'Weather', business: 'Business', technology: 'Technology',
    product: 'Product', marketing: 'Marketing', team: 'Team',
    development: 'Development', design: 'Design', data: 'Data',
    growth: 'Growth', relationships: 'Relationships', feelings: 'Feelings',
    activities: 'Activities', personality: 'Personality',
    conversation: 'Conversation', celebrations: 'Celebrations',
    hobbies: 'Hobbies', places: 'Places', social_media: 'Social Media',
    daily_life: 'Daily Life', genres: 'Genres', production: 'Production',
    characters: 'Characters', viewing: 'Viewing', storytelling: 'Storytelling',
    cinema: 'Cinema', emotions: 'Emotions', reviews: 'Reviews',
    streaming: 'Streaming', awards: 'Awards', instruments: 'Instruments',
    performance: 'Performance', recording: 'Recording', theory: 'Theory',
    listening: 'Listening', artists: 'Artists', industry: 'Industry',
    gameplay: 'Gameplay', equipment: 'Equipment', competition: 'Competition',
    interface: 'Interface', strategy: 'Strategy', items: 'Items',
    connectors: 'Grammar', nature: 'Nature', health: 'Health',
  };
  return titles[category] || 'Vocabulary';
}

function getCategoryTitleUz(category: string): string {
  const titles: Record<string, string> = {
    greetings: 'Salomlashuvlar', numbers: 'Raqamlar', colors: 'Ranglar',
    family: 'Oila', food: 'Ovqat', animals: 'Hayvonlar',
    body: 'Tana', clothes: 'Kiyimlar', actions: 'Harakatlar',
    adjectives: 'Sifatlar', pronouns: 'Olmoshlar', prepositions: 'Grammatika',
    house: 'Uy', office: 'Ofis', meetings: 'Yig\'ilishlar',
    career: 'Karyera', finance: 'Moliya', communication: 'Aloqa',
    skills: 'Ko\'nikmalar', positions: 'Lavozimlar', documents: 'Hujjatlar',
    workplace: 'Ish joyi', time: 'Vaqt', school: 'Maktab',
    university: 'Universitet', subjects: 'Fanlar', exams: 'Imtihonlar',
    research: 'Tadqiqot', library: 'Kutubxona', writing: 'Yozuv',
    classroom: 'Sinf', academic: 'Akademik', supplies: 'Jihozlar',
    transport: 'Transport', accommodation: 'Turar joy',
    airport: 'Aeroport', directions: 'Yo\'nalishlar', sightseeing: 'Sayohat',
    restaurant: 'Restoran', shopping: 'Xarid', emergency: 'Favqulodda',
    weather: 'Ob-havo', business: 'Biznes', technology: 'Texnologiya',
    product: 'Mahsulot', marketing: 'Marketing', team: 'Jamoa',
    development: 'Dasturlash', design: 'Dizayn', data: 'Ma\'lumot',
    growth: 'O\'sish', relationships: 'Munosabatlar', feelings: 'Hislar',
    activities: 'Faoliyat', personality: 'Shaxsiyat',
    conversation: 'Suhbat', celebrations: 'Bayramlar',
    hobbies: 'Sevimli mashg\'ulotlar', places: 'Joylar', social_media: 'Ijtimoiy tarmoq',
    daily_life: 'Kundalik hayot', genres: 'Janrlar', production: 'Ishlab chiqarish',
    characters: 'Personajlar', viewing: 'Tomosha', storytelling: 'Hikoya',
    cinema: 'Kino', emotions: 'Hislar', reviews: 'Sharhlar',
    streaming: 'Oqim', awards: 'Mukofotlar', instruments: 'Asboblar',
    performance: 'Ijro', recording: 'Yozuv', theory: 'Nazariya',
    listening: 'Tinglash', artists: 'San\'atkorlar', industry: 'Sanoat',
    gameplay: 'O\'yin jarayoni', equipment: 'Jihozlar', competition: 'Musobaqa',
    interface: 'Interfeys', strategy: 'Strategiya', items: 'Buyumlar',
    connectors: 'Grammatika', nature: 'Tabiat', health: 'Salomatlik',
  };
  return titles[category] || 'Lug\'at';
}

function mapToLessonCategory(category: string): string {
  const mapping: Record<string, string> = {
    greetings: 'greetings', numbers: 'vocabulary', colors: 'vocabulary',
    family: 'family', food: 'food', animals: 'animals',
    body: 'vocabulary', clothes: 'vocabulary', actions: 'daily_life',
    adjectives: 'vocabulary', pronouns: 'grammar', prepositions: 'grammar',
    house: 'vocabulary', office: 'work', meetings: 'work',
    career: 'work', finance: 'work', communication: 'work',
    skills: 'work', positions: 'work', documents: 'work',
    workplace: 'work', time: 'vocabulary', school: 'school',
    university: 'school', subjects: 'school', exams: 'school',
    research: 'school', library: 'school', writing: 'school',
    classroom: 'school', academic: 'school', supplies: 'school',
    transport: 'travel', accommodation: 'travel',
    airport: 'travel', directions: 'travel', sightseeing: 'travel',
    restaurant: 'food', shopping: 'vocabulary', emergency: 'vocabulary',
    weather: 'vocabulary', business: 'work', technology: 'vocabulary',
    product: 'work', marketing: 'work', team: 'work',
    development: 'vocabulary', design: 'vocabulary', data: 'vocabulary',
    growth: 'work', relationships: 'vocabulary', feelings: 'vocabulary',
    activities: 'daily_life', personality: 'vocabulary',
    conversation: 'vocabulary', celebrations: 'vocabulary',
    hobbies: 'daily_life', places: 'travel', social_media: 'vocabulary',
    daily_life: 'daily_life', genres: 'vocabulary', production: 'vocabulary',
    characters: 'vocabulary', viewing: 'vocabulary', storytelling: 'vocabulary',
    cinema: 'vocabulary', emotions: 'vocabulary', reviews: 'vocabulary',
    streaming: 'vocabulary', awards: 'vocabulary', instruments: 'vocabulary',
    performance: 'vocabulary', recording: 'vocabulary', theory: 'vocabulary',
    listening: 'vocabulary', artists: 'vocabulary', industry: 'vocabulary',
    gameplay: 'vocabulary', equipment: 'vocabulary', competition: 'vocabulary',
    interface: 'vocabulary', strategy: 'vocabulary', items: 'vocabulary',
    connectors: 'grammar', nature: 'vocabulary', health: 'vocabulary',
  };
  return mapping[category] || 'vocabulary';
}
