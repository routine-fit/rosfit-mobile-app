import { StackScreenProps } from '@react-navigation/stack';

import { DoRoutineStackParamList } from 'src/app/navigation/types';

export interface Props
  extends StackScreenProps<DoRoutineStackParamList, 'RoutineRunner'> {}

export type ExerciseStatus = 'done' | 'inProgress' | 'pending';
