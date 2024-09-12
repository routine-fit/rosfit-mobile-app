import styled from 'styled-components/native';

export const Container = styled.View<{
  isCentered?: boolean;
  fullScreen?: boolean;
}>`
  flex: ${({ fullScreen }) => (fullScreen ? 1 : 'none')};
  align-self: ${({ isCentered }) => (isCentered ? 'center' : 'flex-start')};
  justify-content: ${({ isCentered }) =>
    isCentered ? 'center' : 'flex-start'};
`;
