import { createSlice } from '@reduxjs/toolkit';

import {
  Routine,
  RoutineExercise,
  ScheduleRoutineData,
  SummaryRoutine,
} from 'src/interfaces/routine';

import {
  markExerciseDone,
  markSerieDone,
  markSerieInProgress,
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
  currentExercise: RoutineExercise | null;
  summaryRoutine: SummaryRoutine | null;
  errorMessage: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RoutineState = {
  routines: [],
  scheduleRoutines: [],
  activeRoutine: null,
  currentExercise: null,
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
          action.error.message || 'Failed to retrieve routines';
        state.status = 'failed';
      })
      .addCase(createRoutine.pending, state => {
        state.status = 'loading';
      })
      .addCase(createRoutine.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(createRoutine.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Failed to create routine';
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
          action.error.message || 'Failed to retrieve schedule routines';
        state.status = 'failed';
      })
      .addCase(getMyScheduleRoutineById.pending, state => {
        state.status = 'loading';
      })
      .addCase(getMyScheduleRoutineById.fulfilled, (state, action) => {
        state.scheduleRoutines = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getMyScheduleRoutineById.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || 'Failed to retrieve routine by ID';
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
          action.error.message || 'Failed to schedule routine';
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
          action.error.message || 'Failed to delete scheduled routine';
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
        state.errorMessage = action.error.message || 'Failed to start routine';
        state.status = 'failed';
      })
      .addCase(setActiveRoutine, (state, action) => {
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
        state.status = 'succeeded';
      })
      .addCase(setExerciseInProgress, (state, action) => {
        state.currentExercise = {
          ...action.payload.currentExercise,
          series: action.payload.currentExercise.series.map(serie => ({
            ...serie,
            status: 'pending',
          })),
        };
        if (state.activeRoutine && state.activeRoutine.routine) {
          state.activeRoutine.routine.exercises = action.payload.exercises;
        }
        state.status = 'succeeded';
      })
      .addCase(markExerciseDone, (state, action) => {
        if (state.activeRoutine && state.activeRoutine.routine) {
          state.activeRoutine.routine.exercises = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(markSerieInProgress, (state, action) => {
        const { exerciseId, seriesIndex } = action.payload;
        const currentExercise = state.activeRoutine?.routine.exercises.find(
          ex => ex.id === exerciseId,
        );

        if (currentExercise && currentExercise.series[seriesIndex]) {
          state.currentExercise!.series[seriesIndex].status = 'inProgress';
        }
        state.status = 'succeeded';
      })
      .addCase(markSerieDone, (state, action) => {
        const { exerciseId, seriesIndex } = action.payload;
        const currentExercise = state.activeRoutine?.routine.exercises.find(
          ex => ex.id === exerciseId,
        );
        if (currentExercise && currentExercise.series[seriesIndex]) {
          state.currentExercise!.series[seriesIndex].status = 'done';
        }
        state.status = 'succeeded';
      });
  },
});

export default routineSlice.reducer;
