import React, { FC, useMemo, useState } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  ControlledSelectInput,
  ControlledTextInput,
  ScreenContainer,
  SharedModal,
  Text,
} from 'src/app/components';
import { muscleGroups } from 'src/constants/muscle-groups';

import { ExerciseFormData, validationSchema } from './form-config';
import { InputContainer } from './styles';
import { ExerciseDetailsScreenProps } from './types';

export const ExerciseDetailsScreen: FC<ExerciseDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation();
  const { exercise } = route.params;
  const [isEditable, setisEditable] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const muscleGroupsOptions = useMemo(
    () =>
      muscleGroups.map(muscleGroup => ({
        label: t(`common:muscleGroups.${muscleGroup}`),
        value: muscleGroup,
      })),
    [t],
  );

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
      <InputContainer>
        <ControlledTextInput
          editable={isEditable}
          controller={{
            control,
            name: 'exerciseName',
          }}
        />
        <ControlledSelectInput
          editable={isEditable}
          controller={{
            control,
            name: 'muscleGroup',
          }}
          options={muscleGroupsOptions}
        />
      </InputContainer>
      {isEditable ? (
        <Button
          themeColor="primary"
          content={t('screens:exerciseDetails:updateExercise')}
          onPress={handleSubmit(onValidSubmit)}
        />
      ) : (
        <Button
          themeColor="secondary"
          content={t('screens:exerciseDetails:editExercise')}
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
