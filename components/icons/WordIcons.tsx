import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse, G } from 'react-native-svg';
import { IconProps } from './types';

// ===========================================
// GAMIFIED WORD ILLUSTRATION SVG ICONS
// 34 new icons for vocabulary exercises
// ===========================================

// 😊 Happy Face
export const SmileFaceIcon: React.FC<IconProps> = ({ size = 24, color = '#fbbf24', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="24" cy="26" r="20" fill="#d97706" />
    <Circle cx="24" cy="24" r="20" fill={color} />
    <Circle cx="17" cy="20" r="3" fill="#1a1a2e" />
    <Circle cx="31" cy="20" r="3" fill="#1a1a2e" />
    <Circle cx="18" cy="19" r="1" fill="#fff" />
    <Circle cx="32" cy="19" r="1" fill="#fff" />
    <Path d="M15 28 Q24 36 33 28" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Circle cx="12" cy="26" r="3" fill="#f97316" opacity={0.4} />
    <Circle cx="36" cy="26" r="3" fill="#f97316" opacity={0.4} />
  </Svg>
);

// 👍 Thumbs Up
export const ThumbUpIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M14 22h-4a2 2 0 00-2 2v16a2 2 0 002 2h4V22z" fill="#93c5fd" />
    <Path d="M14 22l6-14c2-1 5 0 5 3v7h9a4 4 0 014 4.5l-2 14a4 4 0 01-4 3.5H14V22z" fill={color} />
    <Path d="M25 18h6a3 3 0 013 3l-1 8" stroke="#2563eb" strokeWidth="1.5" fill="none" opacity={0.3} />
  </Svg>
);

// 🍎 Apple/Fruit
export const AppleFruitIcon: React.FC<IconProps> = ({ size = 24, color = '#ef4444', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Ellipse cx="24" cy="28" rx="14" ry="16" fill={color} />
    <Ellipse cx="24" cy="28" rx="12" ry="14" fill={color} opacity={0.8} />
    <Path d="M24 12c0-4 4-8 8-8" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Ellipse cx="20" cy="10" rx="5" ry="3" fill="#22c55e" />
    <Path d="M18 22c2-2 6-2 8 0" stroke="#fff" strokeWidth="1.5" fill="none" opacity={0.3} />
  </Svg>
);

// ☕ Coffee/Drink
export const CoffeeIcon: React.FC<IconProps> = ({ size = 24, color = '#92400e', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="8" y="16" width="24" height="26" rx="4" fill={color} />
    <Rect x="10" y="18" width="20" height="8" rx="2" fill="#d97706" opacity={0.4} />
    <Path d="M32 22h4a4 4 0 010 8h-4" stroke={color} strokeWidth="3" fill="none" />
    <Rect x="6" y="12" width="28" height="4" rx="2" fill={color} />
    <Path d="M16 8c0-2 2-4 4-4s4 2 4 4" stroke="#9ca3af" strokeWidth="2" fill="none" opacity={0.3} strokeLinecap="round" />
    <Path d="M22 6c0-2 2-3 3-3" stroke="#9ca3af" strokeWidth="2" fill="none" opacity={0.3} strokeLinecap="round" />
  </Svg>
);

// 🐦 Bird
export const BirdIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Ellipse cx="24" cy="26" rx="14" ry="12" fill={color} />
    <Circle cx="24" cy="24" r="10" fill={color} opacity={0.9} />
    <Circle cx="30" cy="20" r="3" fill="#fff" />
    <Circle cx="31" cy="20" r="1.5" fill="#1a1a2e" />
    <Path d="M36 22l6-2-4 4z" fill="#f59e0b" />
    <Path d="M10 30l-4 6 8-2z" fill={color} opacity={0.7} />
    <Path d="M18 36l-2 6h4z" fill="#f59e0b" />
    <Path d="M26 36l-2 6h4z" fill="#f59e0b" />
  </Svg>
);

// 🏢 Building/Office
export const BuildingIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="10" y="8" width="28" height="34" rx="2" fill={color} />
    <Rect x="12" y="10" width="24" height="30" rx="1" fill={color} opacity={0.8} />
    <Rect x="16" y="14" width="4" height="4" rx="1" fill="#fff" opacity={0.5} />
    <Rect x="22" y="14" width="4" height="4" rx="1" fill="#fff" opacity={0.5} />
    <Rect x="28" y="14" width="4" height="4" rx="1" fill="#fff" opacity={0.5} />
    <Rect x="16" y="22" width="4" height="4" rx="1" fill="#fff" opacity={0.5} />
    <Rect x="22" y="22" width="4" height="4" rx="1" fill="#fff" opacity={0.5} />
    <Rect x="28" y="22" width="4" height="4" rx="1" fill="#fff" opacity={0.5} />
    <Rect x="20" y="32" width="8" height="10" rx="1" fill="#fbbf24" opacity={0.6} />
  </Svg>
);

// 🌲 Tree
export const TreeIcon: React.FC<IconProps> = ({ size = 24, color = '#22c55e', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="21" y="32" width="6" height="12" rx="1" fill="#92400e" />
    <Path d="M24 4l16 18H8z" fill={color} />
    <Path d="M24 12l14 14H10z" fill={color} opacity={0.8} />
    <Path d="M24 8l12 12H12z" fill="#4ade80" opacity={0.3} />
  </Svg>
);

// 🌸 Flower
export const FlowerIcon: React.FC<IconProps> = ({ size = 24, color = '#ec4899', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="22" y="28" width="4" height="16" rx="1" fill="#22c55e" />
    <Circle cx="24" cy="12" r="7" fill={color} opacity={0.8} />
    <Circle cx="15" cy="19" r="7" fill={color} opacity={0.7} />
    <Circle cx="33" cy="19" r="7" fill={color} opacity={0.7} />
    <Circle cx="18" cy="28" r="7" fill={color} opacity={0.6} />
    <Circle cx="30" cy="28" r="7" fill={color} opacity={0.6} />
    <Circle cx="24" cy="21" r="5" fill="#fbbf24" />
    <Circle cx="23" cy="20" r="2" fill="#fff" opacity={0.4} />
  </Svg>
);

// ☁️ Cloud/Weather
export const CloudWeatherIcon: React.FC<IconProps> = ({ size = 24, color = '#94a3b8', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="20" cy="22" r="10" fill={color} />
    <Circle cx="30" cy="20" r="8" fill={color} />
    <Circle cx="14" cy="24" r="7" fill={color} />
    <Circle cx="34" cy="24" r="6" fill={color} />
    <Rect x="8" y="24" width="32" height="10" rx="5" fill={color} />
    <Circle cx="18" cy="18" r="4" fill="#fff" opacity={0.2} />
    <Path d="M16 38l-2 6M24 38l-2 6M32 38l-2 6" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" opacity={0.4} />
  </Svg>
);

// 👕 Shirt/Clothing
export const ShirtIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M16 6l-10 8 6 4 2-4v26h20V14l2 4 6-4-10-8c-1 4-4 6-8 6s-7-2-8-6z" fill={color} />
    <Path d="M16 6c1 4 4 6 8 6s7-2 8-6" stroke="#fff" strokeWidth="1.5" fill="none" opacity={0.3} />
    <Path d="M8 16l4-2" stroke="#fff" strokeWidth="1.5" fill="none" opacity={0.2} />
    <Path d="M40 16l-4-2" stroke="#fff" strokeWidth="1.5" fill="none" opacity={0.2} />
  </Svg>
);

// 🚗 Car
export const CarIcon: React.FC<IconProps> = ({ size = 24, color = '#ef4444', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M6 28h36v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8z" fill={color} />
    <Path d="M10 28l4-12h20l4 12" fill={color} opacity={0.9} />
    <Rect x="14" y="18" width="20" height="8" rx="2" fill="#bfdbfe" opacity={0.5} />
    <Circle cx="14" cy="36" r="4" fill="#1f2937" />
    <Circle cx="34" cy="36" r="4" fill="#1f2937" />
    <Circle cx="14" cy="36" r="2" fill="#9ca3af" />
    <Circle cx="34" cy="36" r="2" fill="#9ca3af" />
    <Rect x="10" y="30" width="4" height="2" rx="1" fill="#fbbf24" />
    <Rect x="34" y="30" width="4" height="2" rx="1" fill="#fbbf24" />
  </Svg>
);

// ✈️ Airplane
export const PlaneIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M24 4l4 16h14l-4 4H26l-2 16-4 4v-16l-14-4 4-4h14z" fill={color} />
    <Path d="M24 4l2 10h8" stroke="#fff" strokeWidth="1" fill="none" opacity={0.3} />
    <Path d="M20 36l4 4v-8" fill={color} opacity={0.7} />
  </Svg>
);

// 💻 Laptop/Computer
export const LaptopIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="8" y="8" width="32" height="22" rx="2" fill="#374151" />
    <Rect x="10" y="10" width="28" height="18" rx="1" fill={color} />
    <Rect x="12" y="12" width="24" height="14" rx="1" fill="#1cb0f6" opacity={0.3} />
    <Path d="M4 32h40l-4 6H8z" fill="#9ca3af" />
    <Rect x="20" y="32" width="8" height="2" rx="1" fill="#6b7280" />
  </Svg>
);

// 📱 Phone
export const PhoneIcon: React.FC<IconProps> = ({ size = 24, color = '#1f2937', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="14" y="4" width="20" height="40" rx="4" fill={color} />
    <Rect x="16" y="8" width="16" height="28" rx="1" fill="#60a5fa" opacity={0.4} />
    <Circle cx="24" cy="40" r="2" fill="#9ca3af" />
    <Rect x="20" y="5" width="8" height="2" rx="1" fill="#4b5563" />
  </Svg>
);

// 📷 Camera
export const CameraIcon: React.FC<IconProps> = ({ size = 24, color = '#374151', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M16 12l2-4h12l2 4h8a4 4 0 014 4v20a4 4 0 01-4 4H8a4 4 0 01-4-4V16a4 4 0 014-4h8z" fill={color} />
    <Circle cx="24" cy="26" r="10" fill="#6b7280" />
    <Circle cx="24" cy="26" r="7" fill="#60a5fa" opacity={0.5} />
    <Circle cx="22" cy="24" r="2" fill="#fff" opacity={0.4} />
    <Circle cx="38" cy="16" r="2" fill="#fbbf24" />
  </Svg>
);

// 📄 Document
export const DocumentIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M12 4h16l10 10v28a2 2 0 01-2 2H12a2 2 0 01-2-2V6a2 2 0 012-2z" fill="#f3f4f6" />
    <Path d="M28 4v8a2 2 0 002 2h8" fill="#d1d5db" />
    <Rect x="16" y="20" width="16" height="2" rx="1" fill={color} opacity={0.4} />
    <Rect x="16" y="26" width="12" height="2" rx="1" fill={color} opacity={0.4} />
    <Rect x="16" y="32" width="14" height="2" rx="1" fill={color} opacity={0.4} />
  </Svg>
);

// ✉️ Mail
export const MailIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="4" y="10" width="40" height="28" rx="4" fill={color} />
    <Path d="M4 14l20 12 20-12" stroke="#fff" strokeWidth="2" fill="none" opacity={0.5} />
    <Path d="M4 38l16-12M44 38l-16-12" stroke="#fff" strokeWidth="1.5" fill="none" opacity={0.2} />
  </Svg>
);

// 💰 Money
export const MoneyIcon: React.FC<IconProps> = ({ size = 24, color = '#22c55e', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="24" cy="26" r="18" fill="#15803d" />
    <Circle cx="24" cy="24" r="18" fill={color} />
    <Circle cx="24" cy="24" r="14" fill="#16a34a" opacity={0.3} />
    <Path d="M24 12v24M18 18h8a4 4 0 010 8h-6a4 4 0 000 8h8" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
  </Svg>
);

// 📊 Chart
export const ChartIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="6" y="30" width="8" height="12" rx="2" fill="#60a5fa" />
    <Rect x="20" y="18" width="8" height="24" rx="2" fill={color} />
    <Rect x="34" y="8" width="8" height="34" rx="2" fill="#2563eb" />
    <Path d="M10 28l14-10 14-8" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Circle cx="10" cy="28" r="2" fill="#fbbf24" />
    <Circle cx="24" cy="18" r="2" fill="#fbbf24" />
    <Circle cx="38" cy="10" r="2" fill="#fbbf24" />
  </Svg>
);

// ⏰ Clock
export const ClockIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="24" cy="26" r="20" fill="#4b5563" />
    <Circle cx="24" cy="24" r="20" fill={color} />
    <Circle cx="24" cy="24" r="17" fill="#f9fafb" />
    <Path d="M24 12v12l8 8" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    <Circle cx="24" cy="24" r="2" fill="#ef4444" />
    <Circle cx="24" cy="8" r="1.5" fill="#9ca3af" />
    <Circle cx="24" cy="40" r="1.5" fill="#9ca3af" />
    <Circle cx="8" cy="24" r="1.5" fill="#9ca3af" />
    <Circle cx="40" cy="24" r="1.5" fill="#9ca3af" />
  </Svg>
);

// 🎤 Microphone (Karaoke style)
export const KaraokeMicIcon: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="18" y="4" width="12" height="22" rx="6" fill={color} />
    <Path d="M14 20a10 10 0 0020 0" stroke={color} strokeWidth="3" fill="none" />
    <Rect x="22" y="30" width="4" height="10" fill={color} />
    <Rect x="16" y="40" width="16" height="4" rx="2" fill={color} opacity={0.7} />
    <Path d="M20 10h8M20 16h8" stroke="#fff" strokeWidth="1.5" opacity={0.3} />
  </Svg>
);

// 🎨 Palette
export const PaletteIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Ellipse cx="24" cy="24" rx="20" ry="18" fill={color} />
    <Circle cx="16" cy="16" r="4" fill="#ef4444" />
    <Circle cx="28" cy="12" r="4" fill="#3b82f6" />
    <Circle cx="36" cy="20" r="4" fill="#22c55e" />
    <Circle cx="14" cy="28" r="4" fill="#8b5cf6" />
    <Ellipse cx="32" cy="30" rx="5" ry="6" fill="#fef3c7" />
  </Svg>
);

// 🎮 Gamepad
export const GamepadIcon: React.FC<IconProps> = ({ size = 24, color = '#6366f1', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M8 18h32a6 6 0 016 6v4a6 6 0 01-6 6H8a6 6 0 01-6-6v-4a6 6 0 016-6z" fill={color} />
    <Rect x="12" y="22" width="2" height="8" rx="1" fill="#fff" opacity={0.5} />
    <Rect x="9" y="25" width="8" height="2" rx="1" fill="#fff" opacity={0.5} />
    <Circle cx="34" cy="23" r="2" fill="#fbbf24" />
    <Circle cx="38" cy="27" r="2" fill="#ef4444" />
    <Circle cx="30" cy="27" r="2" fill="#22c55e" />
    <Circle cx="34" cy="31" r="2" fill="#3b82f6" />
  </Svg>
);

// ⚽ Ball
export const BallIcon: React.FC<IconProps> = ({ size = 24, color = '#f9fafb', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="24" cy="26" r="18" fill="#374151" />
    <Circle cx="24" cy="24" r="18" fill={color} />
    <Path d="M24 6v8l6 4M24 6v8l-6 4M24 42v-8l6-4M24 42v-8l-6-4M6 24h8l4-6M6 24h8l4 6M42 24h-8l-4-6M42 24h-8l-4 6" stroke="#1f2937" strokeWidth="2" fill="none" />
  </Svg>
);

// 🔑 Key
export const KeyIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="16" cy="18" r="10" fill={color} />
    <Circle cx="16" cy="18" r="5" fill="#fef3c7" />
    <Rect x="22" y="16" width="22" height="4" rx="2" fill={color} />
    <Rect x="38" y="20" width="4" height="6" rx="1" fill={color} />
    <Rect x="32" y="20" width="4" height="4" rx="1" fill={color} />
  </Svg>
);

// 🛡️ Shield
export const ShieldIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M24 4L6 12v12c0 12 8 18 18 20 10-2 18-8 18-20V12L24 4z" fill={color} />
    <Path d="M24 8l-14 6v10c0 10 6 15 14 17" fill="#60a5fa" opacity={0.3} />
    <Path d="M18 24l4 4 8-10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// 💬 Chat Bubble
export const ChatBubbleIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M8 8h32a4 4 0 014 4v18a4 4 0 01-4 4H16l-8 8v-8a4 4 0 01-4-4V12a4 4 0 014-4z" fill={color} />
    <Circle cx="16" cy="21" r="2" fill="#fff" opacity={0.6} />
    <Circle cx="24" cy="21" r="2" fill="#fff" opacity={0.6} />
    <Circle cx="32" cy="21" r="2" fill="#fff" opacity={0.6} />
  </Svg>
);

// 🚀 Rocket
export const RocketIcon: React.FC<IconProps> = ({ size = 24, color = '#6366f1', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M24 4c-4 8-6 16-6 24h12c0-8-2-16-6-24z" fill="#e5e7eb" />
    <Path d="M24 6c-3 7-5 14-5 22h10c0-8-2-15-5-22z" fill={color} />
    <Circle cx="24" cy="22" r="3" fill="#60a5fa" />
    <Path d="M18 28l-6 8 6-2" fill="#ef4444" />
    <Path d="M30 28l6 8-6-2" fill="#ef4444" />
    <Path d="M20 36h8l-4 8z" fill="#f59e0b" />
    <Path d="M22 36h4l-2 5z" fill="#fbbf24" />
  </Svg>
);

// 🛒 Cart
export const CartIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M6 8h6l6 24h18l4-16H16" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="20" cy="38" r="3" fill={color} />
    <Circle cx="34" cy="38" r="3" fill={color} />
    <Rect x="16" y="18" width="22" height="10" rx="2" fill={color} opacity={0.15} />
  </Svg>
);

// 🛏️ Bed
export const BedIcon: React.FC<IconProps> = ({ size = 24, color = '#6366f1', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="4" y="28" width="40" height="8" rx="2" fill={color} />
    <Rect x="4" y="16" width="14" height="12" rx="4" fill="#e5e7eb" />
    <Path d="M8 28V36M40 28V36" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <Rect x="18" y="22" width="26" height="6" rx="2" fill={color} opacity={0.6} />
    <Circle cx="11" cy="20" r="3" fill="#fbbf24" opacity={0.4} />
  </Svg>
);

// 💼 Briefcase
export const BriefcaseIcon: React.FC<IconProps> = ({ size = 24, color = '#92400e', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="4" y="16" width="40" height="24" rx="4" fill={color} />
    <Path d="M16 16V12a4 4 0 014-4h8a4 4 0 014 4v4" stroke={color} strokeWidth="3" fill="none" />
    <Rect x="20" y="24" width="8" height="6" rx="2" fill="#fbbf24" opacity={0.6} />
    <Path d="M4 26h40" stroke="#fff" strokeWidth="1" opacity={0.2} />
  </Svg>
);

// 📍 MapPin
export const MapPinIcon: React.FC<IconProps> = ({ size = 24, color = '#ef4444', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M24 44s-14-12-14-24a14 14 0 0128 0c0 12-14 24-14 24z" fill={color} />
    <Circle cx="24" cy="20" r="6" fill="#fff" />
    <Circle cx="24" cy="20" r="3" fill={color} opacity={0.5} />
  </Svg>
);

// 🏥 Medical
export const MedicalIcon: React.FC<IconProps> = ({ size = 24, color = '#ef4444', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="24" cy="24" r="20" fill="#fecaca" />
    <Circle cx="24" cy="24" r="16" fill="#fff" />
    <Rect x="20" y="12" width="8" height="24" rx="2" fill={color} />
    <Rect x="12" y="20" width="24" height="8" rx="2" fill={color} />
  </Svg>
);

// 🔧 Tool/Wrench
export const ToolIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M36 8a10 10 0 00-14 10l-12 12a4 4 0 005.6 5.6l12-12A10 10 0 0036 8z" fill={color} />
    <Circle cx="10" cy="38" r="3" fill="#374151" />
    <Path d="M30 12l6-6 6 6-6 6z" fill="#9ca3af" opacity={0.4} />
  </Svg>
);

// 👁️ Body/Face (generic body part)
export const BodyPartIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="24" cy="16" r="12" fill="#fde68a" />
    <Circle cx="20" cy="14" r="2.5" fill="#1f2937" />
    <Circle cx="28" cy="14" r="2.5" fill="#1f2937" />
    <Path d="M20 20q4 4 8 0" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
    <Path d="M24 28v8M18 36h12" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <Path d="M14 32l-4 6M34 32l4 6" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </Svg>
);
