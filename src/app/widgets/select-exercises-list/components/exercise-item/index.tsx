import React, { useState } from 'react';
import { View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { Text } from 'src/app/components';

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
        <BouncyCheckbox isChecked={isChecked} onPress={handleCheckboxToggle} />
      </View>
    </ExerciseContainer>
  );
};

export default ExerciseItem;
