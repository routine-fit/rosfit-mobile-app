import { t } from 'i18next';
import * as yup from 'yup';
import { UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Exercise, RoutineExerciseFormData } from 'src/interfaces/exercises';

export type RoutineFormData = {
  routineName: string;
  routineType: string;
  exercises: RoutineExerciseFormData[];
};

export const validationSchema = yup.object<RoutineFormData>().shape({
  routineName: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.routineName').toLowerCase(),
      }),
    )
    .min(
      2,
      t('inputs:error.nameMinLength', {
        field: t('inputs:label.routineName').toLowerCase(),
        min: 2,
      }),
    ),
  routineType: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.routineType').toLowerCase(),
      }),
    )
    .min(
      2,
      t('inputs:error.nameMinLength', {
        field: t('inputs:label.routineType').toLowerCase(),
        min: 2,
      }),
    ),
  exercises: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().optional(),
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
              min: 0,
            }),
            value => !isNaN(Number(value)) && Number(value) > 0,
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
              min: 0,
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
                    min: 0,
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
          .required()
          .min(
            1,
            t('inputs:error.minValue', {
              field: t('inputs:label.series'),
              min: 1,
            }),
          ),
      }),
    )
    .required()
    .min(1),
});

export const createFormConfig = (
  exercises: Exercise[] = [],
): UseFormProps<RoutineFormData> => {
  return {
    defaultValues: {
      routineName: '',
      routineType: '',
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
    },
    resolver: yupResolver(validationSchema),
  };
};
