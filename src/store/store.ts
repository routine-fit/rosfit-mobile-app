import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  AnyAction,
  configureStore,
  Dispatch,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import reactotron from '../../ReactotronConfig';
import { authSlice } from './auth/auth.slice';
import { profileSlice } from './profile/profile.slice';

export const store = configureStore({
  reducer: {
    // reducers
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
  },
  enhancers: __DEV__ ? [reactotron.createEnhancer!()] : [],
});

export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppDispatch = ThunkDispatch<AppState, null | undefined, AnyAction> &
  Dispatch<AnyAction>;

export type RootState = ReturnType<typeof store.getState>;
