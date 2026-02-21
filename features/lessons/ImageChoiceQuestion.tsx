import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Question } from '@/types';
import { useTheme } from '@/utils/theme';
import {
  SoundIcon, SparkleIcon, StarIcon, DiamondIcon, TrophyIcon, HeartIcon,
  FireIcon, DropIcon, BookIcon, StudyIcon, PencilIcon, TeacherIcon,
  WorldIcon, TargetIcon, WalkIcon, MusicIcon, HomeIcon, SunriseIcon,
  ManIcon, WomanIcon, BoyIcon, GirlIcon, PeopleIcon, WaveIcon, PrayIcon,
  BreadIcon, MilkIcon, PlateIcon, NumberOneIcon, ColorCircleIcon, CatIcon,
  FishIcon, TurtleIcon, LionIcon, TreasureIcon, VideoIcon, LightBulbIcon,
  SmileFaceIcon, ThumbUpIcon, AppleFruitIcon, CoffeeIcon, BirdIcon,
  BuildingIcon, TreeIcon, FlowerIcon, CloudWeatherIcon, ShirtIcon,
  CarIcon, PlaneIcon, LaptopIcon, PhoneIcon, CameraIcon, DocumentIcon,
  MailIcon, MoneyIcon, ChartIcon, ClockIcon, KaraokeMicIcon, PaletteIcon,
  GamepadIcon, BallIcon, KeyIcon, ShieldIcon, ChatBubbleIcon, RocketIcon,
  CartIcon, BedIcon, BriefcaseIcon, MapPinIcon, MedicalIcon, ToolIcon,
  BodyPartIcon,
} from '@/components/icons';
import { playAudio } from '@/utils/audio';

// ===========================================
// EMOJI → SVG ICON MAPPING (658 emojis → 70+ icons)
// ===========================================
type IconEntry = { icon: React.FC<any>; color: string };

const EMOJI_ICON_MAP: Record<string, IconEntry> = {
  // Greetings & Gestures
  '👋': { icon: WaveIcon, color: '#f59e0b' },
  '🤗': { icon: WaveIcon, color: '#f59e0b' },
  '🙋': { icon: WaveIcon, color: '#f59e0b' },
  '👌': { icon: WaveIcon, color: '#22c55e' },
  '🙏': { icon: PrayIcon, color: '#8b5cf6' },
  '👍': { icon: ThumbUpIcon, color: '#3b82f6' },
  '👎': { icon: ThumbUpIcon, color: '#ef4444' },
  '👊': { icon: ThumbUpIcon, color: '#f59e0b' },
  '✊': { icon: ThumbUpIcon, color: '#ef4444' },
  '👏': { icon: ThumbUpIcon, color: '#f59e0b' },
  '🤘': { icon: ThumbUpIcon, color: '#8b5cf6' },
  '🤞': { icon: ThumbUpIcon, color: '#3b82f6' },
  '🤲': { icon: PrayIcon, color: '#8b5cf6' },
  '🙌': { icon: ThumbUpIcon, color: '#f59e0b' },
  '👆': { icon: ThumbUpIcon, color: '#3b82f6' },
  '👇': { icon: ThumbUpIcon, color: '#3b82f6' },
  '👈': { icon: ThumbUpIcon, color: '#3b82f6' },
  '👉': { icon: ThumbUpIcon, color: '#3b82f6' },
  '☝️': { icon: ThumbUpIcon, color: '#3b82f6' },
  '🤏': { icon: ThumbUpIcon, color: '#6b7280' },
  '✋': { icon: WaveIcon, color: '#f59e0b' },
  '✍️': { icon: PencilIcon, color: '#6b7280' },

  // Happy faces
  '😊': { icon: SmileFaceIcon, color: '#fbbf24' },
  '😀': { icon: SmileFaceIcon, color: '#fbbf24' },
  '😄': { icon: SmileFaceIcon, color: '#fbbf24' },
  '😆': { icon: SmileFaceIcon, color: '#fbbf24' },
  '😂': { icon: SmileFaceIcon, color: '#fbbf24' },
  '🤣': { icon: SmileFaceIcon, color: '#fbbf24' },
  '😍': { icon: HeartIcon, color: '#ef4444' },
  '🥰': { icon: HeartIcon, color: '#ef4444' },
  '😎': { icon: SmileFaceIcon, color: '#3b82f6' },
  '🥳': { icon: SmileFaceIcon, color: '#ec4899' },
  '🤩': { icon: StarIcon, color: '#fbbf24' },
  '😇': { icon: SmileFaceIcon, color: '#60a5fa' },
  '😜': { icon: SmileFaceIcon, color: '#f59e0b' },
  '😏': { icon: SmileFaceIcon, color: '#6b7280' },
  '😌': { icon: SmileFaceIcon, color: '#22c55e' },
  '🤠': { icon: SmileFaceIcon, color: '#92400e' },
  '🙂': { icon: SmileFaceIcon, color: '#fbbf24' },
  '😐': { icon: SmileFaceIcon, color: '#9ca3af' },

  // Sad/negative faces
  '😔': { icon: SmileFaceIcon, color: '#6b7280' },
  '😢': { icon: DropIcon, color: '#3b82f6' },
  '😭': { icon: DropIcon, color: '#3b82f6' },
  '😡': { icon: FireIcon, color: '#ef4444' },
  '😠': { icon: FireIcon, color: '#ef4444' },
  '😤': { icon: FireIcon, color: '#f97316' },
  '😨': { icon: ShieldIcon, color: '#6366f1' },
  '😰': { icon: DropIcon, color: '#6b7280' },
  '😱': { icon: ShieldIcon, color: '#ef4444' },
  '😮': { icon: SmileFaceIcon, color: '#9ca3af' },
  '😲': { icon: SmileFaceIcon, color: '#f59e0b' },
  '😳': { icon: SmileFaceIcon, color: '#ec4899' },
  '😬': { icon: SmileFaceIcon, color: '#9ca3af' },
  '😞': { icon: SmileFaceIcon, color: '#6b7280' },
  '😕': { icon: SmileFaceIcon, color: '#9ca3af' },
  '😥': { icon: DropIcon, color: '#6b7280' },
  '😣': { icon: SmileFaceIcon, color: '#9ca3af' },
  '🤔': { icon: LightBulbIcon, color: '#f59e0b' },
  '😴': { icon: BedIcon, color: '#6366f1' },
  '🤐': { icon: ShieldIcon, color: '#6b7280' },
  '🤫': { icon: ShieldIcon, color: '#8b5cf6' },
  '🤭': { icon: SmileFaceIcon, color: '#ec4899' },
  '😈': { icon: FireIcon, color: '#8b5cf6' },
  '🧐': { icon: LightBulbIcon, color: '#92400e' },
  '😒': { icon: SmileFaceIcon, color: '#6b7280' },
  '🤒': { icon: MedicalIcon, color: '#ef4444' },
  '🤕': { icon: MedicalIcon, color: '#f59e0b' },
  '🤢': { icon: MedicalIcon, color: '#22c55e' },
  '🥲': { icon: SmileFaceIcon, color: '#60a5fa' },
  '🥹': { icon: SmileFaceIcon, color: '#ec4899' },
  '🥺': { icon: SmileFaceIcon, color: '#60a5fa' },
  '😮‍💨': { icon: SmileFaceIcon, color: '#9ca3af' },
  '🤯': { icon: FireIcon, color: '#ef4444' },
  '🤦': { icon: SmileFaceIcon, color: '#6b7280' },
  '🤷': { icon: SmileFaceIcon, color: '#6b7280' },

  // Numbers
  '1️⃣': { icon: NumberOneIcon, color: '#22c55e' },
  '2️⃣': { icon: NumberOneIcon, color: '#3b82f6' },
  '3️⃣': { icon: NumberOneIcon, color: '#8b5cf6' },
  '4️⃣': { icon: NumberOneIcon, color: '#ef4444' },
  '5️⃣': { icon: NumberOneIcon, color: '#f59e0b' },
  '6️⃣': { icon: NumberOneIcon, color: '#06b6d4' },
  '7️⃣': { icon: NumberOneIcon, color: '#ec4899' },
  '8️⃣': { icon: NumberOneIcon, color: '#22c55e' },
  '9️⃣': { icon: NumberOneIcon, color: '#6366f1' },
  '🔟': { icon: NumberOneIcon, color: '#3b82f6' },
  '🔢': { icon: NumberOneIcon, color: '#6b7280' },
  '🔣': { icon: NumberOneIcon, color: '#6b7280' },
  '🔤': { icon: BookIcon, color: '#3b82f6' },
  '🔡': { icon: BookIcon, color: '#22c55e' },

  // Colors
  '🔴': { icon: ColorCircleIcon, color: '#ef4444' },
  '🔵': { icon: ColorCircleIcon, color: '#3b82f6' },
  '🟢': { icon: ColorCircleIcon, color: '#22c55e' },
  '🟡': { icon: ColorCircleIcon, color: '#eab308' },
  '⚪': { icon: ColorCircleIcon, color: '#d1d5db' },
  '⚫': { icon: ColorCircleIcon, color: '#1f2937' },
  '🟠': { icon: ColorCircleIcon, color: '#f97316' },
  '🟣': { icon: ColorCircleIcon, color: '#8b5cf6' },
  '🟤': { icon: ColorCircleIcon, color: '#92400e' },
  '🟩': { icon: ColorCircleIcon, color: '#22c55e' },
  '🟫': { icon: ColorCircleIcon, color: '#78350f' },
  '🖤': { icon: ColorCircleIcon, color: '#1f2937' },
  '🩷': { icon: ColorCircleIcon, color: '#ec4899' },
  '🌈': { icon: SparkleIcon, color: '#ec4899' },

  // People
  '👨': { icon: ManIcon, color: '#3b82f6' },
  '👩': { icon: WomanIcon, color: '#8b5cf6' },
  '👦': { icon: BoyIcon, color: '#06b6d4' },
  '👧': { icon: GirlIcon, color: '#ec4899' },
  '👴': { icon: ManIcon, color: '#92400e' },
  '👵': { icon: WomanIcon, color: '#92400e' },
  '👶': { icon: BoyIcon, color: '#f59e0b' },
  '👤': { icon: ManIcon, color: '#6b7280' },
  '👥': { icon: PeopleIcon, color: '#3b82f6' },
  '👫': { icon: PeopleIcon, color: '#ec4899' },
  '💑': { icon: HeartIcon, color: '#ef4444' },
  '🤝': { icon: PeopleIcon, color: '#22c55e' },
  '👯': { icon: PeopleIcon, color: '#f59e0b' },
  '👮': { icon: ShieldIcon, color: '#3b82f6' },
  '🤵': { icon: ManIcon, color: '#1f2937' },
  '👑': { icon: TrophyIcon, color: '#fbbf24' },
  '🧍': { icon: ManIcon, color: '#6b7280' },
  '🧓': { icon: ManIcon, color: '#92400e' },
  '💃': { icon: WomanIcon, color: '#ef4444' },
  '🕺': { icon: ManIcon, color: '#8b5cf6' },
  '👨‍👩‍👧': { icon: PeopleIcon, color: '#3b82f6' },
  '👨‍👩‍👧‍👦': { icon: PeopleIcon, color: '#22c55e' },
  '🧑': { icon: ManIcon, color: '#6b7280' },
  '👨‍⚕️': { icon: MedicalIcon, color: '#ef4444' },
  '👨‍⚖️': { icon: ShieldIcon, color: '#1f2937' },
  '👨‍✈️': { icon: PlaneIcon, color: '#3b82f6' },
  '👨‍🍳': { icon: PlateIcon, color: '#f59e0b' },
  '👩‍🍳': { icon: PlateIcon, color: '#f59e0b' },
  '👨‍🎓': { icon: StudyIcon, color: '#3b82f6' },
  '👩‍🏫': { icon: TeacherIcon, color: '#6b7280' },
  '👨‍🏫': { icon: TeacherIcon, color: '#6b7280' },
  '🧑‍🏫': { icon: TeacherIcon, color: '#6b7280' },
  '🧑‍🎓': { icon: StudyIcon, color: '#3b82f6' },
  '👨‍💻': { icon: LaptopIcon, color: '#6b7280' },
  '🧑‍💻': { icon: LaptopIcon, color: '#6b7280' },
  '🧑‍💼': { icon: BriefcaseIcon, color: '#92400e' },
  '🧑‍✈️': { icon: PlaneIcon, color: '#3b82f6' },
  '🧑‍🍳': { icon: PlateIcon, color: '#f59e0b' },
  '🦸': { icon: ShieldIcon, color: '#ef4444' },
  '🦸‍♀️': { icon: ShieldIcon, color: '#ec4899' },
  '🦸‍♂️': { icon: ShieldIcon, color: '#3b82f6' },
  '🦹': { icon: FireIcon, color: '#8b5cf6' },
  '🥷': { icon: ShieldIcon, color: '#1f2937' },
  '🧙': { icon: SparkleIcon, color: '#8b5cf6' },
  '🧙‍♂️': { icon: SparkleIcon, color: '#8b5cf6' },
  '🧛': { icon: SmileFaceIcon, color: '#ef4444' },
  '🧝': { icon: TreeIcon, color: '#22c55e' },
  '🧟': { icon: SmileFaceIcon, color: '#22c55e' },
  '👹': { icon: FireIcon, color: '#ef4444' },
  '👺': { icon: FireIcon, color: '#ef4444' },
  '👻': { icon: SmileFaceIcon, color: '#d1d5db' },
  '👾': { icon: GamepadIcon, color: '#8b5cf6' },
  '🤖': { icon: LaptopIcon, color: '#6b7280' },
  '🕵️': { icon: TargetIcon, color: '#1f2937' },

  // Body parts
  '👁️': { icon: BodyPartIcon, color: '#3b82f6' },
  '👀': { icon: BodyPartIcon, color: '#1f2937' },
  '👂': { icon: BodyPartIcon, color: '#f59e0b' },
  '👃': { icon: BodyPartIcon, color: '#f59e0b' },
  '👄': { icon: BodyPartIcon, color: '#ef4444' },
  '🦶': { icon: BodyPartIcon, color: '#f59e0b' },
  '🦵': { icon: BodyPartIcon, color: '#f59e0b' },
  '💪': { icon: BodyPartIcon, color: '#f59e0b' },
  '🧠': { icon: BodyPartIcon, color: '#ec4899' },

  // Animals
  '🐱': { icon: CatIcon, color: '#f59e0b' },
  '🐈': { icon: CatIcon, color: '#f59e0b' },
  '🐕': { icon: CatIcon, color: '#92400e' },
  '🐟': { icon: FishIcon, color: '#3b82f6' },
  '🐠': { icon: FishIcon, color: '#06b6d4' },
  '🐢': { icon: TurtleIcon, color: '#22c55e' },
  '🦁': { icon: LionIcon, color: '#f59e0b' },
  '🐯': { icon: LionIcon, color: '#f59e0b' },
  '🐻': { icon: LionIcon, color: '#92400e' },
  '🐘': { icon: LionIcon, color: '#6b7280' },
  '🐵': { icon: LionIcon, color: '#92400e' },
  '🐍': { icon: TurtleIcon, color: '#22c55e' },
  '🐄': { icon: LionIcon, color: '#1f2937' },
  '🐎': { icon: LionIcon, color: '#92400e' },
  '🐴': { icon: LionIcon, color: '#92400e' },
  '🐑': { icon: LionIcon, color: '#d1d5db' },
  '🐔': { icon: BirdIcon, color: '#f59e0b' },
  '🐦': { icon: BirdIcon, color: '#3b82f6' },
  '🦆': { icon: BirdIcon, color: '#22c55e' },
  '🐧': { icon: BirdIcon, color: '#1f2937' },
  '🐰': { icon: CatIcon, color: '#d1d5db' },
  '🐸': { icon: TurtleIcon, color: '#22c55e' },
  '🐬': { icon: FishIcon, color: '#3b82f6' },
  '🐋': { icon: FishIcon, color: '#6b7280' },
  '🐳': { icon: FishIcon, color: '#3b82f6' },
  '🐉': { icon: FireIcon, color: '#22c55e' },
  '🐌': { icon: TurtleIcon, color: '#92400e' },
  '🐛': { icon: BirdIcon, color: '#22c55e' },
  '🐜': { icon: BirdIcon, color: '#1f2937' },
  '🐝': { icon: BirdIcon, color: '#f59e0b' },
  '🦋': { icon: BirdIcon, color: '#8b5cf6' },
  '🦎': { icon: TurtleIcon, color: '#22c55e' },
  '🦘': { icon: LionIcon, color: '#92400e' },
  '🦠': { icon: MedicalIcon, color: '#22c55e' },
  '🦥': { icon: TurtleIcon, color: '#92400e' },
  '🕊️': { icon: BirdIcon, color: '#d1d5db' },

  // Food - Fruits & Vegetables
  '🍎': { icon: AppleFruitIcon, color: '#ef4444' },
  '🍌': { icon: AppleFruitIcon, color: '#fbbf24' },
  '🍊': { icon: AppleFruitIcon, color: '#f97316' },
  '🍇': { icon: AppleFruitIcon, color: '#8b5cf6' },
  '🍉': { icon: AppleFruitIcon, color: '#22c55e' },
  '🥒': { icon: AppleFruitIcon, color: '#22c55e' },
  '🥕': { icon: AppleFruitIcon, color: '#f97316' },
  '🍅': { icon: AppleFruitIcon, color: '#ef4444' },
  '🧅': { icon: AppleFruitIcon, color: '#92400e' },
  '🥔': { icon: AppleFruitIcon, color: '#92400e' },
  '🌶️': { icon: AppleFruitIcon, color: '#ef4444' },
  '🥬': { icon: AppleFruitIcon, color: '#22c55e' },

  // Food - Cooked & Other
  '🍞': { icon: BreadIcon, color: '#d97706' },
  '🥚': { icon: BreadIcon, color: '#fbbf24' },
  '🧀': { icon: BreadIcon, color: '#f59e0b' },
  '🍖': { icon: PlateIcon, color: '#92400e' },
  '🍗': { icon: PlateIcon, color: '#92400e' },
  '🍕': { icon: PlateIcon, color: '#f97316' },
  '🍚': { icon: PlateIcon, color: '#d1d5db' },
  '🍛': { icon: PlateIcon, color: '#f59e0b' },
  '🍲': { icon: PlateIcon, color: '#ef4444' },
  '🍳': { icon: PlateIcon, color: '#fbbf24' },
  '🍽️': { icon: PlateIcon, color: '#6b7280' },
  '🥩': { icon: PlateIcon, color: '#ef4444' },
  '🥪': { icon: BreadIcon, color: '#22c55e' },
  '🥞': { icon: BreadIcon, color: '#f59e0b' },
  '🧂': { icon: PlateIcon, color: '#d1d5db' },
  '🧈': { icon: BreadIcon, color: '#fbbf24' },
  '🍦': { icon: CoffeeIcon, color: '#ec4899' },
  '🍫': { icon: BreadIcon, color: '#92400e' },
  '🍬': { icon: SparkleIcon, color: '#ec4899' },
  '🍰': { icon: BreadIcon, color: '#ec4899' },
  '🍿': { icon: PlateIcon, color: '#f59e0b' },
  '🎂': { icon: BreadIcon, color: '#ec4899' },
  '🥗': { icon: PlateIcon, color: '#22c55e' },
  '🥡': { icon: PlateIcon, color: '#ef4444' },

  // Drinks
  '☕': { icon: CoffeeIcon, color: '#92400e' },
  '🍵': { icon: CoffeeIcon, color: '#22c55e' },
  '🥛': { icon: MilkIcon, color: '#3b82f6' },
  '💧': { icon: DropIcon, color: '#3b82f6' },
  '🧃': { icon: CoffeeIcon, color: '#f97316' },
  '🍸': { icon: CoffeeIcon, color: '#6366f1' },
  '🥂': { icon: CoffeeIcon, color: '#fbbf24' },
  '🥤': { icon: CoffeeIcon, color: '#ef4444' },

  // Home & Furniture
  '🏠': { icon: HomeIcon, color: '#22c55e' },
  '🏡': { icon: HomeIcon, color: '#22c55e' },
  '🪑': { icon: HomeIcon, color: '#92400e' },
  '🛋️': { icon: BedIcon, color: '#6366f1' },
  '🛏️': { icon: BedIcon, color: '#6366f1' },
  '💺': { icon: BedIcon, color: '#3b82f6' },
  '🚪': { icon: HomeIcon, color: '#92400e' },
  '🪟': { icon: HomeIcon, color: '#3b82f6' },
  '🪞': { icon: HomeIcon, color: '#6b7280' },
  '📺': { icon: VideoIcon, color: '#6b7280' },
  '🔑': { icon: KeyIcon, color: '#f59e0b' },
  '🔒': { icon: KeyIcon, color: '#6b7280' },
  '🔓': { icon: KeyIcon, color: '#22c55e' },
  '🔐': { icon: KeyIcon, color: '#f59e0b' },
  '🚿': { icon: DropIcon, color: '#3b82f6' },
  '💡': { icon: LightBulbIcon, color: '#fbbf24' },

  // Buildings
  '🏢': { icon: BuildingIcon, color: '#6b7280' },
  '🏦': { icon: BuildingIcon, color: '#22c55e' },
  '🏨': { icon: BedIcon, color: '#3b82f6' },
  '🏩': { icon: HeartIcon, color: '#ef4444' },
  '🏪': { icon: CartIcon, color: '#f59e0b' },
  '🏫': { icon: StudyIcon, color: '#3b82f6' },
  '🏬': { icon: BuildingIcon, color: '#8b5cf6' },
  '🏭': { icon: BuildingIcon, color: '#6b7280' },
  '🏰': { icon: BuildingIcon, color: '#f59e0b' },
  '🏛️': { icon: BuildingIcon, color: '#92400e' },
  '🏗️': { icon: BuildingIcon, color: '#f97316' },
  '🏥': { icon: MedicalIcon, color: '#ef4444' },
  '⛪': { icon: BuildingIcon, color: '#6b7280' },
  '🕌': { icon: BuildingIcon, color: '#22c55e' },
  '🏟️': { icon: BallIcon, color: '#22c55e' },
  '🏘️': { icon: HomeIcon, color: '#f59e0b' },
  '🏙️': { icon: BuildingIcon, color: '#3b82f6' },
  '🏚️': { icon: HomeIcon, color: '#6b7280' },

  // Nature & Weather
  '☀️': { icon: SunriseIcon, color: '#f59e0b' },
  '🌅': { icon: SunriseIcon, color: '#f97316' },
  '🌆': { icon: SunriseIcon, color: '#f97316' },
  '🌇': { icon: SunriseIcon, color: '#ef4444' },
  '🌞': { icon: SunriseIcon, color: '#fbbf24' },
  '🌤️': { icon: SunriseIcon, color: '#f59e0b' },
  '🌙': { icon: StarIcon, color: '#6366f1' },
  '🌃': { icon: StarIcon, color: '#1f2937' },
  '🌉': { icon: BuildingIcon, color: '#6366f1' },
  '🌟': { icon: StarIcon, color: '#fbbf24' },
  '☁️': { icon: CloudWeatherIcon, color: '#94a3b8' },
  '🌧️': { icon: CloudWeatherIcon, color: '#6b7280' },
  '⛈️': { icon: CloudWeatherIcon, color: '#374151' },
  '🌨️': { icon: CloudWeatherIcon, color: '#d1d5db' },
  '🌫️': { icon: CloudWeatherIcon, color: '#9ca3af' },
  '🌬️': { icon: CloudWeatherIcon, color: '#94a3b8' },
  '💨': { icon: CloudWeatherIcon, color: '#94a3b8' },
  '❄️': { icon: CloudWeatherIcon, color: '#60a5fa' },
  '🌡️': { icon: MedicalIcon, color: '#ef4444' },
  '☂️': { icon: CloudWeatherIcon, color: '#8b5cf6' },
  '🌊': { icon: DropIcon, color: '#3b82f6' },
  '💦': { icon: DropIcon, color: '#60a5fa' },

  // Plants & Trees
  '🌲': { icon: TreeIcon, color: '#15803d' },
  '🌳': { icon: TreeIcon, color: '#22c55e' },
  '🌴': { icon: TreeIcon, color: '#22c55e' },
  '🌱': { icon: TreeIcon, color: '#4ade80' },
  '🌿': { icon: TreeIcon, color: '#22c55e' },
  '🍂': { icon: TreeIcon, color: '#92400e' },
  '🌾': { icon: TreeIcon, color: '#f59e0b' },
  '🌷': { icon: FlowerIcon, color: '#ef4444' },
  '🌸': { icon: FlowerIcon, color: '#ec4899' },
  '🌹': { icon: FlowerIcon, color: '#ef4444' },
  '🌺': { icon: FlowerIcon, color: '#f97316' },
  '🌻': { icon: FlowerIcon, color: '#fbbf24' },
  '🥀': { icon: FlowerIcon, color: '#ef4444' },

  // Clothing
  '👕': { icon: ShirtIcon, color: '#3b82f6' },
  '👖': { icon: ShirtIcon, color: '#6366f1' },
  '👗': { icon: ShirtIcon, color: '#ec4899' },
  '👔': { icon: ShirtIcon, color: '#1f2937' },
  '👞': { icon: ShirtIcon, color: '#92400e' },
  '👟': { icon: ShirtIcon, color: '#22c55e' },
  '🧢': { icon: ShirtIcon, color: '#ef4444' },
  '🧣': { icon: ShirtIcon, color: '#f59e0b' },
  '🧤': { icon: ShirtIcon, color: '#6b7280' },
  '🧥': { icon: ShirtIcon, color: '#92400e' },
  '🧦': { icon: ShirtIcon, color: '#d1d5db' },
  '👓': { icon: SmileFaceIcon, color: '#6b7280' },
  '🕶️': { icon: SmileFaceIcon, color: '#1f2937' },
  '👛': { icon: BriefcaseIcon, color: '#ec4899' },
  '👜': { icon: BriefcaseIcon, color: '#92400e' },
  '🎩': { icon: ShirtIcon, color: '#1f2937' },
  '🥽': { icon: ShirtIcon, color: '#3b82f6' },
  '🥾': { icon: ShirtIcon, color: '#92400e' },

  // Transport - Road
  '🚗': { icon: CarIcon, color: '#ef4444' },
  '🚌': { icon: CarIcon, color: '#f59e0b' },
  '🚕': { icon: CarIcon, color: '#fbbf24' },
  '🚚': { icon: CarIcon, color: '#6b7280' },
  '🚑': { icon: CarIcon, color: '#ef4444' },
  '🚔': { icon: CarIcon, color: '#3b82f6' },
  '🚲': { icon: WalkIcon, color: '#22c55e' },
  '🏍️': { icon: CarIcon, color: '#1f2937' },
  '🏎️': { icon: CarIcon, color: '#ef4444' },
  '🚶': { icon: WalkIcon, color: '#6b7280' },
  '🚶‍♂️': { icon: WalkIcon, color: '#6b7280' },
  '🏃': { icon: WalkIcon, color: '#22c55e' },
  '🏃‍♂️': { icon: WalkIcon, color: '#22c55e' },
  '🚴': { icon: WalkIcon, color: '#22c55e' },

  // Transport - Air/Water/Rail
  '✈️': { icon: PlaneIcon, color: '#3b82f6' },
  '🚁': { icon: PlaneIcon, color: '#6b7280' },
  '🛫': { icon: PlaneIcon, color: '#3b82f6' },
  '🛬': { icon: PlaneIcon, color: '#3b82f6' },
  '⛴️': { icon: PlaneIcon, color: '#6b7280' },
  '🚢': { icon: PlaneIcon, color: '#374151' },
  '🛥️': { icon: PlaneIcon, color: '#6b7280' },
  '🚂': { icon: CarIcon, color: '#6b7280' },
  '🚆': { icon: CarIcon, color: '#3b82f6' },
  '🚇': { icon: CarIcon, color: '#6b7280' },
  '🚉': { icon: BuildingIcon, color: '#6b7280' },
  '🚏': { icon: MapPinIcon, color: '#3b82f6' },

  // Road elements
  '🚦': { icon: ShieldIcon, color: '#22c55e' },
  '🚧': { icon: ShieldIcon, color: '#f59e0b' },
  '🚨': { icon: ShieldIcon, color: '#ef4444' },
  '🛣️': { icon: MapPinIcon, color: '#6b7280' },
  '🛤️': { icon: MapPinIcon, color: '#92400e' },
  '🚩': { icon: TrophyIcon, color: '#ef4444' },

  // Tech & Office
  '💻': { icon: LaptopIcon, color: '#6b7280' },
  '🖥️': { icon: LaptopIcon, color: '#6b7280' },
  '⌨️': { icon: LaptopIcon, color: '#374151' },
  '🖱️': { icon: LaptopIcon, color: '#6b7280' },
  '🖨️': { icon: DocumentIcon, color: '#6b7280' },
  '📠': { icon: DocumentIcon, color: '#6b7280' },
  '🖧': { icon: LaptopIcon, color: '#3b82f6' },
  '💾': { icon: LaptopIcon, color: '#3b82f6' },
  '💿': { icon: LaptopIcon, color: '#6b7280' },
  '📀': { icon: LaptopIcon, color: '#fbbf24' },
  '📱': { icon: PhoneIcon, color: '#1f2937' },
  '📲': { icon: PhoneIcon, color: '#3b82f6' },
  '📞': { icon: PhoneIcon, color: '#22c55e' },
  '📻': { icon: MusicIcon, color: '#6b7280' },
  '📼': { icon: VideoIcon, color: '#1f2937' },
  '📽️': { icon: VideoIcon, color: '#6b7280' },

  // Documents & Office
  '📄': { icon: DocumentIcon, color: '#6b7280' },
  '📃': { icon: DocumentIcon, color: '#6b7280' },
  '📋': { icon: DocumentIcon, color: '#22c55e' },
  '📁': { icon: DocumentIcon, color: '#f59e0b' },
  '📂': { icon: DocumentIcon, color: '#f59e0b' },
  '📑': { icon: DocumentIcon, color: '#6b7280' },
  '📒': { icon: DocumentIcon, color: '#fbbf24' },
  '📓': { icon: DocumentIcon, color: '#1f2937' },
  '📔': { icon: DocumentIcon, color: '#f59e0b' },
  '📝': { icon: PencilIcon, color: '#f59e0b' },
  '📎': { icon: DocumentIcon, color: '#9ca3af' },
  '📌': { icon: MapPinIcon, color: '#ef4444' },
  '📍': { icon: MapPinIcon, color: '#ef4444' },
  '📏': { icon: PencilIcon, color: '#6b7280' },
  '📐': { icon: PencilIcon, color: '#3b82f6' },
  '🗂️': { icon: DocumentIcon, color: '#f59e0b' },
  '🗄️': { icon: DocumentIcon, color: '#6b7280' },
  '📦': { icon: CartIcon, color: '#92400e' },
  '🧾': { icon: DocumentIcon, color: '#6b7280' },

  // Mail
  '✉️': { icon: MailIcon, color: '#3b82f6' },
  '📧': { icon: MailIcon, color: '#3b82f6' },
  '📩': { icon: MailIcon, color: '#22c55e' },
  '📤': { icon: MailIcon, color: '#f59e0b' },
  '📥': { icon: MailIcon, color: '#3b82f6' },
  '📬': { icon: MailIcon, color: '#22c55e' },
  '📮': { icon: MailIcon, color: '#ef4444' },
  '📰': { icon: DocumentIcon, color: '#1f2937' },

  // Money & Finance
  '💰': { icon: MoneyIcon, color: '#22c55e' },
  '💵': { icon: MoneyIcon, color: '#22c55e' },
  '💳': { icon: MoneyIcon, color: '#3b82f6' },
  '💲': { icon: MoneyIcon, color: '#22c55e' },
  '💱': { icon: MoneyIcon, color: '#6b7280' },
  '💸': { icon: MoneyIcon, color: '#ef4444' },
  '💹': { icon: ChartIcon, color: '#22c55e' },
  '🪙': { icon: MoneyIcon, color: '#fbbf24' },
  '🏧': { icon: MoneyIcon, color: '#3b82f6' },

  // Charts
  '📊': { icon: ChartIcon, color: '#3b82f6' },
  '📈': { icon: ChartIcon, color: '#22c55e' },
  '📉': { icon: ChartIcon, color: '#ef4444' },

  // Calendar & Time
  '📅': { icon: ClockIcon, color: '#ef4444' },
  '📆': { icon: ClockIcon, color: '#3b82f6' },
  '🗓️': { icon: ClockIcon, color: '#6b7280' },
  '⏰': { icon: ClockIcon, color: '#ef4444' },
  '⏱️': { icon: ClockIcon, color: '#6b7280' },
  '⏳': { icon: ClockIcon, color: '#f59e0b' },
  '🕐': { icon: ClockIcon, color: '#3b82f6' },
  '🕰️': { icon: ClockIcon, color: '#92400e' },

  // Books & Education
  '📚': { icon: BookIcon, color: '#3b82f6' },
  '📖': { icon: BookIcon, color: '#22c55e' },
  '📕': { icon: BookIcon, color: '#ef4444' },
  '📗': { icon: BookIcon, color: '#22c55e' },
  '📘': { icon: BookIcon, color: '#3b82f6' },
  '📜': { icon: DocumentIcon, color: '#f59e0b' },
  '✏️': { icon: PencilIcon, color: '#f59e0b' },
  '🖊️': { icon: PencilIcon, color: '#1f2937' },
  '🖌️': { icon: PaletteIcon, color: '#ef4444' },
  '🖍️': { icon: PaletteIcon, color: '#f59e0b' },
  '🎒': { icon: StudyIcon, color: '#3b82f6' },
  '🎓': { icon: StudyIcon, color: '#1f2937' },
  '🗺️': { icon: WorldIcon, color: '#22c55e' },
  '🔬': { icon: StudyIcon, color: '#6b7280' },
  '🔭': { icon: StudyIcon, color: '#3b82f6' },
  '🧪': { icon: StudyIcon, color: '#22c55e' },
  '🧬': { icon: StudyIcon, color: '#3b82f6' },

  // Music & Audio
  '🎵': { icon: MusicIcon, color: '#8b5cf6' },
  '🎶': { icon: MusicIcon, color: '#ec4899' },
  '🎼': { icon: MusicIcon, color: '#1f2937' },
  '🎧': { icon: MusicIcon, color: '#6b7280' },
  '🎷': { icon: MusicIcon, color: '#f59e0b' },
  '🎸': { icon: MusicIcon, color: '#ef4444' },
  '🎹': { icon: MusicIcon, color: '#1f2937' },
  '🎺': { icon: MusicIcon, color: '#f59e0b' },
  '🎻': { icon: MusicIcon, color: '#92400e' },
  '🪕': { icon: MusicIcon, color: '#92400e' },
  '🪗': { icon: MusicIcon, color: '#ef4444' },
  '🥁': { icon: MusicIcon, color: '#ef4444' },
  '🎙️': { icon: KaraokeMicIcon, color: '#8b5cf6' },
  '🎛️': { icon: MusicIcon, color: '#6b7280' },

  // Speaker & Audio
  '🎤': { icon: KaraokeMicIcon, color: '#8b5cf6' },
  '📢': { icon: KaraokeMicIcon, color: '#f59e0b' },
  '📣': { icon: KaraokeMicIcon, color: '#ef4444' },
  '🔊': { icon: SoundIcon, color: '#3b82f6' },
  '🔈': { icon: SoundIcon, color: '#6b7280' },
  '🔇': { icon: SoundIcon, color: '#9ca3af' },
  '🔔': { icon: SparkleIcon, color: '#fbbf24' },
  '🔖': { icon: BookIcon, color: '#ef4444' },

  // Camera & Film
  '📷': { icon: CameraIcon, color: '#374151' },
  '📸': { icon: CameraIcon, color: '#374151' },
  '📹': { icon: CameraIcon, color: '#ef4444' },
  '🎥': { icon: CameraIcon, color: '#1f2937' },
  '🎦': { icon: VideoIcon, color: '#3b82f6' },
  '🎬': { icon: VideoIcon, color: '#1f2937' },
  '🎞️': { icon: VideoIcon, color: '#6b7280' },

  // Art & Creative
  '🎨': { icon: PaletteIcon, color: '#f59e0b' },
  '🖼️': { icon: PaletteIcon, color: '#92400e' },

  // Party & Celebration
  '🎁': { icon: TreasureIcon, color: '#ef4444' },
  '🎈': { icon: SparkleIcon, color: '#ef4444' },
  '🎉': { icon: SparkleIcon, color: '#fbbf24' },
  '🎊': { icon: SparkleIcon, color: '#ec4899' },
  '🎟️': { icon: TreasureIcon, color: '#f59e0b' },
  '🎫': { icon: TreasureIcon, color: '#3b82f6' },
  '💒': { icon: HeartIcon, color: '#ef4444' },
  '💍': { icon: DiamondIcon, color: '#fbbf24' },

  // Games & Play
  '🎮': { icon: GamepadIcon, color: '#6366f1' },
  '🕹️': { icon: GamepadIcon, color: '#ef4444' },
  '♟️': { icon: GamepadIcon, color: '#1f2937' },
  '🎲': { icon: GamepadIcon, color: '#ef4444' },
  '🃏': { icon: GamepadIcon, color: '#ef4444' },
  '🧩': { icon: GamepadIcon, color: '#3b82f6' },

  // Theater
  '🎭': { icon: SmileFaceIcon, color: '#8b5cf6' },
  '🎪': { icon: SparkleIcon, color: '#ef4444' },
  '🎡': { icon: SparkleIcon, color: '#ec4899' },
  '🎢': { icon: SparkleIcon, color: '#ef4444' },
  '🛝': { icon: SparkleIcon, color: '#22c55e' },

  // Sports
  '⚽': { icon: BallIcon, color: '#f9fafb' },
  '🏀': { icon: BallIcon, color: '#f97316' },
  '🏈': { icon: BallIcon, color: '#92400e' },
  '🎾': { icon: BallIcon, color: '#22c55e' },
  '🏐': { icon: BallIcon, color: '#fbbf24' },
  '🏋️': { icon: FireIcon, color: '#ef4444' },
  '🏊': { icon: DropIcon, color: '#3b82f6' },
  '🤸': { icon: WalkIcon, color: '#22c55e' },
  '🥊': { icon: FireIcon, color: '#ef4444' },
  '⚔️': { icon: ShieldIcon, color: '#6b7280' },
  '🏹': { icon: TargetIcon, color: '#92400e' },
  '🎣': { icon: FishIcon, color: '#3b82f6' },

  // Trophy & Awards
  '🏆': { icon: TrophyIcon, color: '#fbbf24' },
  '🥇': { icon: TrophyIcon, color: '#fbbf24' },
  '🏅': { icon: TrophyIcon, color: '#f59e0b' },
  '🏁': { icon: TrophyIcon, color: '#1f2937' },

  // Stars & Gems
  '⭐': { icon: StarIcon, color: '#fbbf24' },
  '💎': { icon: DiamondIcon, color: '#3b82f6' },
  '✨': { icon: SparkleIcon, color: '#fbbf24' },
  '💫': { icon: SparkleIcon, color: '#f59e0b' },
  '🌀': { icon: SparkleIcon, color: '#3b82f6' },
  '🔮': { icon: SparkleIcon, color: '#8b5cf6' },

  // Fire & Energy
  '🔥': { icon: FireIcon, color: '#ff9600' },
  '⚡': { icon: FireIcon, color: '#fbbf24' },

  // Hearts
  '❤️': { icon: HeartIcon, color: '#ef4444' },
  '💚': { icon: HeartIcon, color: '#22c55e' },
  '💛': { icon: HeartIcon, color: '#fbbf24' },
  '💙': { icon: HeartIcon, color: '#3b82f6' },
  '💜': { icon: HeartIcon, color: '#8b5cf6' },
  '💕': { icon: HeartIcon, color: '#ec4899' },
  '💖': { icon: HeartIcon, color: '#ec4899' },
  '💗': { icon: HeartIcon, color: '#ec4899' },
  '💓': { icon: HeartIcon, color: '#ef4444' },
  '💞': { icon: HeartIcon, color: '#ec4899' },
  '💔': { icon: HeartIcon, color: '#6b7280' },
  '💌': { icon: MailIcon, color: '#ec4899' },

  // Check/Cross
  '✅': { icon: ThumbUpIcon, color: '#22c55e' },
  '✔️': { icon: ThumbUpIcon, color: '#22c55e' },
  '❌': { icon: ShieldIcon, color: '#ef4444' },
  '❓': { icon: LightBulbIcon, color: '#8b5cf6' },
  '➕': { icon: MedicalIcon, color: '#22c55e' },
  '➖': { icon: ToolIcon, color: '#ef4444' },
  '➗': { icon: NumberOneIcon, color: '#3b82f6' },
  '💯': { icon: TrophyIcon, color: '#ef4444' },

  // Arrows/Direction
  '➡️': { icon: WorldIcon, color: '#3b82f6' },
  '⬅️': { icon: WorldIcon, color: '#3b82f6' },
  '⬆️': { icon: ChartIcon, color: '#22c55e' },
  '⬇️': { icon: ChartIcon, color: '#ef4444' },
  '↔️': { icon: WorldIcon, color: '#6b7280' },
  '↩️': { icon: WorldIcon, color: '#6b7280' },
  '🔙': { icon: WorldIcon, color: '#3b82f6' },
  '🔚': { icon: WorldIcon, color: '#3b82f6' },
  '🔜': { icon: ClockIcon, color: '#8b5cf6' },
  '🔝': { icon: ChartIcon, color: '#22c55e' },

  // Rocket & Speed
  '🚀': { icon: RocketIcon, color: '#6366f1' },
  '⏩': { icon: RocketIcon, color: '#3b82f6' },
  '⏪': { icon: RocketIcon, color: '#3b82f6' },
  '⏯️': { icon: VideoIcon, color: '#22c55e' },
  '⏸️': { icon: VideoIcon, color: '#6b7280' },
  '⏹️': { icon: VideoIcon, color: '#ef4444' },
  '⏺️': { icon: VideoIcon, color: '#ef4444' },
  '▶️': { icon: VideoIcon, color: '#22c55e' },
  '🔀': { icon: MusicIcon, color: '#6b7280' },
  '🔁': { icon: MusicIcon, color: '#3b82f6' },
  '🔄': { icon: WorldIcon, color: '#3b82f6' },

  // Shopping
  '🛒': { icon: CartIcon, color: '#6b7280' },
  '🛍️': { icon: CartIcon, color: '#ec4899' },
  '🏷️': { icon: CartIcon, color: '#f59e0b' },

  // Map & Travel
  '🌍': { icon: WorldIcon, color: '#22c55e' },
  '🌐': { icon: WorldIcon, color: '#3b82f6' },
  '🗽': { icon: BuildingIcon, color: '#22c55e' },
  '🗿': { icon: BuildingIcon, color: '#6b7280' },
  '🧭': { icon: MapPinIcon, color: '#ef4444' },
  '🏖️': { icon: SunriseIcon, color: '#f59e0b' },
  '🏝️': { icon: TreeIcon, color: '#22c55e' },
  '🏜️': { icon: SunriseIcon, color: '#f59e0b' },
  '⛰️': { icon: TreeIcon, color: '#6b7280' },
  '🏔️': { icon: TreeIcon, color: '#d1d5db' },
  '🏕️': { icon: TreeIcon, color: '#22c55e' },
  '🏞️': { icon: TreeIcon, color: '#22c55e' },
  '⛺': { icon: HomeIcon, color: '#22c55e' },
  '🧳': { icon: BriefcaseIcon, color: '#92400e' },
  '🛎️': { icon: BuildingIcon, color: '#fbbf24' },

  // Briefcase & Work
  '💼': { icon: BriefcaseIcon, color: '#92400e' },
  '🅿️': { icon: CarIcon, color: '#3b82f6' },
  '🛗': { icon: BuildingIcon, color: '#6b7280' },

  // Chat & Communication
  '💬': { icon: ChatBubbleIcon, color: '#3b82f6' },
  '💭': { icon: ChatBubbleIcon, color: '#9ca3af' },
  '🗣️': { icon: ChatBubbleIcon, color: '#6b7280' },
  '🗨️': { icon: ChatBubbleIcon, color: '#3b82f6' },

  // Tools
  '🔧': { icon: ToolIcon, color: '#6b7280' },
  '🔨': { icon: ToolIcon, color: '#92400e' },
  '⚙️': { icon: ToolIcon, color: '#6b7280' },
  '🛠️': { icon: ToolIcon, color: '#f59e0b' },
  '🪓': { icon: ToolIcon, color: '#92400e' },
  '⛏️': { icon: ToolIcon, color: '#6b7280' },
  '🪜': { icon: ToolIcon, color: '#f59e0b' },
  '🪝': { icon: ToolIcon, color: '#6b7280' },
  '🧰': { icon: ToolIcon, color: '#ef4444' },
  '🪄': { icon: SparkleIcon, color: '#8b5cf6' },

  // Medical & Health
  '💉': { icon: MedicalIcon, color: '#3b82f6' },
  '💊': { icon: MedicalIcon, color: '#ef4444' },
  '🩹': { icon: MedicalIcon, color: '#f59e0b' },
  '⚕️': { icon: MedicalIcon, color: '#ef4444' },

  // Shield & Safety
  '🛡️': { icon: ShieldIcon, color: '#3b82f6' },
  '⚠️': { icon: ShieldIcon, color: '#f59e0b' },
  '🚫': { icon: ShieldIcon, color: '#ef4444' },
  '⛔': { icon: ShieldIcon, color: '#ef4444' },
  '🚸': { icon: PeopleIcon, color: '#f59e0b' },
  '🛂': { icon: DocumentIcon, color: '#3b82f6' },
  '🛃': { icon: DocumentIcon, color: '#22c55e' },
  '🔞': { icon: ShieldIcon, color: '#ef4444' },

  // Search & Discovery
  '🔍': { icon: TargetIcon, color: '#6b7280' },
  '🔎': { icon: TargetIcon, color: '#6b7280' },
  '🔌': { icon: LaptopIcon, color: '#6b7280' },

  // Misc objects
  '🧮': { icon: NumberOneIcon, color: '#92400e' },
  '🧱': { icon: BuildingIcon, color: '#ef4444' },
  '🧶': { icon: SparkleIcon, color: '#ec4899' },
  '🧸': { icon: SmileFaceIcon, color: '#92400e' },
  '🧹': { icon: HomeIcon, color: '#92400e' },
  '🧺': { icon: HomeIcon, color: '#f59e0b' },
  '🧴': { icon: DropIcon, color: '#3b82f6' },
  '🪑': { icon: HomeIcon, color: '#92400e' },
  '🔲': { icon: BuildingIcon, color: '#6b7280' },
  '🔺': { icon: ShieldIcon, color: '#ef4444' },
  '🔻': { icon: ShieldIcon, color: '#ef4444' },
  '🔫': { icon: GamepadIcon, color: '#22c55e' },
  '🔪': { icon: PlateIcon, color: '#6b7280' },

  // Justice & Law
  '⚖️': { icon: ShieldIcon, color: '#f59e0b' },
  '⚗️': { icon: StudyIcon, color: '#8b5cf6' },
  '⚛️': { icon: StudyIcon, color: '#3b82f6' },
  '♻️': { icon: WorldIcon, color: '#22c55e' },
  '♾️': { icon: SparkleIcon, color: '#3b82f6' },
  '☠️': { icon: ShieldIcon, color: '#1f2937' },
  '💀': { icon: ShieldIcon, color: '#1f2937' },
  '💣': { icon: FireIcon, color: '#1f2937' },
  '💢': { icon: FireIcon, color: '#ef4444' },
  '💥': { icon: FireIcon, color: '#f59e0b' },
  '〰️': { icon: DropIcon, color: '#6b7280' },
  '♨️': { icon: CoffeeIcon, color: '#ef4444' },
  '⛲': { icon: DropIcon, color: '#3b82f6' },
  '💆': { icon: SmileFaceIcon, color: '#22c55e' },
  '💇': { icon: SmileFaceIcon, color: '#ec4899' },
  '🧘': { icon: PrayIcon, color: '#22c55e' },
  '☮️': { icon: PrayIcon, color: '#8b5cf6' },
  '⛓️': { icon: ToolIcon, color: '#6b7280' },
  '💄': { icon: FlowerIcon, color: '#ef4444' },
  '🕸️': { icon: ToolIcon, color: '#6b7280' },
  '🪪': { icon: DocumentIcon, color: '#3b82f6' },
  '🫕': { icon: PlateIcon, color: '#f59e0b' },
  '🫃': { icon: SmileFaceIcon, color: '#f59e0b' },
  '🙅': { icon: ShieldIcon, color: '#ef4444' },
  '🙇': { icon: PrayIcon, color: '#6b7280' },
  '🙈': { icon: SmileFaceIcon, color: '#92400e' },
  '🆓': { icon: TreasureIcon, color: '#22c55e' },
  '🆕': { icon: SparkleIcon, color: '#3b82f6' },
  '🆘': { icon: ShieldIcon, color: '#ef4444' },
  '©': { icon: DocumentIcon, color: '#6b7280' },
  '™️': { icon: DocumentIcon, color: '#6b7280' },
  '@': { icon: MailIcon, color: '#3b82f6' },
  '🏴‍☠️': { icon: ShieldIcon, color: '#1f2937' },
  '🇮🇳': { icon: WorldIcon, color: '#f97316' },
  '🇯🇲': { icon: WorldIcon, color: '#22c55e' },
  '🇰🇷': { icon: WorldIcon, color: '#3b82f6' },
  '♭': { icon: MusicIcon, color: '#6b7280' },
  '♯': { icon: MusicIcon, color: '#6b7280' },
  '🎣': { icon: FishIcon, color: '#3b82f6' },
};

// Fallback palette for unmapped emojis
const FALLBACK_ICONS = [
  { icon: StarIcon, color: '#fbbf24' },
  { icon: DiamondIcon, color: '#3b82f6' },
  { icon: SparkleIcon, color: '#8b5cf6' },
  { icon: TreasureIcon, color: '#f59e0b' },
];

// Card background colors per index
const CARD_PALETTES = [
  { bg: '#fff0f0', ring: '#fecaca', accent: '#ef4444' },
  { bg: '#eff6ff', ring: '#bfdbfe', accent: '#3b82f6' },
  { bg: '#f0fdf4', ring: '#bbf7d0', accent: '#22c55e' },
  { bg: '#fefce8', ring: '#fde68a', accent: '#f59e0b' },
];

function getIconForEmoji(emoji: string, index: number): IconEntry {
  const mapped = EMOJI_ICON_MAP[emoji];
  if (mapped) return mapped;
  return FALLBACK_ICONS[index % FALLBACK_ICONS.length];
}

// ===========================================
// IMAGE CHOICE QUESTION COMPONENT
// ===========================================
interface ImageChoiceQuestionProps {
  question: Question;
  prompt: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}

export const ImageChoiceQuestion: React.FC<ImageChoiceQuestionProps> = ({
  question,
  onAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
}) => {
  const { colors, isDark } = useTheme();

  const handlePlayAudio = async () => {
    try {
      await playAudio(question.audio, question.word || (question.correctAnswer as string), false);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleSelect = (label: string) => {
    if (showFeedback) return;
    setSelectedAnswer(label);
    onAnswer(label);
  };

  const imageOptions = question.options || [];
  const imageEmojis = question.images || [];

  return (
    <View style={{ gap: 18 }}>
      {/* Badge */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{
          backgroundColor: `${colors.purple.primary}20`,
          paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8,
          flexDirection: 'row', alignItems: 'center', gap: 5,
        }}>
          <SparkleIcon size={18} color={colors.purple.primary} />
          <Text style={{ fontSize: 11, fontWeight: '700', color: colors.purple.primary, textTransform: 'uppercase' }}>
            Yangi so'z
          </Text>
        </View>
        <TouchableOpacity onPress={handlePlayAudio} style={{
          width: 36, height: 36, borderRadius: 10,
          backgroundColor: colors.blue.primary, justifyContent: 'center', alignItems: 'center',
        }}>
          <SoundIcon size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text.primary }}>
        {question.promptUz || "To'g'ri rasmni tanlang"}
      </Text>

      {/* Word with audio */}
      <TouchableOpacity onPress={handlePlayAudio} style={{
        flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4,
      }}>
        <SoundIcon size={22} color={colors.blue.primary} />
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.blue.primary }}>
          {question.word || question.correctAnswer}
        </Text>
      </TouchableOpacity>

      {/* Image Grid (2x2) */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {imageOptions.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const showCorrect = showFeedback && option === question.correctAnswer;
          const showWrong = showFeedback && isSelected && !isCorrect;
          const emoji = imageEmojis[index] || '';
          const { icon: IconComp, color: iconColor } = getIconForEmoji(emoji, index);
          const palette = CARD_PALETTES[index % CARD_PALETTES.length];

          const borderColor = showCorrect ? colors.green.primary
            : showWrong ? colors.red.primary
            : isSelected ? colors.blue.primary
            : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

          const cardBg = showCorrect ? `${colors.green.primary}12`
            : showWrong ? `${colors.red.primary}12`
            : isSelected ? `${colors.blue.primary}10`
            : colors.bg.card;

          const ringColor = showCorrect ? `${colors.green.primary}25`
            : showWrong ? `${colors.red.primary}25`
            : isSelected ? `${colors.blue.primary}20`
            : isDark ? `${palette.accent}15` : palette.ring;

          const circleBg = showCorrect ? `${colors.green.primary}15`
            : showWrong ? `${colors.red.primary}15`
            : isSelected ? `${colors.blue.primary}12`
            : isDark ? `${palette.accent}20` : palette.bg;

          const displayColor = showCorrect ? colors.green.primary
            : showWrong ? colors.red.primary
            : isSelected ? colors.blue.primary
            : iconColor;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}
              disabled={showFeedback}
              style={{
                width: '48%', borderRadius: 16, borderWidth: 2.5, borderColor,
                backgroundColor: cardBg,
                paddingVertical: 14, paddingHorizontal: 8,
                justifyContent: 'center', alignItems: 'center', gap: 8,
              }}
            >
              {/* SVG Icon with ring */}
              <View style={{
                width: 72, height: 72, borderRadius: 36,
                backgroundColor: ringColor,
                justifyContent: 'center', alignItems: 'center',
              }}>
                <View style={{
                  width: 56, height: 56, borderRadius: 28,
                  backgroundColor: circleBg,
                  justifyContent: 'center', alignItems: 'center',
                }}>
                  <IconComp size={34} color={displayColor} />
                </View>
              </View>

              {/* Label */}
              <Text
                style={{
                  fontSize: 14, fontWeight: '600', textAlign: 'center',
                  color: showCorrect ? colors.green.primary
                    : showWrong ? colors.red.primary
                    : colors.text.primary,
                }}
                numberOfLines={2}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
