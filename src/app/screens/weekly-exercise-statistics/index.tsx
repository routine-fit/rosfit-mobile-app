import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { Heading, ScreenContainer, Text } from 'src/app/components';
import { SummaryCard } from 'src/app/components/summary-card';
import { WeeklyExerciseStatisticsData } from 'src/interfaces/weekly-exercise-statistics-data';
import weeklyExerciseStatisticData from 'src/mocks/weekly-exercise-statistic-data.json';

import { CardsContainer } from './styles';
import { Props, StatisticsItem } from './types';

export const WeeklyExerciseStatisticsScreen: FC<Props> = ({ route }) => {
  const { t } = useTranslation();
  const [weeklyExerciseStatistics, setWeeklyExerciseStatistics] =
    useState<WeeklyExerciseStatisticsData | null>(null);
  const { exerciseName } = route.params;

  const fetchweeklyExerciseStatistics =
    (): Promise<WeeklyExerciseStatisticsData> => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            resolve(weeklyExerciseStatisticData);
          } catch (error) {
            reject(error);
          }
        }, 1000);
      });
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchweeklyExerciseStatistics();
        setWeeklyExerciseStatistics(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const statisticsData = useMemo<StatisticsItem[]>(() => {
    return Object.keys(weeklyExerciseStatistics ?? {}).map(key => ({
      key,
      header: `screens:weeklyExerciseStatistics.${key}Header`,
      value:
        weeklyExerciseStatistics?.[key as keyof WeeklyExerciseStatisticsData] ??
        '',
      description: `screens:weeklyExerciseStatistics.${key}Description`,
    }));
  }, [weeklyExerciseStatistics]);

  if (!weeklyExerciseStatistics || !statisticsData) {
    return (
      <ScreenContainer withoutVerticalPadding>
        <Text>Loading...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Heading title={exerciseName} flexTitleAlign="center" type="h3" />
      <CardsContainer>
        <FlatList
          data={statisticsData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <SummaryCard
              header={t(item.header)}
              value={item.value}
              description={t(item.description)}
            />
          )}
        />
      </CardsContainer>
    </ScreenContainer>
  );
};
