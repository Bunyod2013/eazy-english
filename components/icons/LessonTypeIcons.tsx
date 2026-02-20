import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse } from 'react-native-svg';
import { IconProps } from './types';

// 🎬 Video lesson icon (gamified)
export const VideoIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Rect x="3" y="11" width="30" height="24" rx="5" fill="#000" opacity={0.25} transform="translate(0,2)" />
    {/* Screen */}
    <Rect x="3" y="9" width="30" height="24" rx="5" fill={color} opacity={0.95} />
    {/* Screen shine */}
    <Rect x="5" y="11" width="12" height="6" rx="2" fill="#fff" opacity={0.3} />
    {/* Camera part shadow */}
    <Path d="M33 16 L46 10 V38 L33 32 Z" fill="#000" opacity={0.2} transform="translate(0,2)" />
    {/* Camera part */}
    <Path d="M33 16 L46 10 V38 L33 32 Z" fill={color} opacity={0.85} />
    {/* Play button */}
    <Circle cx="18" cy="21" r="7" fill="#58cc02" opacity={0.9} />
    <Path d="M16 18 L23 21 L16 24 Z" fill="#fff" />
  </Svg>
);

// 🎧 Audio/Listening lesson icon (gamified)
export const HeadphoneIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow headband */}
    <Path d="M8 24 C8 13 15 6 24 6 C33 6 40 13 40 24" stroke="#000" strokeWidth="5" fill="none" strokeLinecap="round" opacity={0.2} transform="translate(0,2)" />
    {/* Headband */}
    <Path d="M8 24 C8 13 15 6 24 6 C33 6 40 13 40 24" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Left ear cup shadow */}
    <Rect x="3" y="23" width="10" height="14" rx="5" fill="#000" opacity={0.2} transform="translate(0,2)" />
    {/* Right ear cup shadow */}
    <Rect x="35" y="23" width="10" height="14" rx="5" fill="#000" opacity={0.2} transform="translate(0,2)" />
    {/* Left ear cup */}
    <Rect x="3" y="22" width="10" height="14" rx="5" fill={color} />
    {/* Right ear cup */}
    <Rect x="35" y="22" width="10" height="14" rx="5" fill={color} />
    {/* Speaker dots */}
    <Circle cx="8" cy="29" r="3" fill="#58cc02" opacity={0.8} />
    <Circle cx="40" cy="29" r="3" fill="#58cc02" opacity={0.8} />
    {/* Shine */}
    <Path d="M10 24 C10 20 13 17 17 16" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.4} />
  </Svg>
);

// 🎤 Speaking lesson icon (gamified)
export const MicIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Mic body shadow */}
    <Rect x="16" y="4" width="16" height="24" rx="8" fill="#000" opacity={0.2} transform="translate(0,2)" />
    {/* Mic body */}
    <Rect x="16" y="4" width="16" height="24" rx="8" fill={color} />
    {/* Shine */}
    <Rect x="18" y="6" width="5" height="12" rx="2.5" fill="#fff" opacity={0.3} />
    {/* Pulse lines */}
    <Circle cx="24" cy="14" r="4" fill="#58cc02" opacity={0.4} />
    {/* Stand shadow */}
    <Path d="M10 24 C10 33 17 38 24 38 C31 38 38 33 38 24" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" opacity={0.2} transform="translate(0,2)" />
    {/* Stand */}
    <Path d="M10 24 C10 33 17 38 24 38 C31 38 38 33 38 24" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Base */}
    <Path d="M24 38 V44" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Rect x="16" y="43" width="16" height="4" rx="2" fill={color} />
    {/* Base shadow */}
    <Rect x="16" y="43" width="16" height="4" rx="2" fill="#000" opacity={0.15} transform="translate(0,1)" />
  </Svg>
);

// 🎤 Microphone icon large (gamified)
export const MicrophoneIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Mic body shadow */}
    <Rect x="16" y="4" width="16" height="24" rx="8" fill="#000" opacity={0.2} transform="translate(0,2)" />
    {/* Mic body */}
    <Rect x="16" y="4" width="16" height="24" rx="8" fill={color} />
    {/* Shine */}
    <Rect x="18" y="6" width="5" height="14" rx="2.5" fill="#fff" opacity={0.35} />
    {/* Active glow */}
    <Circle cx="24" cy="16" r="5" fill="#ff4b4b" opacity={0.35} />
    <Circle cx="24" cy="16" r="3" fill="#ff4b4b" opacity={0.5} />
    {/* Stand */}
    <Path d="M10 24 C10 33 17 38 24 38 C31 38 38 33 38 24" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    <Path d="M24 38 V44" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <Rect x="16" y="43" width="16" height="4" rx="2" fill={color} />
  </Svg>
);

// 📖 Story/Reading lesson icon (gamified)
export const StoryIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Rect x="6" y="4" width="36" height="40" rx="5" fill="#000" opacity={0.2} transform="translate(0,2)" />
    {/* Book body */}
    <Rect x="6" y="4" width="36" height="40" rx="5" fill={color} opacity={0.95} />
    {/* Spine */}
    <Rect x="6" y="4" width="8" height="40" rx="5" fill={color} opacity={0.7} />
    <Rect x="11" y="4" width="2" height="40" fill="#000" opacity={0.1} />
    {/* Text lines */}
    <Rect x="17" y="12" width="18" height="3.5" rx="1.75" fill="#58cc02" opacity={0.7} />
    <Rect x="17" y="18" width="18" height="3.5" rx="1.75" fill="#58cc02" opacity={0.7} />
    <Rect x="17" y="24" width="14" height="3.5" rx="1.75" fill="#58cc02" opacity={0.7} />
    <Rect x="17" y="30" width="18" height="3.5" rx="1.75" fill="#58cc02" opacity={0.7} />
    <Rect x="17" y="36" width="10" height="3.5" rx="1.75" fill="#58cc02" opacity={0.7} />
    {/* Bookmark */}
    <Path d="M36 4 V16 L33 13 L30 16 V4 Z" fill="#ff4b4b" opacity={0.9} />
    {/* Shine */}
    <Rect x="8" y="6" width="6" height="16" rx="2" fill="#fff" opacity={0.15} />
  </Svg>
);

// ⏱️ Practice/Review icon (gamified)
export const PracticeIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Circle cx="24" cy="26" r="20" fill="#000" opacity={0.2} />
    {/* Clock body */}
    <Circle cx="24" cy="24" r="20" fill={color} opacity={0.95} />
    {/* Clock face */}
    <Circle cx="24" cy="24" r="16" fill="#fff" opacity={0.15} />
    {/* Tick marks */}
    <Path d="M24 6 V10" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
    <Path d="M24 38 V42" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
    <Path d="M6 24 H10" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
    <Path d="M38 24 H42" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
    {/* Hour hand */}
    <Path d="M24 24 L24 13" stroke="#58cc02" strokeWidth="4" strokeLinecap="round" />
    {/* Minute hand */}
    <Path d="M24 24 L33 24" stroke="#58cc02" strokeWidth="3" strokeLinecap="round" />
    {/* Center dot */}
    <Circle cx="24" cy="24" r="3" fill="#58cc02" />
    <Circle cx="24" cy="24" r="1.5" fill="#fff" />
    {/* Shine */}
    <Path d="M12 12 A14 14 0 0 1 36 12" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.3} />
  </Svg>
);
