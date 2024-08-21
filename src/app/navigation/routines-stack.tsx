import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  AddRoutine,
  ExerciseRevision,
  RoutineDashboard,
  SelectRoutineExercises,
} from 'src/app/screens/routines';

import { RoutinesParamList } from './types';

const Stack = createStackNavigator<RoutinesParamList>();

export const RoutineStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="RoutineDashboard"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="RoutineDashboard" component={RoutineDashboard} />
      <Stack.Screen name="AddRoutine" component={AddRoutine} />
      <Stack.Screen
        name="SelectRoutineExercises"
        component={SelectRoutineExercises}
      />
      <Stack.Screen name="ExercisesRevision" component={ExerciseRevision} />
    </Stack.Navigator>
  );
};
