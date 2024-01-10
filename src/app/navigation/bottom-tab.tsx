import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ExerciseScreen, HomeScreen, RoutinesScreen } from 'src/app/screens';

export type BottomTabParamList = {
  RoutinesScreen: undefined;
  HomeScreen: undefined;
  ExerciseScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen">
      <Tab.Screen name="RoutinesScreen" component={RoutinesScreen} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ExerciseScreen" component={ExerciseScreen} />
    </Tab.Navigator>
  );
};
