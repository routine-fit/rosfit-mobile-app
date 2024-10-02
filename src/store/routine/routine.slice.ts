import { createSlice } from '@reduxjs/toolkit';

import { Routine } from 'src/interfaces/routine';

import { getMyRoutines } from './routine.thunks';

interface RoutineState {
  routines: Routine[];
  errorMessage: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RoutineState = {
  routines: [],
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
      });
  },
});
