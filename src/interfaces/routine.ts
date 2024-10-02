export interface Series {
  id: string;
  order: number;
  weight: number;
  weightMeasure: string;
  routineExerciseId: string;
}

export interface Exercise {
  id: string;
  exerciseId: string;
  name: string;
  muscleGroup: string;
  repetitions: number;
  restTimeSecs: number;
  order: number;
  series: Series[];
}

export interface Routine {
  id: string;
  name: string;
  type: string;
  exercises: Exercise[];
}

export interface RoutineResponse {
  message: string;
  data: Routine[];
  error: boolean;
}
