import { styled } from 'styled-components/native';

export const ExerciseContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.neutral.pale};
`;

export const TextWrapper = styled.View`
  gap: 4px;
`;
