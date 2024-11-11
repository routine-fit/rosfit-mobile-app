import { createSlice } from '@reduxjs/toolkit';

import { Routine, SummaryRoutine } from 'src/interfaces/routine';

import { ScheduleRoutineData } from '../../interfaces/routine';
import {
  markExerciseDone,
  setActiveRoutine,
  setExerciseInProgress,
} from './routine.actions';
import {
  createRoutine,
  createScheduleRoutine,
  deleteScheduleRoutine,
  getMyRoutines,
  getMyScheduleRoutineById,
  getMyScheduleRoutines,
  startRoutine,
} from './routine.thunks';

interface RoutineState {
  routines: Routine[];
  scheduleRoutines: ScheduleRoutineData[];
  activeRoutine: ScheduleRoutineData | null;
  summaryRoutine: SummaryRoutine | null;
  errorMessage: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RoutineState = {
  routines: [],
  scheduleRoutines: [],
  activeRoutine: null,
  summaryRoutine: null,
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
      .addCase(createRoutine.pending, state => {
        state.status = 'loading';
      })
      .addCase(createRoutine.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(createRoutine.rejected, (state, action) => {
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
      .addCase(getMyScheduleRoutineById.pending, state => {
        state.scheduleRoutines = initialState.scheduleRoutines;
        state.status = 'loading';
      })
      .addCase(getMyScheduleRoutineById.fulfilled, (state, action) => {
        state.scheduleRoutines = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getMyScheduleRoutineById.rejected, (state, action) => {
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
      })
      .addCase(startRoutine.pending, state => {
        state.status = 'loading';
      })
      .addCase(startRoutine.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.summaryRoutine = action.payload;
      })
      .addCase(startRoutine.rejected, (state, action) => {
        state.errorMessage =
          action.error.message ||
          'An error occurred during while starting routine';
        state.status = 'failed';
      })
      .addCase(setActiveRoutine, (state, action) => {
        state.status = 'succeeded';
        state.activeRoutine = {
          ...action.payload,
          routine: {
            ...action.payload.routine,
            exercises: action.payload.routine.exercises.map(exercise => ({
              ...exercise,
              status: 'pending',
            })),
          },
        };
      })
      .addCase(setExerciseInProgress, (state, action) => {
        state.status = 'succeeded';

        if (state.activeRoutine && state.activeRoutine.id) {
          state.activeRoutine = {
            ...state.activeRoutine,
            routine: {
              ...state.activeRoutine.routine,
              exercises: action.payload,
            },
          };
        }
      })
      .addCase(markExerciseDone, (state, action) => {
        state.status = 'succeeded';

        if (state.activeRoutine && state.activeRoutine.id) {
          state.activeRoutine = {
            ...state.activeRoutine,
            routine: {
              ...state.activeRoutine.routine,
              exercises: action.payload,
            },
          };
        }
      });
  },
});
