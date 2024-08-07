import React from 'react';
import { FlatList } from 'react-native';

import { Step } from '../step';
import { Container } from './styles';
import { StepData } from './types';

// const steps = [
//   { id: '1', title: 'Serie 1', description: 'Peso: 50 Kg', status: 'done' },
//   {
//     id: '2',
//     title: 'Serie 2',
//     description: 'Peso: 60 Kg',
//     status: 'inProgress',
//   },
//   {
//     id: '3',
//     title: 'Serie 3',
//     description: 'Peso: 70 Kg',
//     status: 'pending',
//   },
//   {
//     id: '4',
//     title: 'Serie 4',
//     description: 'Peso: 70 Kg',
//     status: 'pending',
//   },
//   {
//     id: '5',
//     title: 'Serie 5',
//     description: 'Peso: 70 Kg',
//     status: 'pending',
//   },
//   {
//     id: '6',
//     title: 'Serie 6',
//     description: 'Peso: 70 Kg',
//     status: 'pending',
//   },
// ];

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
