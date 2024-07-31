import React, { FC, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, Heading, ScreenContainer } from 'src/app/components';
import ControlledSelectInput from 'src/app/components/inputs/select';
import { DoRoutineStackParamList } from 'src/app/navigation/types';
import { RoutineExercises } from 'src/interfaces/routine-exercises';
import routineExercisesDataFile from 'src/mocks/routine-exercises.json';

import { FormData, validationSchema } from './form-config';

interface Props
  extends StackScreenProps<DoRoutineStackParamList, 'SelectRoutine'> {}

export const SelectRoutineScreen: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const routineOptions = useMemo(() => ['Rutina1', 'Rutina2'], []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [routineExercisesData, setRoutineExercisesData] = useState<
    RoutineExercises[] | null
  >(null);

  const fetchweekSummaryData = (): Promise<RoutineExercises[]> => {
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
        const data = await fetchweekSummaryData();
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

  const isRoutineSelected = watch('routine');

  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      const { routine } = data;
      console.log(routine);
      //TODO: dispatch startRoutine
      navigation.navigate('RoutineRunner');
    } catch (error: any) {
      Alert.alert(t('screens:signUp:error'), error.message);
    }
  };

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
      <Button
        content="Comenzar Rutina"
        disabled={!isRoutineSelected}
        onPress={handleSubmit(onValidSubmit)}
      />
    </ScreenContainer>
  );
};
