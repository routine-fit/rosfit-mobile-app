import { useTheme } from 'styled-components/native';
import React, { FC, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import * as RNLocalize from 'react-native-localize';

import Text from '../../text';
import TextInput from '../text-input';
import { Container } from '../text-input/styles';
import { ControlledDatepickerProps } from './types';

const ControlledDatepicker: FC<ControlledDatepickerProps<FieldValues>> = ({
  controller,
  formControlProps = {},
}) => {
  const { field, fieldState } = useController(controller);
  const { t } = useTranslation();
  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
  const theme = useTheme();

  const label = t(`inputs:label.${controller.name}`);
  const placeholder = t(`inputs:placeholder.${controller.name}`);
  const datepickerTitle = t(`inputs:placeholder.datepicker`);

  return (
    <Container
      isInvalid={fieldState.invalid}
      isRequired={formControlProps.isRequired || !!controller.rules?.required}
      {...formControlProps}
    >
      <Text fontSize="xs" fontWeight="bold" color={theme.colors.content.subtle}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={
          field.value &&
          field.value.toDateString() === new Date().toDateString()
            ? ''
            : field.value?.toLocaleDateString() || ''
        }
        onFocus={() => setShowDatepicker(true)}
        onBlur={() => setShowDatepicker(false)}
      />
      <DatePicker
        modal
        open={showDatepicker}
        date={field.value}
        mode="date"
        maximumDate={new Date()}
        title={datepickerTitle}
        locale={RNLocalize.getLocales()[0].languageCode}
        onConfirm={(date: Date) => {
          field.onChange(date);
          setShowDatepicker(false);
        }}
      />
      {fieldState.error && (
        <Text
          fontSize="xs"
          color={theme.colors.feedback.error.default}
          fontWeight="medium"
        >
          {fieldState.error.message}
        </Text>
      )}
    </Container>
  );
};

export default ControlledDatepicker;
