import { createAsyncThunk } from '@reduxjs/toolkit';

import rosFitApi from 'src/api/rosfit.api';
import { Exercise } from 'src/interfaces/exercises';

export const getExercises = createAsyncThunk(
  'exercise/get-exercises',
  async (
    objParams: Record<string, string> | undefined,
    { rejectWithValue },
  ) => {
    try {
      const urlSearchParams = new URLSearchParams(objParams);
      const params = urlSearchParams.toString();
      const response = await rosFitApi.get(
        `/exercise${objParams?.name ? '?' + params : ''}`,
      );
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

export const createExercise = createAsyncThunk(
  'exercise/create-exercise',
  async (exercise: Omit<Exercise, 'id'>, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.post('/exercise', exercise);
      return { exercise: response.data.data };
    } catch (error: any) {
      console.log('error', error);
      return rejectWithValue(
        error.message || 'Something went wrong. Please try again.',
      );
    }
  },
);
