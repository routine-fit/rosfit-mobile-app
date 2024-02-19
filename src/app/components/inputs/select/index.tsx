import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ChevronDownIcon,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';

import { SelectInputProps } from './types';

const ControlledSelectInput = <Form extends FieldValues>({
  controller,
  inputProps = {},
  formControlProps = {},
  options,
}: SelectInputProps<Form>) => {
  const { field, fieldState } = useController(controller);
  const { t } = useTranslation();

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);

  const handleSelect = (selectedValue: string) => {
    field.onChange(selectedValue);
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
      <Select {...inputProps} onValueChange={handleSelect}>
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder={placeholder} />
          <SelectIcon mr="$3">
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {options.map(option => (
              <SelectItem
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
      <FormControlError>
        <FormControlErrorText>{fieldState.error?.message}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default ControlledSelectInput;
