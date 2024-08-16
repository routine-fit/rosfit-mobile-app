import styled from 'styled-components/native';

export const CardContainer = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.primary.palest};
  border-radius: 10px;
  border-color: ${props => props.theme.colors.primary.default};
  border-width: 1.5px;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  margin-vertical: 8px;
`;
