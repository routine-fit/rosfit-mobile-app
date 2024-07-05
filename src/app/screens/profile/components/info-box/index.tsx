import { useTheme } from 'styled-components';
import React, { FC } from 'react';

import { Text } from 'src/app/components';

import { Container } from './styles';
import { InfoBoxProps } from './types';

export const InfoBox: FC<InfoBoxProps> = ({ value, label }) => {
  const theme = useTheme();
  return (
    <Container>
      <Text fontWeight="semiBold" color={theme.colors.content.strong}>
        {value}
      </Text>
      <Text fontSize="xs" color={theme.colors.content.subtle}>
        {label}
      </Text>
    </Container>
  );
};
