import { ChevronRight } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React from 'react';

import { Text } from 'src/app/components';

import { ExerciseContainer, TextWrapper } from './styles';
import { ExerciseItemProps } from './types';

const ExerciseItem = ({ item }: ExerciseItemProps) => {
  const theme = useTheme();

  return (
    <ExerciseContainer>
      <TextWrapper>
        <Text>{item.name}</Text>
        <Text fontSize="xs" fontWeight="light">
          {item.muscleGroup}
        </Text>
      </TextWrapper>
      <ChevronRight color={theme.colors.primary.default} />
    </ExerciseContainer>
  );
};

export default ExerciseItem;
