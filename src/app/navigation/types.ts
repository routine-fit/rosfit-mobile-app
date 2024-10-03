import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type BottomTabParamList = {
  RoutinesScreen: undefined;
  HomeScreen: undefined;
  DoRoutineStack: undefined;
  MyExercisesScreen: undefined;
};

export type MainDrawerParamList = {
  Home: NavigatorScreenParams<BottomTabParamList>;
  Profile: undefined;
  EditPersonalInfo: undefined;
  EditTrainingPreferences: undefined;
  WeekSummary: undefined;
  WeeklyExercises: undefined;
  WeeklyExerciseStatistics: { exerciseName: string };
} & ExercisesParamList;

export type RootStackParamList = {
  // TODO : onboarding , auth, etc
  Main: NavigatorScreenParams<MainDrawerParamList>;
  Login: undefined;
  CreateAccount: undefined;
  CompleteData: undefined;
};

export type DoRoutineStackParamList = {
  SelectRoutine: undefined;
  RoutineRunner: { routine: string };
  RoutineResults: { time: string };
};

export type RoutinesParamList = {
  RoutineDashboard: undefined;
  ScheduleRoutine: undefined;
  AddRoutine: undefined;
  SelectRoutineExercises: undefined;
  ExercisesRevision: undefined;
};

export type ExercisesParamList = {
  FormExerciseScreen?: { id: string };
};

export interface TabScreenPropsWithDrawerParamList<
  TabScreen extends keyof BottomTabParamList,
> extends CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, TabScreen>,
    StackScreenProps<MainDrawerParamList>
  > {}
