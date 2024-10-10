import { useTheme } from 'styled-components';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';
import ControlledSelectInput from 'src/app/components/inputs/select';
import { weekDays } from 'src/constants/weekdays';
import { useTranslatedOptions } from 'src/hooks/useTranslatedOptions';
import { RoutineExercise } from 'src/interfaces/routine';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getMyScheduleRoutines } from 'src/store/routine/routine.thunks';

import { FormData, validationSchema } from './form-config';
import { Container, ExercisesDataContainer, FlatlistContainer } from './styles';
import { Props } from './types';

export const SelectRoutineScreen: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { scheduleRoutines } = useAppSelector(state => state.routine);

  const routineOptions = useTranslatedOptions(weekDays, 'common:weekDay');

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      routine: weekDays[new Date().getDay()],
    },
    resolver: yupResolver(validationSchema),
  });

  const selectedRoutine = watch('routine');

  useEffect(() => {
    dispatch(getMyScheduleRoutines(selectedRoutine));
  }, [dispatch, selectedRoutine]);

  const formattedExercises = useMemo(() => {
    return scheduleRoutines.flatMap(routine => routine.routine.exercises);
  }, [scheduleRoutines]);

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { routine } = data;
      navigation.navigate('RoutineRunner', { routine });
    } catch (error: any) {
      Alert.alert(t('screens:selectRoutine:error'), error.message);
    }
  };

  const renderExercise = useCallback(
    ({ item }: { item: RoutineExercise }) => (
      <ExercisesDataContainer
        key={item.id}
        backgroundColor={theme.colors.fill.section}
      >
        <Text fontSize="lg" textAlign="center">
          {item.exercise.name}
        </Text>
        <Text>
          {t('screens:selectRoutine.repetitions', {
            repetitions: item.repetitions,
          })}
        </Text>
        <Text>
          {t('screens:selectRoutine.restTime', {
            restTime: item.restTimeSecs,
          })}
        </Text>
        <Text>
          {t('screens:selectRoutine.series', {
            series: item.series.length,
          })}
        </Text>
      </ExercisesDataContainer>
    ),
    [theme, t],
  );

  return (
    <ScreenContainer>
      <Container>
        <Heading
          title={t('screens:selectRoutine.heading1')}
          flexTitleAlign="center"
          bottomSpace={false}
        />
        <ControlledSelectInput
          controller={{
            control,
            name: 'routine',
          }}
          options={routineOptions}
        />
        {formattedExercises.length ? (
          <FlatlistContainer
            data={formattedExercises}
            renderItem={renderExercise}
            keyExtractor={item => item.id.toString()}
            collapsable
          />
        ) : (
          <Text textAlign="center" fontSize="2xl">
            {t('screens:selectRoutine.noRoutinesAssigned')}
          </Text>
        )}
      </Container>

      <Button
        content={t('screens:selectRoutine.heading1')}
        disabled={!selectedRoutine}
        onPress={handleSubmit(onValidSubmit)}
      />
    </ScreenContainer>
  );
};
