import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/utils/theme';

export default function TermsOfServicePage() {
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
          Foydalanish shartlari
        </Text>

        <Section title="1. Umumiy qoidalar" colors={colors}>
          Easy English ilovasidan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz.
          Agar siz ushbu shartlarga rozi bo'lmasangiz, iltimos ilovadan foydalanmang.
        </Section>

        <Section title="2. Hisob yaratish" colors={colors}>
          Ilovadan foydalanish uchun hisob yaratishingiz kerak. Siz o'z hisobingiz xavfsizligi
          uchun javobgarsiz. Hisob ma'lumotlaringizni boshqalar bilan baham ko'rmang.
        </Section>

        <Section title="3. Foydalanish qoidalari" colors={colors}>
          Ilovadan foydalanishda quyidagilarga rioya qiling:{'\n\n'}
          • Boshqa foydalanuvchilarga hurmat bilan munosabatda bo'ling{'\n'}
          • Noto'g'ri yoki zararli kontent joylashtirmang{'\n'}
          • Ilovani buzishga yoki suiiste'mol qilishga urinmang{'\n'}
          • Reyting tizimini sun'iy ravishda oshirishga harakat qilmang
        </Section>

        <Section title="4. Intellektual mulk" colors={colors}>
          Ilovadagi barcha kontent, jumladan darslar, rasmlar, ovozli yozuvlar va dizayn
          Easy English jamoasining mulki hisoblanadi. Ruxsatsiz nusxalash yoki tarqatish
          taqiqlanadi.
        </Section>

        <Section title="5. Xizmat ko'rsatish" colors={colors}>
          Biz ilovani doimiy ravishda yaxshilash va yangilash huquqini saqlab qolamiz. Ba'zi
          xususiyatlar o'zgarishi yoki olib tashlanishi mumkin. Biz bu haqda oldindan xabar
          berishga harakat qilamiz.
        </Section>

        <Section title="6. Javobgarlik cheklovi" colors={colors}>
          Easy English ta'lim maqsadlarida taqdim etiladi. Biz ilova orqali erishilgan natijalar
          uchun kafolat bermaymiz. Ilova "boricha" taqdim etiladi.
        </Section>

        <Section title="7. Hisobni to'xtatish" colors={colors}>
          Biz foydalanish shartlarini buzgan hisoblarni ogohlantirishsiz to'xtatish huquqini
          saqlab qolamiz.
        </Section>

        <Section title="8. O'zgarishlar" colors={colors}>
          Biz ushbu shartlarni istalgan vaqtda o'zgartirish huquqini saqlab qolamiz. O'zgarishlar
          ilovada e'lon qilingan paytdan boshlab kuchga kiradi.
        </Section>

        <Section title="9. Aloqa" colors={colors}>
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
