import { DrawerScreenProps } from '@react-navigation/drawer';

import { MainDrawerParamList } from 'src/app/navigation/types';

export interface EditPersonalInfoProps
  extends DrawerScreenProps<MainDrawerParamList, 'EditPersonalInfo'> {}
