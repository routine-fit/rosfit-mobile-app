import React, { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, ScreenContainer, Text } from 'src/app/components';
import SelectExerciseList from 'src/app/widgets/select-exercises-list';

import { RoutineFormData } from '../form-config';
import { SelectRoutineExercisesProps } from './types';

export const SelectRoutineExercisesScreen: FC<SelectRoutineExercisesProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext<RoutineFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  return (
    <ScreenContainer>
      <Text fontSize="xl" fontWeight="medium" textAlign="center">
        {t('screens:selectRoutineExercises.heading')}
      </Text>
      <SelectExerciseList
        appendExercise={append}
        removeExercise={remove}
        fields={fields}
      />
      <Button
        onPress={() => {
          navigation.navigate('ExercisesRevision');
        }}
        fullWidth={false}
        content={t('screens:selectRoutineExercises.revision')}
        themeColor="secondary"
      />
    </ScreenContainer>
  );
};
