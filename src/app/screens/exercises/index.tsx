import { PlusIcon } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ScreenContainer, Text } from 'src/app/components';
import ExerciseList from 'src/app/widgets/exercises-list';

import { BottomContainer } from './styles';

export const ExerciseScreen = () => {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium">
        {t('screens:exercises.heading1')}
      </Text>
      <ExerciseList />
      <BottomContainer>
        <Button
          onPress={() => {}}
          fullWidth={false}
          alignSelf={false}
          content={t('screens:exercises.newExercise')}
          trailingIcon={<PlusIcon />}
          themeColor="secondary"
        />
      </BottomContainer>
    </ScreenContainer>
  );
};
