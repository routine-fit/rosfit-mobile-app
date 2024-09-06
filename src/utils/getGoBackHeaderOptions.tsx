import { ArrowLeft } from 'lucide-react-native';
import { DefaultTheme } from 'styled-components';
import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Header } from 'src/app/components';

type NavigationProp<ParamList extends ParamListBase = ParamListBase> =
  | StackNavigationProp<ParamList>
  | BottomTabNavigationProp<ParamList>
  | DrawerNavigationProp<ParamList>;

export const getGoBackHeaderOptions = <ParamList extends ParamListBase>(
  navigation: NavigationProp<ParamList>,
  theme: DefaultTheme,
  leftText?: string,
) => {
  return {
    header: () => (
      <Header
        leftText={leftText}
        headerLeft={
          <ArrowLeft
            color={theme.colors.background}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
      />
    ),
  };
};
