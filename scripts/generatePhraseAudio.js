#!/usr/bin/env node

/**
 * Generate Audio for Common Phrases (Speaking Questions)
 * Uses macOS `say` command + afconvert to WAV
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');

const execAsync = promisify(exec);

// Output directories
const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'audio');
const VOICE = 'Samantha'; // US English female voice

// Common phrases for speaking practice
const PHRASES = [
  'Hello',
  'Good morning',
  'Good afternoon',
  'Good evening',
  'Good night',
  'Thank you',
  'You are welcome',
  'I am sorry',
  'Excuse me',
  'Please',
  'Yes',
  'No',
  'I love my family',
  'I like milk',
  'I eat bread',
  'I drink water',
  'How are you',
  'I am fine',
  'Nice to meet you',
  'See you later',
  'Have a good day',
  'America is beautiful',
  'I am a student',
  'I like learning English',
  'What is your name',
  'My name is',
  'Where are you from',
  'I am from Uzbekistan',
  'I live in Tashkent',
  'I speak English',
  'I am learning',
  'This is my book',
  'That is my friend',
  'I have a dog',
  'I have a cat',
  'The sky is blue',
  'The sun is yellow',
  'I go to school',
  'I wake up early',
  'I go to sleep',
  'I love reading',
  'I am happy',
  'I am hungry',
  'I am thirsty',
  'I want water',
  'Can I help you',
  'What time is it',
  'Today is a good day',
  'The weather is nice',
  'I like this',
  'I do not understand',
];

// Safe filename conversion
function getSafeFilename(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Generate audio for a phrase
 * @param {string} text - The phrase to speak
 * @param {boolean} slow - Generate slow version?
 * @returns {Promise<Object>}
 */
async function generateAudio(text, slow = false) {
  const rate = slow ? 100 : 175; // Normal: 175 wpm, Slow: 100 wpm
  const filename = `${getSafeFilename(text)}.wav`;
  const subdir = slow ? 'phrases-slow' : 'phrases';
  const outputDir = path.join(OUTPUT_DIR, subdir);
  const outputPath = path.join(outputDir, filename);

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    return {
      success: true,
      text,
      filename,
      skipped: true,
    };
  }

  const tempAiff = path.join(outputDir, `temp_${filename}.aiff`);

  // Step 1: Generate AIFF with say
  const sayCommand = `say -v "${VOICE}" -r ${rate} -o "${tempAiff}" "${text}"`;

  try {
    await execAsync(sayCommand);

    // Step 2: Convert to WAV (uncompressed PCM 16-bit 44100 Hz)
    const convertCommand = `afconvert -f WAVE -d LEI16@44100 "${tempAiff}" "${outputPath}"`;
    await execAsync(convertCommand);

    // Step 3: Clean up temp AIFF
    fs.unlinkSync(tempAiff);

    console.log(`✅ Generated: ${filename} (${slow ? 'slow' : 'normal'})`);

    return {
      success: true,
      text,
      filename: path.basename(outputPath),
      skipped: false,
      format: 'WAV',
    };
  } catch (error) {
    console.error(`❌ Failed: ${text} - ${error.message}`);
    return {
      success: false,
      text,
      error: error.message,
    };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🎤 PHRASE AUDIO GENERATOR');
  console.log('=========================\n');
  console.log(`Voice: ${VOICE}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Total phrases: ${PHRASES.length}`);
  console.log(`Will generate: ${PHRASES.length * 2} files (normal + slow)\n`);

  const results = {
    success: 0,
    failed: 0,
    skipped: 0,
  };

  // Generate both normal and slow for each phrase
  for (const phrase of PHRASES) {
    // Normal speed
    const normalResult = await generateAudio(phrase, false);
    if (normalResult.success) {
      if (normalResult.skipped) {
        results.skipped++;
      } else {
        results.success++;
      }
    } else {
      results.failed++;
    }

    // Slow speed
    const slowResult = await generateAudio(phrase, true);
    if (slowResult.success) {
      if (slowResult.skipped) {
        results.skipped++;
      } else {
        results.success++;
      }
    } else {
      results.failed++;
    }
  }

  console.log('\n=========================');
  console.log('📊 RESULTS:');
  console.log(`✅ Success: ${results.success}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📦 Total: ${results.success + results.skipped + results.failed}`);
  console.log('\n✅ Done! Run `npm run update-audio-assets` to update manifest.');
}

main().catch(console.error);
