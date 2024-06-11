import React from 'react';
import { ScrollView } from 'react-native';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';

import { RoutineBadge } from './components/routine-badge';
import {
  CenteredView,
  Container,
  FlexRow,
  Row,
  RowContainer,
  SectionContainer,
} from './styles';

export const HomeScreen = () => {
  return (
    <ScreenContainer withoutVerticalPadding>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <SectionContainer>
            <RowContainer>
              <Row>
                <Text>Frecuencia de entrenamiento</Text>
                <Text>2/3</Text>
              </Row>
              <Row>
                <Text>Duracion de sesiones</Text>
                <Text>90 min</Text>
              </Row>
              <Row>
                <Text>Tipo de ejercicio</Text>
                <Text>Peso</Text>
              </Row>
            </RowContainer>
            <Button
              radius="oval"
              variant="outlined"
              content="Revisa tu progreso"
              size="sm"
              onPress={() => {}}
            />
          </SectionContainer>

          <Heading
            title="Ejercicios populares"
            flexTitleAlign="center"
            type="h3"
          />

          <SectionContainer>
            <FlexRow>
              <Button
                radius="oval"
                variant="outlined"
                content="Semanal"
                fullWidth={false}
                size="sm"
                onPress={() => {}}
              />
              <Button
                radius="oval"
                variant="outlined"
                content="mensual"
                fullWidth={false}
                size="sm"
                onPress={() => {}}
              />
            </FlexRow>
            <CenteredView>
              <Text fontSize="3xl">Chart placeholder</Text>
            </CenteredView>
          </SectionContainer>
          <Heading
            title="Records personales (PR)"
            flexTitleAlign="center"
            type="h3"
          />
          <SectionContainer />
        </Container>
      </ScrollView>
    </ScreenContainer>
  );
};
