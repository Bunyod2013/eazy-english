/**
 * Common basic words for beginners (~150 words)
 * Shared foundation before purpose-specific content
 */

export interface PurposeWord {
  word: string;
  translation: string;
  emoji: string;
  explanation: string;
  category: string;
}

export const COMMON_WORDS: PurposeWord[] = [
  // Greetings (15)
  { word: 'Hello', translation: 'Salom', emoji: '👋', explanation: 'Eng keng tarqalgan salomlashuv', category: 'greetings' },
  { word: 'Hi', translation: 'Salom (qisqa)', emoji: '👋', explanation: 'Norasmiy salomlashuv', category: 'greetings' },
  { word: 'Goodbye', translation: 'Xayr', emoji: '👋', explanation: 'Xayrlashish uchun', category: 'greetings' },
  { word: 'Good morning', translation: 'Xayrli tong', emoji: '🌅', explanation: 'Ertalab salomlashuv', category: 'greetings' },
  { word: 'Good evening', translation: 'Xayrli kech', emoji: '🌆', explanation: 'Kechqurun salomlashuv', category: 'greetings' },
  { word: 'Good night', translation: 'Xayrli tun', emoji: '🌙', explanation: 'Uxlashdan oldin aytiladi', category: 'greetings' },
  { word: 'Please', translation: 'Iltimos', emoji: '🙏', explanation: 'Iltimos qilishda ishlatiladi', category: 'greetings' },
  { word: 'Thank you', translation: 'Rahmat', emoji: '🙏', explanation: 'Minnatdorchilik bildirish', category: 'greetings' },
  { word: 'Sorry', translation: 'Kechirasiz', emoji: '😔', explanation: 'Uzr so\'rash', category: 'greetings' },
  { word: 'Excuse me', translation: 'Kechirasiz', emoji: '🙋', explanation: 'E\'tibor so\'rash', category: 'greetings' },
  { word: 'Yes', translation: 'Ha', emoji: '✅', explanation: 'Rozilik bildirish', category: 'greetings' },
  { word: 'No', translation: 'Yo\'q', emoji: '❌', explanation: 'Rad etish', category: 'greetings' },
  { word: 'Ok', translation: 'Mayli', emoji: '👌', explanation: 'Rozilik bildirish', category: 'greetings' },
  { word: 'Welcome', translation: 'Xush kelibsiz', emoji: '🤗', explanation: 'Mehmon kutib olish', category: 'greetings' },
  { word: 'How are you', translation: 'Qalaysiz', emoji: '😊', explanation: 'Ahvol so\'rash', category: 'greetings' },

  // Numbers 1-20 (20)
  { word: 'One', translation: 'Bir', emoji: '1️⃣', explanation: '1 raqami', category: 'numbers' },
  { word: 'Two', translation: 'Ikki', emoji: '2️⃣', explanation: '2 raqami', category: 'numbers' },
  { word: 'Three', translation: 'Uch', emoji: '3️⃣', explanation: '3 raqami', category: 'numbers' },
  { word: 'Four', translation: 'To\'rt', emoji: '4️⃣', explanation: '4 raqami', category: 'numbers' },
  { word: 'Five', translation: 'Besh', emoji: '5️⃣', explanation: '5 raqami', category: 'numbers' },
  { word: 'Six', translation: 'Olti', emoji: '6️⃣', explanation: '6 raqami', category: 'numbers' },
  { word: 'Seven', translation: 'Yetti', emoji: '7️⃣', explanation: '7 raqami', category: 'numbers' },
  { word: 'Eight', translation: 'Sakkiz', emoji: '8️⃣', explanation: '8 raqami', category: 'numbers' },
  { word: 'Nine', translation: 'To\'qqiz', emoji: '9️⃣', explanation: '9 raqami', category: 'numbers' },
  { word: 'Ten', translation: 'O\'n', emoji: '🔟', explanation: '10 raqami', category: 'numbers' },
  { word: 'Eleven', translation: 'O\'n bir', emoji: '🔢', explanation: '11 raqami', category: 'numbers' },
  { word: 'Twelve', translation: 'O\'n ikki', emoji: '🔢', explanation: '12 raqami', category: 'numbers' },
  { word: 'Thirteen', translation: 'O\'n uch', emoji: '🔢', explanation: '13 raqami', category: 'numbers' },
  { word: 'Fourteen', translation: 'O\'n to\'rt', emoji: '🔢', explanation: '14 raqami', category: 'numbers' },
  { word: 'Fifteen', translation: 'O\'n besh', emoji: '🔢', explanation: '15 raqami', category: 'numbers' },
  { word: 'Sixteen', translation: 'O\'n olti', emoji: '🔢', explanation: '16 raqami', category: 'numbers' },
  { word: 'Seventeen', translation: 'O\'n yetti', emoji: '🔢', explanation: '17 raqami', category: 'numbers' },
  { word: 'Eighteen', translation: 'O\'n sakkiz', emoji: '🔢', explanation: '18 raqami', category: 'numbers' },
  { word: 'Nineteen', translation: 'O\'n to\'qqiz', emoji: '🔢', explanation: '19 raqami', category: 'numbers' },
  { word: 'Twenty', translation: 'Yigirma', emoji: '🔢', explanation: '20 raqami', category: 'numbers' },

  // Colors (10)
  { word: 'Red', translation: 'Qizil', emoji: '🔴', explanation: 'Qizil rang', category: 'colors' },
  { word: 'Blue', translation: 'Ko\'k', emoji: '🔵', explanation: 'Ko\'k rang', category: 'colors' },
  { word: 'Green', translation: 'Yashil', emoji: '🟢', explanation: 'Yashil rang', category: 'colors' },
  { word: 'Yellow', translation: 'Sariq', emoji: '🟡', explanation: 'Sariq rang', category: 'colors' },
  { word: 'White', translation: 'Oq', emoji: '⚪', explanation: 'Oq rang', category: 'colors' },
  { word: 'Black', translation: 'Qora', emoji: '⚫', explanation: 'Qora rang', category: 'colors' },
  { word: 'Orange', translation: 'To\'q sariq', emoji: '🟠', explanation: 'To\'q sariq rang', category: 'colors' },
  { word: 'Pink', translation: 'Pushti', emoji: '🩷', explanation: 'Pushti rang', category: 'colors' },
  { word: 'Purple', translation: 'Binafsha', emoji: '🟣', explanation: 'Binafsha rang', category: 'colors' },
  { word: 'Brown', translation: 'Jigarrang', emoji: '🟤', explanation: 'Jigarrang', category: 'colors' },

  // Family (15)
  { word: 'Mother', translation: 'Ona', emoji: '👩', explanation: 'Onajon', category: 'family' },
  { word: 'Father', translation: 'Ota', emoji: '👨', explanation: 'Otajon', category: 'family' },
  { word: 'Brother', translation: 'Aka/Uka', emoji: '👦', explanation: 'Erkak farzand', category: 'family' },
  { word: 'Sister', translation: 'Opa/Singil', emoji: '👧', explanation: 'Qiz farzand', category: 'family' },
  { word: 'Baby', translation: 'Chaqaloq', emoji: '👶', explanation: 'Kichkina bola', category: 'family' },
  { word: 'Son', translation: 'O\'g\'il', emoji: '👦', explanation: 'Erkak farzand', category: 'family' },
  { word: 'Daughter', translation: 'Qiz', emoji: '👧', explanation: 'Qiz farzand', category: 'family' },
  { word: 'Grandfather', translation: 'Bobo', emoji: '👴', explanation: 'Ota yoki onaning otasi', category: 'family' },
  { word: 'Grandmother', translation: 'Buvi', emoji: '👵', explanation: 'Ota yoki onaning onasi', category: 'family' },
  { word: 'Husband', translation: 'Er', emoji: '👨', explanation: 'Turmush o\'rtog\'i (erkak)', category: 'family' },
  { word: 'Wife', translation: 'Xotin', emoji: '👩', explanation: 'Turmush o\'rtog\'i (ayol)', category: 'family' },
  { word: 'Uncle', translation: 'Tog\'a/Amaki', emoji: '👨', explanation: 'Ota yoki onaning akasi', category: 'family' },
  { word: 'Aunt', translation: 'Xola/Amma', emoji: '👩', explanation: 'Ota yoki onaning opasi', category: 'family' },
  { word: 'Cousin', translation: 'Amakivachcha', emoji: '🧑', explanation: 'Amaki yoki xolaning bolasi', category: 'family' },
  { word: 'Family', translation: 'Oila', emoji: '👨‍👩‍👧‍👦', explanation: 'Oila a\'zolari', category: 'family' },

  // Food basics (15)
  { word: 'Water', translation: 'Suv', emoji: '💧', explanation: 'Ichimlik', category: 'food' },
  { word: 'Bread', translation: 'Non', emoji: '🍞', explanation: 'Asosiy oziq-ovqat', category: 'food' },
  { word: 'Rice', translation: 'Guruch', emoji: '🍚', explanation: 'Don oziq-ovqat', category: 'food' },
  { word: 'Meat', translation: 'Go\'sht', emoji: '🥩', explanation: 'Hayvon go\'shti', category: 'food' },
  { word: 'Milk', translation: 'Sut', emoji: '🥛', explanation: 'Sut mahsuloti', category: 'food' },
  { word: 'Egg', translation: 'Tuxum', emoji: '🥚', explanation: 'Tovuq tuxumi', category: 'food' },
  { word: 'Apple', translation: 'Olma', emoji: '🍎', explanation: 'Meva', category: 'food' },
  { word: 'Tea', translation: 'Choy', emoji: '🍵', explanation: 'Issiq ichimlik', category: 'food' },
  { word: 'Coffee', translation: 'Qahva', emoji: '☕', explanation: 'Issiq ichimlik', category: 'food' },
  { word: 'Sugar', translation: 'Shakar', emoji: '🍬', explanation: 'Shirin ta\'m beruvchi', category: 'food' },
  { word: 'Salt', translation: 'Tuz', emoji: '🧂', explanation: 'Sho\'r ta\'m beruvchi', category: 'food' },
  { word: 'Fruit', translation: 'Meva', emoji: '🍎', explanation: 'Daraxt mevasi', category: 'food' },
  { word: 'Vegetable', translation: 'Sabzavot', emoji: '🥕', explanation: 'O\'simlik oziq-ovqat', category: 'food' },
  { word: 'Chicken', translation: 'Tovuq', emoji: '🍗', explanation: 'Tovuq go\'shti', category: 'food' },
  { word: 'Fish', translation: 'Baliq', emoji: '🐟', explanation: 'Dengiz mahsuloti', category: 'food' },

  // Animals (10)
  { word: 'Dog', translation: 'It', emoji: '🐕', explanation: 'Uy hayvoni', category: 'animals' },
  { word: 'Cat', translation: 'Mushuk', emoji: '🐈', explanation: 'Uy hayvoni', category: 'animals' },
  { word: 'Bird', translation: 'Qush', emoji: '🐦', explanation: 'Uchuvchi hayvon', category: 'animals' },
  { word: 'Horse', translation: 'Ot', emoji: '🐴', explanation: 'Katta hayvon', category: 'animals' },
  { word: 'Cow', translation: 'Sigir', emoji: '🐄', explanation: 'Sut beruvchi hayvon', category: 'animals' },
  { word: 'Sheep', translation: 'Qo\'y', emoji: '🐑', explanation: 'Jun beruvchi hayvon', category: 'animals' },
  { word: 'Lion', translation: 'Sher', emoji: '🦁', explanation: 'Hayvonlar shohi', category: 'animals' },
  { word: 'Elephant', translation: 'Fil', emoji: '🐘', explanation: 'Eng katta hayvon', category: 'animals' },
  { word: 'Rabbit', translation: 'Quyon', emoji: '🐰', explanation: 'Kichik hayvon', category: 'animals' },
  { word: 'Bear', translation: 'Ayiq', emoji: '🐻', explanation: 'Katta yirtqich hayvon', category: 'animals' },

  // Body (10)
  { word: 'Head', translation: 'Bosh', emoji: '🧠', explanation: 'Tananing yuqori qismi', category: 'body' },
  { word: 'Eye', translation: 'Ko\'z', emoji: '👁️', explanation: 'Ko\'rish a\'zosi', category: 'body' },
  { word: 'Ear', translation: 'Quloq', emoji: '👂', explanation: 'Eshitish a\'zosi', category: 'body' },
  { word: 'Mouth', translation: 'Og\'iz', emoji: '👄', explanation: 'Ovqat yeyish a\'zosi', category: 'body' },
  { word: 'Hand', translation: 'Qo\'l', emoji: '✋', explanation: 'Ushlab turish a\'zosi', category: 'body' },
  { word: 'Leg', translation: 'Oyoq', emoji: '🦵', explanation: 'Yurish a\'zosi', category: 'body' },
  { word: 'Heart', translation: 'Yurak', emoji: '❤️', explanation: 'Muhim a\'zo', category: 'body' },
  { word: 'Face', translation: 'Yuz', emoji: '😊', explanation: 'Boshning old qismi', category: 'body' },
  { word: 'Nose', translation: 'Burun', emoji: '👃', explanation: 'Nafas olish a\'zosi', category: 'body' },
  { word: 'Hair', translation: 'Soch', emoji: '💇', explanation: 'Boshda o\'sadi', category: 'body' },

  // Clothes (8)
  { word: 'Shirt', translation: 'Ko\'ylak', emoji: '👕', explanation: 'Ustki kiyim', category: 'clothes' },
  { word: 'Pants', translation: 'Shim', emoji: '👖', explanation: 'Pastki kiyim', category: 'clothes' },
  { word: 'Shoes', translation: 'Poyabzal', emoji: '👟', explanation: 'Oyoq kiyimi', category: 'clothes' },
  { word: 'Hat', translation: 'Shapka', emoji: '🎩', explanation: 'Bosh kiyimi', category: 'clothes' },
  { word: 'Dress', translation: 'Ko\'ylak', emoji: '👗', explanation: 'Ayollar kiyimi', category: 'clothes' },
  { word: 'Jacket', translation: 'Kurtka', emoji: '🧥', explanation: 'Ustki kiyim', category: 'clothes' },
  { word: 'Socks', translation: 'Paypoq', emoji: '🧦', explanation: 'Oyoq kiyimi', category: 'clothes' },
  { word: 'Coat', translation: 'Palto', emoji: '🧥', explanation: 'Issiq ustki kiyim', category: 'clothes' },

  // Daily Actions (15)
  { word: 'Eat', translation: 'Yemoq', emoji: '🍽️', explanation: 'Ovqat yeyish', category: 'actions' },
  { word: 'Drink', translation: 'Ichmoq', emoji: '🥤', explanation: 'Suyuqlik ichish', category: 'actions' },
  { word: 'Sleep', translation: 'Uxlamoq', emoji: '😴', explanation: 'Dam olish', category: 'actions' },
  { word: 'Walk', translation: 'Yurmoq', emoji: '🚶', explanation: 'Piyoda yurish', category: 'actions' },
  { word: 'Run', translation: 'Yugurmoq', emoji: '🏃', explanation: 'Tez yurish', category: 'actions' },
  { word: 'Read', translation: 'O\'qimoq', emoji: '📖', explanation: 'Kitob o\'qish', category: 'actions' },
  { word: 'Write', translation: 'Yozmoq', emoji: '✍️', explanation: 'Matn yozish', category: 'actions' },
  { word: 'Listen', translation: 'Tinglamoq', emoji: '👂', explanation: 'Ovoz eshitish', category: 'actions' },
  { word: 'Speak', translation: 'Gapirmoq', emoji: '💬', explanation: 'So\'zlash', category: 'actions' },
  { word: 'See', translation: 'Ko\'rmoq', emoji: '👁️', explanation: 'Ko\'z bilan ko\'rish', category: 'actions' },
  { word: 'Go', translation: 'Bormoq', emoji: '➡️', explanation: 'Bir joyga borish', category: 'actions' },
  { word: 'Come', translation: 'Kelmoq', emoji: '⬅️', explanation: 'Bu yerga kelish', category: 'actions' },
  { word: 'Open', translation: 'Ochmoq', emoji: '🔓', explanation: 'Eshikni ochish', category: 'actions' },
  { word: 'Close', translation: 'Yopmoq', emoji: '🔒', explanation: 'Eshikni yopish', category: 'actions' },
  { word: 'Give', translation: 'Bermoq', emoji: '🎁', explanation: 'Biror narsa berish', category: 'actions' },

  // Adjectives (10)
  { word: 'Big', translation: 'Katta', emoji: '🐘', explanation: 'Kattalik', category: 'adjectives' },
  { word: 'Small', translation: 'Kichik', emoji: '🐜', explanation: 'Kichiklik', category: 'adjectives' },
  { word: 'Good', translation: 'Yaxshi', emoji: '👍', explanation: 'Ijobiy sifat', category: 'adjectives' },
  { word: 'Bad', translation: 'Yomon', emoji: '👎', explanation: 'Salbiy sifat', category: 'adjectives' },
  { word: 'Hot', translation: 'Issiq', emoji: '🔥', explanation: 'Harorat yuqori', category: 'adjectives' },
  { word: 'Cold', translation: 'Sovuq', emoji: '❄️', explanation: 'Harorat past', category: 'adjectives' },
  { word: 'New', translation: 'Yangi', emoji: '✨', explanation: 'Endigina paydo bo\'lgan', category: 'adjectives' },
  { word: 'Old', translation: 'Eski', emoji: '🏚️', explanation: 'Uzoq vaqt oldin', category: 'adjectives' },
  { word: 'Happy', translation: 'Baxtli', emoji: '😊', explanation: 'Xursand', category: 'adjectives' },
  { word: 'Sad', translation: 'Xafa', emoji: '😢', explanation: 'G\'amgin', category: 'adjectives' },

  // Pronouns & Prepositions (15)
  { word: 'I', translation: 'Men', emoji: '👤', explanation: 'O\'zingizni bildirish', category: 'pronouns' },
  { word: 'You', translation: 'Siz', emoji: '👉', explanation: 'Boshqa odamni bildirish', category: 'pronouns' },
  { word: 'He', translation: 'U (erkak)', emoji: '👨', explanation: 'Erkak kishi', category: 'pronouns' },
  { word: 'She', translation: 'U (ayol)', emoji: '👩', explanation: 'Ayol kishi', category: 'pronouns' },
  { word: 'We', translation: 'Biz', emoji: '👥', explanation: 'Guruh', category: 'pronouns' },
  { word: 'They', translation: 'Ular', emoji: '👥', explanation: 'Boshqa odamlar', category: 'pronouns' },
  { word: 'This', translation: 'Bu', emoji: '👇', explanation: 'Yaqin narsa', category: 'pronouns' },
  { word: 'That', translation: 'O\'sha', emoji: '👉', explanation: 'Uzoq narsa', category: 'pronouns' },
  { word: 'In', translation: 'Ichida', emoji: '📦', explanation: 'Biror narsaning ichida', category: 'prepositions' },
  { word: 'On', translation: 'Ustida', emoji: '📋', explanation: 'Biror narsaning ustida', category: 'prepositions' },
  { word: 'At', translation: 'Da', emoji: '📍', explanation: 'Joy ko\'rsatish', category: 'prepositions' },
  { word: 'With', translation: 'Bilan', emoji: '🤝', explanation: 'Birga', category: 'prepositions' },
  { word: 'And', translation: 'Va', emoji: '➕', explanation: 'Bog\'lovchi', category: 'prepositions' },
  { word: 'But', translation: 'Lekin', emoji: '🔄', explanation: 'Qarshi bog\'lovchi', category: 'prepositions' },
  { word: 'Not', translation: 'Emas', emoji: '❌', explanation: 'Inkor', category: 'prepositions' },

  // House basics (7)
  { word: 'House', translation: 'Uy', emoji: '🏠', explanation: 'Yashash joyi', category: 'house' },
  { word: 'Room', translation: 'Xona', emoji: '🚪', explanation: 'Uyning bir qismi', category: 'house' },
  { word: 'Door', translation: 'Eshik', emoji: '🚪', explanation: 'Kirish joyi', category: 'house' },
  { word: 'Window', translation: 'Deraza', emoji: '🪟', explanation: 'Yorug\'lik kiradi', category: 'house' },
  { word: 'Table', translation: 'Stol', emoji: '🪑', explanation: 'Ustida ovqat yeyish', category: 'house' },
  { word: 'Chair', translation: 'Stul', emoji: '🪑', explanation: 'O\'tirish uchun', category: 'house' },
  { word: 'Bed', translation: 'Karavot', emoji: '🛏️', explanation: 'Uxlash uchun', category: 'house' },
];
