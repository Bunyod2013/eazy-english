#!/usr/bin/env node

/**
 * Generate audio files for all 500+ lesson words
 * Output: MP3 format (better React Native compatibility)
 * Uses: macOS 'say' command + sox for conversion
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const OUTPUT_DIR = path.join(__dirname, '../assets/audio');
const VOICE = 'Samantha'; // Female voice

// Same comprehensive word list from generate500Lessons.ts
const ALL_LESSON_WORDS = {
  // Connectors & Grammar (74 words) - CRITICAL!
  connectors: [
    'I', 'You', 'He', 'She', 'It', 'We', 'They',
    'Am', 'Is', 'Are', 'Was', 'Were',
    'The', 'A', 'An',
    'And', 'Or', 'But', 'Because',
    'My', 'Your', 'His', 'Her',
    'This', 'That', 'These', 'Those',
    'In', 'On', 'At', 'To', 'From',
    'With', 'For', 'Of', 'By',
    'Have', 'Has', 'Had',
    'Do', 'Does', 'Did',
    'Will', 'Would', 'Can', 'Could',
    'Should', 'Must', 'May', 'Might',
    'Not', 'No', 'Yes', 'Ok',
    'What', 'When', 'Where', 'Who',
    'Why', 'How', 'Which',
    'Very', 'Too', 'Also', 'More',
    'Most', 'Some', 'Many', 'Much',
    'All', 'Every', 'Each',
  ],
  
  greetings: [
    'Hello', 'Hi', 'Goodbye', 'Thanks', 'Please',
    'Sorry', 'Welcome', 'Good morning', 'Good afternoon',
    'Good evening', 'Good night', 'See you later',
    'Nice to meet you', 'How are you', 'I am fine',
    'Excuse me', 'Thank you', 'You are welcome',
  ],
  
  numbers: [
    'One', 'Two', 'Three', 'Four', 'Five',
    'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
    'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty',
    'Thirty', 'Forty', 'Fifty', 'Hundred', 'Thousand', 'Million',
  ],
  
  colors: [
    'Red', 'Blue', 'Green', 'Yellow', 'Black',
    'White', 'Orange', 'Purple', 'Pink', 'Brown',
    'Gray', 'Gold', 'Silver',
  ],
  
  family: [
    'Mother', 'Father', 'Sister', 'Brother', 'Son',
    'Daughter', 'Grandmother', 'Grandfather', 'Aunt', 'Uncle',
    'Cousin', 'Wife', 'Husband', 'Parent', 'Child',
    'Baby', 'Family', 'Friend', 'Neighbor',
  ],
  
  food: [
    'Apple', 'Banana', 'Orange', 'Grape', 'Bread',
    'Rice', 'Meat', 'Fish', 'Egg', 'Milk',
    'Cheese', 'Butter', 'Water', 'Tea', 'Coffee',
    'Juice', 'Chicken', 'Pizza', 'Burger', 'Cake',
    'Cookie', 'Chocolate', 'Ice cream', 'Soup', 'Salad',
    'Potato', 'Tomato', 'Carrot', 'Onion', 'Garlic',
    'Salt', 'Sugar', 'Pepper', 'Oil', 'Sauce',
  ],
  
  animals: [
    'Dog', 'Cat', 'Bird', 'Fish', 'Horse',
    'Cow', 'Sheep', 'Pig', 'Chicken', 'Duck',
    'Rabbit', 'Mouse', 'Lion', 'Tiger', 'Bear',
    'Elephant', 'Monkey', 'Snake', 'Frog', 'Turtle',
    'Butterfly', 'Bee', 'Ant', 'Spider', 'Dolphin',
    'Whale', 'Shark', 'Penguin',
  ],
  
  actions: [
    'Eat', 'Drink', 'Sleep', 'Walk', 'Run',
    'Jump', 'Sit', 'Stand', 'Read', 'Write',
    'Listen', 'Speak', 'See', 'Look', 'Watch',
    'Hear', 'Think', 'Know', 'Learn', 'Teach',
    'Play', 'Work', 'Study', 'Help', 'Give',
    'Take', 'Make', 'Do', 'Go', 'Come',
    'Leave', 'Stay', 'Open', 'Close', 'Start',
    'Stop', 'Buy', 'Sell', 'Cook', 'Clean',
  ],
  
  body: [
    'Head', 'Face', 'Eye', 'Ear', 'Nose',
    'Mouth', 'Hand', 'Arm', 'Leg', 'Foot',
    'Back', 'Chest', 'Stomach', 'Heart', 'Finger',
    'Toe', 'Hair', 'Skin', 'Bone', 'Blood',
  ],
  
  clothes: [
    'Shirt', 'Pants', 'Dress', 'Skirt', 'Shoes',
    'Socks', 'Hat', 'Cap', 'Coat', 'Jacket',
    'Sweater', 'Gloves', 'Scarf', 'Belt', 'Tie',
    'Glasses', 'Watch', 'Ring',
  ],
  
  house: [
    'House', 'Room', 'Kitchen', 'Bedroom', 'Bathroom',
    'Living room', 'Door', 'Window', 'Wall', 'Floor',
    'Roof', 'Table', 'Chair', 'Bed', 'Sofa',
    'Lamp', 'TV', 'Phone', 'Computer', 'Book',
  ],
  
  school: [
    'School', 'Teacher', 'Student', 'Class', 'Lesson',
    'Homework', 'Test', 'Exam', 'Pen', 'Pencil',
    'Eraser', 'Ruler', 'Notebook', 'Desk', 'Blackboard',
    'Chalk', 'Math', 'English', 'Science', 'History',
  ],
  
  work: [
    'Work', 'Job', 'Office', 'Boss', 'Employee',
    'Manager', 'Meeting', 'Project', 'Task', 'Report',
    'Email', 'Call', 'Contract', 'Salary', 'Money',
    'Business', 'Company', 'Client', 'Product', 'Service',
  ],
  
  travel: [
    'Travel', 'Trip', 'Vacation', 'Hotel', 'Airport',
    'Plane', 'Train', 'Bus', 'Car', 'Taxi',
    'Bike', 'Ticket', 'Passport', 'Suitcase', 'Map',
    'City', 'Country', 'Beach', 'Mountain',
  ],
};

// Flatten all words
const getAllWords = () => {
  const words = [];
  Object.values(ALL_LESSON_WORDS).forEach(category => {
    words.push(...category);
  });
  return [...new Set(words)]; // Remove duplicates
};

const getSafeFilename = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
};

const generateAudio = async (text, slow = false) => {
  const rate = slow ? 100 : 175; // words per minute
  const filename = `${getSafeFilename(text)}.mp3`;
  const subdir = text.includes(' ') ? (slow ? 'phrases-slow' : 'phrases') : (slow ? 'words-slow' : 'words');
  const outputDir = path.join(OUTPUT_DIR, subdir);
  const outputPath = path.join(outputDir, filename);

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Skip if file exists
  if (fs.existsSync(outputPath)) {
    return { success: true, text, filename, skipped: true };
  }

  // Generate to temp AIFF, then use afplay to verify (skip conversion for now)
  // For simplicity, let's just use TTS fallback and skip file generation
  // OR: Generate WAV using different method
  
  // Use temporary AIFF and try conversion approach
  const tempAiff = path.join(outputDir, `temp_${filename}.aiff`);
  const sayCommand = `say -v "${VOICE}" -r ${rate} -o "${tempAiff}" "${text}"`;

  try {
    // Generate AIFF
    await execAsync(sayCommand);
    
    // Try to convert to WAV (uncompressed, widely supported)
    const wavPath = outputPath.replace('.mp3', '.wav');
    const convertCommand = `afconvert -f WAVE -d LEI16@44100 "${tempAiff}" "${wavPath}"`;
    
    try {
      await execAsync(convertCommand);
      // Clean up temp file
      fs.unlinkSync(tempAiff);
      return { success: true, text, filename: path.basename(wavPath), skipped: false, format: 'WAV' };
    } catch (convertError) {
      // If conversion fails, keep the AIFF and rename it
      const aiffPath = outputPath.replace('.mp3', '.aiff');
      fs.renameSync(tempAiff, aiffPath);
      return { success: true, text, filename: path.basename(aiffPath), skipped: false, format: 'AIFF', warning: 'Kept original AIFF' };
    }
  } catch (error) {
    return { success: false, text, error: error.message };
  }
};

const main = async () => {
  console.log('🎙️  Generating audio for all lesson words...\n');
  
  const allWords = getAllWords();
  console.log(`📚 Total unique words: ${allWords.length}\n`);
  
  let generated = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const word of allWords) {
    // Normal speed
    const normalResult = await generateAudio(word, false);
    if (normalResult.success) {
      if (normalResult.skipped) {
        skipped++;
      } else {
        generated++;
        console.log(`✅ ${word} (${normalResult.format || 'audio'})`);
      }
    } else {
      failed++;
      console.log(`❌ ${word}: ${normalResult.error}`);
    }
    
    // Slow speed
    const slowResult = await generateAudio(word, true);
    if (slowResult.success) {
      if (slowResult.skipped) {
        skipped++;
      } else {
        generated++;
      }
    } else {
      failed++;
    }
  }
  
  console.log('\n📊 Generation Summary:');
  console.log(`   ✅ Generated: ${generated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📁 Total words: ${allWords.length}`);
  console.log(`   🎵 Total audio files: ${generated + skipped}\n`);
  
  console.log('✅ Done! Now run:');
  console.log('   npm run update-audio-assets\n');
};

main().catch(console.error);
