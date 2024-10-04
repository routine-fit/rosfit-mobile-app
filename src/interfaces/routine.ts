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
    userId: string;
  };
  repetitions: number;
  restTimeSecs: number;
  order: number;
  series: Series[];
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
