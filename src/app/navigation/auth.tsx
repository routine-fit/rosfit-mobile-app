import React from 'react';

import { LoginScreen } from 'src/app/screens/auth/login';
import { BackArrowIcon } from 'src/assets/svg/navigation-icons';

import { Header } from '../components/header';
import { CreateAccountScreen } from '../screens/auth/signup/createAccount';
import { RootStack } from './root-stack';

export const getAuthenticatedGroup = () => {
  return (
    <RootStack.Group screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Group screenOptions={{ headerShown: true }}>
        <RootStack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={({ navigation }) => ({
            header: () => (
              <Header
                leftText="Login"
                leftIcon={<BackArrowIcon />}
                navigation={navigation}
              />
            ),
          })}
        />
        {/* <RootStack.Screen name="CompleteData" component={} /> */}
      </RootStack.Group>
    </RootStack.Group>
  );
};
