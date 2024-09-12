import { StackScreenProps } from '@react-navigation/stack';

import { ExercisesParamList } from 'src/app/navigation/types';

export interface AddExerciseScreenProps
  extends StackScreenProps<ExercisesParamList, 'AddExerciseScreen'> {}
