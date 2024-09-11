import React, { FC, useState } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  ControlledSelect,
  ControlledTextInput,
  ScreenContainer,
  SharedModal,
  Text,
} from 'src/app/components';

import { ExerciseFormData, validationSchema } from './form-config';
import { ExerciseDetailsScreenProps } from './types';

export const ExerciseDetailsScreen: FC<ExerciseDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation();
  const { exercise } = route.params;
  const [isEditable, setisEditable] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<ExerciseFormData>({
    defaultValues: {
      exerciseName: exercise.name,
      muscleGroup: exercise.muscleGroup,
    },
    resolver: yupResolver(validationSchema) as Resolver<ExerciseFormData>,
  });

  const onValidSubmit: SubmitHandler<ExerciseFormData> = async () => {
    try {
      setShowModal(true);
      //TODO: dispatch thunks
    } catch (error: any) {
      Alert.alert(t('screens:exerciseDetails:error'), error.message);
    }
  };

  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium">
        {exercise.name}
      </Text>
      <View style={styles.inputContainer}>
        <ControlledTextInput
          editable={isEditable}
          controller={{
            control,
            name: 'exerciseName',
          }}
        />
        <ControlledSelect
          editable={isEditable}
          controller={{
            control,
            name: 'muscleGroup',
          }}
          // TODO UPDATE SELECT TO HANDLE VALUE
          options={[{ label: 'ABDOMINAL', value: 'ABDOMINAL' }]}
        />
      </View>
      {isEditable ? (
        <Button
          themeColor="primary"
          content="Actualizar ejercicio"
          onPress={handleSubmit(onValidSubmit)}
        />
      ) : (
        <Button
          themeColor="secondary"
          content="Editar ejercicio"
          onPress={() => setisEditable(true)}
        />
      )}
      <SharedModal
        open={showModal}
        onClose={() => {}}
        title={t('screens:exerciseDetails.editExerciseSuccess')}
        body={
          <Button
            variant="outlined"
            content={t('common:button.confirm')}
            onPress={() => {
              navigation.pop();
            }}
          />
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    paddingVertical: 8,
  },
});
