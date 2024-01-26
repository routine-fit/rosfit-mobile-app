import auth from '@react-native-firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginCredentials {
  email: string;
  password: string;
}

export const startLoginWithEmailPassword = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const resp = await auth().signInWithEmailAndPassword(email, password);
      const { uid, displayName } = resp.user;

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
      await auth().signOut();
      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during logout',
      );
    }
  },
);
