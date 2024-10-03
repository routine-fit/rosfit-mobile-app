import { NavigatorScreenParams } from '@react-navigation/native';

import { Exercise } from 'src/interfaces/exercises';

export type BottomTabParamList = {
  RoutinesScreen: undefined;
  HomeScreen: undefined;
  DoRoutineStack: undefined;
  ExerciseStack: undefined;
};

export type MainDrawerParamList = {
  Home: undefined;
  Profile: undefined;
  EditPersonalInfo: undefined;
  EditTrainingPreferences: undefined;
  WeekSummary: undefined;
  WeeklyExercises: undefined;
  WeeklyExerciseStatistics: { exerciseName: string };
};

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
  MyExercisesScreen: undefined;
  AddExerciseScreen: undefined;
  ExerciseDetailsScreen: { exercise: Exercise };
};
