import { useTheme } from 'styled-components';
import React, { FC, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AddRoutine,
  ExercisesRevision,
  RoutineDashboard,
  SelectRoutineExercises,
} from 'src/app/screens/routines';
import { Exercise } from 'src/interfaces/exercises';
import mockedExercises from 'src/mocks/weekly-exercises-data.json';
import { getGoBackHeaderOptions } from 'src/utils/getGoBackHeaderOptions';

import { Header } from '../components';
import {
  createFormConfig,
  RoutineFormData,
} from '../screens/routines/form-config';
import { BottomTabParamList, RoutinesParamList } from './types';

const Stack = createStackNavigator<RoutinesParamList>();

interface Props extends BottomTabScreenProps<BottomTabParamList> {}

export const RoutineStack: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formConfig = createFormConfig(mockedExercises as Exercise[]);
  const methods = useForm<RoutineFormData>(formConfig);

  const routineHeaderOptions = useMemo(
    () => ({
      header: () => (
        <Header
          headerTitle={t('navigation:headers.routines')}
          onPressLeft={() => {}}
        />
      ),
    }),
    [t],
  );

  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        initialRouteName="RoutineDashboard"
        screenOptions={() => ({
          headerShown: true,
        })}
      >
        <Stack.Screen
          name="RoutineDashboard"
          component={RoutineDashboard}
          options={routineHeaderOptions}
        />
        <Stack.Screen
          name="AddRoutine"
          component={AddRoutine}
          options={getGoBackHeaderOptions(navigation, theme)}
        />
        <Stack.Screen
          name="SelectRoutineExercises"
          component={SelectRoutineExercises}
          options={getGoBackHeaderOptions(navigation, theme)}
        />
        <Stack.Screen
          name="ExercisesRevision"
          component={ExercisesRevision}
          options={getGoBackHeaderOptions(navigation, theme)}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};
