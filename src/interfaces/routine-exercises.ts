export interface RoutineExercise {
  id: number;
  routine: string;
  exercise: string;
  series: number;
  repetitions: number;
  restTime: number;
  variableWeight: boolean;
  status: 'pending' | 'inProgress' | 'done';
}
