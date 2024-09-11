export type MuscleGroup =
  | 'ABDOMINAL'
  | 'BICEPS'
  | 'DELTOID'
  | 'ERECTOR_SPINAE'
  | 'LATISSIMUS_DORSI'
  | 'PECTORAL'
  | 'TRAPEZIUS'
  | 'TRICEPS';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  userInfoId: string;
}

export type RoutineExerciseFormData = {
  id?: string;
  repetitions: string;
  restTimeSecs: string;
  series: Series[];
};

export interface Series {
  weight: string;
  weightMeasure: string;
}
