import { useTheme } from 'styled-components';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';
import ControlledSelectInput from 'src/app/components/inputs/select';
import { DoRoutineStackParamList } from 'src/app/navigation/types';
import { RoutineExercises } from 'src/interfaces/routine-exercises';
import routineExercisesDataFile from 'src/mocks/routine-exercises.json';

import { FormData, validationSchema } from './form-config';

interface Props
  extends StackScreenProps<DoRoutineStackParamList, 'SelectRoutine'> {}

export const SelectRoutineScreen: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const routineOptions = useMemo(() => ['Lunes', 'Viernes'], []);

  const [routineExercisesData, setRoutineExercisesData] = useState<
    RoutineExercises[] | []
  >([]);

  const fetchRoutineExercisesData = (): Promise<RoutineExercises[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve(routineExercisesDataFile as RoutineExercises[]);
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
        console.error('Error fetching dashboard data:', error);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { routine } = data;
      //TODO: dispatch startRoutine
      navigation.navigate('RoutineRunner');
    } catch (error: any) {
      Alert.alert(t('screens:signUp:error'), error.message);
    }
  };

  const renderExercise = ({ item }: { item: RoutineExercises }) => (
    <View
      key={item.id}
      style={{
        ...styles.exercisesDataContainer,
        backgroundColor: theme.colors.fill.section,
      }}
    >
      <Text fontSize="lg" textAlign="center">
        {item.exercise}
      </Text>
      <Text>{`Series: ${item.series}`}</Text>
      <Text>{`Repeticiones: ${item.repetitions}`}</Text>
      <Text>{`Tiempo de descanso: ${item.restTime} ''`}</Text>
      <Text>
        {item.variableWeight ? 'Con peso variable' : 'Sin peso variable'}
      </Text>
    </View>
  );

  return (
    <ScreenContainer>
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
        <FlatList
          data={filteredExercises}
          renderItem={renderExercise}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatlist}
          collapsable
        />
      )}

      <Button
        content="Comenzar Rutina"
        disabled={!selectedRoutine}
        onPress={handleSubmit(onValidSubmit)}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  exercisesDataContainer: {
    gap: 2,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  flatlist: {
    paddingBottom: 20,
  },
});
