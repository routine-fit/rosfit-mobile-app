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
