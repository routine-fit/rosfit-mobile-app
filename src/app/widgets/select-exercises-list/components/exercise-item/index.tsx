import React, { useState } from 'react';
import { View } from 'react-native';

import { Text } from 'src/app/components';
import { Checkbox } from 'src/app/components/checkbox';

import { ExerciseContainer, TextWrapper } from './styles';
import { ExerciseItemProps } from './types';

const ExerciseItem = ({ item, handleExercisePress }: ExerciseItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
    handleExercisePress(!isChecked);
  };

  return (
    <ExerciseContainer onPress={handleCheckboxToggle}>
      <TextWrapper>
        <Text>{item.name}</Text>
      </TextWrapper>
      <View>
        <Checkbox
          fillColor="secondary"
          isChecked={isChecked}
          onPress={handleCheckboxToggle}
        />
      </View>
    </ExerciseContainer>
  );
};

export default ExerciseItem;
