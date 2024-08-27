import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, ScreenContainer, Text } from 'src/app/components';
import { RoutinesParamList } from 'src/app/navigation/types';
import ExerciseList from 'src/app/widgets/exercises-list';

interface Props
  extends StackScreenProps<RoutinesParamList, 'SelectRoutineExercises'> {}

export const SelectRoutineExercises: FC<Props> = ({ navigation }) => {
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
        alignSelf={false}
        content={t('screens:selectRoutineExercises.revision')}
        themeColor="secondary"
      />
    </ScreenContainer>
  );
};
