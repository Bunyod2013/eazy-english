import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/utils/theme';

export default function PrivacyPolicyPage() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.primary }}>
      <View style={{ paddingTop: 60, paddingHorizontal: 20, paddingBottom: 12 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: colors.text.secondary, fontSize: 16 }}>← Orqaga</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 8 }}>
        <Text style={{ color: colors.text.primary, fontSize: 24, fontWeight: '700', marginBottom: 20 }}>
          Maxfiylik siyosati
        </Text>

        <Section title="1. Kirish" colors={colors}>
          Easy English ilovasiga xush kelibsiz. Biz sizning maxfiyligingizni hurmat qilamiz va shaxsiy
          ma'lumotlaringizni himoya qilishga intilamiz. Ushbu maxfiylik siyosati qanday ma'lumotlar
          to'planishi, ulardan qanday foydalanilishi va himoya qilinishi haqida tushuntiradi.
        </Section>

        <Section title="2. To'planadigan ma'lumotlar" colors={colors}>
          Biz quyidagi ma'lumotlarni to'playmiz:{'\n\n'}
          • Elektron pochta manzilingiz{'\n'}
          • Foydalanuvchi nomi{'\n'}
          • O'quv jarayoni statistikasi (tugatilgan darslar, XP, streak){'\n'}
          • Ilova sozlamalari (til, mavzu, bildirishnomalar)
        </Section>

        <Section title="3. Ma'lumotlardan foydalanish" colors={colors}>
          To'plangan ma'lumotlar quyidagi maqsadlarda ishlatiladi:{'\n\n'}
          • Shaxsiy o'quv tajribangizni yaxshilash{'\n'}
          • O'quv jarayoningizni kuzatish{'\n'}
          • Reyting tizimini yuritish{'\n'}
          • Ilovani takomillashtirish
        </Section>

        <Section title="4. Ma'lumotlar xavfsizligi" colors={colors}>
          Biz sizning ma'lumotlaringizni himoya qilish uchun zamonaviy xavfsizlik choralarini
          qo'llaymiz. Ma'lumotlar shifrlangan holda saqlanadi va faqat vakolatli xodimlar tomonidan
          foydalaniladi.
        </Section>

        <Section title="5. Uchinchi tomonlar" colors={colors}>
          Biz sizning shaxsiy ma'lumotlaringizni uchinchi tomonlarga sotmaymiz yoki boshqa
          maqsadlarda taqdim etmaymiz. Faqat xizmat ko'rsatish uchun zarur bo'lgan holatlarda
          ishonchli hamkorlarga ma'lumot taqdim etilishi mumkin.
        </Section>

        <Section title="6. Foydalanuvchi huquqlari" colors={colors}>
          Siz quyidagi huquqlarga egasiz:{'\n\n'}
          • O'z ma'lumotlaringizni ko'rish{'\n'}
          • Ma'lumotlarni o'zgartirish yoki yangilash{'\n'}
          • Hisobingizni o'chirish{'\n'}
          • Ma'lumotlar nusxasini so'rash
        </Section>

        <Section title="7. Aloqa" colors={colors}>
          Savollaringiz bo'lsa, biz bilan bog'laning:{'\n'}
          support@easyenglish.uz
        </Section>

        <Text style={{ color: colors.text.tertiary, fontSize: 12, marginTop: 20, marginBottom: 40 }}>
          Oxirgi yangilanish: 2024-yil, dekabr
        </Text>
      </ScrollView>
    </View>
  );
}

function Section({ title, children, colors }: { title: string; children: string; colors: any }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ color: colors.text.primary, fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
        {title}
      </Text>
      <Text style={{ color: colors.text.secondary, fontSize: 14, lineHeight: 22 }}>
        {children}
      </Text>
    </View>
  );
}
