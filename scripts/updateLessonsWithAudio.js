#!/usr/bin/env node

/**
 * Script to update lesson files with generated audio paths
 * This script automatically adds audio paths to vocabulary and listening questions
 */

const fs = require('fs');
const path = require('path');

// Audio mapping: word/phrase -> audio path
const AUDIO_MAP = {
  // Alphabet
  'A': 'words/a.aiff', 'B': 'words/b.aiff', 'C': 'words/c.aiff',
  'D': 'words/d.aiff', 'E': 'words/e.aiff', 'F': 'words/f.aiff',
  'G': 'words/g.aiff', 'H': 'words/h.aiff', 'I': 'words/i.aiff',
  'J': 'words/j.aiff', 'K': 'words/k.aiff', 'L': 'words/l.aiff',
  'M': 'words/m.aiff', 'N': 'words/n.aiff', 'O': 'words/o.aiff',
  'P': 'words/p.aiff', 'Q': 'words/q.aiff', 'R': 'words/r.aiff',
  'S': 'words/s.aiff', 'T': 'words/t.aiff', 'U': 'words/u.aiff',
  'V': 'words/v.aiff', 'W': 'words/w.aiff', 'X': 'words/x.aiff',
  'Y': 'words/y.aiff', 'Z': 'words/z.aiff',
  
  // Greetings
  'Hello': 'words/hello.aiff',
  'Hi': 'words/hi.aiff',
  'Goodbye': 'words/goodbye.aiff',
  'Bye': 'words/bye.aiff',
  'Good morning': 'phrases/good_morning.aiff',
  'Good afternoon': 'phrases/good_afternoon.aiff',
  'Good evening': 'phrases/good_evening.aiff',
  'Good night': 'phrases/good_night.aiff',
  'How are you?': 'phrases/how_are_you.aiff',
  'I am fine': 'phrases/i_am_fine.aiff',
  'Nice to meet you': 'phrases/nice_to_meet_you.aiff',
  'See you later': 'phrases/see_you_later.aiff',
  
  // Polite words
  'Please': 'words/please.aiff',
  'Thank you': 'phrases/thank_you.aiff',
  'Thanks': 'words/thanks.aiff',
  'You are welcome': 'phrases/you_are_welcome.aiff',
  'Excuse me': 'phrases/excuse_me.aiff',
  'Sorry': 'words/sorry.aiff',
  'Yes': 'words/yes.aiff',
  'No': 'words/no.aiff',
  
  // Numbers
  'One': 'words/one.aiff',
  'Two': 'words/two.aiff',
  'Three': 'words/three.aiff',
  'Four': 'words/four.aiff',
  'Five': 'words/five.aiff',
  'Six': 'words/six.aiff',
  'Seven': 'words/seven.aiff',
  'Eight': 'words/eight.aiff',
  'Nine': 'words/nine.aiff',
  'Ten': 'words/ten.aiff',
  
  // Colors
  'Red': 'words/red.aiff',
  'Blue': 'words/blue.aiff',
  'Green': 'words/green.aiff',
  'Yellow': 'words/yellow.aiff',
  'Black': 'words/black.aiff',
  'White': 'words/white.aiff',
  'Orange': 'words/orange.aiff',
  'Purple': 'words/purple.aiff',
  'Pink': 'words/pink.aiff',
  'Brown': 'words/brown.aiff',
  
  // Family
  'Mother': 'words/mother.aiff',
  'Mom': 'words/mom.aiff',
  'Father': 'words/father.aiff',
  'Dad': 'words/dad.aiff',
  'Sister': 'words/sister.aiff',
  'Brother': 'words/brother.aiff',
  'Grandmother': 'words/grandmother.aiff',
  'Grandma': 'words/grandma.aiff',
  'Grandfather': 'words/grandfather.aiff',
  'Grandpa': 'words/grandpa.aiff',
  
  // Food
  'Water': 'words/water.aiff',
  'Milk': 'words/milk.aiff',
  'Bread': 'words/bread.aiff',
  'Apple': 'words/apple.aiff',
  'Banana': 'words/banana.aiff',
  'Orange': 'words/orange.aiff',
  'Rice': 'words/rice.aiff',
  'Egg': 'words/egg.aiff',
  'Meat': 'words/meat.aiff',
  'Fish': 'words/fish.aiff',
  'Chicken': 'words/chicken.aiff',
  'Cheese': 'words/cheese.aiff',
  
  // Animals
  'Cat': 'words/cat.aiff',
  'Dog': 'words/dog.aiff',
  'Bird': 'words/bird.aiff',
  'Cow': 'words/cow.aiff',
  'Horse': 'words/horse.aiff',
  'Sheep': 'words/sheep.aiff',
  'Rabbit': 'words/rabbit.aiff',
  'Mouse': 'words/mouse.aiff',
  
  // Actions
  'Eat': 'words/eat.aiff',
  'Drink': 'words/drink.aiff',
  'Sleep': 'words/sleep.aiff',
  'Walk': 'words/walk.aiff',
  'Run': 'words/run.aiff',
  'Read': 'words/read.aiff',
  'Write': 'words/write.aiff',
  'Speak': 'words/speak.aiff',
  'Listen': 'words/listen.aiff',
  'Look': 'words/look.aiff',
  'Sit': 'words/sit.aiff',
  'Stand': 'words/stand.aiff',
  
  // School
  'Book': 'words/book.aiff',
  'Pen': 'words/pen.aiff',
  'Pencil': 'words/pencil.aiff',
  'Notebook': 'words/notebook.aiff',
  'Teacher': 'words/teacher.aiff',
  'Student': 'words/student.aiff',
  'School': 'words/school.aiff',
  'Desk': 'words/desk.aiff',
  'Chair': 'words/chair.aiff',
  'Classroom': 'words/classroom.aiff',
};

// Get slow version of audio path
const getSlowAudioPath = (normalPath) => {
  if (!normalPath) return null;
  return normalPath.replace('/words/', '/words-slow/').replace('/phrases/', '/phrases-slow/');
};

console.log('🎙️ Audio Mapping Created!');
console.log(`📊 Total entries: ${Object.keys(AUDIO_MAP).length}`);
console.log('\n✅ Audio paths ready to use in lessons:');
console.log('\nExample usage in duolingoStyleLessons.ts:');
console.log(`
{
  type: 'vocabulary',
  word: 'Hello',
  translation: 'Salom',
  audio: '${AUDIO_MAP['Hello']}',           // ← Normal speed
  audioSlow: '${getSlowAudioPath(AUDIO_MAP['Hello'])}',  // ← Slow speed
  audioText: 'Hello',                        // ← Fallback TTS
}
`);

// Export for use in other scripts
module.exports = { AUDIO_MAP, getSlowAudioPath };
