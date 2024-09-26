import { createAsyncThunk } from '@reduxjs/toolkit';

import rosFitApi from 'src/api/rosfit.api';
import {
  GrowRecordRequest,
  GrowRecordResponse,
  ProfileInfoResponse,
  TrainingPreferenceData,
  TrainingPreferenceResponse,
} from 'src/interfaces/profile-data';

export const startGetMyInformarion = createAsyncThunk(
  'auth/get-my-info',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.get<ProfileInfoResponse>('/me');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);

export const startCreateGrowRecord = createAsyncThunk(
  'auth/create-grow-record',
  async (growRecordData: GrowRecordRequest, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.post<GrowRecordResponse>(
        '/me/growth-record',
        growRecordData,
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);

export const startUpdateTrainingPreferences = createAsyncThunk(
  'auth/update-training-type',
  async (trainingPreferences: TrainingPreferenceData, { rejectWithValue }) => {
    try {
      const { id, ...rest } = trainingPreferences;
      const response = await rosFitApi.put<TrainingPreferenceResponse>(
        `/me/training-preference/${id}`,
        rest,
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);
