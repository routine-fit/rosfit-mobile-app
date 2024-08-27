import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Switch } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import {
  Button,
  ControlledTextInput,
  Heading,
  ScreenContainer,
  SharedModal,
  Text,
} from 'src/app/components';
import { AccordionItem } from 'src/app/components/accordion';
import { RoutinesParamList } from 'src/app/navigation/types';
import { RoutineExercise } from 'src/interfaces/exercises';
import routineExercises from 'src/mocks/routine-exercises.json';

import { createFormConfig, FormData } from './form-config';
import { ExerciseContainer, SwitchContainer } from './styles';

interface Props extends StackScreenProps<RoutinesParamList, 'AddRoutine'> {}

export const ExerciseRevision: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);

  const formConfig = createFormConfig(routineExercises);
  const { control, handleSubmit } = useForm<FormData>(formConfig);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      // TODO: dispatch thunks
      setShowModal(true);
    } catch (error: any) {
      Alert.alert(t('screens:addRoutine:error'), error.message);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: RoutineExercise;
    index: number;
  }) => (
    <AccordionItem
      title={item.name}
      body={
        <ExerciseContainer>
          <ControlledTextInput
            label="Series"
            controller={{
              control,
              name: `exercises.${index}.series`,
            }}
            placeholder=""
            keyboardType="numeric"
          />
          <ControlledTextInput
            label="Repeticiones"
            controller={{
              control,
              name: `exercises.${index}.repetitions`,
            }}
            placeholder=""
            keyboardType="numeric"
          />
          <ControlledTextInput
            label="Tiempo de descanso"
            controller={{
              control,
              name: `exercises.${index}.restTime`,
            }}
            placeholder=""
            keyboardType="numeric"
          />
          <Controller
            control={control}
            name={`exercises.${index}.variableWeight`}
            render={({ field: { onChange, value } }) => (
              <SwitchContainer>
                <Text fontSize="xs" fontWeight="bold">
                  Peso Variable
                </Text>
                <Switch onValueChange={onChange} value={value} />
              </SwitchContainer>
            )}
          />
        </ExerciseContainer>
      }
    />
  );

  return (
    <ScreenContainer>
      <Heading
        title={t('screens:exercisesRevision.heading')}
        type="h3"
        flexTitleAlign="center"
      />
      <FlatList
        data={routineExercises}
        renderItem={renderItem}
        keyExtractor={item => item.name.toString()}
        showsVerticalScrollIndicator={false}
      />
      <Button
        onPress={handleSubmit(onValidSubmit)}
        content={t('screens:exercisesRevision.createRoutine')}
        themeColor="secondary"
        marginTop={10}
      />
      <SharedModal
        open={showModal}
        onClose={() => {}}
        title={t('screens:exercisesRevision.successMessage')}
        body={
          <>
            {/* TODO: ADD LOTTIE? */}
            <Button
              variant="outlined"
              content={t('common:button.confirm')}
              onPress={() => {
                navigation.navigate('RoutineDashboard');
              }}
            />
          </>
        }
      />
    </ScreenContainer>
  );
};
