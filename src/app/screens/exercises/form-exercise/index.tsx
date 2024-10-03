import { Edit2Icon, Trash2Icon } from 'lucide-react-native';
import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import {
  Button,
  ControlledSelectInput,
  ControlledTextInput,
  ScreenContainer,
  SharedModal,
  Text,
} from 'src/app/components';
import { muscleGroups } from 'src/constants/muscle-groups';
import { useTranslatedOptions } from 'src/hooks/useTranslatedOptions';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  createExercise,
  editExercise,
  getExerciseById,
  getExercises,
} from 'src/store/exercise/exercise.thunks';

import { ExerciseFormData, formExerciseFormConfig } from './form-config';
import { ButtonsContainer, InputContainer } from './styles';
import { FormExerciseScreenProps } from './types';

export const FormExerciseScreen: FC<FormExerciseScreenProps> = ({
  navigation,
  route,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const { status, exercise } = useAppSelector(state => state.exercise);
  const isLoading = status === 'loading';
  const dispatch = useAppDispatch();

  const muscleGroupsOptions = useTranslatedOptions(
    muscleGroups,
    'common:muscleGroups',
  );

  const { control, handleSubmit, reset, formState } = useForm<ExerciseFormData>(
    formExerciseFormConfig,
  );

  useEffect(() => {
    if (route.params?.id) {
      dispatch(getExerciseById(route.params?.id));
    }
  }, [dispatch, route.params?.id]);

  useEffect(() => {
    if (exercise.id) {
      reset(
        {
          exerciseName: exercise.name,
          muscleGroup: exercise.muscleGroup,
        },
        { keepValues: false, keepDirty: false, keepDefaultValues: false },
      );
    }
  }, [dispatch, exercise.id, exercise.muscleGroup, exercise.name, reset]);

  const onValidSubmit: SubmitHandler<ExerciseFormData> = async data => {
    try {
      if (route.params?.id) {
        await dispatch(
          editExercise({
            id: route.params?.id,
            name: data.exerciseName,
            muscleGroup: data.muscleGroup,
            links: [],
          }),
        );
      } else {
        await dispatch(
          createExercise({
            name: data.exerciseName,
            muscleGroup: data.muscleGroup,
            links: [],
          }),
        );
      }
      await dispatch(getExercises());
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(t('screens:addExercise:error'), error.message);
    }
  };

  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium">
        {t(
          route.params?.id
            ? 'screens:formExercise:exerciseDetails'
            : 'screens:formExercise:newExercise',
        )}
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
      <ButtonsContainer>
        {route.params?.id && (
          <Button
            content={t('screens:formExercise:deleteExercise')}
            themeColor="error"
            trailingIcon={<Trash2Icon width={16} height={16} />}
            fullWidth={false}
            onPress={() => {
              setShowModal(true);
            }}
          />
        )}
        <Button
          content={t(
            route.params?.id
              ? 'screens:formExercise:editExercise'
              : 'screens:formExercise:createExercise',
          )}
          fullWidth={!route.params?.id}
          disabled={!formState.isDirty}
          onPress={handleSubmit(onValidSubmit)}
          trailingIcon={
            route.params?.id ? <Edit2Icon width={16} height={16} /> : undefined
          }
        />
      </ButtonsContainer>
      <SharedModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title={t('screens:formExercise.deleteModalExercise')}
        body={
          <Button
            variant="outlined"
            content={t('common:button.confirm')}
            onPress={() => {}}
          />
        }
      />
    </ScreenContainer>
  );
};
