import React, { useEffect } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { setNavigationRef } from './helper';
import { RootStackNavigator } from './root-stack';
import { RootStackParamList } from './types';

const NavigationWrapper = () => {
  const ref = useNavigationContainerRef<RootStackParamList>();

  useEffect(() => {
    setNavigationRef(ref);
  }, [ref]);

  return (
    <NavigationContainer ref={ref}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default NavigationWrapper;
