import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';

import DrawerContent from 'src/app/components/drawer';
import { ProfileScreen } from 'src/app/screens/index';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import { RootState } from 'src/store';
import { MainDrawerParamList } from 'src/types/navigation';

import { Header } from '../components/header';
import { BottomTab } from './bottom-tab';

const renderContent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

const screenOptions: DrawerNavigationOptions = {
  drawerStyle: { width: 240 },
  header: ({ options }) => (
    <Header
      leftText={options.headerTitle}
      headerLeft={<UserAvatar color="#fff" width={20} />}
    />
  ),
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export const MainAppNavigation = () => {
  const { t } = useTranslation();
  const { displayName } = useSelector((state: RootState) => state.auth);

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={renderContent}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: t('navigation:headers.profile', {
            user: displayName?.split(' ')[0],
          }),
        }}
      />
    </Drawer.Navigator>
  );
};
