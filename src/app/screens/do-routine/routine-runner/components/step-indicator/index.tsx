import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { Series } from 'src/interfaces/routine';

import { Step } from '../step';
import { Container } from './styles';

interface Props {
  steps: Series[];
}

export const StepIndicator: React.FC<Props> = ({ steps }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <FlatList
        data={steps}
        renderItem={({ item }) => (
          <Step
            title={t('screens:routineRunner.serie', { serie: item.order })}
            description={t('screens:routineRunner.weight', {
              weight: item.weight,
              measure: item.weightMeasure,
            })}
            status={item.status!}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};
