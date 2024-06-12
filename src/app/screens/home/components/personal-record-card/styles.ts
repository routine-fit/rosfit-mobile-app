import styled from 'styled-components/native';

export const Card = styled.View`
  height: 115px;
  width: 132px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
