#!/usr/bin/env node

/**
 * Generate Audio for ALL 500+ Lesson Words
 * Extracts all unique words from lessons and generates audio
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const OUTPUT_DIR = path.join(__dirname, '../assets/audio');
const VOICE = 'Samantha'; // Female voice

// Comprehensive word list for 500+ lessons
const ALL_LESSON_WORDS = {
  // A1 Level (Beginner) - Lessons 1-100
  greetings: [
    'Hello', 'Hi', 'Goodbye', 'Bye', 'Yes', 'No', 'Please', 
    'Thank you', 'Thanks', 'Sorry', 'Excuse me', 'Welcome',
    'Good morning', 'Good afternoon', 'Good evening', 'Good night',
    'How are you', 'I am fine', 'Nice to meet you', 'See you later'
  ],
  
  numbers: [
    'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty',
    'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety', 'Hundred', 'Thousand', 'Million'
  ],
  
  colors: [
    'Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Orange', 'Purple', 'Pink', 'Brown',
    'Gray', 'Silver', 'Gold', 'Beige', 'Turquoise'
  ],
  
  family: [
    'Mother', 'Mom', 'Father', 'Dad', 'Sister', 'Brother', 
    'Grandmother', 'Grandma', 'Grandfather', 'Grandpa',
    'Son', 'Daughter', 'Baby', 'Family', 'Parents', 'Child', 'Children',
    'Husband', 'Wife', 'Uncle', 'Aunt', 'Cousin', 'Nephew', 'Niece'
  ],
  
  food: [
    'Water', 'Milk', 'Bread', 'Apple', 'Banana', 'Orange', 'Rice', 'Egg', 'Meat', 'Fish',
    'Chicken', 'Cheese', 'Coffee', 'Tea', 'Juice', 'Cake', 'Pizza', 'Soup', 'Salad', 'Burger',
    'Pasta', 'Potato', 'Tomato', 'Carrot', 'Onion', 'Garlic', 'Pepper', 'Salt', 'Sugar', 'Butter',
    'Yogurt', 'Chocolate', 'Ice cream', 'Cookie', 'Sandwich'
  ],
  
  animals: [
    'Cat', 'Dog', 'Bird', 'Fish', 'Cow', 'Horse', 'Sheep', 'Chicken', 'Rabbit', 'Mouse',
    'Elephant', 'Lion', 'Tiger', 'Bear', 'Monkey', 'Duck', 'Pig', 'Goat', 'Bee', 'Butterfly',
    'Snake', 'Frog', 'Turtle', 'Wolf', 'Fox', 'Deer', 'Zebra', 'Giraffe'
  ],
  
  actions: [
    'Eat', 'Drink', 'Sleep', 'Walk', 'Run', 'Read', 'Write', 'Speak', 'Listen', 'Look',
    'Sit', 'Stand', 'Open', 'Close', 'Take', 'Give', 'Come', 'Go', 'See', 'Hear',
    'Think', 'Know', 'Want', 'Like', 'Love', 'Hate', 'Need', 'Have', 'Make', 'Do',
    'Work', 'Play', 'Study', 'Learn', 'Teach', 'Help', 'Buy', 'Sell', 'Cook', 'Clean'
  ],
  
  // A2 Level - Lessons 101-200
  body: [
    'Head', 'Hair', 'Face', 'Eye', 'Ear', 'Nose', 'Mouth', 'Tooth', 'Neck', 'Shoulder',
    'Arm', 'Hand', 'Finger', 'Leg', 'Foot', 'Toe', 'Back', 'Chest', 'Stomach', 'Heart'
  ],
  
  clothes: [
    'Shirt', 'Pants', 'Dress', 'Skirt', 'Shoes', 'Socks', 'Hat', 'Coat', 'Jacket', 'Sweater',
    'Tie', 'Scarf', 'Gloves', 'Belt', 'Jeans', 'Shorts', 'Boots', 'Sandals'
  ],
  
  house: [
    'House', 'Home', 'Room', 'Kitchen', 'Bathroom', 'Bedroom', 'Living room', 'Window', 'Door', 'Wall',
    'Floor', 'Ceiling', 'Roof', 'Garden', 'Garage', 'Stairs', 'Table', 'Chair', 'Bed', 'Sofa'
  ],
  
  school: [
    'School', 'Teacher', 'Student', 'Book', 'Pen', 'Pencil', 'Notebook', 'Desk', 'Chair', 'Classroom',
    'Lesson', 'Homework', 'Test', 'Exam', 'Grade', 'Subject', 'Math', 'English', 'Science', 'History'
  ],
  
  // B1 Level - Lessons 201-300
  work: [
    'Job', 'Work', 'Office', 'Boss', 'Employee', 'Manager', 'Company', 'Business', 'Meeting', 'Report',
    'Email', 'Computer', 'Phone', 'Desk', 'Project', 'Team', 'Colleague', 'Client', 'Customer', 'Interview'
  ],
  
  travel: [
    'Car', 'Bus', 'Train', 'Plane', 'Taxi', 'Bike', 'Boat', 'Airport', 'Station', 'Hotel',
    'Ticket', 'Passport', 'Luggage', 'Map', 'Journey', 'Trip', 'Vacation', 'Tourist', 'Guide'
  ],
  
  // Common connecting words (MUHIM!)
  connectors: [
    'I', 'You', 'He', 'She', 'It', 'We', 'They',
    'Am', 'Is', 'Are', 'Was', 'Were',
    'Have', 'Has', 'Had',
    'Do', 'Does', 'Did',
    'Can', 'Could', 'Will', 'Would', 'Should', 'Must',
    'The', 'A', 'An', 'This', 'That', 'These', 'Those',
    'My', 'Your', 'His', 'Her', 'Its', 'Our', 'Their',
    'Me', 'Him', 'Her', 'Us', 'Them',
    'And', 'Or', 'But', 'Because', 'If', 'When', 'Where', 'What', 'Who', 'Why', 'How',
    'In', 'On', 'At', 'To', 'From', 'With', 'Without', 'For', 'Of', 'By',
    'Very', 'More', 'Most', 'Less', 'Least', 'Too', 'Also', 'Only', 'Just', 'Not'
  ]
};

// Get safe filename
const getSafeFilename = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
};

// Generate audio file
const generateAudio = async (text, slow = false) => {
  const rate = slow ? 100 : 175;
  const filename = `${getSafeFilename(text)}.aiff`;
  const subdir = text.includes(' ') ? (slow ? 'phrases-slow' : 'phrases') : (slow ? 'words-slow' : 'words');
  const outputPath = path.join(OUTPUT_DIR, subdir, filename);
  
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (fs.existsSync(outputPath)) {
    return { success: true, text, filename, skipped: true };
  }
  
  const command = `say -v "${VOICE}" -r ${rate} -o "${outputPath}" "${text}"`;
  
  try {
    await execAsync(command);
    return { success: true, text, filename, skipped: false };
  } catch (error) {
    return { success: false, text, error: error.message };
  }
};

// Main function
const main = async () => {
  console.log('🎙️  Generating Audio for ALL 500+ Lesson Words\n');
  
  let totalCount = 0;
  let successCount = 0;
  let skippedCount = 0;
  
  for (const [category, words] of Object.entries(ALL_LESSON_WORDS)) {
    console.log(`\n📂 ${category.toUpperCase()} (${words.length} words)`);
    
    for (const word of words) {
      totalCount += 2; // normal + slow
      
      // Normal speed
      const normalResult = await generateAudio(word, false);
      if (normalResult.success) {
        if (normalResult.skipped) {
          process.stdout.write(`  ⏭️  ${word} (exists)\n`);
          skippedCount++;
        } else {
          process.stdout.write(`  ✅ ${word}\n`);
          successCount++;
        }
      }
      
      // Slow speed
      const slowResult = await generateAudio(word, true);
      if (slowResult.success) {
        if (slowResult.skipped) {
          skippedCount++;
        } else {
          successCount++;
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Audio Generation Complete!\n');
  console.log(`📊 Statistics:`);
  console.log(`   Total: ${totalCount} files`);
  console.log(`   Generated: ${successCount}`);
  console.log(`   Skipped (exists): ${skippedCount}`);
  console.log(`\n📁 Audio files: ${OUTPUT_DIR}`);
  console.log(`\n💡 Now update WordBankQuestion to play audio on word tap!`);
};

main().catch(console.error);
