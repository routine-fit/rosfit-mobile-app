import styled from 'styled-components/native';

export const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.fill.section};
  border-radius: 8px;
  flex-direction: row;
  padding-horizontal: 24px;
  padding-vertical: 18px;
  align-items: center;
  gap: 15px;
  margin-bottom: 14px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;
