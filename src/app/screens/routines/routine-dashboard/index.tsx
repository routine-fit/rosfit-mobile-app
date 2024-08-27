import { CalendarDays, Plus } from 'lucide-react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, Heading, ScreenContainer } from 'src/app/components';
import { RoutineBadge } from 'src/app/components/routine-badge';
import { RoutinesParamList } from 'src/app/navigation/types';

import { SectionContainer } from './styles';

interface Props
  extends StackScreenProps<RoutinesParamList, 'RoutineDashboard'> {}

export const RoutineDashboard: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <ScreenContainer>
      <SectionContainer>
        <View>
          <Heading
            title={t('screens:routineDashboard.nextRoutine')}
            type="h3"
          />
          <RoutineBadge title="Piernas" subtitle="Hoy" onPress={() => {}} />
        </View>
        <View>
          <Heading
            title={t('screens:routineDashboard.unscheduledRoutines')}
            type="h3"
          />
          <RoutineBadge title="Hombros" onPress={() => {}} />
        </View>
      </SectionContainer>

      <Button
        variant="outlined"
        content={t('screens:routineDashboard.scheduleRoutine')}
        trailingIcon={<CalendarDays />}
        onPress={() => {}}
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
