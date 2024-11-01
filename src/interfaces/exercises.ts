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
  links: { id: string; url: string }[];
}

export type RoutineExerciseFormData = {
  exerciseId?: string;
  repetitions: number;
  order: number;
  restTimeSecs: number;
  series: Series[];
};

export interface Series {
  order: number;
  weight: number;
  weightMeasure: string;
}
