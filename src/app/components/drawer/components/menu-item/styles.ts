import styled from 'styled-components/native';

export const MenuItemContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding-vertical: 17px;
  padding-horizontal: 5px;
`;

export const MenuItemLabel = styled.Text`
  font-size: ${({ theme }) => theme.sizes.fontSize.m}px;
`;
