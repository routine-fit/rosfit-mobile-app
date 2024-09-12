import { useTheme } from 'styled-components';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';
import ControlledSelectInput from 'src/app/components/inputs/select';
import { RoutineExercise } from 'src/interfaces/routine-exercises';
import routineExercisesDataFile from 'src/mocks/do-routine-exercises.json';

import { FormData, validationSchema } from './form-config';
import { Container, ExercisesDataContainer, FlatlistContainer } from './styles';
import { Props } from './types';

export const SelectRoutineScreen: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const routineOptions = useMemo(() => ['Lunes', 'Miercoles', 'Viernes'], []);

  const [routineExercisesData, setRoutineExercisesData] = useState<
    RoutineExercise[] | []
  >([]);

  const fetchRoutineExercisesData = (): Promise<RoutineExercise[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve(routineExercisesDataFile as RoutineExercise[]);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRoutineExercisesData();
        setRoutineExercisesData(data);
      } catch (error) {
        console.error('Error fetching routines data:', error);
      }
    };

    fetchData();
  }, []);

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      routine: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const selectedRoutine = watch('routine');

  const filteredExercises = useMemo(() => {
    return routineExercisesData.filter(
      exercise => exercise.routine === selectedRoutine,
    );
  }, [routineExercisesData, selectedRoutine]);

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
        {item.exercise}
      </Text>
      <Text>
        {t('screens:selectRoutine.series', {
          series: item.series,
        })}
      </Text>
      <Text>
        {t('screens:selectRoutine.repetitions', {
          repetitions: item.repetitions,
        })}
      </Text>
      <Text>
        {t('screens:selectRoutine.restTime', {
          restTime: item.restTime,
        })}
      </Text>
      <Text>
        {item.variableWeight
          ? t('screens:selectRoutine.withVariableWeight')
          : t('screens:selectRoutine.withoutVariableWeight')}
      </Text>
    </ExercisesDataContainer>
  );

  return (
    <ScreenContainer>
      <Container>
        <Heading
          title={'Comenzar rutina'}
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
        content="Comenzar Rutina"
        disabled={!selectedRoutine}
        onPress={handleSubmit(onValidSubmit)}
      />
    </ScreenContainer>
  );
};
