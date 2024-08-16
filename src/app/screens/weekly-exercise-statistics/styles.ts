import styled from 'styled-components/native';

export const CardsContainer = styled.View`
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.fill.section};
  padding: 15px;
  margin-bottom: 30px;
  border-radius: 10px;
`;
