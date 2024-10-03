import { t } from 'i18next';
import * as yup from 'yup';
import { UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { muscleGroups } from 'src/constants/muscle-groups';
import { MuscleGroup } from 'src/interfaces/exercises';

export type ExerciseFormData = {
  exerciseName: string;
  muscleGroup: MuscleGroup;
};

export const validationSchema = yup.object<ExerciseFormData>().shape({
  exerciseName: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.exerciseName').toLowerCase(),
      }),
    )
    .min(
      2,
      t('inputs:error.nameMinLength', {
        field: t('inputs:label.exerciseName').toLowerCase(),
        min: 2,
      }),
    ),
  muscleGroup: yup
    .string()
    .oneOf(
      muscleGroups,
      t('inputs:error.invalidMuscleGroup', {
        field: t('inputs:label.muscleGroup').toLowerCase(),
      }),
    )
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.muscleGroup').toLowerCase(),
      }),
    ),
});

export const formExerciseFormConfig: UseFormProps<ExerciseFormData> = {
  defaultValues: {
    exerciseName: '',
    muscleGroup: '' as MuscleGroup,
  },
  resolver: yupResolver(validationSchema),
};
