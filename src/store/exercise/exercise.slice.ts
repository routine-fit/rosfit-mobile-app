import { createSlice } from '@reduxjs/toolkit';

import { Exercise } from 'src/interfaces/exercises';

import { getExercises } from './exercise.thunks';

interface ExerciseState {
  exerciseList: Exercise[];
  errorMessage: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ExerciseState = {
  exerciseList: [],
  errorMessage: null,
  status: 'idle',
};

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getExercises.pending, state => {
        state.status = 'loading';
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        state.exerciseList = action.payload.exercises;
        state.status = 'succeeded';
      })
      .addCase(getExercises.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || 'An error occurred during login';
        state.status = 'failed';
      });
  },
});
