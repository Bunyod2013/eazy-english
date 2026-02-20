import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps } from './types';

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = '#58cc02', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Circle cx="24" cy="26" r="20" fill="#2d7a00" opacity={0.4} />
    {/* Main circle */}
    <Circle cx="24" cy="24" r="20" fill={color} />
    {/* Inner highlight ring */}
    <Circle cx="24" cy="24" r="20" fill="none" stroke="#7aef00" strokeWidth="3" opacity={0.4} />
    {/* Top highlight */}
    <Path d="M10 14 A16 16 0 0 1 38 14" stroke="#7aef00" strokeWidth="4" fill="none" strokeLinecap="round" opacity={0.5} />
    {/* Check mark shadow */}
    <Path d="M13 24 L21 32 L36 17" stroke="#2d7a00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(0,2)" opacity={0.4} />
    {/* Check mark */}
    <Path d="M13 24 L21 32 L36 17" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Shine dot */}
    <Circle cx="16" cy="16" r="4" fill="#fff" opacity={0.25} />
  </Svg>
);

export const XIcon: React.FC<IconProps> = ({ size = 24, color = '#ff4b4b', style }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" style={style}>
    {/* Shadow */}
    <Circle cx="24" cy="26" r="20" fill="#aa0000" opacity={0.4} />
    {/* Main circle */}
    <Circle cx="24" cy="24" r="20" fill={color} />
    {/* Inner highlight ring */}
    <Circle cx="24" cy="24" r="20" fill="none" stroke="#ff8080" strokeWidth="3" opacity={0.4} />
    {/* Top highlight */}
    <Path d="M10 14 A16 16 0 0 1 38 14" stroke="#ff8080" strokeWidth="4" fill="none" strokeLinecap="round" opacity={0.5} />
    {/* X shadow */}
    <Path d="M14 14 L34 34 M34 14 L14 34" stroke="#aa0000" strokeWidth="6" strokeLinecap="round" fill="none" transform="translate(0,2)" opacity={0.4} />
    {/* X mark */}
    <Path d="M14 14 L34 34 M34 14 L14 34" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" />
    {/* Shine dot */}
    <Circle cx="16" cy="16" r="4" fill="#fff" opacity={0.25} />
  </Svg>
);
