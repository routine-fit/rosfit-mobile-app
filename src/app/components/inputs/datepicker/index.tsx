import React, { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import * as RNLocalize from 'react-native-localize';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from '@gluestack-ui/themed';

import { ControlledDatepickerProps } from './types';

const ControlledDatepicker = <Form extends FieldValues>({
  controller,
  inputProps = {},
  inputFieldProps = {},
  formControlProps = {},
}: ControlledDatepickerProps<Form>) => {
  const { field, fieldState } = useController(controller);
  const { t } = useTranslation();
  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);
  const datepickerTitle = t(`inputs:placeholder.datepicker`);

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
          autoComplete="off"
          placeholder={placeholder}
          {...inputFieldProps}
          value={
            field.value &&
            field.value.toDateString() === new Date().toDateString()
              ? ''
              : field.value?.toLocaleDateString() || ''
          }
          onBlur={field.onBlur}
          onPressIn={() => setShowDatepicker(true)}
        />
      </Input>

      <DatePicker
        modal
        open={showDatepicker}
        date={field.value}
        mode="date"
        maximumDate={new Date()}
        title={datepickerTitle}
        locale={RNLocalize.getLocales()[0].languageCode}
        onConfirm={date => {
          field.onChange(date);
          setShowDatepicker(false);
        }}
      />
      <FormControlError>
        <FormControlErrorText>{fieldState.error?.message}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default ControlledDatepicker;
