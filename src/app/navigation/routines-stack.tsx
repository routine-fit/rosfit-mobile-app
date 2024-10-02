import { useTheme } from 'styled-components';
import React, { FC, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AddRoutineScreen,
  ExercisesRevisionScreen,
  RoutineDashboardScreen,
  ScheduleRoutineScreen,
  SelectRoutineExercisesScreen,
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
          component={RoutineDashboardScreen}
          options={routineHeaderOptions}
        />
        <Stack.Screen
          name="ScheduleRoutine"
          component={ScheduleRoutineScreen}
          options={getGoBackHeaderOptions(navigation, theme)}
        />
        <Stack.Screen
          name="AddRoutine"
          component={AddRoutineScreen}
          options={getGoBackHeaderOptions(navigation, theme)}
        />
        <Stack.Screen
          name="SelectRoutineExercises"
          component={SelectRoutineExercisesScreen}
          options={getGoBackHeaderOptions(navigation, theme)}
        />
        <Stack.Screen
          name="ExercisesRevision"
          component={ExercisesRevisionScreen}
          options={getGoBackHeaderOptions(navigation, theme)}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};
