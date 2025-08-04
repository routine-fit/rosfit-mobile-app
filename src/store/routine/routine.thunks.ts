import { createAsyncThunk } from '@reduxjs/toolkit';

import rosFitApi from 'src/api/rosfit.api';
import { RoutineFormData } from 'src/app/screens/routines/form-config';
import {
  RoutineExercise,
  RoutineResponse,
  RoutineStartResponse,
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

export const getMyScheduleRoutineById = createAsyncThunk<
  ScheduleRoutineData[],
  string | undefined,
  { rejectValue: string }
>('routine/get-my-schedule-routine-by-id', async (id, { rejectWithValue }) => {
  try {
    const response = await rosFitApi.get<ScheduleRoutineResponse>(
      `/routine/schedule/${id}`,
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

export const startRoutine = createAsyncThunk(
  'routine/start-routine',
  async (scheduleRoutineId: string, { rejectWithValue }) => {
    try {
      const response = await rosFitApi.post<RoutineStartResponse>(
        '/routine/start',
        {
          scheduleRoutineId,
        },
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);

export const finishRoutine = createAsyncThunk(
  'routine/finish-routine',
  async (
    {
      summaryRoutineId,
      routineExercises,
    }: { summaryRoutineId: string; routineExercises: RoutineExercise[] },
    { rejectWithValue },
  ) => {
    try {
      const formattedExercises = routineExercises.map(exercise => ({
        id: exercise.id,
        repetitions: exercise.repetitions,
        restTimeSecs: exercise.restTimeSecs,
        series: exercise.series.map(serie => ({
          id: serie.id,
          weight: serie.weight,
          weightMeasure: serie.weightMeasure,
        })),
      }));
      const response = await rosFitApi.put<RoutineStartResponse>(
        `/routine/finish/${summaryRoutineId}`,
        {
          exercises: formattedExercises,
        },
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during operation',
      );
    }
  },
);
