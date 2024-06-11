import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Header } from 'src/app/components';
import { ExerciseScreen, HomeScreen, RoutinesScreen } from 'src/app/screens';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import {
  DumbbellIcon,
  HomeIcon,
  RoutineIcon,
} from 'src/assets/svg/navigation-icons';
import { RootState } from 'src/store';

import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabBarOptions: BottomTabNavigationOptions = {
  headerShown: true,
  tabBarActiveBackgroundColor: '#D9D9D9',
  tabBarInactiveBackgroundColor: '#D9D9D9',
  tabBarShowLabel: false,
  header: ({ options }) => <Header headerTitle={options.headerTitle} />,
};

const renderIcon = (icon: JSX.Element, focused: boolean) =>
  React.cloneElement(icon, {
    color: focused ? '#4D7C0F' : '#404040',
  });

export const BottomTab = () => {
  const { t } = useTranslation();
  const { displayName } = useSelector((state: RootState) => state.auth);
  return (
    <Tab.Navigator screenOptions={tabBarOptions} initialRouteName="HomeScreen">
      <Tab.Screen
        name="RoutinesScreen"
        component={RoutinesScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(<RoutineIcon />, focused),
          headerTitle: t('navigation:headers.routines'),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          header: () => (
            <Header
              leftText={t('navigation:headers.profile', {
                user: displayName,
              })}
              headerLeft={<UserAvatar color="light100" width={20} />}
            />
          ),
          tabBarIcon: ({ focused }) => renderIcon(<HomeIcon />, focused),
        })}
      />
      <Tab.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(<DumbbellIcon />, focused),
          headerTitle: t('navigation:headers.exercises'),
        }}
      />
    </Tab.Navigator>
  );
};
