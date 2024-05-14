import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { MenuItemContainer, MenuItemLabel } from './styles';
import { MenuItemProps } from './types';

export const MenuItem: FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MenuItemContainer>
      {icon}
      <MenuItemLabel>{label}</MenuItemLabel>
    </MenuItemContainer>
  </TouchableOpacity>
);
