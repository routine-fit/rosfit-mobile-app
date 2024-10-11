import { Exercise } from 'src/interfaces/exercises';

export interface ExerciseItemProps {
  item: Exercise;
  handleExercisePress: (isChecked: boolean) => void;
}
