import React from 'react';

import { LoginScreen } from 'src/app/screens/auth/login';

import { RootStack } from './root-stack';

export const getAuthenticatedGroup = () => {
  return (
    <RootStack.Group>
      <RootStack.Screen name="Login" component={LoginScreen} />
      {/* <RootStack.Screen name="Register" component={RegisterScreen} /> */}
    </RootStack.Group>
  );
};
