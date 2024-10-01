import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ScreenContainer, Text } from 'src/app/components';
import ExerciseList from 'src/app/widgets/exercises-list';

import { SelectRoutineExercisesProps } from './types';

export const SelectRoutineExercises: FC<SelectRoutineExercisesProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium" textAlign="center">
        {t('screens:selectRoutineExercises.heading')}
      </Text>
      <ExerciseList />
      <Button
        onPress={() => {
          navigation.navigate('ExercisesRevision');
        }}
        fullWidth={false}
        content={t('screens:selectRoutineExercises.revision')}
        themeColor="secondary"
      />
    </ScreenContainer>
  );
};
