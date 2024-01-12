import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';

interface MenuItemProps {
  icon: JSX.Element;
  label: string;
  onPress: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Box
      flexDirection="row"
      gap={10}
      alignItems="center"
      paddingVertical={17}
      paddingHorizontal={5}
    >
      {icon}
      <Text size="md">{label}</Text>
    </Box>
  </TouchableOpacity>
);
