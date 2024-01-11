import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackNavigator } from './root-stack';

const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default NavigationWrapper;
