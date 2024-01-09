import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from 'src/app/screens/auth/login';

import { AppNavigation } from './app';

const AuthStack = createNativeStackNavigator();

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="App" component={AppNavigation} />
    </AuthStack.Navigator>
  );
};
