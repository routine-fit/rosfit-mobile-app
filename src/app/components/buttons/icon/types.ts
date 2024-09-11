import { TouchableOpacityProps } from 'react-native';

export type IconButtonSizes = 'sm' | 'm';
export type IconButtonColorTheme =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'error'
  | 'success'
  | 'content';

export interface IconButtonProps extends TouchableOpacityProps {
  themeColor?: IconButtonColorTheme;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: IconButtonSizes;
  icon: JSX.Element;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  iconProp?: 'fill' | 'stroke';
}
