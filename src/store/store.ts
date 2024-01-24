import { configureStore } from '@reduxjs/toolkit';

import reactotron from '../../ReactotronConfig';
import { sampleUiSlice } from './sampleUi/sampleUiSlice';

export const store = configureStore({
  reducer: {
    // reducers
    sampleUi: sampleUiSlice.reducer,
  },
  enhancers: __DEV__ ? [reactotron.createEnhancer()] : [],
});
