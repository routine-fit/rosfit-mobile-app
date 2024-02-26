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
import { BackArrowIcon } from 'src/assets/svg/navigation-icons';
import { RootState } from 'src/store';
import { MainDrawerParamList } from 'src/types/navigation';

import { Header } from '../components/header';
import { EditPersonalInfoScreen } from '../screens/edit-personal-info';
import { EditTrainingPreferencesScreen } from '../screens/edit-training-preferences';
import { BottomTab } from './bottom-tab';

const renderContent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

const screenOptions: DrawerNavigationOptions = {
  drawerStyle: { width: 240 },
  header: ({ options, navigation }) => (
    <Header
      leftText={options.headerTitle}
      headerLeft={options.headerLeft}
      onPressLeft={() => navigation.goBack()}
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

      <Drawer.Group>
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: t('navigation:headers.profile', {
              user: displayName?.split(' ')[0],
            }),
            headerLeft: <UserAvatar color="#fff" width={20} />,
          }}
        />
        <Drawer.Screen
          name="EditPersonalInfo"
          component={EditPersonalInfoScreen}
          options={{
            headerTitle: t('navigation:headers.returnProfile'),
            headerLeft: <BackArrowIcon color="#fff" width={20} />,
          }}
        />
        <Drawer.Screen
          name="EditTrainingPreferences"
          component={EditTrainingPreferencesScreen}
          options={{
            headerTitle: t('navigation:headers.returnProfile'),
            headerLeft: <BackArrowIcon color="#fff" width={20} />,
          }}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};
