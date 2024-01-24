import React, { useCallback, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from 'src/types/navigation';

import { AuthNavigation } from './auth';
import { MainAppNavigation } from './main-navigation';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState<
    keyof RootStackParamList | undefined
  >('Auth');

  const onAuthStateChanged = useCallback(
    (firebaseUser: FirebaseAuthTypes.User | null) => {
      if (initializing) setInitializing(false);

      setInitialRouteName(firebaseUser ? 'Main' : 'Auth');
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, [onAuthStateChanged]);

  if (initializing) return null;

  return (
    <RootStack.Navigator initialRouteName={initialRouteName}>
      {/* TODO : add onboarding stack */}
      <RootStack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={MainAppNavigation}
      />
      <RootStack.Screen
        name="Auth"
        options={{ headerShown: false }}
        component={AuthNavigation}
      />
    </RootStack.Navigator>
  );
};
