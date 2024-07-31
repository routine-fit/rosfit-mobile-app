import { Timer } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Header } from 'src/app/components';
import { ExerciseScreen, HomeScreen, RoutinesScreen } from 'src/app/screens';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import {
  BackArrowIcon,
  DumbbellIcon,
  HomeIcon,
  RoutineIcon,
} from 'src/assets/svg/navigation-icons';
import { RootState } from 'src/store';

import { DoRoutineStack } from './do-routine';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface Props extends BottomTabScreenProps<BottomTabParamList> {}

export const BottomTab: FC<Props> = ({ navigation }) => {
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
      headerTitle: t('navigation:headers.routines'),
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        renderIcon(<RoutineIcon />, focused),
    }),
    [t],
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

  const DoRoutineHeaderOptions = useMemo(
    () => ({
      header: () => (
        <Header
          leftText={t('navigation:headers.returnHome')}
          headerLeft={
            <BackArrowIcon color={theme.colors.background} width={20} />
          }
          onPressLeft={() => navigation.navigate('HomeScreen')}
        />
      ),
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        renderIcon(<Timer />, focused),
    }),
    [t, theme.colors.background, navigation, renderIcon],
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
        component={RoutinesScreen}
        options={RoutineHeaderOptions}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={HomeHeaderOptions}
      />
      <Tab.Screen
        name="DoRoutineStack"
        component={DoRoutineStack}
        options={DoRoutineHeaderOptions}
      />
      <Tab.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={ExerciseHeaderOptions}
      />
    </Tab.Navigator>
  );
};
