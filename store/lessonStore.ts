import { create } from 'zustand';
import { Lesson, LessonSession, QuestionAnswer, LearningPurpose, SkillLevel } from '@/types';
import { allLessons } from '@/data/lessons/generateLessons';
import { COMPREHENSIVE_LESSONS } from '@/data/lessons/comprehensiveLessons';
import { DUOLINGO_STYLE_LESSONS } from '@/data/lessons/duolingoStyleLessons';
import { LESSONS_500_PLUS } from '@/data/lessons/generate500Lessons';
import { generatePurposeLessons } from '@/data/lessons/generatePurposeLessons';

// Lesson mode selection
// 'purpose' - Purpose-based personalized lessons (NEW DEFAULT!) ✅
// '500plus' - 500+ Progressive lessons (fallback)
// 'duolingo' - Duolingo-style lessons with vocabulary, listening, word bank
// 'comprehensive' - 500+ vocabulary-integrated lessons
// 'basic' - Original basic lessons
const LESSON_MODE: 'purpose' | '500plus' | 'duolingo' | 'comprehensive' | 'basic' = 'purpose'; // ✅ Maqsadli darslar!

interface LessonState {
  lessons: Lesson[];
  currentSession: LessonSession | null;
  
  // Actions
  loadLessons: (purposes?: LearningPurpose[], skillLevel?: SkillLevel, language?: 'uz' | 'en') => void;
  getLessonById: (id: string) => Lesson | undefined;
  startLesson: (lessonId: string) => void;
  answerQuestion: (answer: QuestionAnswer) => void;
  completeSession: () => LessonSession | null;
  cancelSession: () => void;
  getUnlockedLessons: (totalXP: number) => Lesson[];
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lessons: [],
  currentSession: null,
  
  loadLessons: (purposes, skillLevel, language) => {
    let lessonsToUse: Lesson[] = allLessons;

    if (LESSON_MODE === 'purpose' && purposes && purposes.length > 0 && skillLevel) {
      lessonsToUse = generatePurposeLessons(purposes, skillLevel, language || 'uz');
    } else if (LESSON_MODE === '500plus' || (LESSON_MODE === 'purpose' && (!purposes || purposes.length === 0))) {
      lessonsToUse = LESSONS_500_PLUS; // Fallback
    } else if (LESSON_MODE === 'duolingo') {
      lessonsToUse = DUOLINGO_STYLE_LESSONS;
    } else if (LESSON_MODE === 'comprehensive') {
      lessonsToUse = COMPREHENSIVE_LESSONS;
    }

    set({ lessons: lessonsToUse });
  },
  
  getLessonById: (id) => {
    return get().lessons.find(lesson => lesson.id === id);
  },
  
  startLesson: (lessonId) => {
    const lesson = get().getLessonById(lessonId);
    if (!lesson) return;
    
    const session: LessonSession = {
      lessonId,
      currentQuestionIndex: 0,
      answers: [],
      startedAt: new Date().toISOString(),
      hearts: 5,
      xpEarned: 0,
    };
    
    set({ currentSession: session });
  },
  
  answerQuestion: (answer) => {
    const { currentSession } = get();
    if (!currentSession) return;
    
    const updatedSession: LessonSession = {
      ...currentSession,
      currentQuestionIndex: currentSession.currentQuestionIndex + 1,
      answers: [...currentSession.answers, answer],
      hearts: answer.isCorrect ? currentSession.hearts : currentSession.hearts - 1,
      xpEarned: answer.isCorrect ? currentSession.xpEarned + 10 : currentSession.xpEarned,
    };
    
    set({ currentSession: updatedSession });
  },
  
  completeSession: () => {
    const { currentSession } = get();
    if (!currentSession) return null;
    
    const completedSession = { ...currentSession };
    set({ currentSession: null });
    return completedSession;
  },
  
  cancelSession: () => {
    set({ currentSession: null });
  },
  
  getUnlockedLessons: (totalXP) => {
    return get().lessons.filter(lesson => lesson.requiredXP <= totalXP);
  },
}));
