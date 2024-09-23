import { StackScreenProps } from '@react-navigation/stack';

import { ExercisesParamList } from 'src/app/navigation/types';

export interface MyExercisesScreenProps
  extends StackScreenProps<ExercisesParamList, 'MyExercisesScreen'> {}
