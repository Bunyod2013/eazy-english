import { Lesson } from '@/types';

/**
 * Duolingo-style lessons with:
 * - Vocabulary questions with images
 * - Listening exercises with audio
 * - Word bank (sentence building) questions
 * - Translation exercises
 * - Multiple choice questions
 * - Each word taught with images and examples
 */

export const DUOLINGO_STYLE_LESSONS: Lesson[] = [
  // LESSON 1: Basic Greetings (Duolingo Style)
  {
    id: 'duo-lesson-1',
    title: 'Hello & Goodbye',
    titleUz: 'Salom va Xayr',
    description: 'Learn basic greetings in English',
    descriptionUz: 'Oddiy salomlashishni o\'rganamiz',
    level: 1,
    requiredXP: 0,
    xpReward: 50,
    category: 'greetings',
    isLocked: false,
    questions: [
      // 1. Teach "Hello" with image
      {
        id: 'duo-1-q1',
        type: 'vocabulary',
        prompt: 'Hello',
        promptUz: '"Hello" - salom degani. Bu eng keng tarqalgan salomlashuv so\'zi.',
        correctAnswer: 'Hello',
        word: 'Hello',
        translation: 'Salom',
        audio: 'words/hello.wav',
        audioSlow: 'words-slow/hello.wav',
        audioText: 'Hello',
        image: 'wave',
        isNewWord: true,
        pronunciation: '/həˈloʊ/',
        examples: [
          { en: 'Hello! How are you?', uz: 'Salom! Yaxshimisiz?' },
          { en: 'Hello, nice to meet you.', uz: 'Salom, tanishganimdan xursandman.' }
        ],
        explanation: 'A common greeting used at any time of day',
        explanationUz: 'Kunning istalgan vaqtida ishlatiladigan oddiy salomlashuv',
      },
      // 2. Speaking: "Hello"
      {
        id: 'duo-1-q2',
        type: 'speaking',
        prompt: 'Repeat: Hello',
        promptUz: 'Aytib ko\'ring: Hello',
        correctAnswer: 'Hello',
        audio: 'words/hello.wav',
        audioSlow: 'words-slow/hello.wav',
        audioText: 'Hello',
        targetPhrase: 'Hello',
      },
      // 3. Listening: "Hello" — 2 variant (see/say style)
      {
        id: 'duo-1-q3',
        type: 'listening',
        prompt: 'What did you hear?',
        promptUz: 'Nima eshitdingiz?',
        correctAnswer: 'Hello',
        audio: 'words/hello.wav',
        audioSlow: 'words-slow/hello.wav',
        audioText: 'Hello',
        options: ['Hello', 'Help'],
      },
      // 4. Translation
      {
        id: 'duo-1-q4',
        type: 'translation',
        prompt: 'How do you say "Salom" in English?',
        promptUz: '"Salom" ni inglizcha qanday aytamiz?',
        correctAnswer: 'Hello',
        options: ['Hello', 'Goodbye', 'Thanks', 'Please'],
      },
      // 5. Teach "Goodbye" with image
      {
        id: 'duo-1-q5',
        type: 'vocabulary',
        prompt: 'Goodbye',
        promptUz: '"Goodbye" - xayr degani. Kimdir ketayotganda aytiladi.',
        correctAnswer: 'Goodbye',
        word: 'Goodbye',
        translation: 'Xayr',
        audio: 'words/goodbye.wav',
        audioSlow: 'words-slow/goodbye.wav',
        audioText: 'Goodbye',
        image: 'wave',
        isNewWord: true,
        pronunciation: '/ɡʊdˈbaɪ/',
        examples: [
          { en: 'Goodbye! See you tomorrow.', uz: 'Xayr! Ertaga ko\'rishguncha.' },
          { en: 'Goodbye, have a nice day!', uz: 'Xayr, yaxshi kun!' }
        ],
      },
      // 6. Speaking: "Goodbye"
      {
        id: 'duo-1-q6',
        type: 'speaking',
        prompt: 'Repeat: Goodbye',
        promptUz: 'Aytib ko\'ring: Goodbye',
        correctAnswer: 'Goodbye',
        audio: 'words/goodbye.wav',
        audioSlow: 'words-slow/goodbye.wav',
        audioText: 'Goodbye',
        targetPhrase: 'Goodbye',
      },
      // 7. Multiple Choice
      {
        id: 'duo-1-q7',
        type: 'multiple_choice',
        prompt: 'How do you say "Xayr" in English?',
        promptUz: '"Xayr" ni inglizcha qanday aytamiz?',
        correctAnswer: 'Goodbye',
        options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
      },
      // Word Bank - o'chirildi! Faqat 2 ta so'z bor, gap tuzish uchun kam
    ],
  },

  // LESSON 2: Basic Politeness
  {
    id: 'duo-lesson-2',
    title: 'Please & Thank You',
    titleUz: 'Iltimos va Rahmat',
    description: 'Learn polite expressions',
    descriptionUz: 'Iltimosli so\'zlarni o\'rganamiz',
    level: 2,
    requiredXP: 50,
    xpReward: 50,
    category: 'greetings',
    isLocked: true,
    questions: [
      // 1. Teach "Please" with image
      {
        id: 'duo-2-q1',
        type: 'vocabulary',
        prompt: 'Please',
        promptUz: '"Please" - iltimos degani. Nimadir so\'raganda yoki xohlaganda ishlatiladi.',
        correctAnswer: 'Please',
        word: 'Please',
        translation: 'Iltimos',
        audio: 'words/please.wav',
        audioSlow: 'words-slow/please.wav',
        audioText: 'Please',
        image: 'pray',
        isNewWord: true,
        pronunciation: '/pliːz/',
        examples: [
          { en: 'Can you help me, please?', uz: 'Menga yordam bera olasizmi, iltimos?' },
          { en: 'Water, please.', uz: 'Suv, iltimos.' }
        ],
      },
      // 2. Speaking: "Please"
      {
        id: 'duo-2-q2',
        type: 'speaking',
        prompt: 'Repeat: Please',
        promptUz: 'Aytib ko\'ring: Please',
        correctAnswer: 'Please',
        audio: 'words/please.wav',
        audioSlow: 'words-slow/please.wav',
        audioText: 'Please',
        targetPhrase: 'Please',
      },
      // 3. Listening: "Please"
      {
        id: 'duo-2-q3',
        type: 'listening',
        prompt: 'What did you hear?',
        promptUz: 'Nima eshitdingiz?',
        correctAnswer: 'Please',
        audio: 'words/please.wav',
        audioSlow: 'words-slow/please.wav',
        audioText: 'Please',
        options: ['Please', 'Place', 'Peace', 'Piece'],
      },
      // 4. Teach "Thank you" with image
      {
        id: 'duo-2-q4',
        type: 'vocabulary',
        prompt: 'Thank you',
        promptUz: '"Thank you" - rahmat degani. Minnatdorchilik bildirish uchun.',
        correctAnswer: 'Thank you',
        word: 'Thank you',
        translation: 'Rahmat',
        audio: 'phrases/thank_you.wav',
        audioSlow: 'phrases-slow/thank_you.wav',
        audioText: 'Thank you',
        image: 'heart',
        isNewWord: true,
        pronunciation: '/θæŋk juː/',
        examples: [
          { en: 'Thank you very much!', uz: 'Katta rahmat!' },
          { en: 'Thank you for your help.', uz: 'Yordamingiz uchun rahmat.' }
        ],
      },
      // 5. Speaking: "Thank you"
      {
        id: 'duo-2-q5',
        type: 'speaking',
        prompt: 'Repeat: Thank you',
        promptUz: 'Aytib ko\'ring: Thank you',
        correctAnswer: 'Thank you',
        audio: 'phrases/thank_you.wav',
        audioSlow: 'phrases-slow/thank_you.wav',
        audioText: 'Thank you',
        targetPhrase: 'Thank you',
      },
      // 6. Translation
      {
        id: 'duo-2-q6',
        type: 'translation',
        prompt: 'Translate: Rahmat',
        promptUz: 'Ingliz tiliga tarjima qiling: Rahmat',
        correctAnswer: 'Thank you',
        options: ['Thank you', 'Please', 'Sorry', 'Hello'],
      },
      // 7. Word Bank - Endi yetarli so'zlar bor! (Hello, Goodbye, Please, Thank you)
      {
        id: 'duo-2-q7',
        type: 'word_bank',
        prompt: 'Build this sentence:',
        promptUz: 'Jumla tuzing: Xushmuomalalik so\'zlari',
        correctAnswer: 'Please Thank you',
        wordBank: ['Please', 'Thank you', 'Hello', 'Goodbye'],  // ✅ 4 ta so'z - yetarli!
        hintsUz: ['Iltimos bilan boshlanadi'],
      },
      // 8. Multiple Choice
      {
        id: 'duo-2-q8',
        type: 'multiple_choice',
        prompt: 'What do you say when someone helps you?',
        promptUz: 'Kimdir sizga yordam berganda nima deysiz?',
        correctAnswer: 'Thank you',
        options: ['Please', 'Thank you', 'Sorry', 'Goodbye'],
      },
    ],
  },

  // LESSON 3: Common Foods
  {
    id: 'duo-lesson-3',
    title: 'Food & Drinks',
    titleUz: 'Ovqat va ichimliklar',
    description: 'Learn food and drink names',
    descriptionUz: 'Ovqat va ichimlik nomlarini o\'rganamiz',
    level: 3,
    requiredXP: 100,
    xpReward: 60,
    category: 'food',
    isLocked: true,
    questions: [
      // 1. Teach "Water" with image
      {
        id: 'duo-3-q1',
        type: 'vocabulary',
        prompt: 'Water',
        promptUz: '"Water" - suv. Eng muhim ichimlik.',
        correctAnswer: 'Water',
        word: 'Water',
        translation: 'Suv',
        audio: 'words/water.wav',
        audioSlow: 'words-slow/water.wav',
        audioText: 'Water',
        image: 'drop',
        isNewWord: true,
        pronunciation: '/ˈwɔːtər/',
        examples: [
          { en: 'I drink water every day.', uz: 'Men har kuni suv ichaman.' },
          { en: 'Can I have some water?', uz: 'Menga suv bera olasizmi?' }
        ],
      },
      // 2. Speaking: "Water"
      {
        id: 'duo-3-q2',
        type: 'speaking',
        prompt: 'Repeat: Water',
        promptUz: 'Aytib ko\'ring: Water',
        correctAnswer: 'Water',
        audio: 'words/water.wav',
        audioSlow: 'words-slow/water.wav',
        audioText: 'Water',
        targetPhrase: 'Water',
      },
      // 3. Listening: "Water"
      {
        id: 'duo-3-q3',
        type: 'listening',
        prompt: 'What did you hear?',
        promptUz: 'Nima eshitdingiz?',
        correctAnswer: 'Water',
        audio: 'words/water.wav',
        audioSlow: 'words-slow/water.wav',
        audioText: 'Water',
        options: ['Water', 'Winter', 'Weather', 'Waiter'],
      },
      // 4. Teach "Milk" with image
      {
        id: 'duo-3-q4',
        type: 'vocabulary',
        prompt: 'Milk',
        promptUz: '"Milk" - sut. Hayvonlardan olinadi.',
        correctAnswer: 'Milk',
        word: 'Milk',
        translation: 'Sut',
        audio: 'words/milk.wav',
        audioSlow: 'words-slow/milk.wav',
        audioText: 'Milk',
        image: 'milk',
        isNewWord: true,
        pronunciation: '/mɪlk/',
        examples: [
          { en: 'I like milk with coffee.', uz: 'Men qahva bilan sut yoqtiraman.' },
          { en: 'Fresh milk is healthy.', uz: 'Yangi sut foydali.' }
        ],
      },
      // 5. Speaking: "Milk"
      {
        id: 'duo-3-q5',
        type: 'speaking',
        prompt: 'Repeat: Milk',
        promptUz: 'Aytib ko\'ring: Milk',
        correctAnswer: 'Milk',
        audio: 'words/milk.wav',
        audioSlow: 'words-slow/milk.wav',
        audioText: 'Milk',
        targetPhrase: 'Milk',
      },
      // 6. Multiple Choice
      {
        id: 'duo-3-q6',
        type: 'multiple_choice',
        prompt: 'Choose the correct translation for "Sut":',
        promptUz: '"Sut" ni to\'g\'ri tarjimasini tanlang:',
        correctAnswer: 'Milk',
        options: ['Water', 'Milk', 'Coffee', 'Tea'],
      },
      // 7. Teach "Bread" with image
      {
        id: 'duo-3-q7',
        type: 'vocabulary',
        prompt: 'Bread',
        promptUz: '"Bread" - non. Asosiy oziq-ovqat mahsuloti.',
        correctAnswer: 'Bread',
        word: 'Bread',
        translation: 'Non',
        audio: 'words/bread.wav',
        audioSlow: 'words-slow/bread.wav',
        audioText: 'Bread',
        image: 'bread',
        isNewWord: true,
        pronunciation: '/bred/',
        examples: [
          { en: 'I eat bread for breakfast.', uz: 'Men nonushtaga non yeyaman.' },
          { en: 'Fresh bread smells good.', uz: 'Yangi non yoqimli hid tarqatadi.' }
        ],
      },
      // 8. Speaking: "Bread"
      {
        id: 'duo-3-q8',
        type: 'speaking',
        prompt: 'Repeat: Bread',
        promptUz: 'Aytib ko\'ring: Bread',
        correctAnswer: 'Bread',
        audio: 'words/bread.wav',
        audioSlow: 'words-slow/bread.wav',
        audioText: 'Bread',
        targetPhrase: 'Bread',
      },
      // 9. Word Bank (FAQAT o'rgatilgan so'zlardan!)
      {
        id: 'duo-3-q9',
        type: 'word_bank',
        prompt: 'Build this sentence:',
        promptUz: 'Jumla tuzing: O\'rgatilgan so\'zlardan',
        correctAnswer: 'Water Milk Bread',
        wordBank: ['Water', 'Milk', 'Bread', 'Please'],  // ✅ Faqat o'rgatilgan so'zlar
        hintsUz: ['Water bilan boshlanadi'],
      },
      // 10. Listening: "Milk"
      {
        id: 'duo-3-q10',
        type: 'listening',
        prompt: 'What did you hear?',
        promptUz: 'Nima eshitdingiz?',
        correctAnswer: 'Milk',
        audio: 'words/milk.wav',
        audioSlow: 'words-slow/milk.wav',
        audioText: 'Milk',
        options: ['Milk', 'Melt', 'Mill', 'Meat'],
      },
      // 11. Translation
      {
        id: 'duo-3-q11',
        type: 'translation',
        prompt: 'Translate: Non',
        promptUz: 'Ingliz tiliga tarjima qiling: Non',
        correctAnswer: 'Bread',
        options: ['Bread', 'Water', 'Milk', 'Coffee'],
      },
      // 12. Word Bank - Endi yetarli ovqat so'zlari bor!
      {
        id: 'duo-3-q12',
        type: 'word_bank',
        prompt: 'Build this sentence:',
        promptUz: 'Jumla tuzing: Ovqat so\'zlari',
        correctAnswer: 'Water Milk Bread',
        wordBank: ['Water', 'Milk', 'Bread', 'Please'],  // ✅ 4 ta so'z
        hintsUz: ['Ichimlikdan boshlang'],
      },
    ],
  },

  // LESSON 4: Family Members
  {
    id: 'duo-lesson-4',
    title: 'Family',
    titleUz: 'Oila',
    description: 'Learn family member names',
    descriptionUz: 'Oila a\'zolarining nomlarini o\'rganamiz',
    level: 4,
    requiredXP: 160,
    xpReward: 60,
    category: 'family',
    isLocked: true,
    questions: [
      // 1. Teach "Mother" with image
      {
        id: 'duo-4-q1',
        type: 'vocabulary',
        prompt: 'Mother',
        promptUz: '"Mother" - ona. Qisqartmasi "Mom" - onajon.',
        correctAnswer: 'Mother',
        word: 'Mother',
        translation: 'Ona',
        image: 'woman',
        isNewWord: true,
        pronunciation: '/ˈmʌðər/',
        examples: [
          { en: 'My mother is kind.', uz: 'Mening onam mehribon.' },
          { en: 'I love my mother.', uz: 'Men onamni yaxshi ko\'raman.' }
        ],
      },
      // 2. Speaking: "Mother"
      {
        id: 'duo-4-q2',
        type: 'speaking',
        prompt: 'Repeat: Mother',
        promptUz: 'Aytib ko\'ring: Mother',
        correctAnswer: 'Mother',
        audio: 'words/mother.wav',
        audioText: 'Mother',
        targetPhrase: 'Mother',
      },
      // 3. Listening: "Mother"
      {
        id: 'duo-4-q3',
        type: 'listening',
        prompt: 'What did you hear?',
        promptUz: 'Nima eshitdingiz?',
        correctAnswer: 'Mother',
        audioText: 'Mother',
        audio: 'words/mother.wav',
        options: ['Mother', 'Father', 'Brother', 'Sister'],
      },
      // 4. Teach "Father" with image
      {
        id: 'duo-4-q4',
        type: 'vocabulary',
        prompt: 'Father',
        promptUz: '"Father" - ota. Qisqartmasi "Dad" - dadajon.',
        correctAnswer: 'Father',
        word: 'Father',
        translation: 'Ota',
        image: 'man',
        isNewWord: true,
        pronunciation: '/ˈfɑːðər/',
        examples: [
          { en: 'My father works hard.', uz: 'Mening otam qattiq ishlaydi.' },
          { en: 'I respect my father.', uz: 'Men otamni hurmat qilaman.' }
        ],
      },
      // 5. Speaking: "Father"
      {
        id: 'duo-4-q5',
        type: 'speaking',
        prompt: 'Repeat: Father',
        promptUz: 'Aytib ko\'ring: Father',
        correctAnswer: 'Father',
        audio: 'words/father.wav',
        audioText: 'Father',
        targetPhrase: 'Father',
      },
      // 6. Translation
      {
        id: 'duo-4-q6',
        type: 'translation',
        prompt: 'Translate: Ota',
        promptUz: 'Ingliz tiliga tarjima qiling: Ota',
        correctAnswer: 'Father',
        options: ['Mother', 'Father', 'Brother', 'Sister'],
      },
      // 7. Teach "Brother" with image
      {
        id: 'duo-4-q7',
        type: 'vocabulary',
        prompt: 'Brother',
        promptUz: '"Brother" - aka yoki uka degani.',
        correctAnswer: 'Brother',
        word: 'Brother',
        translation: 'Aka/Uka',
        image: 'boy',
        isNewWord: true,
        pronunciation: '/ˈbrʌðər/',
        examples: [
          { en: 'I have one brother.', uz: 'Mening bitta akam bor.' },
          { en: 'My brother is tall.', uz: 'Mening akam baland.' }
        ],
      },
      // 8. Speaking: "Brother"
      {
        id: 'duo-4-q8',
        type: 'speaking',
        prompt: 'Repeat: Brother',
        promptUz: 'Aytib ko\'ring: Brother',
        correctAnswer: 'Brother',
        audio: 'words/brother.wav',
        audioText: 'Brother',
        targetPhrase: 'Brother',
      },
      // 9. Teach "Sister" with image
      {
        id: 'duo-4-q9',
        type: 'vocabulary',
        prompt: 'Sister',
        promptUz: '"Sister" - opa yoki singil degani.',
        correctAnswer: 'Sister',
        word: 'Sister',
        translation: 'Opa/Singil',
        image: 'girl',
        isNewWord: true,
        pronunciation: '/ˈsɪstər/',
        examples: [
          { en: 'I have two sisters.', uz: 'Mening ikki singlim bor.' },
          { en: 'My sister is beautiful.', uz: 'Mening singlim chiroyli.' }
        ],
      },
      // 10. Speaking: "Sister"
      {
        id: 'duo-4-q10',
        type: 'speaking',
        prompt: 'Repeat: Sister',
        promptUz: 'Aytib ko\'ring: Sister',
        correctAnswer: 'Sister',
        audio: 'words/sister.wav',
        audioText: 'Sister',
        targetPhrase: 'Sister',
      },
      // 11. Word Bank
      {
        id: 'duo-4-q11',
        type: 'word_bank',
        prompt: 'Build this sentence:',
        promptUz: 'Jumla tuzing: "Men onamni yaxshi ko\'raman"',
        correctAnswer: 'I love my mother',
        audioText: 'I love my mother',
        wordBank: ['I', 'love', 'my', 'mother', 'father', 'sister', 'brother'],
        hintsUz: ['I love bilan boshlanadi'],
      },
      // 12. Multiple Choice
      {
        id: 'duo-4-q12',
        type: 'multiple_choice',
        prompt: 'Who is your parent\'s daughter?',
        promptUz: 'Ota-onangizning qizi kim bo\'ladi?',
        correctAnswer: 'Sister',
        options: ['Mother', 'Father', 'Brother', 'Sister'],
      },
    ],
  },

  // LESSON 5: Numbers 1-10
  {
    id: 'duo-lesson-5',
    title: 'Numbers 1-10',
    titleUz: 'Raqamlar 1-10',
    description: 'Learn to count from 1 to 10',
    descriptionUz: '1 dan 10 gacha sanashni o\'rganamiz',
    level: 5,
    requiredXP: 220,
    xpReward: 60,
    category: 'numbers',
    isLocked: true,
    questions: [
      // 1. Teach "One" with image
      {
        id: 'duo-5-q1',
        type: 'vocabulary',
        prompt: 'One',
        promptUz: '"One" - bir raqami.',
        correctAnswer: 'One',
        word: 'One',
        translation: 'Bir',
        image: 'number1',
        isNewWord: true,
        pronunciation: '/wʌn/',
        examples: [
          { en: 'I have one apple.', uz: 'Menda bitta olma bor.' },
          { en: 'One plus one equals two.', uz: 'Bir qo\'shish bir ikki.' }
        ],
      },
      // 2. Speaking: "One"
      {
        id: 'duo-5-q2',
        type: 'speaking',
        prompt: 'Repeat: One',
        promptUz: 'Aytib ko\'ring: One',
        correctAnswer: 'One',
        audio: 'words/one.wav',
        audioText: 'One',
        targetPhrase: 'One',
      },
      // 3. Listening: "One"
      {
        id: 'duo-5-q3',
        type: 'listening',
        prompt: 'What number did you hear?',
        promptUz: 'Qaysi raqamni eshitdingiz?',
        correctAnswer: 'One',
        audioText: 'One',
        audio: 'audio/one.mp3',
        options: ['One', 'Two', 'Three', 'Four'],
      },
      // 4. Teach "Two" with image
      {
        id: 'duo-5-q4',
        type: 'vocabulary',
        prompt: 'Two',
        promptUz: '"Two" - ikki raqami.',
        correctAnswer: 'Two',
        word: 'Two',
        translation: 'Ikki',
        image: 'number1',
        isNewWord: true,
        pronunciation: '/tuː/',
        examples: [
          { en: 'I have two eyes.', uz: 'Mening ikki ko\'zim bor.' },
          { en: 'Two plus two equals four.', uz: 'Ikki qo\'shish ikki to\'rt.' }
        ],
      },
      // 5. Speaking: "Two"
      {
        id: 'duo-5-q5',
        type: 'speaking',
        prompt: 'Repeat: Two',
        promptUz: 'Aytib ko\'ring: Two',
        correctAnswer: 'Two',
        audio: 'words/two.wav',
        audioText: 'Two',
        targetPhrase: 'Two',
      },
      // 6. Teach "Three" with image
      {
        id: 'duo-5-q6',
        type: 'vocabulary',
        prompt: 'Three',
        promptUz: '"Three" - uch raqami.',
        correctAnswer: 'Three',
        word: 'Three',
        translation: 'Uch',
        image: 'number1',
        isNewWord: true,
        pronunciation: '/θriː/',
        examples: [
          { en: 'I have three books.', uz: 'Mening uchta kitobim bor.' },
          { en: 'Three is my lucky number.', uz: 'Uch mening baxtli raqamim.' }
        ],
      },
      // 7. Speaking: "Three"
      {
        id: 'duo-5-q7',
        type: 'speaking',
        prompt: 'Repeat: Three',
        promptUz: 'Aytib ko\'ring: Three',
        correctAnswer: 'Three',
        audio: 'words/three.wav',
        audioText: 'Three',
        targetPhrase: 'Three',
      },
      // 8. Multiple Choice
      {
        id: 'duo-5-q8',
        type: 'multiple_choice',
        prompt: 'What comes after two?',
        promptUz: 'Ikkidan keyin nima keladi?',
        correctAnswer: 'Three',
        options: ['One', 'Two', 'Three', 'Four'],
      },
      // 9. Word Bank
      {
        id: 'duo-5-q9',
        type: 'word_bank',
        prompt: 'Build this sequence:',
        promptUz: 'Ketma-ketlikni tuzing: "Bir, ikki, uch"',
        correctAnswer: 'One Two Three',
        wordBank: ['One', 'Two', 'Three', 'Four', 'Five'],
        hintsUz: ['One bilan boshlanadi'],
      },
      // 10. Translation
      {
        id: 'duo-5-q10',
        type: 'translation',
        prompt: 'Translate: Ikki',
        promptUz: 'Ingliz tiliga tarjima qiling: Ikki',
        correctAnswer: 'Two',
        options: ['One', 'Two', 'Three', 'Four'],
      },
    ],
  },
];

// Helper to get Duolingo-style lessons
export const getDuolingoStyleLessons = (): Lesson[] => {
  return DUOLINGO_STYLE_LESSONS;
};

// Helper to get lesson by ID
export const getDuolingoLessonById = (id: string): Lesson | undefined => {
  return DUOLINGO_STYLE_LESSONS.find(lesson => lesson.id === id);
};
