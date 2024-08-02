import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  RoutineResultsScreen,
  RoutineRunnerScreen,
  SelectRoutineScreen,
} from 'src/app/screens/do-routine';

import { DoRoutineStackParamList } from './types';

const Stack = createStackNavigator<DoRoutineStackParamList>();

export const DoRoutineStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectRoutine"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="SelectRoutine" component={SelectRoutineScreen} />
      <Stack.Screen name="RoutineRunner" component={RoutineRunnerScreen} />
      <Stack.Screen name="RoutineResults" component={RoutineResultsScreen} />
    </Stack.Navigator>
  );
};
