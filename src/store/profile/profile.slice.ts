import { createSlice } from '@reduxjs/toolkit';

import {
  GrowRecord,
  PersonalInformation,
  TrainingPreference,
} from 'src/interfaces/profile-data';

import {
  startCreateGrowRecord,
  startGetMyInformarion,
  startUpdateTrainingPreferences,
} from './profile.thunks';

interface ProfileState {
  personalInformation: PersonalInformation | null;
  trainingPreference: TrainingPreference | null;
  growRecords: GrowRecord[];
  errorMessage: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProfileState = {
  personalInformation: {
    name: '',
    lastName: '',
    birthDate: '',
    gender: '',
    pushNotification: false,
  },
  trainingPreference: {
    id: '',
    type: '',
    intensity: '',
    time: 0,
  },
  growRecords: [],
  errorMessage: null,
  status: 'idle',
};

export const profileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(startGetMyInformarion.pending, state => {
        state.personalInformation = null;
        state.trainingPreference = null;
        state.growRecords = [];
        state.status = 'loading';
      })
      .addCase(startGetMyInformarion.fulfilled, (state, action) => {
        state.personalInformation = action.payload.personalInformation;
        state.trainingPreference = action.payload.trainingPreference;
        state.growRecords = action.payload.growRecords;
        state.status = 'succeeded';
      })
      .addCase(startGetMyInformarion.rejected, (state, action) => {
        state.personalInformation = null;
        state.trainingPreference = null;
        state.growRecords = [];
        state.errorMessage =
          action.error.message || 'An error occurred when retrieving info';
        state.status = 'failed';
      })
      .addCase(startCreateGrowRecord.pending, state => {
        state.status = 'loading';
      })
      .addCase(startCreateGrowRecord.fulfilled, (state, action) => {
        state.growRecords.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(startCreateGrowRecord.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || 'An error occurred when creating grow record';
        state.status = 'failed';
      })
      .addCase(startUpdateTrainingPreferences.pending, state => {
        state.status = 'loading';
      })
      .addCase(startUpdateTrainingPreferences.fulfilled, (state, action) => {
        state.trainingPreference = action.payload;
        state.status = 'succeeded';
      })
      .addCase(startUpdateTrainingPreferences.rejected, (state, action) => {
        state.errorMessage =
          action.error.message ||
          'An error occurred when updating training preferences';
        state.status = 'failed';
      });
  },
});
