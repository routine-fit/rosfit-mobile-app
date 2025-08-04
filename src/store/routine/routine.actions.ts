import { createAction } from '@reduxjs/toolkit';

import { RoutineExercise, ScheduleRoutineData } from 'src/interfaces/routine';

export const setActiveRoutine = createAction<ScheduleRoutineData>(
  'routine/set-active-routine',
);

export const setExerciseInProgress = createAction<{
  currentExercise: RoutineExercise;
  exercises: RoutineExercise[];
} | null>('routine/set-exercise-inprogress');

export const markExerciseDone = createAction<string>(
  'routine/mark-exercise-done',
);

export const setCurrentExercise = createAction<RoutineExercise | null>(
  'routine/set-current-exercise',
);

export const markSerieInProgress = createAction<{
  exerciseId: string;
  seriesIndex: number;
}>('routine/mark-serie-inprogress');

export const markSerieDone = createAction<{
  exerciseId: string;
  seriesIndex: number;
}>('routine/mark-serie-done');
