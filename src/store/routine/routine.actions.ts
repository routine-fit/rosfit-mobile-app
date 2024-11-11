import { createAction } from '@reduxjs/toolkit';

import { RoutineExercise, ScheduleRoutineData } from 'src/interfaces/routine';

export const setActiveRoutine = createAction<ScheduleRoutineData>(
  'routine/set-active-routine',
);

export const setExerciseInProgress = createAction<RoutineExercise[]>(
  'routine/set-exercise-inprogress',
);

export const markExerciseDone = createAction<RoutineExercise[]>(
  'routine/mark-exercise-done',
);
