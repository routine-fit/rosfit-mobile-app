import React from 'react';

import { Text } from 'src/app/components';

import { Row } from './styles';
import { ExerciseInfoRowProps } from './types';

const ExerciseInfoRow = ({ label, value }: ExerciseInfoRowProps) => {
  return (
    <Row>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </Row>
  );
};

export default ExerciseInfoRow;
