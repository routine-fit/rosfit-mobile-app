import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getAuthenticatedGroup } from './auth';
import { MainAppNavigation } from './main-navigation';
import { RootStackParamList } from './types';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('Login');

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) setInitialRoute('Main');
  };

  useEffect(() => {
    const initializeApp = async () => {
      await checkToken();
      setInitializing(false);
    };

    initializeApp();
  }, []);

  if (initializing) return null;

  return (
    <RootStack.Navigator initialRouteName={initialRoute}>
      {/* TODO : add onboarding stack */}
      <RootStack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={MainAppNavigation}
      />
      {getAuthenticatedGroup()}
    </RootStack.Navigator>
  );
};
