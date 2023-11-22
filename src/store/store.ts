import { configureStore } from '@reduxjs/toolkit';

import { sampleUiSlice } from './sampleUi/sampleUiSlice';

export const store = configureStore({
  reducer: {
    // reducers
    sampleUi: sampleUiSlice.reducer,
  },
});
