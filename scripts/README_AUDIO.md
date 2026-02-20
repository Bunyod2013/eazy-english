# 🎙️ Audio Generation Guide

Ushbu yo'riqnoma EazyEnglish ilovasi uchun audio fayllarni qanday yaratish haqida.

## 📋 Mavjud Yechimlar

### 1. **macOS TTS (Eng Oson)** ⭐ Tavsiya qilinadi
- ✅ **Bepul** - hech qanday API key kerak emas
- ✅ **Yuqori sifat** - Apple TTS juda yaxshi
- ✅ **Offline** - internet kerak emas
- ❌ Faqat macOS uchun

**Ishlatish:**
```bash
node scripts/generateAudioSimple.js
```

### 2. **OpenAI TTS (Eng Yaxshi Sifat)** 🌟
- ✅ **Juda tabiiy ovoz** - eng realistic
- ✅ **Yuqori sifat** - professional darajada
- ✅ **Barcha platformalar**
- ❌ API key kerak (~$15/1M characters)

**Setup:**
```bash
export OPENAI_API_KEY="your-key-here"
npm run generate-audio -- --provider=openai
```

### 3. **Google Cloud TTS** 🔊
- ✅ **Juda yaxshi sifat**
- ✅ **Ko'p tillar va ovozlar**
- ❌ API key va Google Cloud account kerak

### 4. **expo-speech (Hozirgi)** 📱
- ✅ **Allaqachon ishlayapti**
- ✅ **Hech narsa o'rnatish kerak emas**
- ✅ **Barcha platformalar**
- ⚠️ Sifat qurilmaga bog'liq

## 🚀 Tez Boshlash (macOS uchun)

### 1. Audio Fayllarni Yaratish

```bash
# Oddiy versiya (macOS)
node scripts/generateAudioSimple.js
```

Bu yaratadi:
```
assets/audio/
├── words/              # Oddiy tezlikdagi so'zlar
│   ├── hello.aiff
│   ├── goodbye.aiff
│   └── ...
├── words-slow/         # Sekin tezlikdagi so'zlar
│   ├── hello.aiff
│   └── ...
├── phrases/            # Iboralar
│   ├── good_morning.aiff
│   └── ...
└── phrases-slow/       # Sekin iboralar
    └── ...
```

### 2. Darslarni Yangilash

Audio fayllarni ishlatish uchun, `duolingoStyleLessons.ts` da:

```typescript
{
  type: 'vocabulary',
  word: 'Hello',
  audio: 'words/hello.aiff',     // ← Fayl yo'li qo'shing
  audioText: 'Hello',              // Fallback uchun
  translation: 'Salom',
}
```

### 3. Ilovada Test Qilish

```bash
npm run ios
```

Audio avtomatik ishga tushadi! 🎉

## 📝 Script Konfiguratsiyasi

### Ovozni O'zgartirish

`generateAudioSimple.js` da:

```javascript
const VOICE = 'Samantha';  // Ayol ovozi (default)
// const VOICE = 'Alex';   // Erkak ovozi
```

Barcha mavjud ovozlarni ko'rish:
```bash
say -v ?
```

### Tezlikni Sozlash

```javascript
const rate = slow ? 100 : 175;  // WPM (words per minute)
```

- **100 WPM** - Juda sekin (yangi boshlanuvchilar uchun)
- **175 WPM** - Oddiy tezlik (o'rtacha)
- **200+ WPM** - Tez

### Ko'proq So'z Qo'shish

`generateAudioSimple.js` da `AUDIO_CONTENT` obyektiga qo'shing:

```javascript
const AUDIO_CONTENT = {
  // Mavjudlar...
  
  // Yangi kategoriya
  weather: ['Sun', 'Rain', 'Snow', 'Cloud', 'Wind'],
};
```

## 🎯 OpenAI TTS Ishlatish (Premium)

### 1. OpenAI API Key Olish

1. [OpenAI Platform](https://platform.openai.com/api-keys) ga boring
2. API key yarating
3. Billing sozlang

### 2. Environment Variable O'rnatish

```bash
# .env faylida
OPENAI_API_KEY=sk-...your-key...

# Yoki export qiling
export OPENAI_API_KEY="sk-...your-key..."
```

### 3. Audio Yaratish

```bash
npm run generate-audio -- --provider=openai
```

**Narx:** ~$15 per 1M characters (bizning barcha lesson content ~100k characters ≈ $1.50)

### 4. Ovozlarni O'zgartirish

`generateAudio.ts` da:

```typescript
const VOICE_OPTIONS = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
```

## 📦 MP3 ga O'zgartirish (Optional)

AIFF fayllar katta bo'lishi mumkin. MP3 ga o'zgartirish uchun:

### 1. ffmpeg O'rnatish

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg
```

### 2. Convert Script Ishlatish

```bash
npm run convert-audio-to-mp3
```

Yoki qo'lda:
```bash
cd assets/audio/words
for file in *.aiff; do
  ffmpeg -i "$file" -acodec libmp3lame -ab 128k "${file%.aiff}.mp3"
  rm "$file"  # AIFF ni o'chirish
done
```

## 🔄 Audio Utility Yangilanishi

`utils/audio.ts` allaqachon ikkalasini ham qo'llab-quvvatlaydi:

```typescript
// Audio fayl bilan
playAudio('words/hello.aiff')

// Yoki fallback TTS bilan
playAudio(undefined, 'Hello')

// Ikkalasi bilan (fayl yo'q bo'lsa TTS)
playAudio('words/hello.aiff', 'Hello')
```

## 📊 Statistika

### Hozirgi Script

- **~200 so'z** va iboralar
- **~400 audio fayl** (normal + slow)
- **AIFF format:** ~50MB jami
- **MP3 format:** ~15MB jami
- **Generatsiya vaqti:** ~2-3 daqiqa

## 🎨 Kategoriyalar

Script quyidagi kategoriyalar uchun audio yaratadi:

1. **Alphabet** - A-Z harflar
2. **Greetings** - Salomlashuvlar
3. **Polite** - Iltimos, rahmat, kechirasiz
4. **Numbers** - 1-10 raqamlar
5. **Colors** - Ranglar
6. **Family** - Oila a'zolari
7. **Food** - Ovqat va ichimliklar
8. **Animals** - Hayvonlar
9. **Actions** - Fe'llar
10. **School** - Maktab buyumlari

## 🐛 Muammolar va Yechimlar

### "say: command not found"

**Muammo:** macOS emas yoki `say` o'chirilgan

**Yechim:** OpenAI TTS yoki Google TTS ishlatng:
```bash
npm run generate-audio -- --provider=openai
```

### "Permission denied"

**Muammo:** Script executable emas

**Yechim:**
```bash
chmod +x scripts/generateAudioSimple.js
```

### Audio qayta yuklanmayapti

**Muammo:** Expo cache

**Yechim:**
```bash
npm start -- --clear
```

## 🎯 Next Steps

### 1. Listening Questions uchun Audio

```typescript
// duolingoStyleLessons.ts
{
  type: 'listening',
  audio: 'phrases/how_are_you.aiff',
  audioText: 'How are you?',
  correctAnswer: 'How are you?',
  options: ['How are you?', 'Where are you?', 'Who are you?'],
}
```

### 2. Slow/Normal Toggle

```typescript
const [isSlow, setIsSlow] = useState(false);

playAudio(
  isSlow ? 'words-slow/hello.aiff' : 'words/hello.aiff',
  'Hello',
  isSlow
);
```

### 3. Auto-download Missing Audio

API dan avtomatik yuklab olish:

```typescript
const ensureAudio = async (audioPath: string, text: string) => {
  if (!fileExists(audioPath)) {
    // Generate on-demand
    await generateAndCacheAudio(text, audioPath);
  }
  return audioPath;
};
```

## 🌟 Tavsiyalar

### Boshlang'ich loyiha uchun
✅ **expo-speech** ishlatishda davom eting - hozir yaxshi ishlayapti

### Professional loyiha uchun
✅ **OpenAI TTS** bilan audio fayllar yarating - eng yaxshi sifat

### Offline App uchun
✅ **macOS say** yoki **Google Cloud TTS** bilan barcha audiolarni oldindan yarating

## 📞 Yordam

Savollar bo'lsa:
1. `scripts/generateAudioSimple.js` dan boshlang
2. Log'larni tekshiring
3. Audio fayllar yaratilganini tasdiqlang: `ls -lh assets/audio/words/`

**Omad tilaymiz!** 🎉🎙️
