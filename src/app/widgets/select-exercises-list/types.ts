import { RoutineExerciseFormData } from 'src/interfaces/exercises';

export interface SelectExerciseListProps {
  appendExercise: (exercise: RoutineExerciseFormData) => void;
  removeExercise: (exerciseIndex: number) => void;
  fields: RoutineExerciseFormData[];
}
