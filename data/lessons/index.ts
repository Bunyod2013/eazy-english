import { Lesson } from '@/types';

/**
 * Sample lesson data for EazyEnglish
 * Structure is designed to scale to 150+ lessons
 * Each lesson contains multiple question types with Uzbek explanations
 */

export const lessonsData: Lesson[] = [
  // LESSON 1: English Alphabet (A-E)
  {
    id: 'lesson-1',
    title: 'English Alphabet: A-E',
    titleUz: 'Ingliz alifbosi: A-E',
    description: 'Learn the first 5 letters of the English alphabet',
    descriptionUz: 'Ingliz alifbosining birinchi 5 ta harfini o\'rganamiz',
    level: 1,
    requiredXP: 0,
    xpReward: 50,
    category: 'alphabet',
    isLocked: false,
    questions: [
      {
        id: 'q1-1',
        type: 'vocabulary',
        prompt: 'Letter A',
        promptUz: 'Bu "A" harfi. Ingliz tilida "ey" deb o\'qiladi.',
        correctAnswer: 'A',
        image: 'pencil',
      },
      {
        id: 'q1-2',
        type: 'multiple_choice',
        prompt: 'Which letter comes after A?',
        promptUz: 'A harfidan keyin qaysi harf keladi?',
        correctAnswer: 'B',
        options: ['A', 'B', 'C', 'D'],
      },
      {
        id: 'q1-3',
        type: 'vocabulary',
        prompt: 'Letter C',
        promptUz: 'Bu "C" harfi. "Si" deb o\'qiladi.',
        correctAnswer: 'C',
        image: 'pencil',
      },
      {
        id: 'q1-4',
        type: 'fill_blank',
        prompt: 'A, B, ___, D, E',
        promptUz: 'Bo\'sh joyga to\'g\'ri harfni qo\'ying',
        correctAnswer: 'C',
        hints: ['Bu harfni "si" deb o\'qiymiz'],
      },
    ],
  },

  // LESSON 2: English Alphabet (F-J)
  {
    id: 'lesson-2',
    title: 'English Alphabet: F-J',
    titleUz: 'Ingliz alifbosi: F-J',
    description: 'Learn letters F through J',
    descriptionUz: 'F dan J gacha bo\'lgan harflarni o\'rganamiz',
    level: 2,
    requiredXP: 50,
    xpReward: 50,
    category: 'alphabet',
    isLocked: true,
    questions: [
      {
        id: 'q2-1',
        type: 'vocabulary',
        prompt: 'Letter F',
        promptUz: 'Bu "F" harfi. "Ef" deb o\'qiladi.',
        correctAnswer: 'F',
        image: 'pencil',
      },
      {
        id: 'q2-2',
        type: 'multiple_choice',
        prompt: 'Which letter comes between G and I?',
        promptUz: 'G va I harflari orasida qaysi harf bor?',
        correctAnswer: 'H',
        options: ['F', 'G', 'H', 'J'],
      },
      {
        id: 'q2-3',
        type: 'fill_blank',
        prompt: 'F, G, H, ___, J',
        promptUz: 'Bo\'sh joyga to\'g\'ri harfni qo\'ying',
        correctAnswer: 'I',
      },
    ],
  },

  // LESSON 3: Greetings
  {
    id: 'lesson-3',
    title: 'Basic Greetings',
    titleUz: 'Oddiy salomlashuvlar',
    description: 'Learn how to greet people in English',
    descriptionUz: 'Ingliz tilida odamlar bilan qanday salomlashishni o\'rganamiz',
    level: 3,
    requiredXP: 100,
    xpReward: 60,
    category: 'greetings',
    isLocked: true,
    questions: [
      {
        id: 'q3-1',
        type: 'vocabulary',
        prompt: 'Hello',
        promptUz: '"Hello" - salom degani. Bu eng keng tarqalgan salomlashuv.',
        correctAnswer: 'Hello',
        image: 'wave',
      },
      {
        id: 'q3-2',
        type: 'translation',
        prompt: 'Translate to English: Salom',
        promptUz: 'Ingliz tiliga tarjima qiling: Salom',
        correctAnswer: 'Hello',
      },
      {
        id: 'q3-3',
        type: 'multiple_choice',
        prompt: 'How do you say "Xayr" in English?',
        promptUz: '"Xayr" so\'zini inglizcha qanday aytamiz?',
        correctAnswer: 'Goodbye',
        options: ['Hello', 'Goodbye', 'Thanks', 'Please'],
      },
      {
        id: 'q3-4',
        type: 'vocabulary',
        prompt: 'Good morning',
        promptUz: '"Good morning" - ertalab salomlashganda aytiladi (tong otguncha)',
        correctAnswer: 'Good morning',
        image: 'sunrise',
      },
      {
        id: 'q3-5',
        type: 'matching',
        prompt: 'Match: Good night',
        promptUz: '"Good night" kechqurun uxlashdan oldin aytiladi',
        correctAnswer: 'Xayrli tun',
      },
    ],
  },

  // LESSON 4: Numbers 1-10
  {
    id: 'lesson-4',
    title: 'Numbers 1-10',
    titleUz: 'Raqamlar 1-10',
    description: 'Learn to count from 1 to 10 in English',
    descriptionUz: '1 dan 10 gacha inglizcha sanashni o\'rganamiz',
    level: 4,
    requiredXP: 160,
    xpReward: 60,
    category: 'numbers',
    isLocked: true,
    questions: [
      {
        id: 'q4-1',
        type: 'vocabulary',
        prompt: 'One (1)',
        promptUz: '"One" - bir raqami. "Van" deb o\'qiladi.',
        correctAnswer: 'One',
        image: 'number1',
      },
      {
        id: 'q4-2',
        type: 'multiple_choice',
        prompt: 'What is 5 in English?',
        promptUz: '5 raqami inglizcha qanday?',
        correctAnswer: 'Five',
        options: ['Four', 'Five', 'Six', 'Seven'],
      },
      {
        id: 'q4-3',
        type: 'fill_blank',
        prompt: 'One, Two, ___, Four, Five',
        promptUz: 'Bo\'sh joyga to\'g\'ri raqamni yozing',
        correctAnswer: 'Three',
        hints: ['Bu raqam 3 ni bildiradi'],
      },
      {
        id: 'q4-4',
        type: 'translation',
        prompt: 'Translate: Yetti',
        promptUz: 'Ingliz tiliga tarjima qiling: Yetti',
        correctAnswer: 'Seven',
      },
    ],
  },

  // LESSON 5: Colors
  {
    id: 'lesson-5',
    title: 'Basic Colors',
    titleUz: 'Asosiy ranglar',
    description: 'Learn common color names in English',
    descriptionUz: 'Ingliz tilidagi asosiy rang nomlarini o\'rganamiz',
    level: 5,
    requiredXP: 220,
    xpReward: 60,
    category: 'colors',
    isLocked: true,
    questions: [
      {
        id: 'q5-1',
        type: 'vocabulary',
        prompt: 'Red',
        promptUz: '"Red" - qizil rang. "Red" deb o\'qiladi.',
        correctAnswer: 'Red',
        image: 'red',
      },
      {
        id: 'q5-2',
        type: 'multiple_choice',
        prompt: 'What color is the sky? 🌤️',
        promptUz: 'Osmon qanday rangda?',
        correctAnswer: 'Blue',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
      },
      {
        id: 'q5-3',
        type: 'translation',
        prompt: 'Translate: Sariq',
        promptUz: 'Ingliz tiliga tarjima qiling: Sariq',
        correctAnswer: 'Yellow',
      },
      {
        id: 'q5-4',
        type: 'vocabulary',
        prompt: 'Green',
        promptUz: '"Green" - yashil rang. O\'simliklar va daraxtlar yashil rangda.',
        correctAnswer: 'Green',
        image: 'green',
      },
    ],
  },

  // LESSON 6: Family Members
  {
    id: 'lesson-6',
    title: 'Family Members',
    titleUz: 'Oila a\'zolari',
    description: 'Learn words for family members',
    descriptionUz: 'Oila a\'zolarining inglizcha nomlarini o\'rganamiz',
    level: 6,
    requiredXP: 280,
    xpReward: 70,
    category: 'family',
    isLocked: true,
    questions: [
      {
        id: 'q6-1',
        type: 'vocabulary',
        prompt: 'Mother',
        promptUz: '"Mother" - ona. Qisqartmasi "Mom" - onajon.',
        correctAnswer: 'Mother',
        image: 'woman',
      },
      {
        id: 'q6-2',
        type: 'translation',
        prompt: 'Translate: Ota',
        promptUz: 'Ingliz tiliga tarjima qiling: Ota',
        correctAnswer: 'Father',
      },
      {
        id: 'q6-3',
        type: 'multiple_choice',
        prompt: 'Who is your parent\'s son?',
        promptUz: 'Ota-onangizning o\'g\'li kim bo\'ladi?',
        correctAnswer: 'Brother',
        options: ['Sister', 'Brother', 'Uncle', 'Cousin'],
      },
      {
        id: 'q6-4',
        type: 'vocabulary',
        prompt: 'Sister',
        promptUz: '"Sister" - opa yoki singil degani.',
        correctAnswer: 'Sister',
        image: 'girl',
      },
    ],
  },

  // LESSON 7: Common Foods
  {
    id: 'lesson-7',
    title: 'Common Foods',
    titleUz: 'Umumiy taomlar',
    description: 'Learn names of everyday foods',
    descriptionUz: 'Kundalik taomlarning nomlarini o\'rganamiz',
    level: 7,
    requiredXP: 350,
    xpReward: 70,
    category: 'food',
    isLocked: true,
    questions: [
      {
        id: 'q7-1',
        type: 'vocabulary',
        prompt: 'Bread',
        promptUz: '"Bread" - non. Dunyoning barcha joyida ovqatlanishda ishlatiladi.',
        correctAnswer: 'Bread',
        image: 'bread',
      },
      {
        id: 'q7-2',
        type: 'multiple_choice',
        prompt: 'What is 🍎?',
        promptUz: 'Bu nima?',
        correctAnswer: 'Apple',
        options: ['Banana', 'Apple', 'Orange', 'Bread'],
      },
      {
        id: 'q7-3',
        type: 'translation',
        prompt: 'Translate: Suv',
        promptUz: 'Ingliz tiliga tarjima qiling: Suv',
        correctAnswer: 'Water',
      },
      {
        id: 'q7-4',
        type: 'vocabulary',
        prompt: 'Milk',
        promptUz: '"Milk" - sut. Hayvonlardan olinadi, ayniqsa sigirlardan.',
        correctAnswer: 'Milk',
        image: 'milk',
      },
    ],
  },

  // LESSON 8: Animals
  {
    id: 'lesson-8',
    title: 'Common Animals',
    titleUz: 'Umumiy hayvonlar',
    description: 'Learn names of common animals',
    descriptionUz: 'Oddiy hayvonlarning nomlarini o\'rganamiz',
    level: 8,
    requiredXP: 420,
    xpReward: 70,
    category: 'animals',
    isLocked: true,
    questions: [
      {
        id: 'q8-1',
        type: 'vocabulary',
        prompt: 'Cat',
        promptUz: '"Cat" - mushuk. Uy hayvoni, juda mashhur.',
        correctAnswer: 'Cat',
        image: 'cat',
      },
      {
        id: 'q8-2',
        type: 'multiple_choice',
        prompt: 'What animal says "Woof"? 🐕',
        promptUz: 'Qaysi hayvon "Woof" deb ovoz chiqaradi?',
        correctAnswer: 'Dog',
        options: ['Cat', 'Dog', 'Bird', 'Fish'],
      },
      {
        id: 'q8-3',
        type: 'translation',
        prompt: 'Translate: Qush',
        promptUz: 'Ingliz tiliga tarjima qiling: Qush',
        correctAnswer: 'Bird',
      },
      {
        id: 'q8-4',
        type: 'vocabulary',
        prompt: 'Fish',
        promptUz: '"Fish" - baliq. Suvda yashaydigan hayvon.',
        correctAnswer: 'Fish',
        image: 'fish',
      },
    ],
  },

  // LESSON 9: Daily Actions
  {
    id: 'lesson-9',
    title: 'Daily Actions',
    titleUz: 'Kundalik harakatlar',
    description: 'Learn common daily action verbs',
    descriptionUz: 'Kundalik fe\'llarni o\'rganamiz',
    level: 9,
    requiredXP: 490,
    xpReward: 80,
    category: 'daily_life',
    isLocked: true,
    questions: [
      {
        id: 'q9-1',
        type: 'vocabulary',
        prompt: 'Eat',
        promptUz: '"Eat" - yemoq fe\'li. Ovqat iste\'mol qilish.',
        correctAnswer: 'Eat',
        image: 'plate',
      },
      {
        id: 'q9-2',
        type: 'translation',
        prompt: 'Translate: Ichmoq',
        promptUz: 'Ingliz tiliga tarjima qiling: Ichmoq',
        correctAnswer: 'Drink',
      },
      {
        id: 'q9-3',
        type: 'multiple_choice',
        prompt: 'What do you do at night? 😴',
        promptUz: 'Kechasi nima qilasiz?',
        correctAnswer: 'Sleep',
        options: ['Eat', 'Run', 'Sleep', 'Read'],
      },
      {
        id: 'q9-4',
        type: 'vocabulary',
        prompt: 'Walk',
        promptUz: '"Walk" - yurmoq. Bir joydan ikkinchi joyga piyoda borish.',
        correctAnswer: 'Walk',
        image: 'walk',
      },
      {
        id: 'q9-5',
        type: 'fill_blank',
        prompt: 'I ___ to school every day',
        promptUz: 'Men har kuni maktabga yuraman. Bo\'sh joyga "yurmoq" fe\'lini qo\'ying.',
        correctAnswer: 'walk',
        hints: ['Bu fe\'l "yurmoq" degani'],
      },
    ],
  },

  // LESSON 10: School Items
  {
    id: 'lesson-10',
    title: 'School Items',
    titleUz: 'Maktab buyumlari',
    description: 'Learn names of common school items',
    descriptionUz: 'Maktabdagi buyumlarning nomlarini o\'rganamiz',
    level: 10,
    requiredXP: 570,
    xpReward: 80,
    category: 'school',
    isLocked: true,
    questions: [
      {
        id: 'q10-1',
        type: 'vocabulary',
        prompt: 'Book',
        promptUz: '"Book" - kitob. Maktabda o\'qish uchun kerak.',
        correctAnswer: 'Book',
        image: 'study',
      },
      {
        id: 'q10-2',
        type: 'multiple_choice',
        prompt: 'What do you write with? ✏️',
        promptUz: 'Nima bilan yozasiz?',
        correctAnswer: 'Pen',
        options: ['Book', 'Pen', 'Desk', 'Chair'],
      },
      {
        id: 'q10-3',
        type: 'translation',
        prompt: 'Translate: Daftar',
        promptUz: 'Ingliz tiliga tarjima qiling: Daftar',
        correctAnswer: 'Notebook',
      },
      {
        id: 'q10-4',
        type: 'vocabulary',
        prompt: 'Teacher',
        promptUz: '"Teacher" - o\'qituvchi. Maktabda dars beradigan odam.',
        correctAnswer: 'Teacher',
        image: 'teacher',
      },
      {
        id: 'q10-5',
        type: 'fill_blank',
        prompt: 'The ___ helps students learn',
        promptUz: 'O\'qituvchi o\'quvchilarga o\'rganishda yordam beradi.',
        correctAnswer: 'teacher',
      },
    ],
  },
];

// Helper function to get lessons by category
export const getLessonsByCategory = (category: string): Lesson[] => {
  return lessonsData.filter(lesson => lesson.category === category);
};

// Helper function to get lessons by level range
export const getLessonsByLevelRange = (minLevel: number, maxLevel: number): Lesson[] => {
  return lessonsData.filter(
    lesson => lesson.level >= minLevel && lesson.level <= maxLevel
  );
};

// Comprehensive lessons (500+) with integrated vocabulary - use for full curriculum
export { COMPREHENSIVE_LESSONS, LESSONS_BY_LEVEL } from './comprehensiveLessons';

// 500+ Generated Lessons
export { LESSONS_500_PLUS, LESSONS_BY_CEFR } from './generate500Lessons';

// Duolingo-style lessons with vocabulary, listening, word bank, etc.
export {
  DUOLINGO_STYLE_LESSONS,
  getDuolingoStyleLessons,
  getDuolingoLessonById
} from './duolingoStyleLessons';

// Purpose-based personalized lesson generator (NEW DEFAULT!)
export { generatePurposeLessons } from './generatePurposeLessons';

// Default export - use 500+ lessons as fallback
export { LESSONS_500_PLUS as default } from './generate500Lessons';
