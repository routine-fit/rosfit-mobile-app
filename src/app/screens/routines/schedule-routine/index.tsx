import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  ControlledSelectInput,
  Heading,
  ScreenContainer,
} from 'src/app/components';
import { weekDays } from 'src/constants/weekdays';
import { useTranslatedOptions } from 'src/hooks/useTranslatedOptions';

import { ScheduleRoutineFormData, validationSchema } from './form-config';
import { ScheduleRoutineScreenProps } from './types';

const mockedRoutines = [
  { label: 'Adaptación', value: '123abc' },
  { label: 'Fuerza Máxima', value: '456def' },
  { label: 'Hipertrofia', value: '789ghi' },
  { label: 'Resistencia', value: '101jkl' },
];

export const ScheduleRoutineScreen: FC<ScheduleRoutineScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<ScheduleRoutineFormData>({
    defaultValues: {
      routineId: '',
      day: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const daysOptions = useTranslatedOptions(weekDays, 'common:weekDay');

  const onValidSubmit: SubmitHandler<ScheduleRoutineFormData> = async _data => {
    try {
      //TODO: dispatch thunks
      navigation.navigate('RoutineDashboard');
    } catch (error: any) {
      Alert.alert(t('screens:scheduleRoutine:error'), error.message);
    }
  };

  return (
    <ScreenContainer>
      <Heading
        title={t('screens:scheduleRoutine:heading')}
        flexTitleAlign="center"
      />
      <ControlledSelectInput
        controller={{
          control,
          name: 'routineId',
        }}
        options={mockedRoutines}
      />
      <ControlledSelectInput
        controller={{
          control,
          name: 'day',
        }}
        options={daysOptions}
      />
      <Button
        onPress={handleSubmit(onValidSubmit)}
        content={t('screens:scheduleRoutine:createSchedule')}
        themeColor="secondary"
      />
    </ScreenContainer>
  );
};
