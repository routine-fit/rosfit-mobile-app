import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';

import ExerciseInfoRow from './components/exercise-info-row';
import PersonalRecordCard from './components/personal-record-card';
import { RoutineBadge } from './components/routine-badge';
import {
  CenteredView,
  Container,
  FlexRow,
  FlexWrapView,
  RowContainer,
  SectionContainer,
} from './styles';

export const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <ScreenContainer withoutVerticalPadding>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Heading
            title={t('screens:dashboard.heading1')}
            flexTitleAlign="center"
            type="h3"
          />
          <RoutineBadge
            title="Piernas"
            duration="1 Hr aprox"
            onPress={() => {}}
          />
          <Heading
            title={t('screens:dashboard.heading2')}
            flexTitleAlign="center"
            type="h3"
          />
          <SectionContainer>
            <RowContainer>
              <ExerciseInfoRow
                label={t('screens:dashboard.trainingFrequency')}
                value="2/3"
              />
              <ExerciseInfoRow
                label={t('screens:dashboard.trainingDuration')}
                value="90 min"
              />
              <ExerciseInfoRow
                label={t('screens:dashboard.trainingType')}
                value="Peso"
              />
            </RowContainer>
            <Button
              radius="oval"
              variant="outlined"
              content={t('screens:dashboard.progressButton')}
              size="sm"
              onPress={() => {}}
            />
          </SectionContainer>

          <Heading
            title={t('screens:dashboard.heading3')}
            flexTitleAlign="center"
            type="h3"
          />

          <SectionContainer>
            <FlexRow>
              <Button
                radius="oval"
                variant="outlined"
                content={t('screens:dashboard.weeklyExercisesButton')}
                fullWidth={false}
                size="sm"
                onPress={() => {}}
              />
              <Button
                radius="oval"
                variant="outlined"
                content={t('screens:dashboard.monthlyExercisesButton')}
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
            title={t('screens:dashboard.heading4')}
            flexTitleAlign="center"
            type="h3"
          />
          <SectionContainer>
            <FlexWrapView>
              <PersonalRecordCard exercise="Peso Muerto" weight="50 Kg" />
              <PersonalRecordCard exercise="Remo" weight="45 Kg" />
              <PersonalRecordCard exercise="Cuadriceps" weight="90 Kg" />
              <PersonalRecordCard exercise="Pecho Plano" weight="80 Kg" />
            </FlexWrapView>
          </SectionContainer>
        </Container>
      </ScrollView>
    </ScreenContainer>
  );
};
