import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface ControlledInputProps<Form extends FieldValues> {
  controller: UseControllerProps<Form>;
  placeholder?: string;
  label?: string;
}
