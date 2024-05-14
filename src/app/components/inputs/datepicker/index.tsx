import React, { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextInput as RNTextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';

import TextInput from '../text-input';
import { ControlledDatepickerProps } from './types';

const ControlledDatepickerInner = <Form extends FieldValues>(
  { controller, ...restOfProps }: ControlledDatepickerProps<Form>,
  ref: React.RefObject<RNTextInput>,
) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController(controller);

  const { t } = useTranslation();

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);

  const [showDatepicker, setShowDatepicker] = useState(false);

  return (
    <>
      <TextInput
        error={error?.message}
        label={label}
        placeholder={placeholder}
        {...restOfProps}
        onBlur={onBlur}
        inputRef={ref}
        value={value.toLocaleDateString()}
        onPress={() => setShowDatepicker(true)}
      />
      <DatePicker
        modal
        open={showDatepicker}
        date={value}
        mode="date"
        maximumDate={new Date()}
        title={placeholder}
        onConfirm={(date: Date) => {
          onChange(date);
          setShowDatepicker(false);
        }}
      />
    </>
  );
};

const ControlledDatePicker = React.forwardRef(ControlledDatepickerInner);

export default ControlledDatePicker;
