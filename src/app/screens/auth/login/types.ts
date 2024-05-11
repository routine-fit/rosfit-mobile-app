import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from 'src/app/navigation/types';

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export type LoginForm = {
  email: string;
  password: string;
};
