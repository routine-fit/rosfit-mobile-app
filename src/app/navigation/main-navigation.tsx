import { useTheme } from 'styled-components';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { Header } from 'src/app/components';
import DrawerContent from 'src/app/components/drawer';
import {
  ProfileScreen,
  WeeklyExerciseStatisticsScreen,
} from 'src/app/screens/index';
import { UserAvatar } from 'src/assets/svg/avatar/user-avatar';
import { useAppSelector } from 'src/store';
import { getGoBackHeaderOptions } from 'src/utils/getGoBackHeaderOptions';

import { EditPersonalInfoScreen } from '../screens/edit-personal-info';
import { EditTrainingPreferencesScreen } from '../screens/edit-training-preferences';
import { WeekSummaryScreen } from '../screens/week-summary';
import { WeeklyExercisesScreen } from '../screens/weekly-exercises';
import { BottomTab } from './bottom-tab';
import { MainDrawerParamList } from './types';

const renderContent = (props: DrawerContentComponentProps) => (
  <DrawerContent {...props} />
);

const screenOptions: DrawerNavigationOptions = {
  drawerStyle: { width: 240 },
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export const MainAppNavigation = () => {
  const { t } = useTranslation();
  const { displayName } = useAppSelector(state => state.auth);
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();

  const profileHeaderOptions = useMemo(
    () => ({
      header: () => (
        <Header
          leftText={t('navigation:headers.profile', {
            user: displayName,
          })}
          headerLeft={<UserAvatar color={theme.colors.background} width={20} />}
        />
      ),
    }),
    [displayName, t, theme.colors.background],
  );

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={renderContent}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="WeekSummary"
        component={WeekSummaryScreen}
        options={getGoBackHeaderOptions(
          navigation,
          theme,
          t('navigation:headers.returnHome'),
        )}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileHeaderOptions}
      />
      <Drawer.Screen
        name="EditPersonalInfo"
        component={EditPersonalInfoScreen}
        options={getGoBackHeaderOptions(
          navigation,
          theme,
          t('navigation:headers.returnProfile'),
        )}
      />
      <Drawer.Screen
        name="EditTrainingPreferences"
        component={EditTrainingPreferencesScreen}
        options={getGoBackHeaderOptions(
          navigation,
          theme,
          t('navigation:headers.returnProfile'),
        )}
      />
      <Drawer.Screen
        name="WeeklyExercises"
        component={WeeklyExercisesScreen}
        options={getGoBackHeaderOptions(
          navigation,
          theme,
          t('navigation:headers.returnHome'),
        )}
      />
      <Drawer.Screen
        name="WeeklyExerciseStatistics"
        component={WeeklyExerciseStatisticsScreen}
        options={getGoBackHeaderOptions(
          navigation,
          theme,
          t('navigation:headers.returnHome'),
        )}
      />
    </Drawer.Navigator>
  );
};
