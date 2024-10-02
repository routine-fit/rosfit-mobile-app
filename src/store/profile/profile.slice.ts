import { createSlice } from '@reduxjs/toolkit';

import {
  GrowRecord,
  PersonalInformation,
  TrainingPreference,
} from 'src/interfaces/profile-data';

import {
  startCreateGrowRecord,
  startGetMyInformation,
  startUpdateTrainingPreferences,
} from './profile.thunks';

interface ProfileState {
  personalInformation: PersonalInformation;
  trainingPreference: TrainingPreference;
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
      .addCase(startGetMyInformation.pending, state => {
        state.personalInformation = initialState.personalInformation;
        state.trainingPreference = initialState.trainingPreference;
        state.growRecords = initialState.growRecords;
        state.status = 'loading';
      })
      .addCase(startGetMyInformation.fulfilled, (state, action) => {
        state.personalInformation = action.payload.personalInformation;
        state.trainingPreference = action.payload.trainingPreference;
        state.growRecords = action.payload.growRecords;
        state.status = 'succeeded';
      })
      .addCase(startGetMyInformation.rejected, (state, action) => {
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
