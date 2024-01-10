import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { config as gluestackConfig } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from '@src/app/navigation';
import LocalizationProvider from '@src/config/localization/provider';
import { store } from '@src/store';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={gluestackConfig}>
        <LocalizationProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </LocalizationProvider>
      </GluestackUIProvider>
    </Provider>
  );
};

export default App;
