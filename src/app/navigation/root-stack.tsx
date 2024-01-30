import React, { useCallback, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from 'src/types/navigation';

import { getAuthenticatedGroup } from './auth';
import { MainAppNavigation } from './main-navigation';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);

  const onAuthStateChanged = useCallback(
    (firebaseUser: FirebaseAuthTypes.User | null) => {
      if (initializing) setInitializing(false);
      setisAuthenticated(!!firebaseUser?.uid);
      setisAuthenticated(false);
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  if (initializing) return null;

  return (
    <RootStack.Navigator>
      {/* TODO : add onboarding stack */}
      {isAuthenticated ? (
        <RootStack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={MainAppNavigation}
        />
      ) : (
        getAuthenticatedGroup()
      )}
    </RootStack.Navigator>
  );
};
