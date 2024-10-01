export type ButtonColorTheme = 'secondary' | 'neutral' | 'primary' | 'error';
export type ButtonVariant = 'filled' | 'ghost' | 'outlined';
export type ButtonSize = 'sm' | 'm' | 'lg' | 'xl';
export type ButtonRadius = 'oval' | 'rounded' | 'square';
export type ButtonStatus = 'pressed' | 'focus' | 'disabled' | 'default';

export interface ButtonProps {
  size?: ButtonSize;
  themeColor?: ButtonColorTheme;
  variant?: ButtonVariant;
  disabled?: boolean;
  leadingIcon?: JSX.Element;
  trailingIcon?: JSX.Element;
  content?: string;
  onPress: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  marginTop?: number;
  radius?: ButtonRadius;
}
