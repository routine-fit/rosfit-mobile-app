// DatePickerInput.tsx

import React, { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import { DatePickerInputProps } from './types';

const DatePickerInput = <Form extends FieldValues>({
  controller,
  inputProps = {},
  inputFieldProps = {},
  formControlProps = {},
}: DatePickerInputProps<Form>) => {
  const { field, fieldState } = useController(controller);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { t } = useTranslation();

  const handleDateChange = (_: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      field.onChange(date);
    }
  };

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);

  return (
    <FormControl
      {...formControlProps}
      isInvalid={fieldState.invalid}
      isRequired={formControlProps.isRequired || !!controller.rules?.required}
    >
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      {showDatePicker ? (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          maximumDate={new Date()}
          style={styles.datepicker}
        />
      ) : (
        <>
          <Input {...inputProps}>
            <InputField
              autoCapitalize="none"
              autoComplete="off"
              placeholder={placeholder}
              {...inputFieldProps}
              onTouchStart={() => setShowDatePicker(true)}
              value={selectedDate?.toLocaleDateString()}
            />
          </Input>
          <FormControlError>
            <FormControlErrorText>
              {fieldState.error?.message}
            </FormControlErrorText>
          </FormControlError>
        </>
      )}
    </FormControl>
  );
};

export default DatePickerInput;

const styles = StyleSheet.create({
  datepicker: {
    height: 120,
  },
});
