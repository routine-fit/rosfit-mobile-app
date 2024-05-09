import {
  GestureResponderEvent,
  TextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

export type WithIconProps = {
  fill?: string;
  width?: string | number;
  height?: string | number;
};

export type InputVariants = 'outlined' | 'underline';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  variant?: InputVariants;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  inputRef?: React.ForwardedRef<TextInput>;
  leadingIcon?: React.ReactElement<WithIconProps>;
  trailingIcon?: React.ReactElement<WithIconProps>;
  onTrailingIconPress?: (event: GestureResponderEvent) => void;
  isAmount?: boolean;
  helpText?: string;
}

export interface InputContainerProps {
  variant?: InputVariants;
  error?: string;
  isFocused?: boolean;
}
