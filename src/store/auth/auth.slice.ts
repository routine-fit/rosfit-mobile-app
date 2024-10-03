import { createSlice } from '@reduxjs/toolkit';

import {
  createFirebaseUser,
  createUserInfo,
  googleSignIn,
  loginWithEmailPassword,
  logoutUser,
} from './auth.thunks';

interface AuthState {
  uid: string | null;
  email: string | null;
  errorMessage: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  uid: null,
  email: null,
  errorMessage: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginWithEmailPassword.pending, state => {
        state.uid = null;
        state.email = null;
        state.status = 'loading';
      })
      .addCase(loginWithEmailPassword.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.status = 'succeeded';
      })
      .addCase(loginWithEmailPassword.rejected, (state, action) => {
        state.uid = null;
        state.email = null;
        state.errorMessage =
          action.error.message || 'An error occurred during login';
        state.status = 'failed';
      })
      .addCase(createFirebaseUser.pending, state => {
        state.uid = null;
        state.email = null;
        state.errorMessage = null;
      })
      .addCase(createFirebaseUser.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.errorMessage = null;
      })
      .addCase(createFirebaseUser.rejected, (state, action) => {
        state.uid = null;
        state.email = null;
        state.errorMessage =
          action.error.message || 'An error occurred during signup';
      })
      .addCase(googleSignIn.pending, state => {
        state.uid = null;
        state.email = null;
        state.status = 'loading';
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.status = 'succeeded';
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.uid = null;
        state.email = null;
        state.errorMessage =
          action.error.message || 'An error occurred during signin';
        state.status = 'failed';
      })
      .addCase(createUserInfo.pending, () => {})
      .addCase(createUserInfo.fulfilled, () => {})
      .addCase(createUserInfo.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || 'An error occurred during user info creation';
      })
      .addCase(logoutUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, state => {
        state.uid = null;
        state.email = null;
        state.status = 'idle';
      });
  },
});
