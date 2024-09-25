import { createAsyncThunk } from '@reduxjs/toolkit';

import rosFitApi from 'src/api/rosfit.api';

export const getExercises = createAsyncThunk(
  'exercise/get-exercises',
  async (params: string | undefined, { rejectWithValue }) => {
    try {
      // TODO: Add filter by name
      const response = await rosFitApi.get('/exercise');
      return {
        exercises: response.data.data,
      };
    } catch (error: any) {
      console.log('error', error);
      return rejectWithValue(
        error.message || 'Something went wrong. Please try again.',
      );
    }
  },
);
