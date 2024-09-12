import React, { FC, useMemo, useState } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  ControlledSelect,
  ControlledTextInput,
  ScreenContainer,
  SharedModal,
  Text,
} from 'src/app/components';
import { muscleGroups } from 'src/constants/muscleGroups';

import { ExerciseFormData, validationSchema } from './form-config';
import { InputContainer } from './styles';
import { AddExerciseScreenProps } from './types';

export const AddExerciseScreen: FC<AddExerciseScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
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
      exerciseName: '',
      muscleGroup: '',
    },
    resolver: yupResolver(validationSchema) as Resolver<ExerciseFormData>,
  });

  const onValidSubmit: SubmitHandler<ExerciseFormData> = async () => {
    try {
      setShowModal(true);
      //TODO: dispatch thunks
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
        />
        <ControlledSelect
          controller={{
            control,
            name: 'muscleGroup',
          }}
          options={muscleGroupsOptions}
        />
      </InputContainer>
      <Button
        content={t('screens:addExercise:createExercise')}
        onPress={handleSubmit(onValidSubmit)}
      />
      <SharedModal
        open={showModal}
        onClose={() => {}}
        title={t('screens:addExercise.createExerciseSuccess')}
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
