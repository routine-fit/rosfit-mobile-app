import { createAsyncThunk } from '@reduxjs/toolkit';

import rosFitApi from 'src/api/rosfit.api';
import { RoutineResponse } from 'src/interfaces/routine';

export const getMyRoutines = createAsyncThunk(
  'auth/get-my-routines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.get<RoutineResponse>('/routine');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);
