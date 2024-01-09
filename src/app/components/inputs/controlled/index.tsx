import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputSlot,
} from '@gluestack-ui/themed';

import { ControlledInputProps } from './types';

const ControlledInput = <Form extends FieldValues>({
  controller,
  label,
  placeholder,
}: ControlledInputProps<Form>) => {
  const { field, fieldState } = useController(controller);

  return (
    <FormControl
      isInvalid={fieldState.invalid}
      isRequired={!!controller.rules?.required}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          placeholder={placeholder}
          onChangeText={field.onChange}
          value={field.value}
          onBlur={field.onBlur}
        />
        <InputSlot />
      </Input>
      <FormControlError>
        <FormControlErrorText>{fieldState.error?.message}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default ControlledInput;
