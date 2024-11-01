import { createAsyncThunk } from '@reduxjs/toolkit';

import rosFitApi from 'src/api/rosfit.api';
import { RoutineFormData } from 'src/app/screens/routines/form-config';
import {
  RoutineResponse,
  ScheduleRoutineData,
  ScheduleRoutineRequest,
  ScheduleRoutineResponse,
} from 'src/interfaces/routine';

export const getMyRoutines = createAsyncThunk(
  'routine/get-my-routines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.get<RoutineResponse>('/routine');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);

export const createRoutine = createAsyncThunk(
  'routine/create-routines',
  async (routineData: RoutineFormData, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.post<RoutineResponse>(
        '/routine',
        routineData,
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);

export const getMyScheduleRoutines = createAsyncThunk<
  ScheduleRoutineData[],
  string | undefined,
  { rejectValue: string }
>('routine/get-my-schedule-routines', async (day, { rejectWithValue }) => {
  try {
    const response = await rosFitApi.get<ScheduleRoutineResponse>(
      `/routine/schedule${day ? `?day=${day}` : ''}`,
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.message || 'An error occurred during operation',
    );
  }
});

export const createScheduleRoutine = createAsyncThunk(
  'routine/create-schedule-routine',
  async (scheduleRoutineData: ScheduleRoutineRequest, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.post<ScheduleRoutineResponse>(
        '/routine/schedule',
        scheduleRoutineData,
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);

export const deleteScheduleRoutine = createAsyncThunk(
  'routine/delete-schedule-routine',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.delete<ScheduleRoutineResponse>(
        '/routine/schedule',
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);
