import React, { FC } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, ScreenContainer, Text } from 'src/app/components';
import { RoutinesParamList } from 'src/app/navigation/types';
import ExerciseList from 'src/app/widgets/exercises-list';

interface Props
  extends StackScreenProps<RoutinesParamList, 'SelectRoutineExercises'> {}

export const SelectRoutineExercises: FC<Props> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium" textAlign="center">
        Selecciona tus ejercicios
      </Text>
      <ExerciseList />
      <Button
        onPress={() => {
          navigation.navigate('ExercisesRevision');
        }}
        fullWidth={false}
        alignSelf={false}
        content="Revision"
        themeColor="secondary"
      />
    </ScreenContainer>
  );
};
