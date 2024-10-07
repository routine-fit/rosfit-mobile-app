import { CalendarDays, Plus } from 'lucide-react-native';
import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Button, Heading, ScreenContainer, Text } from 'src/app/components';
import { RoutineBadge } from 'src/app/components/routine-badge';
import { weekDays } from 'src/constants/weekdays';
import useFindClosestRoutine from 'src/hooks/useFindClosestRoutine';
import { useUnscheduledRoutines } from 'src/hooks/useUnscheduleRoutines';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  getMyRoutines,
  getMyScheduleRoutines,
} from 'src/store/routine/routine.thunks';

import { NoRoutinesBadge, SectionContainer } from './styles';
import { RoutineDashboardProps } from './types';

export const RoutineDashboardScreen: FC<RoutineDashboardProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { scheduleRoutines, routines } = useAppSelector(state => state.routine);
  const today = useMemo(() => weekDays[new Date().getDay()], []);

  const closestRoutine = useFindClosestRoutine(scheduleRoutines);
  const unscheduledRoutines = useUnscheduledRoutines(
    routines,
    scheduleRoutines,
  );

  useEffect(() => {
    dispatch(getMyRoutines());
    dispatch(getMyScheduleRoutines());
  }, [dispatch]);

  return (
    <ScreenContainer>
      <SectionContainer>
        <View>
          <Heading
            title={t('screens:routineDashboard.nextRoutine')}
            type="h3"
          />
          {closestRoutine ? (
            <RoutineBadge
              title={closestRoutine.routine.name}
              subtitle={
                closestRoutine.day === today
                  ? t('common:today')
                  : t(`common:weekDay.${closestRoutine.day}`)
              }
              onPress={() => {}}
            />
          ) : (
            <NoRoutinesBadge>
              <Text>{t(`screens:routineDashboard.noScheduleRoutines`)}</Text>
            </NoRoutinesBadge>
          )}
        </View>
        <View>
          <Heading
            title={t('screens:routineDashboard.unscheduledRoutines')}
            type="h3"
          />
          {unscheduledRoutines.length ? (
            <RoutineBadge
              title={unscheduledRoutines[0]?.name}
              onPress={() => {}}
            />
          ) : (
            <NoRoutinesBadge>
              <Text>{t(`screens:routineDashboard.noUnscheduleRoutines`)}</Text>
            </NoRoutinesBadge>
          )}
        </View>
      </SectionContainer>

      <Button
        variant="outlined"
        content={t('screens:routineDashboard.scheduleRoutine')}
        trailingIcon={<CalendarDays />}
        onPress={() => navigation.navigate('ScheduleRoutine')}
      />
      <Button
        variant="outlined"
        content={t('screens:routineDashboard.newRoutine')}
        marginTop={10}
        trailingIcon={<Plus />}
        onPress={() => navigation.navigate('AddRoutine')}
      />
    </ScreenContainer>
  );
};
