import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import {
  Button,
  ControlledSelectInput,
  ControlledTextInput,
  ScreenContainer,
  Text,
} from 'src/app/components';
import { muscleGroups } from 'src/constants/muscle-groups';
import { useTranslatedOptions } from 'src/hooks/useTranslatedOptions';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  createExercise,
  getExercises,
} from 'src/store/exercise/exercise.thunks';

import { addExerciseFormConfig, ExerciseFormData } from './form-config';
import { InputContainer } from './styles';
import { AddExerciseScreenProps } from './types';

export const AddExerciseScreen: FC<AddExerciseScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { status } = useAppSelector(state => state.exercise);
  const isLoading = status === 'loading';
  const dispatch = useAppDispatch();

  const muscleGroupsOptions = useTranslatedOptions(
    muscleGroups,
    'common:muscleGroups',
  );

  const { control, handleSubmit } = useForm<ExerciseFormData>(
    addExerciseFormConfig,
  );

  const onValidSubmit: SubmitHandler<ExerciseFormData> = async exercise => {
    try {
      await dispatch(
        createExercise({
          name: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup,
          links: [],
        }),
      );
      await dispatch(getExercises());
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(t('screens:addExercise:error'), error.message);
    }
  };

  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium">
        {t('screens:addExercise:newExercise')}
      </Text>
      <InputContainer>
        <ControlledTextInput
          controller={{
            control,
            name: 'exerciseName',
          }}
          editable={!isLoading}
        />
        <ControlledSelectInput
          controller={{
            control,
            name: 'muscleGroup',
          }}
          options={muscleGroupsOptions}
          editable={!isLoading}
        />
      </InputContainer>
      <Button
        content={t('screens:addExercise:createExercise')}
        onPress={handleSubmit(onValidSubmit)}
      />
    </ScreenContainer>
  );
};
