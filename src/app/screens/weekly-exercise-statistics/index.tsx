import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { Heading, ScreenContainer, Text } from 'src/app/components';
import { SummaryCard } from 'src/app/components/summary-card';
import { MainDrawerParamList } from 'src/app/navigation/types';
import { WeeklyExerciseStatisticsData } from 'src/interfaces/weekly-exercise-statistics-data';
import weeklyExerciseStatisticData from 'src/mocks/weekly-exercise-statistic-data.json';

import { CardsContainer } from './styles';

type Props = DrawerScreenProps<MainDrawerParamList, 'WeeklyExerciseStatistics'>;

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

  if (!weeklyExerciseStatistics) {
    return (
      <ScreenContainer withoutVerticalPadding>
        <Text>Loading...</Text>
      </ScreenContainer>
    );
  }

  const statisticsData = Object.keys(weeklyExerciseStatistics).map(key => ({
    key,
    header: `screens:weeklyExerciseStatistics.${key}Header`,
    value: weeklyExerciseStatistics[key as keyof WeeklyExerciseStatisticsData],
    description: `screens:weeklyExerciseStatistics.${key}Description`,
  }));

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
