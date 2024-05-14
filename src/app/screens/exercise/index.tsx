import { PlusIcon } from 'lucide-react-native';
import React from 'react';

import { Button, ScreenContainer, Text } from 'src/app/components';
import ExerciseList from 'src/app/widgets/exercises-list';

import { BottomContainer } from './styles';

export const ExerciseScreen = () => {
  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium">
        Ejercicios
      </Text>
      <ExerciseList />
      <BottomContainer>
        <Button
          onPress={() => {}}
          fullWidth={false}
          alignSelf={false}
          content="Nuevo ejercicio"
          trailingIcon={<PlusIcon />}
          themeColor="secondary"
        />
      </BottomContainer>
    </ScreenContainer>
  );
};
