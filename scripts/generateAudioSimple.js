#!/usr/bin/env node

/**
 * Simple Audio Generator for EazyEnglish
 * Uses macOS 'say' command (built-in, no API keys needed)
 * 
 * Usage:
 *   node scripts/generateAudioSimple.js
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../assets/audio');
const VOICE = 'Samantha'; // Female voice (you can use 'Alex' for male)

// Words and phrases to generate
const AUDIO_CONTENT = {
  // Alphabet
  alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  
  // Greetings
  greetings: [
    'Hello',
    'Hi',
    'Good morning',
    'Good afternoon',
    'Good evening',
    'Good night',
    'Goodbye',
    'Bye',
    'See you later',
    'How are you?',
    'I am fine',
    'Nice to meet you',
  ],
  
  // Polite words
  polite: [
    'Please',
    'Thank you',
    'Thanks',
    'You are welcome',
    'Excuse me',
    'Sorry',
    'Yes',
    'No',
  ],
  
  // Numbers
  numbers: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'],
  
  // Colors
  colors: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Orange', 'Purple', 'Pink', 'Brown'],
  
  // Family
  family: ['Mother', 'Mom', 'Father', 'Dad', 'Sister', 'Brother', 'Grandmother', 'Grandma', 'Grandfather', 'Grandpa'],
  
  // Food
  food: ['Water', 'Milk', 'Bread', 'Apple', 'Banana', 'Orange', 'Rice', 'Egg', 'Meat', 'Fish', 'Chicken', 'Cheese'],
  
  // Animals
  animals: ['Cat', 'Dog', 'Bird', 'Fish', 'Cow', 'Chicken', 'Horse', 'Sheep', 'Rabbit', 'Mouse'],
  
  // Actions
  actions: ['Eat', 'Drink', 'Sleep', 'Walk', 'Run', 'Read', 'Write', 'Speak', 'Listen', 'Look', 'Sit', 'Stand'],
  
  // School
  school: ['Book', 'Pen', 'Pencil', 'Notebook', 'Teacher', 'Student', 'School', 'Desk', 'Chair', 'Classroom'],
};

// Create directories
const createDirectories = () => {
  const dirs = [
    path.join(OUTPUT_DIR, 'words'),
    path.join(OUTPUT_DIR, 'words-slow'),
    path.join(OUTPUT_DIR, 'phrases'),
    path.join(OUTPUT_DIR, 'phrases-slow'),
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
};

// Generate safe filename
const getSafeFilename = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

// Generate audio file
const generateAudio = async (text, category, slow = false) => {
  const rate = slow ? 100 : 175; // Words per minute
  const filename = `${getSafeFilename(text)}.aiff`;
  const subdir = category.includes('phrase') || text.includes(' ') ? 
    (slow ? 'phrases-slow' : 'phrases') : 
    (slow ? 'words-slow' : 'words');
  const outputPath = path.join(OUTPUT_DIR, subdir, filename);

  const command = `say -v "${VOICE}" -r ${rate} -o "${outputPath}" "${text}"`;
  
  try {
    await execAsync(command);
    return { success: true, text, filename };
  } catch (error) {
    return { success: false, text, error: error.message };
  }
};

// Main function
const main = async () => {
  console.log('🎙️  EazyEnglish Audio Generator (Simple Version)\n');
  console.log(`Using macOS 'say' command with voice: ${VOICE}\n`);

  // Check if 'say' command is available
  try {
    await execAsync('which say');
  } catch (error) {
    console.error('❌ Error: macOS "say" command not found.');
    console.error('   This script only works on macOS.');
    console.error('   For other platforms, use Google Cloud TTS or OpenAI TTS.');
    process.exit(1);
  }

  createDirectories();

  console.log('🎵 Generating audio files...\n');

  let totalCount = 0;
  let successCount = 0;
  let failCount = 0;

  // Generate audio for all categories
  for (const [category, items] of Object.entries(AUDIO_CONTENT)) {
    console.log(`\n📂 Category: ${category.toUpperCase()}`);
    
    for (const text of items) {
      totalCount += 2; // Normal + slow
      
      // Normal speed
      process.stdout.write(`  Generating: ${text} (normal)... `);
      const normalResult = await generateAudio(text, category, false);
      if (normalResult.success) {
        console.log('✅');
        successCount++;
      } else {
        console.log('❌');
        failCount++;
      }
      
      // Slow speed
      process.stdout.write(`  Generating: ${text} (slow)... `);
      const slowResult = await generateAudio(text, category, true);
      if (slowResult.success) {
        console.log('✅');
        successCount++;
      } else {
        console.log('❌');
        failCount++;
      }
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Audio Generation Complete!\n');
  console.log(`📊 Statistics:`);
  console.log(`   Total: ${totalCount}`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`\n📁 Audio files saved to: ${OUTPUT_DIR}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Update your lesson data with audio file paths');
  console.log('   2. Use playAudio() function in your components');
  console.log('   3. Test audio playback in the app');
};

// Run
main().catch(console.error);
