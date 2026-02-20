/**
 * XP and gamification utility functions
 */

export const calculateLessonXP = (
  baseXP: number,
  accuracy: number,
  timeTaken: number,
  maxTime: number = 300 // 5 minutes default
): number => {
  // Base XP
  let xp = baseXP;
  
  // Accuracy bonus (up to 50% bonus)
  const accuracyBonus = (accuracy / 100) * (baseXP * 0.5);
  xp += accuracyBonus;
  
  // Speed bonus (up to 25% bonus if completed in less than half the time)
  if (timeTaken < maxTime / 2) {
    const speedBonus = baseXP * 0.25;
    xp += speedBonus;
  }
  
  return Math.round(xp);
};

export const calculateLevelFromXP = (totalXP: number): number => {
  // Each level requires exponentially more XP
  // Level 1: 0 XP
  // Level 2: 50 XP
  // Level 3: 150 XP
  // Level 4: 300 XP
  // etc.
  return Math.floor(Math.sqrt(totalXP / 25)) + 1;
};

export const getXPForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 25;
};

export const getXPProgressInCurrentLevel = (totalXP: number): {
  currentLevelXP: number;
  nextLevelXP: number;
  progress: number; // 0-1
} => {
  const currentLevel = calculateLevelFromXP(totalXP);
  const currentLevelTotalXP = getXPForNextLevel(currentLevel - 1);
  const nextLevelTotalXP = getXPForNextLevel(currentLevel);
  
  const currentLevelXP = totalXP - currentLevelTotalXP;
  const xpNeededForNextLevel = nextLevelTotalXP - currentLevelTotalXP;
  const progress = currentLevelXP / xpNeededForNextLevel;
  
  return {
    currentLevelXP,
    nextLevelXP: xpNeededForNextLevel,
    progress: Math.min(progress, 1),
  };
};

export const getDailyGoalProgress = (todayXP: number, dailyGoal: number): number => {
  return Math.min((todayXP / dailyGoal) * 100, 100);
};

/**
 * Get total XP required for a specific level
 */
export const getXPForLevel = (level: number): number => {
  return getXPForNextLevel(level - 1);
};
