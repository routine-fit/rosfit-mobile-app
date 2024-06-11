import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  margin: 20px 0px;
`;

export const SectionContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.fill.section};
  border-radius: 8px;
  padding: 20px 25px;
  margin-bottom: 25px;
`;

export const RowContainer = styled.View`
  gap: 20px;
  margin-bottom: 40px;
`;
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
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
