import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  RoutinesScreen: undefined;
  HomeScreen: undefined;
  ExerciseScreen: undefined;
};

export type MainDrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  // TODO : onboarding , auth, etc
  Main: NavigatorScreenParams<MainDrawerParamList>;
};
