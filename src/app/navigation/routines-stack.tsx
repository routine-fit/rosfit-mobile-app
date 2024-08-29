import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { FC, useMemo } from 'react';
// import { FormProvider } from 'react-hook-form';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AddRoutine,
  ExercisesRevision,
  RoutineDashboard,
  SelectRoutineExercises,
} from 'src/app/screens/routines';

import { Header } from '../components';
import { BottomTabParamList, RoutinesParamList } from './types';

const Stack = createStackNavigator<RoutinesParamList>();

interface Props extends BottomTabScreenProps<BottomTabParamList> {}

// Form context provider
export const RoutineStack: FC<Props> = ({ navigation }) => {
  const theme = useTheme();

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
  );
};
