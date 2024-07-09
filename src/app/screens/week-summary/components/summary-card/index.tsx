import { useTheme } from 'styled-components';
import React from 'react';

import { Text } from 'src/app/components';

import { CardContainer } from './styles';
import { SummaryCardProps } from './types';

export const SummaryCard = ({
  header,
  value,
  description,
}: SummaryCardProps) => {
  const theme = useTheme();
  return (
    <CardContainer>
      <Text>{header}</Text>
      <Text fontSize="4xl" color={theme.colors.primary.default}>
        {value}
      </Text>
      <Text fontSize="sm" textAlign="center">
        {description}
      </Text>
    </CardContainer>
  );
};
