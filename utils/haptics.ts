import { Platform } from 'react-native';

const noop = () => {};

function getHaptics() {
  if (Platform.OS === 'web') return null;
  return require('expo-haptics') as typeof import('expo-haptics');
}

const Haptics = getHaptics();

export const triggerSuccess = Haptics
  ? () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }
  : noop;

export const triggerError = Haptics
  ? () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); }
  : noop;

export const triggerWarning = Haptics
  ? () => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); }
  : noop;

export const triggerSelection = Haptics
  ? () => { Haptics.selectionAsync(); }
  : noop;

export const triggerImpact = Haptics
  ? (style: 'light' | 'medium' | 'heavy' = 'medium') => {
      const impactStyle = {
        light: Haptics.ImpactFeedbackStyle.Light,
        medium: Haptics.ImpactFeedbackStyle.Medium,
        heavy: Haptics.ImpactFeedbackStyle.Heavy,
      }[style];
      Haptics.impactAsync(impactStyle);
    }
  : noop;

export const triggerLight = Haptics
  ? () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }
  : noop;

export const triggerMedium = Haptics
  ? () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); }
  : noop;

export const triggerHeavy = Haptics
  ? () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); }
  : noop;
