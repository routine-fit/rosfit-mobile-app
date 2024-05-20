import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import Text from 'src/app/components/text';

import { MenuItemContainer } from './styles';
import { MenuItemProps } from './types';

export const MenuItem: FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MenuItemContainer>
      {icon}
      <Text fontSize="m">{label}</Text>
    </MenuItemContainer>
  </TouchableOpacity>
);
