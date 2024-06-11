import React from 'react';

import { Heading, ScreenContainer } from 'src/app/components';

import { RoutineBadge } from './components/routine-badge';
import { Container } from './styles';

export const HomeScreen = () => {
  return (
    <ScreenContainer>
      <Container>
        <Heading title="Rutina de hoy" flexTitleAlign="center" type="h3" />
        <RoutineBadge
          title="Piernas"
          duration="1 Hr aprox"
          onPress={() => {}}
        />
        <Heading
          title="Resumen de la semana"
          flexTitleAlign="center"
          type="h3"
        />
      </Container>
    </ScreenContainer>
  );
};
