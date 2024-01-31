import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

import firebaseAuth from 'src/config/firebase';

interface LoginCredentials {
  email: string;
  password: string;
}

export const startLoginWithEmailPassword = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const resp = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password,
      );
      const { uid, displayName } = resp.user;

      const idToken = await resp.user.getIdToken();
      await AsyncStorage.setItem('token', idToken);
      return {
        uid,
        displayName,
        email,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred during login');
    }
  },
);

export const startLogoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await firebaseAuth.signOut();
      await AsyncStorage.removeItem('token');
      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during logout',
      );
    }
  },
);
