import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextInput as RNTextInput } from 'react-native';

import TextInput from '../text-input';
import { FormTextFieldProps } from './types';

const ControlledTextInputInner = <Form extends FieldValues>(
  {
    controller,
    keyboardType,
    readOnly,
    label,
    ...restOfProps
  }: FormTextFieldProps<Form>,
  ref: React.RefObject<RNTextInput>,
) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController(controller);

  const { t } = useTranslation();

  const inputLabel = label ?? t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);

  return (
    <TextInput
      keyboardType={keyboardType}
      error={error?.message}
      editable={!readOnly}
      label={inputLabel}
      placeholder={placeholder}
      {...restOfProps}
      onBlur={onBlur}
      inputRef={ref}
      onChangeText={
        restOfProps.onChangeText
          ? restOfProps.onChangeText
          : (val: string) => onChange(val.length === 1 ? val.trim() : val)
      }
      value={value}
    />
  );
};

const ControlledTextInput = React.forwardRef(ControlledTextInputInner);

export default ControlledTextInput;
