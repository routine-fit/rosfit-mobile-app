import { useTheme } from 'styled-components/native';
import React from 'react';

import { Text } from 'src/app/components';

import { Card } from './styles';
import { PersonalRecordCardProps } from './types';

const PersonalRecordCard = ({ exercise, weight }: PersonalRecordCardProps) => {
  const theme = useTheme();
  return (
    <Card>
      <Text color={theme.colors.feedback.info.default} fontSize="xs">
        {exercise}
      </Text>
      <Text color={theme.colors.feedback.info.default} fontSize="4xl">
        {weight}
      </Text>
    </Card>
  );
};

export default PersonalRecordCard;
