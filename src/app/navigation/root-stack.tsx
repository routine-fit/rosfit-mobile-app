import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from 'src/types/navigation';

import { getAuthenticatedGroup } from './auth';
import { MainAppNavigation } from './main-navigation';

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
