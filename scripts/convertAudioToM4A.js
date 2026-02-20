#!/usr/bin/env node

/**
 * Convert all AIFF files to M4A (AAC) format
 * M4A is the best format for React Native on iOS
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const AUDIO_DIR = path.join(__dirname, '../assets/audio');

// Find all AIFF files recursively
const findAiffFiles = (dir) => {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findAiffFiles(fullPath));
    } else if (item.endsWith('.aiff')) {
      files.push(fullPath);
    }
  }
  
  return files;
};

// Convert AIFF to M4A
const convertToM4A = async (aiffPath) => {
  const m4aPath = aiffPath.replace('.aiff', '.m4a');
  
  // Skip if M4A already exists
  if (fs.existsSync(m4aPath)) {
    return { success: true, file: aiffPath, skipped: true };
  }
  
  // afconvert -f m4af input.aiff output.m4a
  // Uses default AAC encoding (best compatibility with React Native)
  const command = `afconvert -f m4af "${aiffPath}" "${m4aPath}"`;
  
  try {
    await execAsync(command);
    return { success: true, file: aiffPath, m4a: m4aPath, skipped: false };
  } catch (error) {
    return { success: false, file: aiffPath, error: error.message };
  }
};

const main = async () => {
  console.log('🔄 Converting AIFF files to M4A...\n');
  
  const aiffFiles = findAiffFiles(AUDIO_DIR);
  console.log(`📁 Found ${aiffFiles.length} AIFF files\n`);
  
  let converted = 0;
  let skipped = 0;
  let failed = 0;
  
  for (let i = 0; i < aiffFiles.length; i++) {
    const file = aiffFiles[i];
    const relativePath = path.relative(AUDIO_DIR, file);
    
    process.stdout.write(`[${i + 1}/${aiffFiles.length}] Converting ${relativePath}...`);
    
    const result = await convertToM4A(file);
    
    if (result.success) {
      if (result.skipped) {
        process.stdout.write(' ⏭️  Skipped\n');
        skipped++;
      } else {
        process.stdout.write(' ✅\n');
        converted++;
      }
    } else {
      process.stdout.write(` ❌ ${result.error}\n`);
      failed++;
    }
  }
  
  console.log('\n📊 Conversion Summary:');
  console.log(`   ✅ Converted: ${converted}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📁 Total: ${aiffFiles.length}\n`);
  
  if (converted > 0 || skipped > 0) {
    console.log('✅ Done! Now run: npm run update-audio-assets');
  }
};

main().catch(console.error);
