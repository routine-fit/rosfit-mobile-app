import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  ExerciseScreen,
  HomeScreen,
  RoutinesScreen,
} from 'src/app/screens/index';
import {
  DumbbellIcon,
  HomeIcon,
  RoutineIcon,
} from 'src/assets/svg/navigation-icons';
import { BottomTabParamList } from 'src/types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabBarOptions = {
  headerShown: false,
  tabBarActiveBackgroundColor: '#D9D9D9',
  tabBarInactiveBackgroundColor: '#D9D9D9',
  tabBarShowLabel: false,
};

const renderIcon = (icon: JSX.Element, focused: boolean) =>
  React.cloneElement(icon, {
    color: focused ? '#4D7C0F' : '#404040',
  });

export const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={tabBarOptions} initialRouteName="HomeScreen">
      <Tab.Screen
        name="RoutinesScreen"
        component={RoutinesScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(<RoutineIcon />, focused),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(<HomeIcon />, focused),
        }}
      />
      <Tab.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(<DumbbellIcon />, focused),
        }}
      />
    </Tab.Navigator>
  );
};
