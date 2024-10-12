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
  repetitions: string;
  order: number;
  restTimeSecs: string;
  series: Series[];
};

export interface Series {
  order: number;
  weight: string;
  weightMeasure: string;
}
