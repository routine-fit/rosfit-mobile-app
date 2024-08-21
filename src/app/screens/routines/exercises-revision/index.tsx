import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ScreenContainer, Text } from 'src/app/components';
import { AccordionItem } from 'src/app/components/accordion';
import { RoutinesParamList } from 'src/app/navigation/types';

import { createFormConfig, FormData } from './form-config';

const exercises = [
  {
    name: 'benchPress',
    series: 3,
    repetitions: 10,
    restTime: 60,
    variableWeight: false,
  },
  {
    name: 'squat',
    series: 4,
    repetitions: 8,
    restTime: 90,
    variableWeight: true,
  },
];

interface Props
  extends StackScreenProps<RoutinesParamList, 'ExercisesRevision'> {}

export const ExerciseRevision: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const formConfig = createFormConfig(exercises);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { handleSubmit, control, formState } = useForm<FormData>(formConfig);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      //TODO: dispatch thunks
      navigation.navigate('SelectRoutineExercises');
    } catch (error: any) {
      Alert.alert(t('screens:exercisesRevision:error'), error.message);
    }
  };

  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium" textAlign="center">
        Revision de rutina
      </Text>

      <AccordionItem
        title="test"
        body={
          <View>
            <Text> test</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
};
