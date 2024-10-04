import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  margin: 20px 0px;
`;

export const SectionContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.fill.section};
  border-radius: 8px;
  padding: 20px 15px;
  margin-bottom: 25px;
  gap: 20px;
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

export const RowContainer = styled.View`
  gap: 20px;
  margin-bottom: 15px;
  padding: 0px 10px;
`;

export const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const CenteredView = styled.View`
  height: 250px;
  justify-content: center;
  align-items: center;
`;

export const FlexWrapView = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
`;
