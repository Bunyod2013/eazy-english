import React from 'react';
import Svg, { Path, Circle, Rect, Ellipse } from 'react-native-svg';
import { IconProps } from './types';

export const LightBulbIcon: React.FC<IconProps> = ({ size = 24, color = '#ffc800', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Glow shadow */}
    <Circle cx="24" cy="20" r="14" fill={color} opacity={0.2} />
    {/* Bulb glass shadow */}
    <Path
      d="M14 22 C14 16 18 10 24 10 C30 10 34 16 34 22 C34 26 32 29 30 31 L30 36 H18 L18 31 C16 29 14 26 14 22 Z"
      fill="#cc8800"
      transform="translate(0,2)"
    />
    {/* Bulb glass */}
    <Path
      d="M14 22 C14 16 18 10 24 10 C30 10 34 16 34 22 C34 26 32 29 30 31 L30 36 H18 L18 31 C16 29 14 26 14 22 Z"
      fill={color}
    />
    {/* Bulb inner glow */}
    <Path
      d="M17 22 C17 17 20 13 24 13 C28 13 31 17 31 22 C31 25 29 27 28 29 H20 C19 27 17 25 17 22 Z"
      fill="#fff5c0"
      opacity={0.7}
    />
    {/* Shine streak */}
    <Path d="M19 14 C18 17 17 20 18 24" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={0.7} />
    <Circle cx="21" cy="13" r="2" fill="#fff" opacity={0.5} />
    {/* Base bands */}
    <Rect x="18" y="35" width="12" height="4" rx="2" fill="#b35800" />
    <Rect x="19" y="39" width="10" height="4" rx="2" fill="#b35800" />
    {/* Base cap */}
    <Rect x="20" y="42" width="8" height="3" rx="1.5" fill="#888" />
    {/* Shine lines on bands */}
    <Path d="M18 36 H30" stroke="#cc7a00" strokeWidth="1" opacity={0.4} />
    <Path d="M19 40 H29" stroke="#cc7a00" strokeWidth="1" opacity={0.4} />
  </Svg>
);
