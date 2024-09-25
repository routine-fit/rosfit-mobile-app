import { createSlice } from '@reduxjs/toolkit';

import {
  GrowRecord,
  PersonalInformation,
  TrainingPreference,
} from 'src/interfaces/profile-data';

import { startGetMyInformarion } from './thunks';

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
      });
  },
});
