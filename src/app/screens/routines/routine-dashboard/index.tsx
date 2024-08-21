import { CalendarDays, Plus } from 'lucide-react-native';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, Heading, ScreenContainer } from 'src/app/components';
import { RoutineBadge } from 'src/app/components/routine-badge';
import { RoutinesParamList } from 'src/app/navigation/types';

interface Props
  extends StackScreenProps<RoutinesParamList, 'RoutineDashboard'> {}

export const RoutineDashboard: FC<Props> = ({ navigation }) => {
  return (
    <ScreenContainer>
      <View style={styles.sectionContainer}>
        <View>
          <Heading title="Proxima rutina" type="h3" />
          <RoutineBadge title="Piernas" subtitle="Hoy" onPress={() => {}} />
        </View>
        <View>
          <Heading title="Rutinas sin programar" type="h3" />
          <RoutineBadge title="Hombros" onPress={() => {}} />
        </View>
      </View>

      <Button
        variant="outlined"
        content="Agendar rutina"
        trailingIcon={<CalendarDays />}
        onPress={() => {}}
      />
      <Button
        variant="outlined"
        content="Nueva rutina"
        marginTop={10}
        trailingIcon={<Plus />}
        onPress={() => navigation.navigate('AddRoutine')}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginBottom: 10,
    gap: 10,
  },
});
