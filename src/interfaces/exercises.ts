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
  id: number;
  name: string;
  muscleGroup: MuscleGroup;
  userInfoId: string;
}

export type RoutineExercise = {
  name: string;
  series: string;
  repetitions: string;
  restTime: string;
  variableWeight: boolean;
};
