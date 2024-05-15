import { ChevronRight } from 'lucide-react-native';
import { useTheme } from 'styled-components';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Text } from 'src/app/components';
import { MuscleGroup } from 'src/interfaces/exercises';

import { ExerciseContainer, TextWrapper } from './styles';
import { ExerciseItemProps } from './types';

const ExerciseItem = ({ item }: ExerciseItemProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const muscleGroupTranslated = t<
    'common:muscleGroups',
    { returnObjects: true },
    Record<MuscleGroup, string>
  >('common:muscleGroups', {
    returnObjects: true,
  })[item.muscleGroup];

  return (
    <ExerciseContainer>
      <TextWrapper>
        <Text>{item.name}</Text>
        <Text fontSize="xs" fontWeight="light">
          {muscleGroupTranslated}
        </Text>
      </TextWrapper>
      <ChevronRight color={theme.colors.primary.default} />
    </ExerciseContainer>
  );
};

export default ExerciseItem;
