import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';
import { SummaryCard } from 'src/app/components/summary-card';
import { MainDrawerParamList } from 'src/app/navigation/types';
import { WeekSummaryData } from 'src/interfaces/week-summary';
import weekSummaryDataFile from 'src/mocks/week-summary-data.json';

import { CardsContainer } from './styles';

interface Props extends StackScreenProps<MainDrawerParamList> {}

export const WeekSummaryScreen: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
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
