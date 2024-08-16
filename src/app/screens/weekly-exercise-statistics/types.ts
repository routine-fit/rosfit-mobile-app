import { DrawerScreenProps } from '@react-navigation/drawer';

import { MainDrawerParamList } from 'src/app/navigation/types';

export interface Props
  extends DrawerScreenProps<MainDrawerParamList, 'WeeklyExerciseStatistics'> {}

export interface StatisticsItem {
  key: string;
  header: string;
  value: any;
  description: string;
}
