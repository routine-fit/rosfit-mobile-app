import { createSlice } from '@reduxjs/toolkit';

import { Exercise, MuscleGroup } from 'src/interfaces/exercises';

import { clearExercise } from './exercise.actions';
import {
  createExercise,
  editExercise,
  getExerciseById,
  getExercises,
} from './exercise.thunks';

interface ExerciseState {
  exerciseList: Exercise[];
  exercise: Exercise;
  errorMessage: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ExerciseState = {
  exerciseList: [],
  exercise: {
    id: '',
    muscleGroup: '' as MuscleGroup,
    name: '',
    links: [],
  },
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
          action.error.message ||
          'An error occurred during while getting the exercises';
        state.status = 'failed';
      })
      .addCase(createExercise.pending, state => {
        state.status = 'loading';
      })
      .addCase(createExercise.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.errorMessage =
          action.error.message ||
          'An error occurred during while creating the exercise';
        state.status = 'failed';
      })
      .addCase(getExerciseById.pending, state => {
        state.status = 'loading';
      })
      .addCase(getExerciseById.fulfilled, (state, action) => {
        state.exercise = action.payload.exercise;
        state.status = 'succeeded';
      })
      .addCase(getExerciseById.rejected, (state, action) => {
        state.errorMessage =
          action.error.message ||
          'An error occurred during while updating the exercise';
        state.status = 'failed';
      })
      .addCase(editExercise.pending, state => {
        state.status = 'loading';
      })
      .addCase(editExercise.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(editExercise.rejected, (state, action) => {
        state.errorMessage =
          action.error.message ||
          'An error occurred during while updating the exercise';
        state.status = 'failed';
      })
      .addCase(clearExercise, state => {
        state.exercise = initialState.exercise;
      });
  },
});
