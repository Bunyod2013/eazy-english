# 🎙️ Audio Generatsiya Qilish - O'zbek tilida yo'riqnoma

## 📝 Umumiy Ma'lumot

EazyEnglish ilovangiz uchun professional audio fayllar yaratish tizimi tayyor!

## 🚀 Tezkor Boshlash (macOS uchun)

### 1-Qadam: Audio Yaratish

Terminal ochib, quyidagi buyruqni yozing:

```bash
npm run generate-audio-simple
```

Yoki:

```bash
node scripts/generateAudioSimple.js
```

### 2-Qadam: Natijani Ko'rish

Script ishga tushgandan keyin:

```
🎙️  EazyEnglish Audio Generator (Simple Version)

Using macOS 'say' command with voice: Samantha

📁 Created directory: assets/audio/words
📁 Created directory: assets/audio/words-slow
📁 Created directory: assets/audio/phrases
📁 Created directory: assets/audio/phrases-slow

🎵 Generating audio files...

📂 Category: GREETINGS
  Generating: Hello (normal)... ✅
  Generating: Hello (slow)... ✅
  Generating: Good morning (normal)... ✅
  Generating: Good morning (slow)... ✅
  ...
```

### 3-Qadam: Audio Fayllar Tekshirish

```bash
ls -lh assets/audio/words/
```

Natija:
```
hello.aiff
goodbye.aiff
thank_you.aiff
please.aiff
...
```

## 📊 Nima Yaratiladi?

### Audio Kategoriyalar

Script **200+ audio fayl** yaratadi:

#### 1. Harflar (A-Z)
- `a.aiff`, `b.aiff`, ..., `z.aiff`
- Har biri **normal** va **sekin** versiyada

#### 2. Salomlashuvlar
- Hello, Hi, Goodbye, Good morning, Good night
- How are you?, Nice to meet you

#### 3. Xushmuomalalik So'zlari
- Please, Thank you, You're welcome
- Excuse me, Sorry, Yes, No

#### 4. Raqamlar (1-10)
- One, Two, Three, ..., Ten

#### 5. Ranglar
- Red, Blue, Green, Yellow, Black, White, ...

#### 6. Oila
- Mother, Father, Sister, Brother, Grandmother, ...

#### 7. Ovqat
- Water, Milk, Bread, Apple, Banana, Rice, Egg, ...

#### 8. Hayvonlar
- Cat, Dog, Bird, Fish, Cow, Horse, ...

#### 9. Fe'llar
- Eat, Drink, Sleep, Walk, Run, Read, Write, ...

#### 10. Maktab
- Book, Pen, Pencil, Teacher, Student, School, ...

### Fayl Tuzilmasi

```
assets/audio/
├── words/              # Oddiy tezlikdagi so'zlar (175 WPM)
│   ├── hello.aiff
│   ├── goodbye.aiff
│   ├── water.aiff
│   └── ... (~100 fayl)
│
├── words-slow/         # Sekin tezlikdagi so'zlar (100 WPM)
│   ├── hello.aiff
│   ├── goodbye.aiff
│   └── ... (~100 fayl)
│
├── phrases/            # Oddiy tezlikdagi iboralar
│   ├── good_morning.aiff
│   ├── how_are_you.aiff
│   └── ... (~50 fayl)
│
└── phrases-slow/       # Sekin tezlikdagi iboralar
    ├── good_morning.aiff
    └── ... (~50 fayl)
```

## 🎯 Ilovada Ishlatish

### 1. Darslaringizga Audio Qo'shish

`data/lessons/duolingoStyleLessons.ts` faylini yangilang:

```typescript
{
  type: 'vocabulary',
  word: 'Hello',
  translation: 'Salom',
  pronunciation: '/həˈloʊ/',
  
  // ✅ Audio fayl yo'lini qo'shing
  audio: 'words/hello.aiff',
  audioText: 'Hello',  // Fallback uchun
  
  image: '👋',
  examples: [...]
}
```

### 2. Listening Savollarda

```typescript
{
  type: 'listening',
  promptUz: 'Eshitilgan gapni tanlang',
  
  // ✅ Audio yo'li
  audio: 'phrases/how_are_you.aiff',
  audioText: 'How are you?',
  
  correctAnswer: 'How are you?',
  options: [
    'How are you?',
    'Where are you?',
    'Who are you?',
    'What are you?'
  ]
}
```

### 3. Sekin/Tez Tezlik Tanlash

```typescript
const [isSlowSpeed, setIsSlowSpeed] = useState(false);

const handlePlayAudio = async () => {
  const audioPath = isSlowSpeed 
    ? 'words-slow/hello.aiff'
    : 'words/hello.aiff';
  
  await playAudio(audioPath, 'Hello', isSlowSpeed);
};
```

## ⚙️ Sozlamalar

### Ovozni O'zgartirish

`scripts/generateAudioSimple.js` faylida:

```javascript
const VOICE = 'Samantha';  // Ayol ovozi (default)
```

Boshqa ovozlar:
```javascript
const VOICE = 'Alex';      // Erkak ovozi
const VOICE = 'Fiona';     // Shotland aksenti
const VOICE = 'Daniel';    // Britaniya aksenti
```

Barcha mavjud ovozlar:
```bash
say -v ?
```

### Tezlikni Sozlash

```javascript
const rate = slow ? 100 : 175;
```

- **80-100 WPM** - Juda sekin (yangi boshlanuvchilar)
- **150-175 WPM** - O'rtacha tezlik (tavsiya qilinadi)
- **200-250 WPM** - Tez (advanced)

### Ko'proq So'z Qo'shish

`generateAudioSimple.js` da `AUDIO_CONTENT` ga yangi kategoriya qo'shing:

```javascript
const AUDIO_CONTENT = {
  // ... mavjud kategoriyalar
  
  // Yangi kategoriya
  weather: [
    'Sun', 'Rain', 'Snow', 'Cloud', 'Wind', 'Hot', 'Cold'
  ],
  
  // Yangi iboralar
  questions: [
    'What is your name?',
    'Where do you live?',
    'How old are you?'
  ]
};
```

Keyin qayta ishga tushiring:
```bash
npm run generate-audio-simple
```

## 💰 Premium Yechim: OpenAI TTS

Eng yaxshi sifat kerak bo'lsa, OpenAI TTS ishlatng:

### 1. OpenAI API Key Oling

1. [OpenAI Platform](https://platform.openai.com/signup) ga boring
2. Account yarating
3. API Keys bo'limiga o'ting
4. "Create new secret key" tugmasini bosing
5. Key'ni nusxalang

### 2. Environment Variable O'rnating

Terminal'da:

```bash
export OPENAI_API_KEY="sk-..."
```

Yoki `.env` fayl yarating:

```
OPENAI_API_KEY=sk-...
```

### 3. Audio Yarating

```bash
npm run generate-audio -- --provider=openai
```

**Ovozlar:**
- `alloy` - Neytral
- `echo` - Erkak
- `fable` - Britaniya aksenti
- `onyx` - Chuqur erkak ovoz
- `nova` - Ayol (tavsiya)
- `shimmer` - Yengil ayol ovoz

**Narx:** ~$15 per 1M belgi
- Bizning barcha content: ~100,000 belgi
- Jami: **~$1.50** (bir martalik)

## 🔄 AIFF ni MP3 ga O'zgartirish

AIFF fayllar katta (50MB+). MP3 ga o'zgartirish uchun:

### 1. ffmpeg O'rnatish

```bash
brew install ffmpeg
```

### 2. Convert Qilish

```bash
cd assets/audio/words
for file in *.aiff; do
  ffmpeg -i "$file" -acodec libmp3lame -ab 128k "${file%.aiff}.mp3"
  rm "$file"
done
```

Yoki barcha papkalar uchun:

```bash
cd assets/audio
for dir in words words-slow phrases phrases-slow; do
  cd $dir
  for file in *.aiff; do
    ffmpeg -i "$file" -acodec libmp3lame -ab 128k "${file%.aiff}.mp3"
    rm "$file"
  done
  cd ..
done
```

**Natija:**
- AIFF: ~50MB → MP3: ~15MB (70% kichik!)

## 🐛 Muammolar va Yechimlar

### ❌ "say: command not found"

**Sabab:** macOS emas

**Yechim:** OpenAI TTS ishlatng:
```bash
npm run generate-audio -- --provider=openai
```

### ❌ "Permission denied"

**Sabab:** Script executable emas

**Yechim:**
```bash
chmod +x scripts/generateAudioSimple.js
node scripts/generateAudioSimple.js
```

### ❌ Audio ishlmayapti

**Sabab:** Expo audio moduli noto'g'ri o'rnatilgan

**Yechim:**
```bash
npm install expo-av expo-speech
npx expo install expo-av expo-speech
```

### ❌ Fayllar yaratildi lekin app'da eshitilmaydi

**Sabab:** Cache muammosi

**Yechim:**
```bash
npm start -- --clear
# Yoki
rm -rf .expo
npm start
```

## 📈 Ish Rejasi

### ✅ Hozir Qilish Kerak

1. **Audio fayllarni yarating:**
   ```bash
   npm run generate-audio-simple
   ```

2. **Darslaringizni yangilang:**
   - `duolingoStyleLessons.ts` ga audio yo'llarini qo'shing

3. **Test qiling:**
   ```bash
   npm run ios
   ```

### 🔜 Kelajakda Qilish Mumkin

1. **Uzbek tilida audio** (agar kerak bo'lsa)
2. **Ko'proq ovozlar** (erkak/ayol)
3. **Ko'proq tezliklar** (3-4 xil tezlik)
4. **On-demand generation** (kerakda yaratish)

## 💡 Foydali Maslahatlar

### 1. Audio Size ni Kamaytirish

```javascript
// Low quality (kichik fayl, past sifat)
ffmpeg -i input.aiff -ab 64k output.mp3

// Medium quality (tavsiya)
ffmpeg -i input.aiff -ab 128k output.mp3

// High quality (katta fayl, yuqori sifat)
ffmpeg -i input.aiff -ab 192k output.mp3
```

### 2. Faqat Kerakli So'zlarni Yaratish

`generateAudioSimple.js` da faqat kerakli kategoriyalarni qoldiring:

```javascript
const AUDIO_CONTENT = {
  greetings: [...],
  numbers: [...],
  // Qolganini comment qiling
  // colors: [...],
  // animals: [...],
};
```

### 3. Custom So'zlar uchun

Yangi fayl yarating `scripts/generateCustomAudio.js`:

```javascript
const CUSTOM_WORDS = [
  'Congratulations',
  'Excellent',
  'Try again',
  'Well done'
];

// ... generate logic
```

## 📞 Yordam

Savol yoki muammo bo'lsa:

1. **Log'larni tekshiring:** Script chiqaradigan xabarlarni o'qing
2. **Fayllarni tekshiring:** `ls -la assets/audio/words/`
3. **Test qiling:** Bitta fayl bilan sinab ko'ring

## 🎉 Natija

Audio generation tizimi tayyor! 

**Endi sizda:**
- ✅ 200+ professional audio fayl
- ✅ Oddiy va sekin tezliklar
- ✅ Barcha asosiy kategoriyalar
- ✅ Osongina kengaytirish imkoniyati

**Keyingi qadam:**
```bash
npm run generate-audio-simple
```

**Omad tilaymiz!** 🚀🎙️
