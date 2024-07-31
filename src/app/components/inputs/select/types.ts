import { ComponentProps } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput } from 'react-native';

export interface SelectInputProps<Form extends FieldValues> {
  controller: UseControllerProps<Form>;
  inputProps?: ComponentProps<typeof TextInput>;
  options: string[];
}
