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
  inputProps = {},
  inputFieldProps = {},
  formControlProps = {},
}: ControlledInputProps<Form>) => {
  const { field, fieldState } = useController(controller);

  return (
    <FormControl
      {...formControlProps}
      isInvalid={fieldState.invalid}
      isRequired={formControlProps.isRequired || !!controller.rules?.required}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input {...inputProps}>
        <InputField
          autoCapitalize="none"
          autoComplete="off"
          {...inputFieldProps}
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
