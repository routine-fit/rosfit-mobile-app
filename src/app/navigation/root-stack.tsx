import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    async (firebaseUser: FirebaseAuthTypes.User | null) => {
      if (initializing) setInitializing(false);

      if (!firebaseUser) {
        const token = await AsyncStorage.getItem('token');
        setisAuthenticated(!!token);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setisAuthenticated(!!token);
    } catch (error) {
      setisAuthenticated(false);
    }
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
