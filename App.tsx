import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import config from 'react-native-config';
import { Provider } from 'react-redux';
import { store } from '@src/store';
import { AppNavigation } from '@src/app/navigation';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config as gluestackConfig } from '@gluestack-ui/config';

const App = (): JSX.Element => {
  console.log('config', config);

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
