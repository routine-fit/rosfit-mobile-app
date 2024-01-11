import { RootStackParamList } from 'src/types/navigation';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainAppNavigation } from './main-navigation';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] =
    useState<keyof RootStackParamList>('Main');

  useEffect(() => {
    // TODO: fetch onboarding status to set initial route name
    setInitialRouteName('Main');
    // after fetching data:
    setLoading(false);
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <RootStack.Navigator initialRouteName={initialRouteName}>
      {/* TODO : add onboarding stack */}
      <RootStack.Screen
        name="Main"
        options={{ headerShown: false }}
        component={MainAppNavigation}
      />
    </RootStack.Navigator>
  );
};
