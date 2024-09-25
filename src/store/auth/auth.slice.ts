import { createSlice } from '@reduxjs/toolkit';

import {
  startCreateFirebaseUser,
  startCreateUserInfo,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogoutUser,
} from './auth.thunks';

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
      .addCase(startGoogleSignIn.pending, state => {
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.status = 'loading';
      })
      .addCase(startGoogleSignIn.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.status = 'succeeded';
      })
      .addCase(startGoogleSignIn.rejected, (state, action) => {
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.errorMessage =
          action.error.message || 'An error occurred during signin';
        state.status = 'failed';
      })
      .addCase(startCreateUserInfo.pending, () => {})
      .addCase(startCreateUserInfo.fulfilled, () => {})
      .addCase(startCreateUserInfo.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || 'An error occurred during user info creation';
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
