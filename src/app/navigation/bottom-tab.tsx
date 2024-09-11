import { useTheme } from 'styled-components';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Header } from 'src/app/components';
import { ExerciseScreen, HomeScreen } from 'src/app/screens';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import {
  DumbbellIcon,
  HomeIcon,
  RoutineIcon,
} from 'src/assets/svg/navigation-icons';
import { RootState } from 'src/store';

import { RoutineStack } from './routines-stack';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { displayName } = useSelector((state: RootState) => state.auth);

  const renderIcon = useMemo(
    () => (icon: JSX.Element, focused: boolean) =>
      React.cloneElement(icon, {
        color: focused
          ? theme.colors.primary.default
          : theme.colors.neutral.strong,
      }),
    [theme],
  );

  const tabBarOptions = useMemo<BottomTabNavigationOptions>(
    () => ({
      headerShown: true,
      tabBarActiveBackgroundColor: theme.palette.neutral[200],
      tabBarInactiveBackgroundColor: theme.palette.neutral[200],
      tabBarShowLabel: false,
      header: ({ options }) => <Header headerTitle={options.headerTitle} />,
    }),
    [theme],
  );

  const RoutineHeaderOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        renderIcon(<RoutineIcon />, focused),
    }),
    [renderIcon],
  );

  const HomeHeaderOptions = useMemo(
    () => ({
      header: () => (
        <Header
          leftText={t('navigation:headers.profile', {
            user: displayName,
          })}
          headerLeft={<UserAvatar color={theme.colors.background} width={20} />}
        />
      ),
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        renderIcon(<HomeIcon />, focused),
    }),
    [t, displayName, theme, renderIcon],
  );

  const ExerciseHeaderOptions = useMemo(
    () => ({
      headerTitle: t('navigation:headers.exercises'),
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        renderIcon(<DumbbellIcon />, focused),
    }),
    [renderIcon, t],
  );

  return (
    <Tab.Navigator screenOptions={tabBarOptions} initialRouteName="HomeScreen">
      <Tab.Screen
        name="RoutinesScreen"
        component={RoutineStack}
        options={RoutineHeaderOptions}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={HomeHeaderOptions}
      />
      <Tab.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={ExerciseHeaderOptions}
      />
    </Tab.Navigator>
  );
};
