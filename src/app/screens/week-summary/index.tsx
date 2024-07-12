import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';
import { MainDrawerParamList } from 'src/app/navigation/types';
import { WeekSummaryData } from 'src/interfaces/week-summary';
import weekSummaryDataFile from 'src/mocks/week-summary-data.json';

import { SummaryCard } from '../../components/summary-card';
import { CardsContainer } from './styles';

export const WeekSummaryScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainDrawerParamList>>();
  const [weekSummaryData, setWeekSummaryData] =
    useState<WeekSummaryData | null>(null);

  const fetchweekSummaryData = (): Promise<WeekSummaryData> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve(weekSummaryDataFile);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchweekSummaryData();
        setWeekSummaryData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!weekSummaryData) {
    return (
      <ScreenContainer withoutVerticalPadding>
        <Text>Loading...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading
          title={t('screens:weekSummary.heading1')}
          flexTitleAlign="center"
          type="h3"
        />
        <CardsContainer>
          <SummaryCard
            header={t('screens:weekSummary.trainingFrequencyHeader')}
            value={weekSummaryData.trainingFrequency}
            description={t('screens:weekSummary.trainingFrequencyDescription')}
          />
          <SummaryCard
            header={t('screens:weekSummary.trainingDurationHeader')}
            value={weekSummaryData.trainingDuration}
            description={t('screens:weekSummary.trainingDurationDescription')}
          />
          <SummaryCard
            header={t('screens:weekSummary.trainingVolumeHeader')}
            value={weekSummaryData.trainingVolume}
            description={t('screens:weekSummary.trainingVolumeDescription')}
          />
          <SummaryCard
            header={t('screens:weekSummary.weightProgressionHeader')}
            value={weekSummaryData.weightProgression}
            description={t('screens:weekSummary.weightProgressionDescription')}
          />
        </CardsContainer>
        <Button
          onPress={() => navigation.navigate('WeeklyExercises')}
          content={t('screens:weekSummary.exercisesBtn')}
        />
      </ScrollView>
    </ScreenContainer>
  );
};
