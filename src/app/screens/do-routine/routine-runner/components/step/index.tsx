import { useTheme } from 'styled-components';
import React, { useMemo } from 'react';

import { Text } from 'src/app/components';

import { Dot, Line, StepContainer, StepContent } from './styles';
import { Status, StepProps } from './types';

export const Step: React.FC<StepProps> = ({ title, description, status }) => {
  const theme = useTheme();

  const statusColors = useMemo(
    () => ({
      pending: theme.colors.neutral.default,
      inProgress: theme.colors.secondary.default,
      done: theme.colors.primary.default,
    }),
    [theme],
  );

  const dotColor = statusColors[status as Status];

  return (
    <StepContainer>
      <Dot style={{ backgroundColor: dotColor }} />
      <Line />
      <StepContent>
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="lg">{description}</Text>
      </StepContent>
    </StepContainer>
  );
};
