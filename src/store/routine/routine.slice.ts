import { createSlice } from '@reduxjs/toolkit';

import { Routine } from 'src/interfaces/routine';

import { ScheduleRoutineData } from '../../interfaces/routine';
import {
  createScheduleRoutine,
  deleteScheduleRoutine,
  getMyRoutines,
  getMyScheduleRoutines,
} from './routine.thunks';

interface RoutineState {
  routines: Routine[];
  scheduleRoutines: ScheduleRoutineData[];
  errorMessage: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RoutineState = {
  routines: [],
  scheduleRoutines: [],
  errorMessage: null,
  status: 'idle',
};

export const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMyRoutines.pending, state => {
        state.routines = initialState.routines;
        state.status = 'loading';
      })
      .addCase(getMyRoutines.fulfilled, (state, action) => {
        state.routines = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getMyRoutines.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || 'An error occurred when retrieving routines';
        state.status = 'failed';
      })
      .addCase(getMyScheduleRoutines.pending, state => {
        state.scheduleRoutines = initialState.scheduleRoutines;
        state.status = 'loading';
      })
      .addCase(getMyScheduleRoutines.fulfilled, (state, action) => {
        state.scheduleRoutines = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getMyScheduleRoutines.rejected, (state, action) => {
        state.errorMessage =
          action.error.message ||
          'An error occurred when retrieving schedule routines';
        state.status = 'failed';
      })
      .addCase(createScheduleRoutine.pending, state => {
        state.status = 'loading';
      })
      .addCase(createScheduleRoutine.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(createScheduleRoutine.rejected, (state, action) => {
        state.errorMessage =
          action.error.message ||
          'An error occurred during while scheduling routine';
        state.status = 'failed';
      })
      .addCase(deleteScheduleRoutine.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteScheduleRoutine.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(deleteScheduleRoutine.rejected, (state, action) => {
        state.errorMessage =
          action.error.message ||
          'An error occurred during while deleting the exercise';
        state.status = 'failed';
      });
  },
});
