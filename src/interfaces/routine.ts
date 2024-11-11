export interface Series {
  id: string;
  order: number;
  weight: number;
  weightMeasure: string;
  routineExerciseId: string;
}

export interface RoutineExercise {
  id: string;
  exercise: {
    id: string;
    name: string;
    muscleGroup: string;
  };
  repetitions: number;
  restTimeSecs: number;
  order: number;
  series: Series[];
  status?: string;
}

export interface Routine {
  id: string;
  name: string;
  type: string;
  exercises: RoutineExercise[];
}

export interface RoutineResponse {
  message: string;
  data: Routine[];
  error: boolean;
}

export interface ScheduleRoutineRequest {
  routineId: string;
  day: string;
}

export interface ScheduleRoutineResponse {
  message: string;
  data: ScheduleRoutineData[];
  error: boolean;
}

export interface ScheduleRoutineData {
  id: string;
  day: string;
  userId: string;
  routine: Routine;
  createdAt: string;
}

export interface RoutineStartResponse {
  message: string;
  data: SummaryRoutine;
  error: boolean;
}

export interface SummaryRoutine {
  id: string;
  startedAt: Date;
  finishedAt: null;
  durationInMinutes: number;
  userId: string;
  scheduleRoutineId: string;
  createdAt: Date;
  updatedAt: Date;
}
