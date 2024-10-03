import { createSlice } from '@reduxjs/toolkit';

import {
  GrowRecord,
  PersonalInformation,
  TrainingPreference,
} from 'src/interfaces/profile-data';

import {
  createGrowRecord,
  getMyInformation,
  updateTrainingPreferences,
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
      .addCase(getMyInformation.pending, state => {
        state.personalInformation = initialState.personalInformation;
        state.trainingPreference = initialState.trainingPreference;
        state.growRecords = initialState.growRecords;
        state.status = 'loading';
      })
      .addCase(getMyInformation.fulfilled, (state, action) => {
        state.personalInformation = action.payload.personalInformation;
        state.trainingPreference = action.payload.trainingPreference;
        state.growRecords = action.payload.growRecords;
        state.status = 'succeeded';
      })
      .addCase(getMyInformation.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || 'An error occurred when retrieving info';
        state.status = 'failed';
      })
      .addCase(createGrowRecord.pending, state => {
        state.status = 'loading';
      })
      .addCase(createGrowRecord.fulfilled, (state, action) => {
        state.growRecords.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createGrowRecord.rejected, (state, action) => {
        state.errorMessage =
          action.error.message || 'An error occurred when creating grow record';
        state.status = 'failed';
      })
      .addCase(updateTrainingPreferences.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateTrainingPreferences.fulfilled, (state, action) => {
        state.trainingPreference = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateTrainingPreferences.rejected, (state, action) => {
        state.errorMessage =
          action.error.message ||
          'An error occurred when updating training preferences';
        state.status = 'failed';
      });
  },
});
