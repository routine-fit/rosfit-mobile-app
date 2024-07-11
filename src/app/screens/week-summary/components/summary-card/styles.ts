import styled from 'styled-components/native';

export const CardContainer = styled.View`
  background-color: ${props => props.theme.colors.primary.palest};
  width: 100%;
  border-radius: 10px;
  border-color: ${props => props.theme.colors.primary.default};
  border-width: 1.5px;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;
