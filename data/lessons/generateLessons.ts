import { Lesson, LessonCategory, Question } from '@/types';

/**
 * Generate 300 lessons across 30 levels (10 lessons per level)
 * Duolingo-style progression with increasing difficulty
 */

const categories: LessonCategory[] = [
  'alphabet', 'greetings', 'numbers', 'colors', 'family',
  'food', 'animals', 'daily_life', 'school', 'travel',
  'work', 'grammar', 'vocabulary'
];

const levelThemes = [
  // Levels 1-5: Absolute Basics
  { level: 1, theme: 'Alphabet & Sounds', category: 'alphabet', baseXP: 0 },
  { level: 2, theme: 'Basic Greetings', category: 'greetings', baseXP: 500 },
  { level: 3, theme: 'Numbers 1-20', category: 'numbers', baseXP: 1000 },
  { level: 4, theme: 'Colors & Shapes', category: 'colors', baseXP: 1500 },
  { level: 5, theme: 'Family Members', category: 'family', baseXP: 2000 },
  
  // Levels 6-10: Basic Vocabulary
  { level: 6, theme: 'Food & Drinks', category: 'food', baseXP: 2500 },
  { level: 7, theme: 'Animals & Pets', category: 'animals', baseXP: 3000 },
  { level: 8, theme: 'Daily Routines', category: 'daily_life', baseXP: 3500 },
  { level: 9, theme: 'School & Education', category: 'school', baseXP: 4000 },
  { level: 10, theme: 'Body Parts', category: 'vocabulary', baseXP: 4500 },
  
  // Levels 11-15: Intermediate Vocabulary
  { level: 11, theme: 'House & Home', category: 'vocabulary', baseXP: 5000 },
  { level: 12, theme: 'Clothing & Accessories', category: 'vocabulary', baseXP: 5500 },
  { level: 13, theme: 'Weather & Seasons', category: 'vocabulary', baseXP: 6000 },
  { level: 14, theme: 'Time & Calendar', category: 'vocabulary', baseXP: 6500 },
  { level: 15, theme: 'Transportation', category: 'travel', baseXP: 7000 },
  
  // Levels 16-20: Grammar Basics
  { level: 16, theme: 'Present Simple Tense', category: 'grammar', baseXP: 7500 },
  { level: 17, theme: 'Questions & Answers', category: 'grammar', baseXP: 8000 },
  { level: 18, theme: 'Plurals & Articles', category: 'grammar', baseXP: 8500 },
  { level: 19, theme: 'Possessive Forms', category: 'grammar', baseXP: 9000 },
  { level: 20, theme: 'Prepositions of Place', category: 'grammar', baseXP: 9500 },
  
  // Levels 21-25: Work & Professional
  { level: 21, theme: 'Jobs & Professions', category: 'work', baseXP: 10000 },
  { level: 22, theme: 'Office & Workplace', category: 'work', baseXP: 10500 },
  { level: 23, theme: 'Money & Shopping', category: 'vocabulary', baseXP: 11000 },
  { level: 24, theme: 'Restaurant & Dining', category: 'food', baseXP: 11500 },
  { level: 25, theme: 'Travel & Tourism', category: 'travel', baseXP: 12000 },
  
  // Levels 26-30: Advanced Topics
  { level: 26, theme: 'Health & Medicine', category: 'vocabulary', baseXP: 12500 },
  { level: 27, theme: 'Sports & Hobbies', category: 'vocabulary', baseXP: 13000 },
  { level: 28, theme: 'Technology & Internet', category: 'vocabulary', baseXP: 13500 },
  { level: 29, theme: 'Environment & Nature', category: 'vocabulary', baseXP: 14000 },
  { level: 30, theme: 'Culture & Traditions', category: 'vocabulary', baseXP: 14500 },
];

const vocabularyTopics = {
  alphabet: ['A-E', 'F-J', 'K-O', 'P-T', 'U-Z', 'Vowels', 'Consonants', 'Pronunciation', 'Letter Sounds', 'Practice'],
  greetings: ['Hello/Hi', 'Good morning', 'Good night', 'How are you', 'Thank you', 'Please', 'Excuse me', 'Goodbye', 'Nice to meet you', 'See you later'],
  numbers: ['1-5', '6-10', '11-15', '16-20', 'Tens', 'Hundreds', 'Phone numbers', 'Ages', 'Counting', 'Ordinal numbers'],
  colors: ['Basic colors', 'Light/Dark', 'Rainbow colors', 'Mix colors', 'Favorite color', 'Color objects', 'Shades', 'Describing', 'Color quiz', 'Review'],
  family: ['Parents', 'Siblings', 'Grandparents', 'Relatives', 'Family tree', 'Describing family', 'Ages', 'Occupations', 'Relationships', 'Family activities'],
  food: ['Fruits', 'Vegetables', 'Drinks', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Cooking', 'Restaurant'],
  animals: ['Pets', 'Farm animals', 'Wild animals', 'Birds', 'Sea animals', 'Insects', 'Sounds', 'Habitats', 'Baby animals', 'Animal actions'],
  daily_life: ['Wake up', 'Morning routine', 'Hygiene', 'Meals', 'Work/Study', 'Evening', 'Sleep', 'Weekend', 'Hobbies', 'Free time'],
  school: ['Classroom', 'Subjects', 'Teachers', 'Students', 'Homework', 'Exams', 'Schedule', 'Supplies', 'Activities', 'Grades'],
  travel: ['Airport', 'Hotel', 'Directions', 'Transportation', 'Tourist sites', 'Tickets', 'Luggage', 'Customs', 'Maps', 'Countries'],
  work: ['Office', 'Job titles', 'Meetings', 'Email', 'Phone calls', 'Colleagues', 'Boss', 'Salary', 'Schedule', 'Tasks'],
  grammar: ['To be', 'To have', 'Action verbs', 'Negatives', 'Questions', 'Tenses', 'Articles', 'Plurals', 'Pronouns', 'Adjectives'],
  vocabulary: ['Common words', 'Phrasal verbs', 'Idioms', 'Expressions', 'Synonyms', 'Antonyms', 'Word families', 'Collocations', 'Advanced', 'Review'],
};

// Generate sample questions for a lesson
const generateQuestions = (
  level: number,
  topic: string,
  category: LessonCategory
): Question[] => {
  const difficulty = Math.min(level, 30);
  const questionCount = 3 + Math.floor(difficulty / 5); // 3-9 questions per lesson

  const questions: Question[] = [];
  
  for (let i = 0; i < questionCount; i++) {
    const types: Question['type'][] = ['vocabulary', 'multiple_choice', 'translation', 'fill_blank'];
    const type = types[i % types.length];

    questions.push({
      id: `q-${level}-${i}`,
      type,
      prompt: `${topic} - Question ${i + 1}`,
      promptUz: `${topic} - ${i + 1}-savol`,
      correctAnswer: 'sample answer',
      options: type === 'multiple_choice' ? ['Option A', 'Option B', 'Option C', 'Option D'] : undefined,
      hints: [`Bu ${topic} mavzusiga oid savol`],
      hintsUz: [`This is a question about ${topic}`],
    });
  }

  return questions;
};

// Generate all 300 lessons
export const generate300Lessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  let lessonCounter = 1;

  levelThemes.forEach((levelTheme) => {
    const topics = vocabularyTopics[levelTheme.category as keyof typeof vocabularyTopics] || 
                   vocabularyTopics.vocabulary;

    topics.forEach((topic, topicIndex) => {
      const lessonNumber = lessonCounter++;
      const xpReward = 50 + Math.floor(levelTheme.level / 5) * 10; // 50-110 XP

      lessons.push({
        id: `lesson-${lessonNumber}`,
        title: `${levelTheme.theme}: ${topic}`,
        titleUz: `${levelTheme.theme}: ${topic}`,
        description: `Learn about ${topic}`,
        descriptionUz: `${topic} haqida o'rganish`,
        level: lessonNumber,
        requiredXP: levelTheme.baseXP + (topicIndex * 50),
        xpReward,
        category: levelTheme.category,
        isLocked: levelTheme.baseXP > 0,
        questions: generateQuestions(levelTheme.level, topic, levelTheme.category),
      });
    });
  });

  return lessons;
};

// Export generated lessons
export const allLessons = generate300Lessons();

// Get lessons by level range
export const getLessonsByLevel = (level: number): Lesson[] => {
  const startIndex = (level - 1) * 10;
  const endIndex = startIndex + 10;
  return allLessons.slice(startIndex, endIndex);
};

// Get all levels
export const getTotalLevels = (): number => {
  return 30;
};

// Get level info
export const getLevelInfo = (level: number) => {
  return levelThemes.find(lt => lt.level === level) || levelThemes[0];
};
