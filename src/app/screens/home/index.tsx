import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';
import { CustomActivityIndicator } from 'src/app/components/activity-indicator';
import { RoutineBadge } from 'src/app/components/routine-badge';
import { MainDrawerParamList } from 'src/app/navigation/types';
import { weekDays } from 'src/constants/weekdays';
import { DashboardData } from 'src/interfaces/dashboard';
import dashboardDataFile from 'src/mocks/dashboard-data.json';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getMyInformation } from 'src/store/profile/profile.thunks';
import { getMyScheduleRoutines } from 'src/store/routine/routine.thunks';

import ExerciseInfoRow from './components/exercise-info-row';
import PersonalRecordCard from './components/personal-record-card';
import {
  CenteredView,
  Container,
  FlexRow,
  FlexWrapView,
  NoRoutinesBadge,
  RowContainer,
  SectionContainer,
} from './styles';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainDrawerParamList>>();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const { scheduleRoutines } = useAppSelector(state => state.routine);
  const dispatch = useAppDispatch();

  const fetchDashboardData = (): Promise<DashboardData> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          resolve(dashboardDataFile);
        } catch (error) {
          reject(error);
        }
      }, 2000);
    });
  };

  const today = useMemo(() => weekDays[new Date().getDay()], []);

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
    dispatch(getMyInformation());
    dispatch(getMyScheduleRoutines(today));
  }, [dispatch, today]);

  if (!dashboardData) {
    return (
      <ScreenContainer withoutVerticalPadding>
        <CustomActivityIndicator
          width={150}
          height={150}
          isCentered
          fullScreen
        />
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
          {scheduleRoutines.length ? (
            <RoutineBadge
              title={scheduleRoutines[0]?.routine.name}
              onPress={() => {}}
            />
          ) : (
            <NoRoutinesBadge>
              <Text>
                {t(`screens:dashboard.noScheduleRoutines`, {
                  today: t(`common:weekDay.${today}`),
                })}
              </Text>
            </NoRoutinesBadge>
          )}

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
