import styled from 'styled-components/native';

import { CheckBoxColorTheme } from './types';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const CheckboxContainer = styled.View<{
  size: number;
  checked: boolean;
  fillColor: CheckBoxColorTheme;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 15px;
  border-width: 2px;
  border-color: ${({ theme, fillColor }) => theme.colors[fillColor].default};
  background-color: ${({ theme, checked, fillColor }) =>
    checked ? theme.colors[fillColor].default : theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const CheckMark = styled.View<{ size: number }>`
  width: ${({ size }) => size * 0.3}px;
  height: ${({ size }) => size * 0.3}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
`;

export const Label = styled.Text`
  margin-left: 8px;
  font-size: 16px;
`;
