import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckIcon, XIcon, SoundIcon, LightBulbIcon, CloseIcon, TargetIcon, StarIcon } from '@/components/icons';
import Svg, { Path } from 'react-native-svg';
import { useLessonStore } from '@/store/lessonStore';
import { useUserStore } from '@/store/userStore';
import { useProgressStore } from '@/store/progressStore';
import { useSettingsStore } from '@/store/settingsStore';
import { Question, QuestionAnswer } from '@/types';
import { calculateLessonXP, calculateLevelFromXP } from '@/utils/xp';
import { triggerSuccess, triggerError, triggerImpact } from '@/utils/haptics';
import { useTheme } from '@/utils/theme';
import { playCorrectSound } from '@/utils/audio';
import { LessonCompletionModal } from '@/components/shared/LessonCompletionModal';

// Question Components
import { VocabularyQuestion } from '@/features/lessons/VocabularyQuestion';
import { MultipleChoiceQuestion } from '@/features/lessons/MultipleChoiceQuestion';
import { TranslationQuestion } from '@/features/lessons/TranslationQuestion';
import { FillBlankQuestion } from '@/features/lessons/FillBlankQuestion';
import { WordBankQuestion } from '@/features/lessons/WordBankQuestion';
import { ListeningQuestion } from '@/features/lessons/ListeningQuestion';
import { ListeningDiscriminationQuestion } from '@/features/lessons/ListeningDiscriminationQuestion'; // ✅ NEW
import { ImageChoiceQuestion } from '@/features/lessons/ImageChoiceQuestion'; // ✅ NEW
import { SpeakingQuestion } from '@/features/lessons/SpeakingQuestion';
import { MatchingQuestion } from '@/features/lessons/MatchingQuestion';
import { TrueFalseQuestion } from '@/features/lessons/TrueFalseQuestion';
import { ConversationQuestion } from '@/features/lessons/ConversationQuestion';
import { FillBlankChoiceQuestion } from '@/features/lessons/FillBlankChoiceQuestion';

const CHARACTERS = [
  require('@/assets/characters/character5.png'), // Jake
  require('@/assets/characters/character1.png'), // Izzy
  require('@/assets/characters/character4.png'), // Cubby
  require('@/assets/characters/character5.png'), // Jake
  require('@/assets/characters/character3.png'), // Hook
];

export default function LessonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const lessonId = id as string;

  const { lessons, getLessonById, startLesson, currentSession, answerQuestion, completeSession } = useLessonStore();
  const { user, addXP } = useUserStore();
  const { completeLesson } = useProgressStore();
  const { settings } = useSettingsStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [showHint, setShowHint] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionData, setCompletionData] = useState<{
    xpEarned: number;
    correctAnswers: number;
    totalQuestions: number;
    isLevelUp: boolean;
    newLevel: number;
  } | null>(null);

  const { colors, isDark } = useTheme();
  const lesson = getLessonById(lessonId);

  useEffect(() => {
    if (lesson && !currentSession) {
      startLesson(lessonId);
      setStartTime(Date.now());
    }
  }, []);

  if (!lesson || !user) {
    return null;
  }

  // After lesson completes, session is null — show only the completion modal
  if (!currentSession) {
    if (showCompletion && completionData) {
      const currentIndex = lessons.findIndex(l => l.id === lessonId);
      const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1
        ? lessons[currentIndex + 1]
        : null;
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.primary }}>
          <LessonCompletionModal
            visible={showCompletion}
            onClose={() => router.replace('/(tabs)/home')}
            onNextLesson={nextLesson ? () => router.replace(`/lesson/${nextLesson.id}`) : undefined}
            xpEarned={completionData.xpEarned}
            correctAnswers={completionData.correctAnswers}
            totalQuestions={completionData.totalQuestions}
            lessonTitle={lesson.title}
            lessonTitleUz={lesson.titleUz}
            isLevelUp={completionData.isLevelUp}
            newLevel={completionData.newLevel}
            currentStreak={user.currentStreak}
          />
        </SafeAreaView>
      );
    }
    return null;
  }

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / lesson.questions.length) * 100;
  const promptText = settings.explanationLanguage === 'uz' ? currentQuestion.promptUz : currentQuestion.prompt;
  const bubbleWord = currentQuestion.word || currentQuestion.audioText || currentQuestion.targetPhrase || null;
  const bubbleText = bubbleWord || promptText;

  const checkAnswer = (answer: string) => {
    const correct = Array.isArray(currentQuestion.correctAnswer)
      ? currentQuestion.correctAnswer.some(a => a.toLowerCase() === answer.toLowerCase())
      : currentQuestion.correctAnswer.toLowerCase() === answer.toLowerCase();

    setIsCorrect(correct);
    setShowFeedback(true);

    if (settings.vibrationEnabled) {
      correct ? triggerSuccess() : triggerError();
    }
    if (settings.soundEnabled && correct) {
      playCorrectSound();
    }

    // Record answer
    const timeTaken = (Date.now() - startTime) / 1000;
    const questionAnswer: QuestionAnswer = {
      questionId: currentQuestion.id,
      userAnswer: answer,
      isCorrect: correct,
      timeTaken,
    };

    answerQuestion(questionAnswer);
  };

  const handleNext = () => {
    if (settings.soundEnabled && (currentQuestion.isNewWord || currentQuestion.type === 'vocabulary')) {
      playCorrectSound();
    }
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setStartTime(Date.now());
    } else {
      // Lesson complete
      finishLesson();
    }
  };

  const finishLesson = async () => {
    const session = completeSession();
    if (!session) {
      router.replace('/(tabs)/home');
      return;
    }

    // Calculate results
    const correctAnswers = session.answers.filter(a => a.isCorrect).length;
    const accuracy = (correctAnswers / session.answers.length) * 100;
    const totalTime = session.answers.reduce((sum, a) => sum + a.timeTaken, 0);
    
    const xpEarned = calculateLessonXP(lesson.xpReward, accuracy, totalTime);

    // Save progress
    await completeLesson({
      lessonId: lesson.id,
      completedAt: new Date().toISOString(),
      xpEarned,
      accuracy,
      timeTaken: totalTime,
    });

    // Detect level-up before adding XP
    const levelBefore = calculateLevelFromXP(user.totalXP);
    const levelAfter = calculateLevelFromXP(user.totalXP + xpEarned);
    const isLevelUp = levelAfter > levelBefore;

    // Add XP
    await addXP(xpEarned);

    // Show gamified completion modal
    setCompletionData({
      xpEarned,
      correctAnswers,
      totalQuestions: session.answers.length,
      isLevelUp,
      newLevel: levelAfter,
    });
    setShowCompletion(true);
  };

  const handleExit = () => {
    router.back();
  };

  const renderQuestion = () => {
    const prompt = settings.explanationLanguage === 'uz' ? currentQuestion.promptUz : currentQuestion.prompt;

    switch (currentQuestion.type) {
      case 'vocabulary':
        return (
          <VocabularyQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );
      
      case 'multiple_choice':
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );
      
      case 'translation':
        return (
          <TranslationQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );
      
      case 'fill_blank':
        return (
          <FillBlankQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );
      
      case 'word_bank':
        return (
          <WordBankQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );

      case 'listening_discrimination':
        return (
          <ListeningDiscriminationQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );

      case 'image_choice':
        return (
          <ImageChoiceQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );

      case 'speaking':
        return (
          <SpeakingQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );
      
      case 'listening':
        return (
          <ListeningQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );

      case 'matching':
        return (
          <MatchingQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );

      case 'true_false':
        return (
          <TrueFalseQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );

      case 'conversation':
        return (
          <ConversationQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );

      case 'fill_blank_choice':
        return (
          <FillBlankChoiceQuestion
            question={currentQuestion}
            prompt={prompt}
            onAnswer={checkAnswer}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
          />
        );

      default:
        return <Text>Question type not supported yet</Text>;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      {/* Top Bar - Gamified */}
      <View style={{ 
        paddingHorizontal: 16, 
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={handleExit}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.bg.card,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.border.primary,
            }}
          >
            <CloseIcon size={22} color={colors.text.secondary} />
          </TouchableOpacity>

          {/* Progress Bar */}
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <View style={{
              height: 12,
              backgroundColor: colors.border.primary,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
              <View style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: colors.green.primary,
                borderRadius: 10,
              }} />
            </View>
          </View>

          {/* Lives/Hearts */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fee2e2',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fecaca',
          }}>
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ef4444" />
            </Svg>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#dc2626', marginLeft: 6 }}>
              {currentSession.hearts}
            </Text>
          </View>
        </View>

        {/* Question Counter */}
        <Text style={{ fontSize: 12, color: colors.text.tertiary, textAlign: 'center', marginTop: 4 }}>
          Savol {currentQuestionIndex + 1} / {lesson.questions.length}
        </Text>
      </View>

      {/* Question Card - Gamified */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      >
        {/* Duolingo-style Character + Speech Bubble */}
        <View style={{ marginBottom: 16 }}>
          {/* Prompt instruction - only when there's a separate word in the bubble */}
          {bubbleWord && (
            <Text style={{
              fontSize: 22,
              fontWeight: '800',
              color: colors.text.primary,
              marginBottom: currentQuestion.isNewWord ? 4 : 12,
              lineHeight: 28,
            }}>
              {promptText}
            </Text>
          )}

          {/* NEW WORD Badge */}
          {currentQuestion.isNewWord && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View style={{
                backgroundColor: colors.stats.xp.bg,
                paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
                flexDirection: 'row', alignItems: 'center', gap: 4,
                borderWidth: 1, borderColor: colors.stats.xp.border,
              }}>
                <TargetIcon size={12} color={colors.stats.xp.text} />
                <Text style={{
                  fontSize: 9, fontWeight: '800', color: colors.stats.xp.text,
                  textTransform: 'uppercase', letterSpacing: 0.5,
                }}>
                  YANGI SO'Z
                </Text>
              </View>
            </View>
          )}

          {/* Character + Speech Bubble Row - hidden for new words */}
          {!currentQuestion.isNewWord && (
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            {/* Character */}
            <Image
              source={CHARACTERS[currentQuestionIndex % CHARACTERS.length]}
              style={{ width: 88, height: 104 }}
              resizeMode="contain"
            />

            {bubbleText ? (
              <>
                {/* Bubble Tail */}
                <Svg width={12} height={18} viewBox="0 0 12 18" style={{ marginLeft: 2, marginRight: -2, marginBottom: 28 }}>
                  <Path d="M12 0 Q4 4 2 9 Q4 14 12 18" fill={isDark ? colors.bg.card : '#fff'} />
                </Svg>

                {/* Speech Bubble */}
                <View style={{
                  flex: 1,
                  backgroundColor: colors.bg.card,
                  borderRadius: 20,
                  paddingHorizontal: 14, paddingVertical: 10,
                  borderWidth: 1.5, borderColor: colors.border.primary,
                  flexDirection: 'row', alignItems: 'center', gap: 10,
                  marginBottom: 6,
                }}>
                  <TouchableOpacity style={{
                    width: 34, height: 34, borderRadius: 17,
                    backgroundColor: isDark ? 'rgba(56,189,248,0.15)' : '#dbeafe',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <SoundIcon size={20} />
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 22, fontWeight: '700', color: colors.text.primary,
                    flex: 1,
                  }}>
                    {bubbleText}
                  </Text>
                </View>
              </>
            ) : null}

            {/* Hint Button */}
            {currentQuestion.explanation && (
              <TouchableOpacity
                onPress={() => setShowHint(!showHint)}
                style={{
                  width: 34, height: 34, borderRadius: 17,
                  backgroundColor: showHint ? colors.stats.xp.bg : colors.bg.card,
                  alignItems: 'center', justifyContent: 'center',
                  borderWidth: 1, borderColor: showHint ? colors.stats.xp.border : colors.border.primary,
                  marginLeft: 8, marginBottom: 6,
                }}
              >
                <LightBulbIcon size={18} />
              </TouchableOpacity>
            )}
          </View>
          )}

          {/* Hint Card */}
          {showHint && currentQuestion.explanation && (
            <View style={{
              backgroundColor: colors.stats.xp.bg,
              borderRadius: 12, padding: 12, marginTop: 8,
              borderWidth: 1, borderColor: colors.stats.xp.border,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <LightBulbIcon size={20} color={colors.stats.xp.text} />
                <Text style={{
                  fontSize: 13, color: colors.text.secondary,
                  marginLeft: 8, flex: 1, lineHeight: 18,
                }}>
                  {settings.explanationLanguage === 'uz' ? currentQuestion.explanationUz : currentQuestion.explanation}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Render Question Content */}
        {renderQuestion()}
      </ScrollView>

      {/* Bottom Action Bar - Gamified */}
      <View style={{ 
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border.primary,
        backgroundColor: colors.bg.elevated,
      }}>
        {showFeedback ? (
          <View>
            {/* Feedback Card - Gamified */}
            <View style={{
              backgroundColor: isCorrect ? colors.stats.accuracy.bg : '#fee2e2',
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
              borderWidth: 2,
              borderColor: isCorrect ? colors.stats.accuracy.border : '#fecaca',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: isCorrect ? colors.green.primary : '#dc2626',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                {isCorrect ? (
                  <CheckIcon size={28} color="#ffffff" />
                ) : (
                  <XIcon size={28} color="#ffffff" />
                )}
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: 'bold', 
                  color: isCorrect ? colors.green.primary : '#dc2626',
                  marginBottom: 4,
                }}>
                  {isCorrect ? "Ajoyib! To'g'ri!" : "Noto'g'ri"}
                </Text>
                {!isCorrect && (
                  <Text style={{ fontSize: 14, color: colors.text.secondary }}>
                    To'g'ri javob: {currentQuestion.correctAnswer}
                  </Text>
                )}
                {isCorrect && (
                  <Text style={{ fontSize: 14, color: colors.text.secondary }}>
                    +{lesson.xpReward || 10} XP
                  </Text>
                )}
              </View>
            </View>
            
            {/* Next Button - Large Gamified */}
            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor: colors.green.primary,
                borderRadius: 16,
                padding: 18,
                alignItems: 'center',
                borderBottomWidth: 4,
                borderBottomColor: colors.green.dark,
                shadowColor: colors.green.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
                {currentQuestionIndex < lesson.questions.length - 1 ? 'KEYINGI' : 'TUGATISH'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : currentQuestion.isNewWord ? (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {/* Skip Button */}
            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor: colors.bg.card,
                borderRadius: 16,
                padding: 18,
                borderWidth: 2,
                borderColor: colors.border.primary,
                minWidth: 80,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text.tertiary }}>
                O'TKAZIB
              </Text>
            </TouchableOpacity>

            {/* Next Button for new word */}
            <TouchableOpacity
              onPress={handleNext}
              style={{
                flex: 1,
                backgroundColor: colors.green.primary,
                borderRadius: 16,
                padding: 18,
                alignItems: 'center',
                borderBottomWidth: 4,
                borderBottomColor: colors.green.dark,
                shadowColor: colors.green.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
                KEYINGI
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {/* Skip Button */}
            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor: colors.bg.card,
                borderRadius: 16,
                padding: 18,
                borderWidth: 2,
                borderColor: colors.border.primary,
                minWidth: 80,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text.tertiary }}>
                O'TKAZIB
              </Text>
            </TouchableOpacity>

            {/* Check Button - Large */}
            <TouchableOpacity
              onPress={() => checkAnswer(selectedAnswer)}
              disabled={!selectedAnswer}
              style={{
                flex: 1,
                backgroundColor: selectedAnswer ? colors.green.primary : colors.border.primary,
                borderRadius: 16,
                padding: 18,
                alignItems: 'center',
                borderBottomWidth: selectedAnswer ? 4 : 0,
                borderBottomColor: colors.green.dark,
                shadowColor: selectedAnswer ? colors.green.primary : 'transparent',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: selectedAnswer ? 6 : 0,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>
                TEKSHIRISH
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
