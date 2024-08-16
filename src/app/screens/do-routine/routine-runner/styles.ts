import styled from 'styled-components/native';
import BottomSheet from '@gorhom/bottom-sheet';

import { RoutineExercise } from 'src/interfaces/routine-exercises';

export const MainRoutineBadge = styled.View`
  height: 26%;
  border-radius: 10px;
  padding: 10px;
  border-width: 1px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.fill.section};
  border-color: ${({ theme }) => theme.colors.primary.default};
`;

export const StartBadge = styled.TouchableOpacity`
  height: 26%;
  border-radius: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary.default};
`;

export const ButtonContainer = styled.View`
  gap: 5px;
`;

export const ExercisesContainer = styled.View`
  flex: 1;
  padding-vertical: 10px;
`;

export const FlatListContainer = styled.FlatList<RoutineExercise>`
  flex: 1;
`;

export const StyledBottomSheet = styled(BottomSheet)`
  border-width: 2px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
