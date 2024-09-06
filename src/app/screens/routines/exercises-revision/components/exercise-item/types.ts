import { Control } from 'react-hook-form';

import { RoutineFormData } from 'src/app/screens/routines/form-config';
import { Exercise } from 'src/interfaces/exercises';

export interface ExerciseItemProps {
  item: Exercise;
  control: Control<RoutineFormData>;
  index: number;
}
