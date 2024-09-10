import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';

import { Header } from '../components';
import { AddExerciseScreen, MyExercisesScreen } from '../screens';
import { ExercisesParamList } from './types';

const Stack = createStackNavigator<ExercisesParamList>();

export const ExerciseStack = () => {
  const { t } = useTranslation();
  const exerciseHeaderOptions = useMemo(
    () => ({
      header: () => (
        <Header
          headerTitle={t('navigation:headers.exercises')}
          onPressLeft={() => {}}
        />
      ),
    }),
    [t],
  );
  return (
    <Stack.Navigator
      initialRouteName="MyExercisesScreen"
      screenOptions={() => ({
        headerShown: true,
      })}
    >
      <Stack.Screen
        name="MyExercisesScreen"
        component={MyExercisesScreen}
        options={exerciseHeaderOptions}
      />
      <Stack.Screen
        name="AddExerciseScreen"
        component={AddExerciseScreen}
        options={exerciseHeaderOptions}
      />
    </Stack.Navigator>
  );
};
