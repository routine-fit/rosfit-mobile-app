import React, { FC } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import {
  Button,
  ControlledTextInput,
  Heading,
  ScreenContainer,
} from 'src/app/components';

import { RoutineFormData } from '../form-config';
import { Container } from './styles';
import { AddRoutineProps } from './types';

export const AddRoutineScreen: FC<AddRoutineProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useFormContext<RoutineFormData>();

  const onValidSubmit: SubmitHandler<RoutineFormData> = async _data => {
    try {
      //TODO: dispatch thunks
      navigation.navigate('SelectRoutineExercises');
    } catch (error: any) {
      Alert.alert(t('screens:addRoutine:error'), error.message);
    }
  };

  return (
    <ScreenContainer>
      <Heading
        title={t('screens:addRoutine:heading')}
        flexTitleAlign="center"
      />
      <Container>
        <ControlledTextInput
          controller={{
            control,
            name: 'routineName',
          }}
        />
        <ControlledTextInput
          controller={{
            control,
            name: 'routineType',
          }}
        />
      </Container>
      <Button
        onPress={handleSubmit(onValidSubmit)}
        content={t('screens:addRoutine:selectExercises')}
        themeColor="secondary"
      />
    </ScreenContainer>
  );
};
