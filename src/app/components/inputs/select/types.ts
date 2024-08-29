import { ComponentProps } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput } from 'react-native';

import { TextInputProps } from '../text-input/types';

export type SelectInputProps<Form extends FieldValues> = Omit<
  TextInputProps,
  'ref' | 'value' | 'onChangeText'
> & {
  controller: UseControllerProps<Form>;
  inputProps?: ComponentProps<typeof TextInput>;
  options: { label: string; value: string }[];
};
