import { StackScreenProps } from '@react-navigation/stack';

import { RoutinesParamList } from 'src/app/navigation/types';

export interface AddRoutineProps
  extends StackScreenProps<RoutinesParamList, 'AddRoutine'> {}
