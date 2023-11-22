import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ProfileScreen } from '@/screens/index';

import { BottomTab } from './bottom-tab';

const Drawer = createDrawerNavigator();

export const AppNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={BottomTab} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
