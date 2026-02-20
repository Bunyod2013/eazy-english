import { ViewStyle } from 'react-native';

export interface IconProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export type IconSize = 'small' | 'medium' | 'large' | 'xlarge';

export const ICON_SIZES: Record<IconSize, number> = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 48,
};
