import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { FC, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// import { FormProvider } from 'react-hook-form';
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

import { Header } from '../components';
import {
  createFormConfig,
  FormData,
} from '../screens/routines/exercises-revision/form-config';
import { BottomTabParamList, RoutinesParamList } from './types';

const Stack = createStackNavigator<RoutinesParamList>();

interface Props extends BottomTabScreenProps<BottomTabParamList> {}

// Form context provider
//NEED TO MERGE FORMCONFIGS
export const RoutineStack: FC<Props> = ({ navigation }) => {
  const theme = useTheme();

  //UPDATE FORM DATA
  const formConfig = createFormConfig(mockedExercises as Exercise[]);
  const methods = useForm<FormData>(formConfig);

  const goBackHeaderOptions = useMemo(
    () => ({
      header: () => (
        <Header
          headerLeft={
            <ArrowLeft
              color={theme.colors.background}
              onPress={() => {
                navigation.goBack();
              }}
            />
          }
        />
      ),
    }),
    [navigation, theme],
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
          options={{
            header: () => (
              <Header headerTitle={'Rutinas'} onPressLeft={() => {}} />
            ),
          }}
        />
        <Stack.Screen
          name="AddRoutine"
          component={AddRoutine}
          options={goBackHeaderOptions}
        />
        <Stack.Screen
          name="SelectRoutineExercises"
          component={SelectRoutineExercises}
          options={goBackHeaderOptions}
        />
        <Stack.Screen
          name="ExercisesRevision"
          component={ExercisesRevision}
          options={goBackHeaderOptions}
        />
      </Stack.Navigator>
    </FormProvider>
  );
};
