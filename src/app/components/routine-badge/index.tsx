import { ChevronRight } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React, { FC } from 'react';

import { Text } from 'src/app/components';

import { RowContainer, StyledTouchableOpacity } from './styles';
import { RoutineBadgeProps } from './types';

export const RoutineBadge: FC<RoutineBadgeProps> = ({
  title,
  subtitle,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <StyledTouchableOpacity onPress={onPress}>
      <RowContainer>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </RowContainer>
      <ChevronRight color={theme.colors.primary.default} />
    </StyledTouchableOpacity>
  );
};
