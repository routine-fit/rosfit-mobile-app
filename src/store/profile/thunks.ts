import { createAsyncThunk } from '@reduxjs/toolkit';

import rosFitApi from 'src/api/rosfit.api';
import { ProfileInfoResponse } from 'src/interfaces/profile-data';

export const startGetMyInformarion = createAsyncThunk(
  'auth/get-my-info',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.get<ProfileInfoResponse>('/me');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);
