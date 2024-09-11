import React from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  ControlledSelect,
  ControlledTextInput,
  ScreenContainer,
  Text,
} from 'src/app/components';

import { ExerciseFormData, validationSchema } from './form-config';

export const AddExerciseScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<ExerciseFormData>({
    defaultValues: {
      exerciseName: '',
      muscleGroup: '',
    },
    resolver: yupResolver(validationSchema) as Resolver<ExerciseFormData>,
  });

  const onValidSubmit: SubmitHandler<ExerciseFormData> = async data => {
    try {
      console.log(data);
      //TODO: dispatch thunks
    } catch (error: any) {
      Alert.alert(t('screens:createExercise:error'), error.message);
    }
  };

  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium">
        Nuevo Ejercicio
      </Text>
      <View style={styles.inputContainer}>
        <ControlledTextInput
          controller={{
            control,
            name: 'exerciseName',
          }}
        />
        <ControlledSelect
          controller={{
            control,
            name: 'muscleGroup',
          }}
          options={[{ label: 'ABDOMINAL', value: 'ABDOMINAL' }]}
        />
      </View>
      <Button content="Crear ejercicio" onPress={handleSubmit(onValidSubmit)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    paddingVertical: 8,
  },
});
