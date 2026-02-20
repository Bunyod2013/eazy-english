import { create } from 'zustand';
import { Lesson, LessonSession, QuestionAnswer } from '@/types';
import { allLessons } from '@/data/lessons/generateLessons';
import { COMPREHENSIVE_LESSONS } from '@/data/lessons/comprehensiveLessons';
import { DUOLINGO_STYLE_LESSONS } from '@/data/lessons/duolingoStyleLessons';
import { LESSONS_500_PLUS } from '@/data/lessons/generate500Lessons';

// Lesson mode selection
// '500plus' - 500+ Progressive lessons (RECOMMENDED!) ✅
// 'duolingo' - Duolingo-style lessons with vocabulary, listening, word bank
// 'comprehensive' - 500+ vocabulary-integrated lessons
// 'basic' - Original basic lessons
const LESSON_MODE: '500plus' | 'duolingo' | 'comprehensive' | 'basic' = '500plus'; // ✅ 500+ darslar!

interface LessonState {
  lessons: Lesson[];
  currentSession: LessonSession | null;
  
  // Actions
  loadLessons: () => void;
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
  
  loadLessons: () => {
    let lessonsToUse: Lesson[] = allLessons;
    
    if (LESSON_MODE === '500plus') {
      lessonsToUse = LESSONS_500_PLUS; // ✅ 500+ darslar!
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
