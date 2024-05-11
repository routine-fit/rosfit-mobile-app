import { RefObject } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { KeyboardTypeOptions, TextInput as TextInputRN } from 'react-native';

import { TextInputProps } from '../text-input/types';

// Redecalare forwardRef to allow the use of generic components
declare module 'react' {
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.RefObject<T>) => React.JSX.Element | null,
  ): (props: P & React.RefAttributes<T>) => React.JSX.Element | null;
}

export type FormTextFieldProps<Form extends FieldValues> = Omit<
  TextInputProps,
  'ref' | 'value' | 'onChangeText'
> & {
  // This has to be done to avoid annoying type conflicts with `vue`.
  controller: UseControllerProps<Form>;
  inputRef?: RefObject<TextInputRN>;
  readOnly?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
};
