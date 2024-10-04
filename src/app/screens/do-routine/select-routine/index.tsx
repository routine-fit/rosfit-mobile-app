import { useTheme } from 'styled-components';
import React, { FC, useEffect, useMemo } from 'react';
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

  useEffect(() => {
    dispatch(getMyScheduleRoutines());
  }, [dispatch]);

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      routine: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const selectedRoutine = watch('routine');

  const filteredExercises = useMemo(() => {
    return scheduleRoutines
      .filter(routine => routine.day === selectedRoutine)
      .flatMap(routine => routine.routine.exercises);
  }, [scheduleRoutines, selectedRoutine]);

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { routine } = data;
      navigation.navigate('RoutineRunner', { routine });
    } catch (error: any) {
      Alert.alert(t('screens:selectRoutine:error'), error.message);
    }
  };

  const renderExercise = ({ item }: { item: RoutineExercise }) => (
    <ExercisesDataContainer
      key={item.id}
      backgroundColor={theme.colors.fill.section}
    >
      <Text fontSize="lg" textAlign="center">
        {item.exercise.name}
      </Text>
      {/* TODO: Add series length, currently not available on server select */}
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
    </ExercisesDataContainer>
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
        {selectedRoutine && (
          <FlatlistContainer
            data={filteredExercises}
            renderItem={renderExercise}
            keyExtractor={item => item.id.toString()}
            collapsable
          />
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
