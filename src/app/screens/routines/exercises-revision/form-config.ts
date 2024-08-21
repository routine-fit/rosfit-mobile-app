import { t } from 'i18next';
import * as yup from 'yup';
import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { RoutineExercise } from './types';

export type FormData = {
  exercises: RoutineExercise[];
};

export const validationSchema = yup.object().shape({
  exercises: yup.array().of(
    yup.object().shape({
      name: yup.string().required(
        t('inputs:error.required', {
          field: t('inputs:label.exerciseName').toLowerCase(),
        }),
      ),
      series: yup
        .number()
        .required(
          t('inputs:error.required', {
            field: t('inputs:label.series').toLowerCase(),
          }),
        )
        .min(
          1,
          t('inputs:error.minValue', {
            field: t('inputs:label.series'),
            min: 1,
          }),
        ),
      repetitions: yup
        .number()
        .required(
          t('inputs:error.required', {
            field: t('inputs:label.repetitions').toLowerCase(),
          }),
        )
        .min(
          1,
          t('inputs:error.minValue', {
            field: t('inputs:label.repetitions'),
            min: 1,
          }),
        ),
      restTime: yup
        .number()
        .required(
          t('inputs:error.required', {
            field: t('inputs:label.restTime').toLowerCase(),
          }),
        )
        .min(
          0,
          t('inputs:error.minValue', {
            field: t('inputs:label.restTime'),
            min: 0,
          }),
        ),
      variableWeight: yup.boolean().required(
        t('inputs:error.required', {
          field: t('inputs:label.variableWeight').toLowerCase(),
        }),
      ),
    }),
  ),
});

export const createFormConfig = (exercises: RoutineExercise[] = []) => {
  const defaultValues: FormData = {
    exercises,
  };

  return {
    defaultValues,
    resolver: yupResolver(validationSchema) as Resolver<FormData>,
  };
};
