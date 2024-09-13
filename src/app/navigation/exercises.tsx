import { useTheme } from 'styled-components';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { getGoBackHeaderOptions } from 'src/utils/getGoBackHeaderOptions';

import { Header } from '../components';
import {
  AddExerciseScreen,
  ExerciseDetailsScreen,
  MyExercisesScreen,
} from '../screens';
import { BottomTabParamList, ExercisesParamList } from './types';

const Stack = createStackNavigator<ExercisesParamList>();

type ExerciseStackProps = BottomTabScreenProps<
  BottomTabParamList,
  'ExerciseStack'
>;

export const ExerciseStack = ({
  navigation,
}: ExerciseStackProps): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();

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
        options={getGoBackHeaderOptions(navigation, theme)}
      />
      <Stack.Screen
        name="ExerciseDetailsScreen"
        component={ExerciseDetailsScreen}
        options={getGoBackHeaderOptions(navigation, theme)}
      />
    </Stack.Navigator>
  );
};
