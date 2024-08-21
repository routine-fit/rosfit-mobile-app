import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';
import { RoutineBadge } from 'src/app/components/routine-badge';
import { MainDrawerParamList } from 'src/app/navigation/types';
import { DashboardData } from 'src/interfaces/dashboard';
import dashboardDataFile from 'src/mocks/dashboard-data.json';

import ExerciseInfoRow from './components/exercise-info-row';
import PersonalRecordCard from './components/personal-record-card';
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
  const navigation = useNavigation<NavigationProp<MainDrawerParamList>>();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  const fetchDashboardData = (): Promise<DashboardData> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve(dashboardDataFile);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return (
      <ScreenContainer withoutVerticalPadding>
        <Text>Loading...</Text>
      </ScreenContainer>
    );
  }

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
            title={dashboardData.routine.title}
            subtitle={dashboardData.routine.duration}
            onPress={() => {}}
          />

          <Heading
            title={t('screens:dashboard.heading2')}
            flexTitleAlign="center"
            type="h3"
          />
          <SectionContainer>
            <RowContainer>
              {dashboardData.trainingInfo.map(info => (
                <ExerciseInfoRow
                  key={info.value}
                  label={info.label}
                  value={info.value}
                />
              ))}
            </RowContainer>
            <Button
              radius="oval"
              variant="outlined"
              content={t('screens:dashboard.progressButton')}
              size="sm"
              onPress={() => {
                navigation.navigate('WeekSummary');
              }}
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
              {dashboardData.personalRecords.map((record, index) => (
                <PersonalRecordCard
                  key={index}
                  exercise={record.exercise}
                  weight={record.weight}
                />
              ))}
            </FlexWrapView>
          </SectionContainer>
        </Container>
      </ScrollView>
    </ScreenContainer>
  );
};
