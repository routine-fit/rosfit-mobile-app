import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { config as gluestackConfig } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';

import NavigationWrapper from 'src/app/navigation';
import LocalizationProvider from 'src/config/localization/provider';
import { store } from 'src/store';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    console.log('Reactotron Configured');
    Reactotron.log('Reactotron Configured and logged');
  });
}

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={gluestackConfig}>
        <LocalizationProvider>
          <NavigationWrapper />
        </LocalizationProvider>
      </GluestackUIProvider>
    </Provider>
  );
};

export default App;
