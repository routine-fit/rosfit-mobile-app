import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ExerciseScreen, HomeScreen, RoutinesScreen } from 'src/app/screens';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="RoutinesScreen" component={RoutinesScreen} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ExerciseScreen" component={ExerciseScreen} />
    </Tab.Navigator>
  );
};
