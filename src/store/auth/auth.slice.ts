import { createSlice } from '@reduxjs/toolkit';

import {
  startCreateFirebaseUser,
  startLoginWithEmailPassword,
  startLogoutUser,
} from './thunks';

interface AuthState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  errorMessage: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  uid: null,
  email: null,
  displayName: null,
  errorMessage: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(startLoginWithEmailPassword.pending, state => {
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.status = 'loading';
      })
      .addCase(startLoginWithEmailPassword.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.status = 'succeeded';
      })
      .addCase(startLoginWithEmailPassword.rejected, (state, action) => {
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.errorMessage =
          action.error.message || 'An error occurred during login';
        state.status = 'failed';
      })
      .addCase(startCreateFirebaseUser.pending, state => {
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.errorMessage = null;
      })
      .addCase(startCreateFirebaseUser.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.errorMessage = null;
      })
      .addCase(startCreateFirebaseUser.rejected, (state, action) => {
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.errorMessage =
          action.error.message || 'An error occurred during signup';
      })
      .addCase(startLogoutUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(startLogoutUser.fulfilled, state => {
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.status = 'idle';
      });
  },
});
