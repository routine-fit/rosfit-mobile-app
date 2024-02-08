import { ComponentProps } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { FormControl, Input, InputField } from '@gluestack-ui/themed';

export interface DatePickerInputProps<Form extends FieldValues> {
  controller: UseControllerProps<Form>;
  inputProps?: ComponentProps<typeof Input>;
  inputFieldProps?: ComponentProps<typeof InputField>;
  formControlProps?: ComponentProps<typeof FormControl>;
}
