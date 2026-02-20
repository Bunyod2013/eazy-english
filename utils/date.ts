/**
 * Date utility functions for streak and progress tracking
 */

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getYesterdayDateString = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

export const isToday = (dateString: string): boolean => {
  return dateString === getTodayDateString();
};

export const isYesterday = (dateString: string): boolean => {
  return dateString === getYesterdayDateString();
};

export const daysBetween = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatDate = (dateString: string, locale: 'uz' | 'en' = 'en'): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const localeString = locale === 'uz' ? 'uz-UZ' : 'en-US';
  return date.toLocaleDateString(localeString, options);
};

export const getStreakStatus = (lastActiveDate: string): 'active' | 'broken' | 'continue' => {
  if (isToday(lastActiveDate)) {
    return 'active'; // Already practiced today
  } else if (isYesterday(lastActiveDate)) {
    return 'continue'; // Can continue streak
  } else {
    return 'broken'; // Streak is broken
  }
};
