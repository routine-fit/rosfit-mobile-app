import React from 'react';
import { FlatList } from 'react-native';

import { Step } from '../step';
import { Container } from './styles';
import { StepData } from './types';

interface Props {
  steps: StepData[];
}

export const StepIndicator: React.FC<Props> = ({ steps }) => {
  return (
    <Container>
      <FlatList
        data={steps}
        renderItem={({ item }) => (
          <Step
            title={item.title}
            description={item.description}
            status={item.status}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};
