import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reactotron from '../../ReactotronConfig';
import { authSlice } from './auth/auth.slice';
import { exerciseSlice } from './exercise/exercise.slice';
import { profileSlice } from './profile/profile.slice';
import { routineSlice } from './routine/routine.slice';

export const store = configureStore({
  reducer: {
    // reducers
    auth: authSlice.reducer,
    exercise: exerciseSlice.reducer,
    profile: profileSlice.reducer,
    routine: routineSlice.reducer,
  },
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(reactotron.createEnhancer()),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
