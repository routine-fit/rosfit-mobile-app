import React from 'react';
import DrawerContent from '@components/drawer';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { ProfileScreen } from '@screens/index';

import { BottomTab } from './bottom-tab';

const Drawer = createDrawerNavigator();

const renderContent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

export const AppNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: 240 } }}
      drawerContent={renderContent}>
      <Drawer.Screen name="Home" component={BottomTab} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
