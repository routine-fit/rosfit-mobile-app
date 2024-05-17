import { rgba } from 'polished';
import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => rgba(theme.colors.foreground, 0.5)};
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  gap: 10px;
`;

export const FooterContainer = styled.View`
  margin-top: 10px;
`;
