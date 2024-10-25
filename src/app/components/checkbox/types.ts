export type CheckBoxColorTheme = 'primary' | 'secondary';

export interface CheckboxProps {
  size?: number;
  fillColor?: CheckBoxColorTheme;
  text?: string;
  isChecked?: boolean;
  onPress?: (isChecked: boolean) => void;
}
