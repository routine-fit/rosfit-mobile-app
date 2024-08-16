import React, { FC } from 'react';
import { View } from 'react-native';

import { ScreenContainer, Text } from 'src/app/components';

import { Props } from './types';

export const RoutineResultsScreen: FC<Props> = ({ route }) => {
  const { time } = route.params;
  return (
    <ScreenContainer>
      <View>
        <Text>Rutina finalizada</Text>
        <Text>{time}</Text>
      </View>
    </ScreenContainer>
  );
};
