import { useTheme } from 'styled-components';
import React, { FC } from 'react';

import { Text } from 'src/app/components';
import { ContinueArrowIcon } from 'src/assets/svg/navigation-icons/continue-arrow-icon';

import { RowContainer, StyledTouchableOpacity } from './styles';
import { RoutineBadgeProps } from './types';

export const RoutineBadge: FC<RoutineBadgeProps> = ({
  title,
  duration,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <StyledTouchableOpacity onPress={onPress}>
      <RowContainer>
        <Text>{title}</Text>
        <Text>{duration}</Text>
      </RowContainer>
      <ContinueArrowIcon
        width={20}
        height={18}
        color={theme.colors.primary.default}
      />
    </StyledTouchableOpacity>
  );
};
