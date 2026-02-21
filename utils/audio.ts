import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { getAudioAsset, hasAudioAsset } from './audioAssets';

/**
 * Audio utility for playing lesson audio files
 * Supports both pre-recorded audio files and text-to-speech
 */

let currentSound: Sound | null = null;

// Sound effect assets
const SOUND_EFFECTS = {
  correct: require('@/assets/sounds/correct.mp3'),
  incorrect: require('@/assets/sounds/incorrect.mp3'),
};

// Pre-loaded sounds for instant playback
let correctSound: Sound | null = null;
let incorrectSound: Sound | null = null;
let soundLoading = false;

/** Pre-load sounds at app start for instant playback */
export const preloadSounds = async (): Promise<void> => {
  if (soundLoading) return;
  soundLoading = true;
  try {
    if (!correctSound) {
      const { sound } = await Audio.Sound.createAsync(
        SOUND_EFFECTS.correct,
        { volume: 0.6 }
      );
      correctSound = sound;
    }
    if (!incorrectSound) {
      const { sound } = await Audio.Sound.createAsync(
        SOUND_EFFECTS.incorrect,
        { volume: 0.6 }
      );
      incorrectSound = sound;
    }
  } catch (e) {
    console.log('[Audio] Failed to preload sounds');
  }
  soundLoading = false;
};

/**
 * Play audio file or text-to-speech
 * @param audioPath - Path to audio file (e.g., 'words/hello.wav')
 * @param audioText - Text to speak (fallback if no audio file)
 * @param isSlowSpeed - Whether to play at slow speed (for learning)
 * @param language - Language code (default: 'en-US')
 */
/**
 * Play audio file or text-to-speech
 * SIMPLIFIED - Audio mode is configured at app startup in _layout.tsx
 */
export const playAudio = async (
  audioPath?: string,
  audioText?: string,
  isSlowSpeed: boolean = false,
  language: string = 'en-US'
): Promise<void> => {
  console.log(`[Audio] 🔊 Playing: "${audioText}" (${isSlowSpeed ? 'SLOW' : 'NORMAL'})`);
  
  if (!audioText) {
    console.warn('[Audio] ⚠️ No audioText provided');
    return;
  }

  try {
    // Stop any existing speech
    await Speech.stop();
    
    // Just speak - audio mode already configured at startup!
    Speech.speak(audioText, {
      language: language,
      pitch: 1.0,
      rate: isSlowSpeed ? 0.5 : 0.8,
      volume: 1.0,
    });
    
    console.log('[Audio] ✅ Speech command sent');
  } catch (error) {
    console.error('[Audio] ❌ Error:', error);
  }
};

/**
 * Stop currently playing audio
 */
export const stopAudio = async (): Promise<void> => {
  try {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      currentSound = null;
    }
  } catch (error) {
    console.error('[Audio] Error stopping audio:', error);
  }
};

/** Play correct/success sound - fire and forget, no await blocking */
export const playCorrectSound = (): void => {
  if (correctSound) {
    correctSound.setPositionAsync(0).then(() => {
      correctSound?.playAsync();
    }).catch(() => {
      correctSound = null;
      preloadSounds();
    });
  } else {
    Audio.Sound.createAsync(SOUND_EFFECTS.correct, { shouldPlay: true, volume: 0.6 })
      .then(({ sound }) => { correctSound = sound; })
      .catch(() => {});
  }
};

/** Play incorrect/error sound - fire and forget, no await blocking */
export const playIncorrectSound = (): void => {
  if (incorrectSound) {
    incorrectSound.setPositionAsync(0).then(() => {
      incorrectSound?.playAsync();
    }).catch(() => {
      incorrectSound = null;
      preloadSounds();
    });
  } else {
    Audio.Sound.createAsync(SOUND_EFFECTS.incorrect, { shouldPlay: true, volume: 0.6 })
      .then(({ sound }) => { incorrectSound = sound; })
      .catch(() => {});
  }
};

/**
 * Play celebration sound - rapid haptic "tititititirit" sequence
 * Combines rapid haptic feedback with a short speech celebration
 */
export const playCelebrationSound = async (): Promise<void> => {
  try {
    // Rapid haptic sequence for "tititititirit" feel
    const hapticPattern = [
      { delay: 0, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 60, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 60, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 60, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 60, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 60, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 60, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 80, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 100, style: Haptics.ImpactFeedbackStyle.Heavy },
    ];

    let elapsed = 0;
    for (const step of hapticPattern) {
      elapsed += step.delay;
      setTimeout(() => {
        Haptics.impactAsync(step.style).catch(() => {});
      }, elapsed);
    }

    // Final success notification haptic after the rapid sequence
    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }, elapsed + 150);

    console.log('[Audio] Celebration haptic sequence triggered');
  } catch (error) {
    console.log('[Audio] Celebration sound not available:', error);
  }
};

/**
 * Clean up audio resources
 */
export const cleanupAudio = async (): Promise<void> => {
  await stopAudio();
};
