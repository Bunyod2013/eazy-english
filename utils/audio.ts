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

/**
 * Play success sound effect
 */
export const playSuccessSound = async (): Promise<void> => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      // You can add a success sound file here
      // require('../../assets/sounds/success.mp3'),
      { uri: 'success' },
      { shouldPlay: true, volume: 0.5 }
    );
    
    // Auto-unload after playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.log('[Audio] Success sound not available');
  }
};

/**
 * Play error sound effect
 */
export const playErrorSound = async (): Promise<void> => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      // You can add an error sound file here
      // require('../../assets/sounds/error.mp3'),
      { uri: 'error' },
      { shouldPlay: true, volume: 0.5 }
    );
    
    // Auto-unload after playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.log('[Audio] Error sound not available');
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
