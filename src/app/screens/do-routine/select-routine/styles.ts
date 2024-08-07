import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { RoutineExercise } from 'src/interfaces/routine-exercises';

export const ExercisesDataContainer = styled.View<{ backgroundColor: string }>`
  gap: 2px;
  border-radius: 10px;
  padding-vertical: 8px;
  padding-horizontal: 15px;
  margin-vertical: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const FlatlistContainer = styled.FlatList.attrs(() => ({
  contentContainerStyle: { paddingBottom: 20 },
}))`` as unknown as typeof FlatList<RoutineExercise>;
