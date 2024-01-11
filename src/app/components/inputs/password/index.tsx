import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '@gluestack-ui/themed';

import { PasswordInputProps } from './types';

const PasswordInput = <Form extends FieldValues>({
  controller,
  inputProps = {},
  inputFieldProps = {},
  formControlProps = {},
}: PasswordInputProps<Form>) => {
  const { field, fieldState } = useController(controller);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { t } = useTranslation();

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);

  console.log('placeholder', placeholder);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  return (
    <FormControl
      {...formControlProps}
      isInvalid={fieldState.invalid}
      isRequired={formControlProps.isRequired || !!controller.rules?.required}
    >
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input
        {...inputProps}
        sx={{
          ':focus': {
            borderColor: '$lime700',
          },
        }}
      >
        <InputField
          autoCapitalize="none"
          autoComplete="off"
          placeholder={placeholder}
          {...inputFieldProps}
          type={showPassword ? 'text' : 'password'}
          onChangeText={field.onChange}
          value={field.value}
          onBlur={field.onBlur}
        />
        <InputSlot marginRight={16} onPress={handleState}>
          <InputIcon
            as={showPassword ? EyeIcon : EyeOffIcon}
            color={fieldState.invalid ? '$error500' : '$lime700'}
          />
        </InputSlot>
      </Input>
      <FormControlError>
        <FormControlErrorText>{fieldState.error?.message}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default PasswordInput;
