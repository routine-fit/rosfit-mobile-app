import { t } from 'i18next';
import * as yup from 'yup';
import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Exercise, RoutineExerciseFormData } from 'src/interfaces/exercises';

export type FormData = {
  exercises: RoutineExerciseFormData[];
};

export const validationSchema = yup.object().shape({
  exercises: yup.array().of(
    yup.object().shape({
      repetitions: yup
        .string()
        .required(
          t('inputs:error.required', {
            field: t('inputs:label.repetitions').toLowerCase(),
          }),
        )
        .test(
          'is-valid-number',
          t('inputs:error.minValue', {
            field: t('inputs:label.repetitions'),
            min: 1,
          }),
          value => !isNaN(Number(value)) && Number(value) > 1,
        ),
      restTimeSecs: yup
        .string()
        .required(
          t('inputs:error.required', {
            field: t('inputs:label.restTime').toLowerCase(),
          }),
        )
        .test(
          'is-valid-number',
          t('inputs:error.minValue', {
            field: t('inputs:label.restTime'),
            min: 1,
          }),
          value => !isNaN(Number(value)) && Number(value) > 0,
        ),
      series: yup
        .array()
        .of(
          yup.object().shape({
            weight: yup
              .string()
              .required(
                t('inputs:error.required', {
                  field: t('inputs:label.weight').toLowerCase(),
                }),
              )
              .test(
                'is-valid-number',
                t('inputs:error.minValue', {
                  field: t('inputs:label.weight'),
                  min: 1,
                }),
                value => !isNaN(Number(value)) && Number(value) > 0,
              ),
            weightMeasure: yup.string().required(
              t('inputs:error.required', {
                field: t('inputs:label.weightMeasure').toLowerCase(),
              }),
            ),
          }),
        )
        .min(
          1,
          t('inputs:error.minItems', {
            field: t('inputs:label.series'),
            min: 1,
          }),
        ),
    }),
  ),
});

export const createFormConfig = (exercises: Exercise[] = []) => {
  const defaultValues: FormData = {
    exercises: exercises.map(ex => ({
      id: ex.id,
      repetitions: '10',
      restTimeSecs: '30',
      series: [
        {
          weight: '10',
          weightMeasure: 'kg',
        },
      ],
    })),
  };

  return {
    defaultValues,
    resolver: yupResolver(validationSchema) as unknown as Resolver<FormData>,
  };
};
