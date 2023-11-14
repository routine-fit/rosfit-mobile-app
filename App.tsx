import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@src/store';
import { AppNavigation } from '@src/app/navigation/app';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
};

export default App;
