import React, { FC, useEffect, useMemo } from 'react';
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
import {
  createScheduleRoutine,
  getMyRoutines,
} from 'src/store/routine/routine.thunks';

import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { ScheduleRoutineFormData, validationSchema } from './form-config';
import { ScheduleRoutineScreenProps } from './types';

export const ScheduleRoutineScreen: FC<ScheduleRoutineScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { routines } = useAppSelector(state => state.routine);
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<ScheduleRoutineFormData>({
    defaultValues: {
      routineId: '',
      day: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const daysOptions = useTranslatedOptions(weekDays, 'common:weekDay');

  const routineOptions = useMemo(
    () =>
      routines.map(routine => ({
        label: routine.name,
        value: routine.id,
      })),
    [routines],
  );

  const onValidSubmit: SubmitHandler<ScheduleRoutineFormData> = async data => {
    try {
      dispatch(createScheduleRoutine(data));
      navigation.navigate('RoutineDashboard');
    } catch (error: any) {
      Alert.alert(t('screens:scheduleRoutine:error'), error.message);
    }
  };

  useEffect(() => {
    dispatch(getMyRoutines());
  }, [dispatch]);

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
        options={routineOptions}
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
