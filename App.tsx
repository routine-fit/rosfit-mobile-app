import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { config as gluestackConfig } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from '@src/app/navigation';
import { store } from '@src/store';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={gluestackConfig}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
};

export default App;
