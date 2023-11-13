import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTab } from './bottom-tab';
import { ProfileScreen } from '@screens/index';

const Drawer = createDrawerNavigator();

export const AppNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={BottomTab} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
