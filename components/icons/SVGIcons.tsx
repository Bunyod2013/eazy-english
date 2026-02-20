import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { IconProps } from './types';

// 🦁 Lion - Mascot icon (gamified)
export const LionIcon: React.FC<IconProps> = ({ size = 24, color = '#58cc02', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Mane shadow */}
    <Circle cx="24" cy="26" r="17" fill="#3d8c00" />
    {/* Mane */}
    <Circle cx="24" cy="24" r="17" fill={color} />
    {/* Mane spikes */}
    <Path d="M13 11 Q11 6 14 5 Q17 4 17 9" fill="#4aaa00" />
    <Path d="M24 9 Q24 4 27 4 Q30 5 29 10" fill="#4aaa00" />
    <Path d="M35 11 Q37 6 34 5 Q31 4 31 9" fill="#4aaa00" />
    <Path d="M10 18 Q5 16 6 13 Q7 10 12 13" fill="#4aaa00" />
    <Path d="M38 18 Q43 16 42 13 Q41 10 36 13" fill="#4aaa00" />
    {/* Face bg */}
    <Circle cx="24" cy="25" r="13" fill="#ffc14d" />
    <Circle cx="24" cy="24" r="13" fill="#ffda7a" />
    {/* Ear */}
    <Circle cx="12" cy="15" r="4" fill="#ffc14d" />
    <Circle cx="36" cy="15" r="4" fill="#ffc14d" />
    <Circle cx="12" cy="15" r="2" fill="#ff9a3c" />
    <Circle cx="36" cy="15" r="2" fill="#ff9a3c" />
    {/* Eyes */}
    <Circle cx="19" cy="22" r="4" fill="#fff" />
    <Circle cx="29" cy="22" r="4" fill="#fff" />
    <Circle cx="20" cy="22" r="2.5" fill="#1a1a2e" />
    <Circle cx="30" cy="22" r="2.5" fill="#1a1a2e" />
    <Circle cx="21" cy="21" r="1" fill="#fff" />
    <Circle cx="31" cy="21" r="1" fill="#fff" />
    {/* Nose */}
    <Ellipse cx="24" cy="28" rx="3" ry="2" fill="#ff7043" />
    <Path d="M24 30 Q21 32 20 33" stroke="#ff7043" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Path d="M24 30 Q27 32 28 33" stroke="#ff7043" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Mouth */}
    <Path d="M19 33 Q24 36 29 33" stroke="#e05a00" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Cheeks */}
    <Circle cx="15" cy="30" r="3" fill="#ff9a7a" opacity={0.5} />
    <Circle cx="33" cy="30" r="3" fill="#ff9a7a" opacity={0.5} />
  </Svg>
);

// 🔥 Fire / Streak icon (gamified)
export const FireIcon: React.FC<IconProps> = ({ size = 24, color = '#ff9600', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Ellipse cx="24" cy="44" rx="10" ry="3" fill="#cc6600" opacity={0.4} />
    {/* Outer flame */}
    <Path d="M24 4 C18 10 10 14 10 24 C10 33 16 42 24 42 C32 42 38 33 38 24 C38 14 30 10 24 4Z" fill={color} />
    {/* Mid flame */}
    <Path d="M24 12 C20 16 16 20 16 26 C16 31 19 37 24 37 C29 37 32 31 32 26 C32 20 28 16 24 12Z" fill="#ffd000" />
    {/* Inner flame */}
    <Path d="M24 20 C22 22 20 25 20 28 C20 31 22 34 24 34 C26 34 28 31 28 28 C28 25 26 22 24 20Z" fill="#fff5c0" />
    {/* Highlight */}
    <Path d="M20 18 C19 21 18 24 19 27" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.6} />
  </Svg>
);

// 💎 Diamond / Gem icon (gamified)
export const DiamondIcon: React.FC<IconProps> = ({ size = 24, color = '#1cb0f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Ellipse cx="24" cy="45" rx="12" ry="3" fill="#0077bb" opacity={0.3} />
    {/* Main gem */}
    <Path d="M24 4 L36 16 L24 44 L12 16 Z" fill={color} />
    {/* Top facet highlight */}
    <Path d="M12 16 L24 4 L36 16 L24 20 Z" fill="#6de0ff" />
    {/* Left facet */}
    <Path d="M12 16 L24 20 L24 44 Z" fill="#0093d4" />
    {/* Shine */}
    <Path d="M18 10 L22 14 L19 16 Z" fill="#fff" opacity={0.7} />
    <Path d="M22 6 L24 10 L22 12 Z" fill="#fff" opacity={0.5} />
  </Svg>
);

// 🎯 Target icon (gamified)
export const TargetIcon: React.FC<IconProps> = ({ size = 24, color = '#ff4b4b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow ring */}
    <Circle cx="24" cy="26" r="20" fill="#aa2200" opacity={0.2} />
    {/* Outer ring */}
    <Circle cx="24" cy="24" r="20" fill="#fff" />
    <Circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="3" />
    {/* Mid ring */}
    <Circle cx="24" cy="24" r="14" fill={color} opacity={0.15} />
    <Circle cx="24" cy="24" r="14" fill="none" stroke={color} strokeWidth="2.5" />
    {/* Inner ring */}
    <Circle cx="24" cy="24" r="8" fill={color} opacity={0.3} />
    <Circle cx="24" cy="24" r="8" fill="none" stroke={color} strokeWidth="2" />
    {/* Bullseye */}
    <Circle cx="24" cy="24" r="4" fill={color} />
    {/* Arrow */}
    <Path d="M44 4 L28 22" stroke="#555" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Path d="M38 4 L44 4 L44 10" stroke="#555" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="28" cy="22" r="2" fill="#333" />
  </Svg>
);

// 📚 Book icon (gamified)
export const BookIcon: React.FC<IconProps> = ({ size = 24, color = '#58cc02', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Rect x="8" y="10" width="32" height="34" rx="4" fill="#3d8c00" />
    {/* Book body */}
    <Rect x="8" y="8" width="32" height="34" rx="4" fill={color} />
    {/* Spine */}
    <Rect x="8" y="8" width="6" height="34" rx="4" fill="#3d8c00" />
    {/* Pages */}
    <Rect x="17" y="15" width="16" height="3" rx="1.5" fill="#fff" opacity={0.9} />
    <Rect x="17" y="21" width="16" height="3" rx="1.5" fill="#fff" opacity={0.9} />
    <Rect x="17" y="27" width="12" height="3" rx="1.5" fill="#fff" opacity={0.9} />
    <Rect x="17" y="33" width="10" height="3" rx="1.5" fill="#fff" opacity={0.9} />
    {/* Star badge */}
    <Circle cx="37" cy="11" r="7" fill="#ffc800" />
    <Path d="M37 6 L38.2 9.4 L42 9.4 L39 11.5 L40.2 15 L37 12.8 L33.8 15 L35 11.5 L32 9.4 L35.8 9.4 Z" fill="#fff" />
  </Svg>
);

// 🔒 Lock icon (gamified)
export const LockIcon: React.FC<IconProps> = ({ size = 24, color = '#afafaf', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Rect x="9" y="24" width="30" height="24" rx="5" fill="#888" />
    {/* Lock body */}
    <Rect x="9" y="22" width="30" height="24" rx="5" fill={color} />
    {/* Shackle shadow */}
    <Path d="M15 23 V16 C15 10 33 10 33 16 V23" stroke="#888" strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Shackle */}
    <Path d="M15 22 V16 C15 9 33 9 33 16 V22" stroke="#ccc" strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Keyhole */}
    <Circle cx="24" cy="32" r="4" fill="#888" />
    <Rect x="22" y="34" width="4" height="5" rx="2" fill="#888" />
    {/* Shine */}
    <Rect x="13" y="24" width="5" height="10" rx="2.5" fill="#fff" opacity={0.2} />
  </Svg>
);

// ⭐ Star icon (gamified)
export const StarIcon: React.FC<IconProps> = ({ size = 24, color = '#ffc800', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow star */}
    <Path d="M24 6 L28.5 18 L42 18.5 L31.5 26.5 L35 39.5 L24 32 L13 39.5 L16.5 26.5 L6 18.5 L19.5 18 Z" fill="#cc8800" transform="translate(0,2)" />
    {/* Main star */}
    <Path d="M24 6 L28.5 18 L42 18.5 L31.5 26.5 L35 39.5 L24 32 L13 39.5 L16.5 26.5 L6 18.5 L19.5 18 Z" fill={color} />
    {/* Highlight */}
    <Path d="M24 10 L27 18 L35 18.5 L28 23 L30 31 L24 27" fill="#ffe066" opacity={0.8} />
    {/* Shine dot */}
    <Circle cx="19" cy="16" r="2" fill="#fff" opacity={0.6} />
  </Svg>
);

// 🏆 Trophy icon (gamified)
export const TrophyIcon: React.FC<IconProps> = ({ size = 24, color = '#ffc800', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Base shadow */}
    <Rect x="14" y="42" width="20" height="4" rx="2" fill="#cc8800" />
    {/* Base */}
    <Rect x="14" y="38" width="20" height="5" rx="2" fill="#e6aa00" />
    {/* Stem */}
    <Rect x="20" y="32" width="8" height="8" rx="2" fill="#e6aa00" />
    {/* Cup shadow */}
    <Path d="M8 8 H40 V24 C40 31 32 36 24 36 C16 36 8 31 8 24 Z" fill="#cc8800" transform="translate(0,2)" />
    {/* Cup */}
    <Path d="M8 8 H40 V24 C40 31 32 36 24 36 C16 36 8 31 8 24 Z" fill={color} />
    {/* Handles */}
    <Path d="M8 12 C4 12 3 16 3 18 C3 22 6 24 8 24" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    <Path d="M40 12 C44 12 45 16 45 18 C45 22 42 24 40 24" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Highlight shine */}
    <Path d="M14 10 C13 14 13 20 15 25" stroke="#ffe066" strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.7} />
    {/* Star on top */}
    <Path d="M24 12 L25.5 16 L30 16 L26.5 18.5 L28 23 L24 20.5 L20 23 L21.5 18.5 L18 16 L22.5 16 Z" fill="#fff" opacity={0.8} />
  </Svg>
);

// ⚙️ Settings icon (gamified)
export const SettingsIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow gear */}
    <Path d="M20 4 L19 8.5 C17.5 9 16 9.8 14.8 10.8 L10.5 9.2 L7 14 L10.2 17.5 C10 18.3 10 19.2 10 20 C10 20.8 10 21.7 10.2 22.5 L7 26 L10.5 30.8 L14.8 29.2 C16 30.2 17.5 31 19 31.5 L20 36 H28 L29 31.5 C30.5 31 32 30.2 33.2 29.2 L37.5 30.8 L41 26 L37.8 22.5 C38 21.7 38 20.8 38 20 C38 19.2 38 18.3 37.8 17.5 L41 14 L37.5 9.2 L33.2 10.8 C32 9.8 30.5 9 29 8.5 L28 4 Z" fill="#444" opacity={0.2} transform="translate(0,2)" />
    {/* Main gear */}
    <Path d="M20 4 L19 8.5 C17.5 9 16 9.8 14.8 10.8 L10.5 9.2 L7 14 L10.2 17.5 C10 18.3 10 19.2 10 20 C10 20.8 10 21.7 10.2 22.5 L7 26 L10.5 30.8 L14.8 29.2 C16 30.2 17.5 31 19 31.5 L20 36 H28 L29 31.5 C30.5 31 32 30.2 33.2 29.2 L37.5 30.8 L41 26 L37.8 22.5 C38 21.7 38 20.8 38 20 C38 19.2 38 18.3 37.8 17.5 L41 14 L37.5 9.2 L33.2 10.8 C32 9.8 30.5 9 29 8.5 L28 4 Z" fill={color} />
    {/* Center circle */}
    <Circle cx="24" cy="20" r="7" fill="#eee" />
    <Circle cx="24" cy="20" r="5" fill={color} />
    {/* Shine */}
    <Circle cx="21" cy="17" r="2" fill="#fff" opacity={0.4} />
  </Svg>
);

// 🔊 Sound icon (gamified)
export const SoundIcon: React.FC<IconProps> = ({ size = 24, color = '#58cc02', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Speaker shadow */}
    <Path d="M6 18 H14 L26 8 V40 L14 30 H6 Z" fill="#2d7a00" transform="translate(0,2)" />
    {/* Speaker body */}
    <Path d="M6 18 H14 L26 8 V40 L14 30 H6 Z" fill={color} />
    {/* Speaker highlight */}
    <Path d="M8 19 H13 L22 11 V16 L13 22 H8 Z" fill="#7aef00" opacity={0.4} />
    {/* Sound waves */}
    <Path d="M30 16 C33 18 33 30 30 32" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    <Path d="M34 12 C39 16 39 32 34 36" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    <Path d="M38 8 C45 13 45 35 38 40" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={0.5} />
  </Svg>
);

// 🎵 Music icon (gamified)
export const MusicIcon: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Note shadows */}
    <Ellipse cx="14" cy="38" rx="7" ry="5" fill="#5a0fa0" transform="translate(0,2)" />
    <Ellipse cx="34" cy="30" rx="7" ry="5" fill="#5a0fa0" transform="translate(0,2)" />
    {/* Staff */}
    <Rect x="8" y="5" width="4" height="29" rx="2" fill={color} />
    <Rect x="36" y="5" width="4" height="21" rx="2" fill={color} />
    {/* Bar */}
    <Rect x="8" y="5" width="32" height="4" rx="2" fill={color} />
    {/* Notes */}
    <Ellipse cx="14" cy="36" rx="7" ry="5" fill={color} />
    <Ellipse cx="34" cy="28" rx="7" ry="5" fill={color} />
    {/* Shine */}
    <Ellipse cx="11" cy="34" rx="3" ry="2" fill="#fff" opacity={0.4} />
    <Ellipse cx="31" cy="26" rx="3" ry="2" fill="#fff" opacity={0.4} />
  </Svg>
);

// 📳 Vibrate icon (gamified)
export const VibrateIcon: React.FC<IconProps> = ({ size = 24, color = '#06b6d4', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Phone shadow */}
    <Rect x="14" y="10" width="20" height="32" rx="5" fill="#047a8a" transform="translate(0,2)" />
    {/* Phone body */}
    <Rect x="14" y="8" width="20" height="32" rx="5" fill={color} />
    {/* Screen */}
    <Rect x="17" y="13" width="14" height="20" rx="2" fill="#027a8a" />
    <Rect x="17" y="13" width="14" height="20" rx="2" fill="#fff" opacity={0.2} />
    {/* Home button */}
    <Circle cx="24" cy="36" r="2" fill="#047a8a" />
    {/* Vibration lines */}
    <Path d="M8 16 C5 20 5 28 8 32" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    <Path d="M5 13 C1 19 1 29 5 35" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.5} />
    <Path d="M40 16 C43 20 43 28 40 32" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    <Path d="M43 13 C47 19 47 29 43 35" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.5} />
    {/* Screen shine */}
    <Rect x="18" y="14" width="5" height="8" rx="1.5" fill="#fff" opacity={0.2} />
  </Svg>
);

// ☀️ Sun icon (gamified)
export const SunIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Rays */}
    <Path d="M24 2 L24 8" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Path d="M24 40 L24 46" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Path d="M2 24 L8 24" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Path d="M40 24 L46 24" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Path d="M9 9 L13 13" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Path d="M35 35 L39 39" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Path d="M9 39 L13 35" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Path d="M35 13 L39 9" stroke={color} strokeWidth="4" strokeLinecap="round" />
    {/* Sun circle shadow */}
    <Circle cx="24" cy="26" r="12" fill="#cc7a00" />
    {/* Sun circle */}
    <Circle cx="24" cy="24" r="12" fill={color} />
    {/* Shine */}
    <Circle cx="19" cy="19" r="4" fill="#ffe066" opacity={0.6} />
    <Circle cx="17" cy="17" r="2" fill="#fff" opacity={0.5} />
  </Svg>
);

// 🌙 Moon icon (gamified)
export const MoonIcon: React.FC<IconProps> = ({ size = 24, color = '#6366f1', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Path d="M38 26 C36 36 28 43 19 43 C12 43 6 39 3 33 C6 40 13 46 22 46 C33 46 42 37 42 26 C42 22 41 19 39 16 C39 19 38.5 22 38 26 Z" fill="#3a3a9a" opacity={0.4} />
    {/* Moon */}
    <Path d="M36 24 C34 34 26 41 17 41 C10 41 4 37 1 31 C4 38 11 44 20 44 C31 44 40 35 40 24 C40 20 39 17 37 14 C37 17 36.5 20 36 24 Z" fill={color} />
    {/* Highlight */}
    <Circle cx="20" cy="20" r="4" fill="#9999ff" opacity={0.5} />
    {/* Stars */}
    <Circle cx="36" cy="8" r="2" fill="#ffc800" />
    <Circle cx="42" cy="18" r="1.5" fill="#ffc800" opacity={0.8} />
    <Circle cx="30" cy="4" r="1" fill="#ffc800" opacity={0.6} />
  </Svg>
);

// 🌍 World icon (gamified)
export const WorldIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Circle cx="24" cy="26" r="20" fill="#1d4ed8" opacity={0.3} />
    {/* Globe base */}
    <Circle cx="24" cy="24" r="20" fill={color} />
    {/* Land masses */}
    <Path d="M14 12 C18 10 22 12 24 15 C20 16 16 15 14 12 Z" fill="#22c55e" />
    <Path d="M26 10 C30 9 35 12 36 17 C32 19 27 18 25 14 Z" fill="#22c55e" />
    <Path d="M10 24 C12 20 17 20 20 24 C18 28 13 28 10 24 Z" fill="#22c55e" />
    <Path d="M22 26 C26 23 32 24 34 28 C30 32 24 32 22 28 Z" fill="#22c55e" />
    <Path d="M14 32 C18 30 21 33 20 37 C17 38 13 36 14 32 Z" fill="#22c55e" />
    {/* Equator line */}
    <Path d="M4 24 Q24 28 44 24" stroke="#1d4ed8" strokeWidth="1.5" fill="none" opacity={0.5} />
    {/* Shine */}
    <Circle cx="16" cy="14" r="6" fill="#fff" opacity={0.15} />
    <Circle cx="14" cy="12" r="3" fill="#fff" opacity={0.2} />
    {/* Outline */}
    <Circle cx="24" cy="24" r="20" fill="none" stroke="#1d4ed8" strokeWidth="2" opacity={0.4} />
  </Svg>
);

// 🏠 Home icon (gamified)
export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = '#58cc02', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Path d="M6 22 L24 6 L42 22 L42 46 H28 V34 H20 V46 H6 Z" fill="#2d7a00" transform="translate(0,2)" />
    {/* House body */}
    <Path d="M6 22 L24 6 L42 22 L42 46 H28 V34 H20 V46 H6 Z" fill={color} />
    {/* Roof overlay */}
    <Path d="M6 22 L24 6 L42 22 L37 22 L24 10 L11 22 Z" fill="#3d8c00" />
    {/* Door */}
    <Rect x="20" y="32" width="8" height="14" rx="3" fill="#3d8c00" />
    {/* Window */}
    <Rect x="10" y="24" width="9" height="9" rx="2" fill="#a8ffeb" opacity={0.8} />
    <Rect x="29" y="24" width="9" height="9" rx="2" fill="#a8ffeb" opacity={0.8} />
    {/* Window cross */}
    <Path d="M14.5 24 L14.5 33 M10 28.5 L19 28.5" stroke="#3d8c00" strokeWidth="1.5" />
    <Path d="M33.5 24 L33.5 33 M29 28.5 L38 28.5" stroke="#3d8c00" strokeWidth="1.5" />
    {/* Chimney */}
    <Rect x="30" y="2" width="5" height="10" rx="1.5" fill="#3d8c00" />
    {/* Shine */}
    <Path d="M12 22 L18 12 L22 14" stroke="#7aef00" strokeWidth="2" fill="none" opacity={0.4} strokeLinecap="round" />
  </Svg>
);

// 👥 People icon (gamified)
export const PeopleIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow person left */}
    <Circle cx="16" cy="14" r="8" fill="#444" opacity={0.2} transform="translate(0,2)" />
    <Path d="M2 44 C2 34 10 28 16 28 C22 28 30 34 30 44" fill="#444" opacity={0.2} transform="translate(0,2)" />
    {/* Shadow person right */}
    <Circle cx="32" cy="14" r="8" fill="#444" opacity={0.2} transform="translate(0,2)" />
    {/* Person left */}
    <Circle cx="16" cy="14" r="8" fill={color} />
    <Circle cx="13" cy="12" r="1.5" fill="#fff" opacity={0.6} />
    <Path d="M2 44 C2 34 10 28 16 28 C22 28 30 34 30 44" fill={color} />
    {/* Person right */}
    <Circle cx="32" cy="14" r="8" fill="#4b5563" />
    <Circle cx="29" cy="12" r="1.5" fill="#fff" opacity={0.6} />
    <Path d="M20 44 C22 36 28 30 32 30 C36 30 44 36 46 44" fill="#4b5563" />
    {/* Shine on left person */}
    <Circle cx="14" cy="11" r="3" fill="#fff" opacity={0.2} />
  </Svg>
);

// 🐢 Turtle icon (gamified)
export const TurtleIcon: React.FC<IconProps> = ({ size = 24, color = '#10b981', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Ellipse cx="24" cy="34" rx="18" ry="10" fill="#047a57" opacity={0.3} transform="translate(0,2)" />
    {/* Shell shadow */}
    <Ellipse cx="24" cy="26" rx="16" ry="12" fill="#047a57" />
    {/* Shell */}
    <Ellipse cx="24" cy="24" rx="16" ry="12" fill={color} />
    {/* Shell pattern */}
    <Ellipse cx="24" cy="24" rx="10" ry="7" fill="#0da874" />
    <Path d="M14 22 C17 19 21 18 24 18 C27 18 31 19 34 22" stroke="#047a57" strokeWidth="2" fill="none" strokeLinecap="round" />
    <Path d="M14 26 C17 29 21 30 24 30 C27 30 31 29 34 26" stroke="#047a57" strokeWidth="2" fill="none" strokeLinecap="round" />
    <Path d="M24 17 V31" stroke="#047a57" strokeWidth="2" fill="none" />
    {/* Head */}
    <Circle cx="12" cy="22" r="6" fill={color} />
    <Circle cx="10" cy="20" r="1.5" fill="#1a1a2e" />
    <Circle cx="10.8" cy="19.5" r="0.6" fill="#fff" />
    <Path d="M10 24 Q12 26 14 24" stroke="#047a57" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Legs */}
    <Ellipse cx="12" cy="33" rx="4" ry="3" fill={color} />
    <Ellipse cx="36" cy="33" rx="4" ry="3" fill={color} />
    <Ellipse cx="18" cy="35" rx="4" ry="3" fill={color} />
    <Ellipse cx="30" cy="35" rx="4" ry="3" fill={color} />
    {/* Tail */}
    <Path d="M38 24 Q44 22 43 26" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Shell shine */}
    <Ellipse cx="20" cy="20" rx="4" ry="3" fill="#fff" opacity={0.2} />
  </Svg>
);

// 🏅 Treasure chest icon (gamified)
export const TreasureIcon: React.FC<IconProps> = ({ size = 24, color = '#d97706', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Rect x="4" y="22" width="40" height="26" rx="4" fill="#7a3d00" transform="translate(0,2)" />
    {/* Chest bottom */}
    <Rect x="4" y="22" width="40" height="26" rx="4" fill={color} />
    {/* Horizontal band */}
    <Rect x="4" y="32" width="40" height="5" fill="#b35800" />
    {/* Chest lid shadow */}
    <Path d="M4 8 H44 C44 8 44 22 24 22 C4 22 4 22 4 8 Z" fill="#7a3d00" transform="translate(0,2)" />
    {/* Chest lid */}
    <Path d="M4 8 H44 C44 8 44 22 24 22 C4 22 4 22 4 8 Z" fill="#e6aa00" />
    {/* Lid highlight */}
    <Path d="M6 10 H42 C42 10 42 14 24 16 C6 18 6 14 6 10 Z" fill="#ffe066" opacity={0.4} />
    {/* Lock */}
    <Rect x="19" y="30" width="10" height="8" rx="3" fill="#ffc800" />
    <Circle cx="24" cy="33" r="3" fill="#cc8800" />
    <Rect x="22" y="34" width="4" height="4" rx="2" fill="#cc8800" />
    {/* Gold coins peeking */}
    <Circle cx="14" cy="23" r="4" fill="#ffc800" opacity={0.8} />
    <Circle cx="34" cy="23" r="4" fill="#ffc800" opacity={0.8} />
    {/* Corner rivets */}
    <Circle cx="8" cy="26" r="2.5" fill="#ffc800" />
    <Circle cx="40" cy="26" r="2.5" fill="#ffc800" />
    <Circle cx="8" cy="44" r="2.5" fill="#ffc800" />
    <Circle cx="40" cy="44" r="2.5" fill="#ffc800" />
    {/* Shine on lid */}
    <Path d="M8 9 H20 V12 C14 13 8 12 8 9 Z" fill="#fff" opacity={0.25} />
  </Svg>
);

// 🇺🇿 Uzbek Flag icon
export const FlagUzIcon: React.FC<IconProps> = ({ size = 24, style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="4" y="4" width="40" height="40" rx="6" fill="#fff" />
    <Rect x="4" y="4" width="40" height="13" rx="6" fill="#1eb2a6" />
    <Rect x="4" y="4" width="40" height="10" fill="#1eb2a6" />
    <Rect x="4" y="19" width="40" height="4" fill="#ce1126" />
    <Rect x="4" y="34" width="40" height="14" rx="6" fill="#1eb2a6" />
    <Rect x="4" y="37" width="40" height="11" fill="#1eb2a6" />
    <Rect x="4" y="14" width="40" height="5" fill="#fff" />
    <Rect x="4" y="29" width="40" height="5" fill="#fff" />
    {/* Crescent */}
    <Circle cx="18" cy="12" r="4" fill="#fff" />
    <Circle cx="20" cy="12" r="3.2" fill="#1eb2a6" />
    {/* Stars */}
    <Path d="M24 9 L24.6 10.8 L26.5 10.8 L25 11.8 L25.6 13.6 L24 12.6 L22.4 13.6 L23 11.8 L21.5 10.8 L23.4 10.8 Z" fill="#fff" transform="scale(0.6) translate(16,5)" />
  </Svg>
);

// 🇬🇧 English Flag icon
export const FlagEnIcon: React.FC<IconProps> = ({ size = 24, style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="4" y="4" width="40" height="40" rx="6" fill="#012169" />
    {/* White diagonals */}
    <Path d="M4 4 L44 44 M44 4 L4 44" stroke="#fff" strokeWidth="8" />
    {/* Red diagonals */}
    <Path d="M4 4 L44 44 M44 4 L4 44" stroke="#C8102E" strokeWidth="5" />
    {/* White cross */}
    <Rect x="20" y="4" width="8" height="40" fill="#fff" />
    <Rect x="4" y="20" width="40" height="8" fill="#fff" />
    {/* Red cross */}
    <Rect x="21" y="4" width="6" height="40" fill="#C8102E" />
    <Rect x="4" y="21" width="40" height="6" fill="#C8102E" />
    {/* Corner mask - rounded */}
    <Rect x="4" y="4" width="40" height="40" rx="6" fill="none" stroke="transparent" />
  </Svg>
);

// 🇷🇺 Russian Flag icon
export const FlagRuIcon: React.FC<IconProps> = ({ size = 24, style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Rect x="4" y="4" width="40" height="40" rx="6" fill="#fff" />
    <Rect x="4" y="4" width="40" height="14" rx="4" fill="#fff" />
    <Rect x="4" y="4" width="40" height="10" fill="#fff" />
    <Rect x="4" y="18" width="40" height="12" fill="#0039a6" />
    <Rect x="4" y="34" width="40" height="14" rx="4" fill="#d52b1e" />
    <Rect x="4" y="37" width="40" height="11" fill="#d52b1e" />
    {/* Top rounded mask fix */}
    <Path d="M4 10 Q4 4 10 4 H38 Q44 4 44 10 V14 H4 Z" fill="#fff" />
  </Svg>
);

// 👋 Wave / Greet icon (gamified)
export const WaveIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Palm shadow */}
    <Path d="M10 20 C8 14 10 8 16 7 C17 7 18 7 19 8 L22 14 L24 8 C25 6 27 5 29 6 C31 7 32 9 31 12 L30 15 C31 14 33 13 35 14 C37 15 38 17 37 20 L36 23 C37 22 39 22 41 23 C43 25 43 28 41 31 L36 40 C33 44 28 46 23 45 C16 44 11 39 10 32 Z" fill="#cc7a00" transform="translate(0,2)" opacity={0.3}/>
    {/* Palm */}
    <Path d="M10 20 C8 14 10 8 16 7 C17 7 18 7 19 8 L22 14 L24 8 C25 6 27 5 29 6 C31 7 32 9 31 12 L30 15 C31 14 33 13 35 14 C37 15 38 17 37 20 L36 23 C37 22 39 22 41 23 C43 25 43 28 41 31 L36 40 C33 44 28 46 23 45 C16 44 11 39 10 32 Z" fill={color} />
    {/* Shine */}
    <Path d="M16 10 C14 13 13 17 14 21" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={0.5} />
    {/* Lines on palm */}
    <Path d="M19 20 C20 24 20 30 18 34" stroke="#cc7a00" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.4} />
    <Path d="M25 20 C26 24 26 32 24 38" stroke="#cc7a00" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.4} />
  </Svg>
);

// 🙏 Prayer / Thank icon (gamified)
export const PrayIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Path d="M12 8 L24 4 L36 8 L40 28 L24 44 L8 28 Z" fill="#cc7a00" opacity={0.2} transform="translate(0,2)" />
    {/* Left hand */}
    <Path d="M12 10 L24 6 L24 44 L8 30 Z" fill={color} />
    {/* Right hand */}
    <Path d="M36 10 L24 6 L24 44 L40 30 Z" fill="#e6aa00" />
    {/* Center line */}
    <Path d="M24 6 L24 44" stroke="#cc7a00" strokeWidth="1.5" fill="none" opacity={0.4} />
    {/* Shine */}
    <Path d="M16 14 C15 18 15 24 16 28" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.4} />
    {/* Stars/sparkles above */}
    <Circle cx="24" cy="4" r="2" fill="#ffc800" />
    <Circle cx="30" cy="2" r="1.5" fill="#ffc800" opacity={0.7} />
    <Circle cx="18" cy="2" r="1.5" fill="#ffc800" opacity={0.7} />
  </Svg>
);

// 💚 Heart icon (gamified)
export const HeartIcon: React.FC<IconProps> = ({ size = 24, color = '#ef4444', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Path d="M24 42 C24 42 6 30 6 18 C6 12 10 8 16 8 C20 8 23 10 24 13 C25 10 28 8 32 8 C38 8 42 12 42 18 C42 30 24 42 24 42 Z" fill="#aa0000" opacity={0.3} transform="translate(0,2)" />
    {/* Main heart */}
    <Path d="M24 42 C24 42 6 30 6 18 C6 12 10 8 16 8 C20 8 23 10 24 13 C25 10 28 8 32 8 C38 8 42 12 42 18 C42 30 24 42 24 42 Z" fill={color} />
    {/* Highlight */}
    <Path d="M14 12 C12 14 11 17 12 20" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.5} />
    <Circle cx="18" cy="12" r="3" fill="#fff" opacity={0.3} />
  </Svg>
);

// 💧 Water / Drop icon (gamified)
export const DropIcon: React.FC<IconProps> = ({ size = 24, color = '#1cb0f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Path d="M24 4 C24 4 8 20 8 30 C8 38 15 44 24 44 C33 44 40 38 40 30 C40 20 24 4 24 4 Z" fill="#0077bb" opacity={0.3} transform="translate(0,2)" />
    {/* Drop */}
    <Path d="M24 4 C24 4 8 20 8 30 C8 38 15 44 24 44 C33 44 40 38 40 30 C40 20 24 4 24 4 Z" fill={color} />
    {/* Shine */}
    <Path d="M15 22 C13 26 13 31 15 35" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.5} />
    <Circle cx="18" cy="20" r="3" fill="#fff" opacity={0.3} />
  </Svg>
);

// 🍞 Bread / Food icon (gamified)
export const BreadIcon: React.FC<IconProps> = ({ size = 24, color = '#d97706', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Path d="M4 22 C4 16 10 12 18 12 H30 C38 12 44 16 44 22 C44 24 43 26 41 27 L41 40 H7 L7 27 C5 26 4 24 4 22 Z" fill="#8b5500" opacity={0.3} transform="translate(0,2)" />
    {/* Main bread */}
    <Path d="M4 22 C4 16 10 12 18 12 H30 C38 12 44 16 44 22 C44 24 43 26 41 27 L41 40 H7 L7 27 C5 26 4 24 4 22 Z" fill={color} />
    {/* Top crust */}
    <Path d="M18 12 C16 8 20 4 24 4 C28 4 32 8 30 12" fill="#b35800" />
    {/* Sesame seeds */}
    <Ellipse cx="18" cy="20" rx="2" ry="1.2" fill="#8b5500" opacity={0.6} />
    <Ellipse cx="24" cy="18" rx="2" ry="1.2" fill="#8b5500" opacity={0.6} />
    <Ellipse cx="30" cy="20" rx="2" ry="1.2" fill="#8b5500" opacity={0.6} />
    {/* Shine */}
    <Path d="M10 20 C10 18 12 16 15 16" stroke="#ffe066" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.5} />
  </Svg>
);

// 🥛 Milk / Drink icon (gamified)
export const MilkIcon: React.FC<IconProps> = ({ size = 24, color = '#1cb0f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Path d="M14 12 L10 44 H38 L34 12 Z" fill="#0077bb" opacity={0.2} transform="translate(0,2)" />
    {/* Glass body */}
    <Path d="M14 12 L10 44 H38 L34 12 Z" fill={color} opacity={0.9} />
    {/* Milk fill */}
    <Path d="M11 30 L10 44 H38 L37 30 Z" fill="#fff" opacity={0.85} />
    {/* Straw */}
    <Rect x="27" y="4" width="4" height="30" rx="2" fill="#ff9a3c" />
    {/* Top */}
    <Rect x="12" y="10" width="24" height="4" rx="2" fill="#0093d4" />
    {/* Label */}
    <Rect x="14" y="18" width="12" height="8" rx="2" fill="#fff" opacity={0.4} />
    {/* Shine */}
    <Path d="M12 14 V28" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.3} />
  </Svg>
);

// 👩 Woman / Person icon (gamified)
export const WomanIcon: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Body shadow */}
    <Path d="M10 46 C10 36 16 30 24 30 C32 30 38 36 38 46" fill="#5a0fa0" opacity={0.2} transform="translate(0,2)" />
    {/* Dress */}
    <Path d="M10 46 C10 36 16 30 24 30 C32 30 38 36 38 46 Z" fill={color} />
    {/* Dress shine */}
    <Path d="M14 40 C15 36 18 32 22 30" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.3} />
    {/* Head */}
    <Circle cx="24" cy="16" r="11" fill="#ffc14d" />
    {/* Hair */}
    <Path d="M13 14 C13 8 17 4 24 4 C31 4 35 8 35 14 C35 10 31 6 24 6 C17 6 13 10 13 14 Z" fill="#5a3000" />
    <Path d="M13 16 C12 20 12 24 14 28" stroke="#5a3000" strokeWidth="5" fill="none" strokeLinecap="round" />
    <Path d="M35 16 C36 20 36 24 34 28" stroke="#5a3000" strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Face */}
    <Circle cx="20" cy="16" r="2" fill="#1a1a2e" />
    <Circle cx="28" cy="16" r="2" fill="#1a1a2e" />
    <Path d="M20 22 Q24 25 28 22" stroke="#ff7043" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Cheeks */}
    <Circle cx="16" cy="20" r="2.5" fill="#ff9a7a" opacity={0.5} />
    <Circle cx="32" cy="20" r="2.5" fill="#ff9a7a" opacity={0.5} />
  </Svg>
);

// 👨 Man / Person icon (gamified)
export const ManIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Body shadow */}
    <Path d="M10 46 C10 36 16 30 24 30 C32 30 38 36 38 46" fill="#1d4ed8" opacity={0.2} transform="translate(0,2)" />
    {/* Shirt */}
    <Path d="M10 46 C10 36 16 30 24 30 C32 30 38 36 38 46 Z" fill={color} />
    {/* Shirt collar */}
    <Path d="M20 30 L24 36 L28 30" stroke="#fff" strokeWidth="1.5" fill="none" />
    {/* Head */}
    <Circle cx="24" cy="16" r="11" fill="#ffc14d" />
    {/* Hair */}
    <Path d="M13 12 C13 6 17 3 24 3 C31 3 35 6 35 12 Z" fill="#3a2000" />
    {/* Face */}
    <Circle cx="20" cy="16" r="2" fill="#1a1a2e" />
    <Circle cx="28" cy="16" r="2" fill="#1a1a2e" />
    <Path d="M20 22 Q24 25 28 22" stroke="#ff7043" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Cheeks */}
    <Circle cx="16" cy="20" r="2.5" fill="#ff9a7a" opacity={0.5} />
    <Circle cx="32" cy="20" r="2.5" fill="#ff9a7a" opacity={0.5} />
  </Svg>
);

// 👦 Boy icon (gamified)
export const BoyIcon: React.FC<IconProps> = ({ size = 24, color = '#06b6d4', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M12 46 C12 38 17 32 24 32 C31 32 36 38 36 46 Z" fill={color} />
    <Circle cx="24" cy="18" r="10" fill="#ffc14d" />
    <Path d="M14 14 C14 8 18 5 24 5 C30 5 34 8 34 14 Z" fill="#3a2000" />
    <Circle cx="20" cy="18" r="1.8" fill="#1a1a2e" />
    <Circle cx="28" cy="18" r="1.8" fill="#1a1a2e" />
    <Path d="M20 23 Q24 26 28 23" stroke="#ff7043" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Circle cx="17" cy="21" r="2" fill="#ff9a7a" opacity={0.5} />
    <Circle cx="31" cy="21" r="2" fill="#ff9a7a" opacity={0.5} />
  </Svg>
);

// 👧 Girl icon (gamified)
export const GirlIcon: React.FC<IconProps> = ({ size = 24, color = '#ec4899', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Path d="M12 46 C12 38 17 32 24 32 C31 32 36 38 36 46 Z" fill={color} />
    <Circle cx="24" cy="18" r="10" fill="#ffc14d" />
    {/* Pigtails */}
    <Path d="M14 14 C12 10 14 6 18 6" stroke="#5a3000" strokeWidth="4" fill="none" strokeLinecap="round" />
    <Path d="M34 14 C36 10 34 6 30 6" stroke="#5a3000" strokeWidth="4" fill="none" strokeLinecap="round" />
    <Path d="M14 10 C14 6 18 4 24 4 C30 4 34 6 34 10 Z" fill="#5a3000" />
    <Circle cx="20" cy="18" r="1.8" fill="#1a1a2e" />
    <Circle cx="28" cy="18" r="1.8" fill="#1a1a2e" />
    <Path d="M20 23 Q24 26 28 23" stroke="#ff7043" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Circle cx="17" cy="21" r="2" fill="#ff9a7a" opacity={0.5} />
    <Circle cx="31" cy="21" r="2" fill="#ff9a7a" opacity={0.5} />
  </Svg>
);

// 🌅 Sunrise / Morning icon (gamified)
export const SunriseIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Sky */}
    <Rect x="2" y="26" width="44" height="20" rx="4" fill="#1cb0f6" opacity={0.3} />
    {/* Ground */}
    <Rect x="2" y="36" width="44" height="10" rx="3" fill="#22c55e" opacity={0.6} />
    {/* Sun half */}
    <Path d="M14 36 A10 10 0 0 1 34 36 Z" fill={color} />
    <Circle cx="24" cy="36" r="10" fill={color} />
    {/* Rays above horizon */}
    <Path d="M24 24 L24 20" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <Path d="M14 27 L11 24" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <Path d="M34 27 L37 24" stroke={color} strokeWidth="3" strokeLinecap="round" />
    {/* Horizon line */}
    <Path d="M2 36 H46" stroke="#0077bb" strokeWidth="2" opacity={0.5} />
    {/* Shine */}
    <Circle cx="19" cy="31" r="3" fill="#fff" opacity={0.3} />
  </Svg>
);

// 🐱 Cat icon (gamified)
export const CatIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Body shadow */}
    <Ellipse cx="24" cy="36" rx="14" ry="10" fill="#cc7a00" opacity={0.25} transform="translate(0,2)" />
    {/* Body */}
    <Ellipse cx="24" cy="34" rx="14" ry="10" fill={color} />
    {/* Head */}
    <Circle cx="24" cy="20" r="13" fill={color} />
    {/* Ears */}
    <Path d="M12 12 L10 4 L18 10 Z" fill={color} />
    <Path d="M36 12 L38 4 L30 10 Z" fill={color} />
    <Path d="M13 11 L11 5 L17 10 Z" fill="#ff9a9a" opacity={0.7} />
    <Path d="M35 11 L37 5 L31 10 Z" fill="#ff9a9a" opacity={0.7} />
    {/* Eyes */}
    <Circle cx="19" cy="19" r="4" fill="#fff" />
    <Circle cx="29" cy="19" r="4" fill="#fff" />
    <Circle cx="20" cy="19" r="2.5" fill="#1a1a2e" />
    <Circle cx="30" cy="19" r="2.5" fill="#1a1a2e" />
    <Circle cx="21" cy="18" r="1" fill="#fff" />
    <Circle cx="31" cy="18" r="1" fill="#fff" />
    {/* Nose */}
    <Path d="M22 24 L24 26 L26 24" fill="#ff7043" />
    {/* Whiskers */}
    <Path d="M8 22 L18 23 M8 25 L18 25" stroke="#888" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Path d="M40 22 L30 23 M40 25 L30 25" stroke="#888" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Tail */}
    <Path d="M38 38 Q45 32 42 26" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
  </Svg>
);

// 🐟 Fish icon (gamified)
export const FishIcon: React.FC<IconProps> = ({ size = 24, color = '#1cb0f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Ellipse cx="22" cy="26" rx="16" ry="10" fill="#0077bb" opacity={0.2} transform="translate(0,2)" />
    {/* Tail */}
    <Path d="M36 16 L46 10 L46 26 L36 20 Z" fill="#0093d4" />
    <Path d="M36 16 L44 12 L44 24 L36 20 Z" fill="#1cb0f6" opacity={0.6} />
    {/* Body */}
    <Ellipse cx="22" cy="18" rx="16" ry="10" fill={color} />
    {/* Belly */}
    <Ellipse cx="20" cy="20" rx="12" ry="6" fill="#6de0ff" opacity={0.5} />
    {/* Eye */}
    <Circle cx="12" cy="14" r="4" fill="#fff" />
    <Circle cx="12" cy="14" r="2.5" fill="#1a1a2e" />
    <Circle cx="13" cy="13" r="1" fill="#fff" />
    {/* Fin */}
    <Path d="M20 8 C22 6 28 6 28 10" stroke="#0077bb" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Scales shine */}
    <Circle cx="24" cy="16" r="2" fill="#fff" opacity={0.2} />
    <Circle cx="30" cy="18" r="2" fill="#fff" opacity={0.2} />
  </Svg>
);

// 🍽️ Plate/Food icon (gamified)
export const PlateIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Ellipse cx="24" cy="38" rx="20" ry="6" fill="#333" opacity={0.15} />
    {/* Plate */}
    <Ellipse cx="24" cy="34" rx="20" ry="6" fill={color} />
    <Ellipse cx="24" cy="32" rx="20" ry="6" fill={color} />
    <Ellipse cx="24" cy="32" rx="18" ry="5" fill="#9ca3af" />
    {/* Food on plate */}
    <Ellipse cx="24" cy="30" rx="14" ry="4" fill="#d97706" />
    {/* Food details */}
    <Ellipse cx="20" cy="29" rx="4" ry="2.5" fill="#22c55e" opacity={0.8} />
    <Ellipse cx="28" cy="29" rx="4" ry="2.5" fill="#ef4444" opacity={0.8} />
    {/* Fork */}
    <Path d="M6 10 V30" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M4 10 V18 M6 10 V18 M8 10 V18" stroke="#888" strokeWidth="2" strokeLinecap="round" />
    {/* Knife */}
    <Path d="M42 10 V30" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M42 10 C44 12 44 18 42 20" stroke="#888" strokeWidth="2" fill="none" />
    {/* Shine */}
    <Ellipse cx="18" cy="31" rx="4" ry="1.5" fill="#fff" opacity={0.2} />
  </Svg>
);

// 🚶 Walk / Person Walking (gamified)
export const WalkIcon: React.FC<IconProps> = ({ size = 24, color = '#58cc02', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Ellipse cx="24" cy="46" rx="10" ry="3" fill="#2d7a00" opacity={0.2} />
    {/* Head */}
    <Circle cx="30" cy="8" r="7" fill={color} />
    {/* Body */}
    <Path d="M30 15 L28 28" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Arms */}
    <Path d="M30 20 L20 16" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    <Path d="M30 20 L38 24" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Legs */}
    <Path d="M28 28 L20 40" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    <Path d="M28 28 L34 40" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Feet */}
    <Path d="M20 40 L16 42" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    <Path d="M34 40 L38 38" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Head shine */}
    <Circle cx="27" cy="6" r="2.5" fill="#fff" opacity={0.3} />
  </Svg>
);

// 📚 Study / School icon (gamified) - reusing BookIcon with stack
export const StudyIcon: React.FC<IconProps> = ({ size = 24, color = '#3b82f6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Bottom book */}
    <Rect x="6" y="34" width="36" height="8" rx="3" fill="#1d4ed8" />
    <Rect x="6" y="30" width="36" height="8" rx="3" fill="#2563eb" />
    {/* Middle book */}
    <Rect x="6" y="22" width="36" height="10" rx="3" fill="#7c3aed" transform="rotate(-3, 24, 27)" />
    {/* Top book */}
    <Rect x="8" y="12" width="32" height="14" rx="4" fill={color} />
    <Rect x="8" y="12" width="5" height="14" rx="3" fill="#1d4ed8" />
    <Rect x="16" y="16" width="16" height="2.5" rx="1.25" fill="#fff" opacity={0.8} />
    <Rect x="16" y="20" width="12" height="2.5" rx="1.25" fill="#fff" opacity={0.8} />
    {/* Apple on top */}
    <Circle cx="36" cy="10" r="6" fill="#ef4444" />
    <Path d="M36 4 Q38 2 40 4" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <Circle cx="33" cy="8" r="1.5" fill="#fff" opacity={0.4} />
  </Svg>
);

// 👨‍🏫 Teacher icon (gamified)
export const TeacherIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Blackboard */}
    <Rect x="2" y="4" width="44" height="28" rx="4" fill="#1f4e3d" />
    <Rect x="4" y="6" width="40" height="24" rx="3" fill="#2d6a4f" />
    {/* Writing on board */}
    <Path d="M10 14 L20 14 M10 18 L24 18 M10 22 L18 22" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.8} />
    {/* A B C */}
    <Text style={{ fontSize: 0 }} />
    {/* Teacher person below */}
    <Circle cx="24" cy="42" r="6" fill={color} />
    <Path d="M18 48 C18 44 20 42 24 42 C28 42 30 44 30 48" fill={color} />
    {/* Pointer */}
    <Path d="M28 20 L34 10" stroke="#ffc800" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <Circle cx="34" cy="10" r="2" fill="#ffc800" />
  </Svg>
);

// 1️⃣ Number One icon (gamified)
export const NumberOneIcon: React.FC<IconProps> = ({ size = 24, color = '#58cc02', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="24" cy="25" r="20" fill="#2d7a00" opacity={0.3} />
    <Circle cx="24" cy="24" r="20" fill={color} />
    <Path d="M22 14 L26 10 L26 36" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M20 36 H32" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
    <Circle cx="18" cy="16" r="3" fill="#fff" opacity={0.3} />
  </Svg>
);

// 🔴 Red Circle / Color icon (gamified)
export const ColorCircleIcon: React.FC<IconProps> = ({ size = 24, color = '#ef4444', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="24" cy="26" r="18" fill="#000" opacity={0.15} />
    <Circle cx="24" cy="24" r="18" fill={color} />
    <Circle cx="17" cy="16" r="6" fill="#fff" opacity={0.25} />
    <Circle cx="15" cy="14" r="3" fill="#fff" opacity={0.3} />
  </Svg>
);

// ✕ Close icon (gamified)
export const CloseIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    <Circle cx="24" cy="25" r="20" fill="#000" opacity={0.15} />
    <Circle cx="24" cy="24" r="20" fill={color} opacity={0.15} />
    <Path d="M14 14 L34 34" stroke={color} strokeWidth="5" strokeLinecap="round" />
    <Path d="M34 14 L14 34" stroke={color} strokeWidth="5" strokeLinecap="round" />
  </Svg>
);

// ✨ Sparkle / New Word icon (gamified)
export const SparkleIcon: React.FC<IconProps> = ({ size = 24, color = '#8b5cf6', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Center star */}
    <Path d="M24 4 L26.5 20 L44 22 L26.5 26 L24 44 L21.5 26 L4 22 L21.5 20 Z" fill={color} />
    {/* Top right small star */}
    <Path d="M38 6 L39 10 L43 11 L39 12 L38 16 L37 12 L33 11 L37 10 Z" fill={color} opacity={0.7} />
    {/* Bottom left small star */}
    <Path d="M10 32 L11 36 L15 37 L11 38 L10 42 L9 38 L5 37 L9 36 Z" fill={color} opacity={0.7} />
    {/* Shine */}
    <Circle cx="20" cy="18" r="2" fill="#fff" opacity={0.5} />
  </Svg>
);

// 📝 Write/Pencil icon (gamified)
export const PencilIcon: React.FC<IconProps> = ({ size = 24, color = '#f59e0b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Path d="M8 38 L12 42 L38 16 L34 12 Z" fill="#000" opacity={0.2} transform="translate(1,2)" />
    {/* Pencil body */}
    <Path d="M8 38 L12 42 L38 16 L34 12 Z" fill={color} />
    {/* Pencil tip */}
    <Path d="M8 38 L12 42 L6 44 Z" fill="#555" />
    {/* Pencil tip light */}
    <Path d="M8 38 L10 40 L6 44 Z" fill="#ffd700" opacity={0.5} />
    {/* Eraser */}
    <Rect x="34" y="8" width="8" height="8" rx="2" fill="#ff9a9a" transform="rotate(45, 38, 12)" />
    {/* Highlight */}
    <Path d="M13 36 L36 13" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.3} />
  </Svg>
);

// 👤 Profile icon (gamified)
export const ProfileIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Body shadow */}
    <Path d="M6 44 C6 34 14 28 24 28 C34 28 42 34 42 44 V48 H6 Z" fill="#333" opacity={0.2} transform="translate(0,2)" />
    {/* Head shadow */}
    <Circle cx="24" cy="16" r="11" fill="#333" opacity={0.2} transform="translate(0,2)" />
    {/* Head */}
    <Circle cx="24" cy="16" r="11" fill={color} />
    {/* Face highlight */}
    <Circle cx="20" cy="13" r="4" fill="#fff" opacity={0.25} />
    {/* Eyes */}
    <Circle cx="20" cy="15" r="2" fill="#fff" opacity={0.8} />
    <Circle cx="28" cy="15" r="2" fill="#fff" opacity={0.8} />
    {/* Body */}
    <Path d="M6 44 C6 34 14 28 24 28 C34 28 42 34 42 44 V48 H6 Z" fill={color} />
    {/* Body highlight */}
    <Path d="M10 40 C12 34 18 30 24 30 C18 32 12 37 10 44 Z" fill="#fff" opacity={0.2} />
  </Svg>
);
