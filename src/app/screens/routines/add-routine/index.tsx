import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import {
  Button,
  ControlledTextInput,
  Heading,
  ScreenContainer,
} from 'src/app/components';
import { RoutinesParamList } from 'src/app/navigation/types';

import { formConfig, FormData } from './form-config';

interface Props extends StackScreenProps<RoutinesParamList, 'AddRoutine'> {}

export const AddRoutine: FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<FormData>(formConfig);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onValidSubmit: SubmitHandler<FormData> = async data => {
    try {
      //TODO: dispatch thunks
      navigation.navigate('SelectRoutineExercises');
    } catch (error: any) {
      Alert.alert(t('screens:addRoutine:error'), error.message);
    }
  };

  return (
    <ScreenContainer>
      <Heading title="Crear nueva rutina" flexTitleAlign="center" />
      <View style={styles.container}>
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
      </View>
      <Button
        onPress={handleSubmit(onValidSubmit)}
        content="Seleccionar ejercicios"
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
