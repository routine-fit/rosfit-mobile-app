import styled from 'styled-components/native';

export const SectionContainer = styled.View`
  flex: 1;
  margin-bottom: 10px;
  gap: 10px;
`;

export const NoRoutinesBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.fill.section};
  border-radius: 8px;
  padding-horizontal: 24px;
  padding-vertical: 18px;
  align-items: center;
  gap: 15px;
  margin-bottom: 14px;
`;
