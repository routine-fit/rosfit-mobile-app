import React from 'react';
import { FlatList } from 'react-native';

import { Series } from 'src/interfaces/routine';

import { Step } from '../step';
import { Container } from './styles';

interface Props {
  steps: Series[];
}

export const StepIndicator: React.FC<Props> = ({ steps }) => {
  return (
    <Container>
      <FlatList
        data={steps}
        renderItem={({ item }) => (
          <Step
            //serie 1
            title={`serie ${item.order}`}
            // peso 30kg
            description={`peso: ${item.weight}${item.weightMeasure}`}
            // pendiente
            status={item.status!}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};
