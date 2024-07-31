import { rgba } from 'polished';
import styled from 'styled-components/native';

export const Overlay = styled.View`
  flex: 1;
  background-color: ${({ theme }) => rgba(theme.colors.foreground, 0.5)};
  justify-content: flex-end;
`;

export const BottomSheetContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  align-items: center;
`;

export const Option = styled.TouchableOpacity`
  padding: 8px;
  align-items: center;
`;
