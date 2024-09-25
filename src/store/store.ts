import { AppState } from 'react-native';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  AnyAction,
  configureStore,
  Dispatch,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import reactotron from '../../ReactotronConfig';
import { authSlice } from './auth/auth.slice';
import { exerciseSlice } from './exercise/exercise.slice';

export const store = configureStore({
  reducer: {
    // reducers
    auth: authSlice.reducer,
    exercise: exerciseSlice.reducer,
  },
  enhancers: __DEV__ ? [reactotron.createEnhancer!()] : [],
});

export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppDispatch = ThunkDispatch<AppState, null | undefined, AnyAction> &
  Dispatch<AnyAction>;

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
