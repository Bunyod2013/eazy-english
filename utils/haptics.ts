import * as Haptics from 'expo-haptics';

export const triggerSuccess = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const triggerError = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};

export const triggerWarning = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};

export const triggerSelection = () => {
  Haptics.selectionAsync();
};

export const triggerImpact = (style: 'light' | 'medium' | 'heavy' = 'medium') => {
  const impactStyle = {
    light: Haptics.ImpactFeedbackStyle.Light,
    medium: Haptics.ImpactFeedbackStyle.Medium,
    heavy: Haptics.ImpactFeedbackStyle.Heavy,
  }[style];
  
  Haptics.impactAsync(impactStyle);
};

// Alias for light impact (commonly used in buttons)
export const triggerLight = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const triggerMedium = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const triggerHeavy = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};
