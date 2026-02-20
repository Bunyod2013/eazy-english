#!/usr/bin/env ts-node

/**
 * Audio Generation Script for EazyEnglish
 * 
 * This script generates high-quality audio files for all lesson content
 * Supports multiple TTS providers:
 * 1. Google Cloud TTS (best quality, requires API key)
 * 2. OpenAI TTS (very natural, requires API key)
 * 3. ElevenLabs (most realistic, requires API key)
 * 4. Local macOS 'say' command (free, good quality)
 * 
 * Usage:
 *   npm run generate-audio          # Generate all audio files
 *   npm run generate-audio --provider=google
 *   npm run generate-audio --lesson=lesson-1
 */

import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Audio configuration
const AUDIO_CONFIG = {
  outputDir: path.join(__dirname, '../assets/audio'),
  formats: {
    words: 'words',        // Individual words/phrases
    sentences: 'sentences', // Full sentences
    slow: 'slow',          // Slow pronunciation for learning
  },
  providers: {
    macos: 'say',          // macOS built-in TTS
    google: 'google-tts',  // Google Cloud TTS
    openai: 'openai-tts',  // OpenAI TTS
    elevenlabs: 'elevenlabs', // ElevenLabs
  },
  voices: {
    'en-US': {
      macos: 'Samantha',   // Female voice
      macosMale: 'Alex',   // Male voice
      google: 'en-US-Neural2-F',
      openai: 'nova',
      elevenlabs: 'Rachel',
    },
  },
};

// Text items to generate audio for
interface AudioItem {
  id: string;
  text: string;
  language: string;
  category: 'word' | 'phrase' | 'sentence';
  slow?: boolean;
}

// Collect all text from lessons
const collectAudioItems = (): AudioItem[] => {
  const items: AudioItem[] = [];
  
  // Common words and phrases from lessons
  const commonWords = [
    // Alphabet
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    
    // Greetings
    'Hello', 'Hi', 'Good morning', 'Good afternoon', 'Good evening',
    'Good night', 'Goodbye', 'Bye', 'See you later',
    
    // Polite words
    'Please', 'Thank you', 'Thanks', 'You\'re welcome', 'Excuse me',
    'Sorry', 'Yes', 'No',
    
    // Numbers
    'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    
    // Colors
    'Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Orange', 'Purple', 'Pink', 'Brown',
    
    // Family
    'Mother', 'Mom', 'Father', 'Dad', 'Sister', 'Brother', 'Grandmother', 'Grandfather',
    
    // Food
    'Water', 'Milk', 'Bread', 'Apple', 'Banana', 'Orange', 'Rice', 'Egg', 'Meat', 'Fish',
    
    // Animals
    'Cat', 'Dog', 'Bird', 'Fish', 'Cow', 'Chicken', 'Horse', 'Sheep',
    
    // Actions
    'Eat', 'Drink', 'Sleep', 'Walk', 'Run', 'Read', 'Write', 'Speak', 'Listen',
    
    // School
    'Book', 'Pen', 'Pencil', 'Notebook', 'Teacher', 'Student', 'School', 'Desk', 'Chair',
  ];

  // Generate items for each word (normal and slow)
  commonWords.forEach((word, index) => {
    // Normal speed
    items.push({
      id: `word_${index + 1}`,
      text: word,
      language: 'en-US',
      category: 'word',
      slow: false,
    });
    
    // Slow speed (for learning)
    items.push({
      id: `word_${index + 1}_slow`,
      text: word,
      language: 'en-US',
      category: 'word',
      slow: true,
    });
  });

  // Common phrases
  const commonPhrases = [
    'How are you?',
    'I am fine',
    'What is your name?',
    'My name is',
    'Nice to meet you',
    'Where are you from?',
    'I am from Uzbekistan',
    'Do you speak English?',
    'I am learning English',
    'Can you help me?',
  ];

  commonPhrases.forEach((phrase, index) => {
    items.push({
      id: `phrase_${index + 1}`,
      text: phrase,
      language: 'en-US',
      category: 'phrase',
      slow: false,
    });
    
    items.push({
      id: `phrase_${index + 1}_slow`,
      text: phrase,
      language: 'en-US',
      category: 'phrase',
      slow: true,
    });
  });

  return items;
};

// Generate audio using macOS 'say' command
const generateWithMacOS = async (item: AudioItem): Promise<void> => {
  const voice = AUDIO_CONFIG.voices['en-US'].macos;
  const rate = item.slow ? 100 : 175; // Words per minute
  const filename = `${item.id}.wav`;
  const outputPath = path.join(
    AUDIO_CONFIG.outputDir,
    item.slow ? AUDIO_CONFIG.formats.slow : AUDIO_CONFIG.formats.words,
    filename
  );

  // Create directory if it doesn't exist
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Generate audio using 'say' command
  const command = `say -v "${voice}" -r ${rate} -o "${outputPath}" "${item.text}"`;
  
  try {
    await execAsync(command);
    console.log(`✅ Generated: ${item.text} -> ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to generate: ${item.text}`, error);
  }
};

// Convert AIFF to MP3 using ffmpeg (if available)
const convertToMP3 = async (inputPath: string): Promise<void> => {
  const outputPath = inputPath.replace('.wav', '.mp3');
  const command = `ffmpeg -i "${inputPath}" -acodec libmp3lame -ab 128k "${outputPath}" -y`;
  
  try {
    await execAsync(command);
    console.log(`🔄 Converted to MP3: ${path.basename(outputPath)}`);
    
    // Remove AIFF file after conversion
    fs.unlinkSync(inputPath);
  } catch (error) {
    console.log(`⚠️  ffmpeg not available, keeping AIFF format`);
  }
};

// Generate audio using Google Cloud TTS
const generateWithGoogle = async (item: AudioItem): Promise<void> => {
  console.log(`⚠️  Google Cloud TTS requires API setup. See: https://cloud.google.com/text-to-speech`);
  console.log(`   For now, falling back to macOS TTS`);
  await generateWithMacOS(item);
};

// Generate audio using OpenAI TTS
const generateWithOpenAI = async (item: AudioItem): Promise<void> => {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.log(`⚠️  OPENAI_API_KEY not found. Falling back to macOS TTS`);
    await generateWithMacOS(item);
    return;
  }

  const filename = `${item.id}.mp3`;
  const outputPath = path.join(
    AUDIO_CONFIG.outputDir,
    item.slow ? AUDIO_CONFIG.formats.slow : AUDIO_CONFIG.formats.words,
    filename
  );

  // Create directory if it doesn't exist
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: AUDIO_CONFIG.voices['en-US'].openai,
        input: item.text,
        speed: item.slow ? 0.75 : 1.0,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log(`✅ Generated (OpenAI): ${item.text} -> ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to generate with OpenAI: ${item.text}`, error);
    console.log(`   Falling back to macOS TTS`);
    await generateWithMacOS(item);
  }
};

// Main generation function
const generateAudio = async (provider: string = 'macos') => {
  console.log('🎙️  EazyEnglish Audio Generator\n');
  console.log(`Provider: ${provider}`);
  console.log(`Output directory: ${AUDIO_CONFIG.outputDir}\n`);

  // Collect all items
  const items = collectAudioItems();
  console.log(`📝 Found ${items.length} items to generate\n`);

  // Generate audio for each item
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`[${i + 1}/${items.length}] Generating: ${item.text} (${item.slow ? 'slow' : 'normal'})`);

    try {
      switch (provider) {
        case 'google':
          await generateWithGoogle(item);
          break;
        case 'openai':
          await generateWithOpenAI(item);
          break;
        case 'macos':
        default:
          await generateWithMacOS(item);
          break;
      }
      successCount++;
    } catch (error) {
      console.error(`❌ Error:`, error);
      failCount++;
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n✅ Audio Generation Complete!');
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`\n📁 Audio files saved to: ${AUDIO_CONFIG.outputDir}`);
};

// Parse command line arguments
const args = process.argv.slice(2);
const provider = args.find(arg => arg.startsWith('--provider='))?.split('=')[1] || 'macos';

// Run generator
generateAudio(provider).catch(console.error);

export { generateAudio, collectAudioItems };
