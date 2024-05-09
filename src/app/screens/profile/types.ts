import { DrawerScreenProps } from '@react-navigation/drawer';

import { MainDrawerParamList } from 'src/app/navigation/types';

export interface ProfileScreenProps
  extends DrawerScreenProps<MainDrawerParamList, 'Profile'> {}
