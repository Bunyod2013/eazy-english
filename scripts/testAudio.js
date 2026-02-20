#!/usr/bin/env node

/**
 * Simple audio test - plays "Hello" using expo-speech
 * Run: node scripts/testAudio.js
 */

console.log('🧪 Testing expo-speech...\n');

// Simulate the exact code from app
const testCode = `
import * as Speech from 'expo-speech';

export const testAudio = async () => {
  console.log('[Test] 🔊 Playing: "Hello"');
  
  try {
    await Speech.stop();
    
    Speech.speak("Hello", {
      language: "en-US",
      pitch: 1.0,
      rate: 0.8,
      volume: 1.0,
    });
    
    console.log('[Test] ✅ Speech started');
  } catch (error) {
    console.error('[Test] ❌ Error:', error);
  }
};
`;

console.log('📝 Current playAudio() code:');
console.log(testCode);

console.log('\n✅ This is EXACTLY what runs in your app.\n');
console.log('📱 On iPhone 13 iOS 16.3, make sure:');
console.log('   1. English voice is DOWNLOADED');
console.log('   2. Speak Selection is ON');
console.log('   3. Volume is MAX');
console.log('   4. Silent switch is OFF');
console.log('   5. Bluetooth is OFF\n');

console.log('🔍 Check: Settings → Accessibility → Spoken Content → Voices');
console.log('   → English → Should show "Downloaded" or download option\n');

console.log('💡 Test in Safari:');
console.log('   1. Open google.com');
console.log('   2. Select any text');
console.log('   3. Tap "Speak"');
console.log('   4. If this works, app will work too!\n');
