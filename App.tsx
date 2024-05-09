import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { config as gluestackConfig } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';

import NavigationWrapper from './src/app/navigation';
import LocalizationProvider from './src/config/localization/provider';
import { store } from './src/store';
import { DarkTheme, LightTheme } from './src/theme/index';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    console.log('Reactotron Configured');
    Reactotron.log('Reactotron Configured and logged');
  });
}

const App = (): React.JSX.Element => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  return (
    <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <Provider store={store}>
        <GluestackUIProvider config={gluestackConfig}>
          <LocalizationProvider>
            <NavigationWrapper />
          </LocalizationProvider>
        </GluestackUIProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
