import { t } from 'i18next';
import * as yup from 'yup';

import { MuscleGroup } from 'src/interfaces/exercises';

export type ExerciseFormData = {
  exerciseName: string;
  muscleGroup: MuscleGroup | '';
  links?: string;
};

const muscleGroupValues: MuscleGroup[] = [
  'ABDOMINAL',
  'BICEPS',
  'DELTOID',
  'ERECTOR_SPINAE',
  'LATISSIMUS_DORSI',
  'PECTORAL',
  'TRAPEZIUS',
  'TRICEPS',
];

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
      muscleGroupValues,
      t('inputs:error.invalidMuscleGroup', {
        field: t('inputs:label.muscleGroup').toLowerCase(),
      }),
    )
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.muscleGroup').toLowerCase(),
      }),
    )
    .min(
      2,
      t('inputs:error.nameMinLength', {
        field: t('inputs:label.muscleGroup').toLowerCase(),
        min: 2,
      }),
    ),
  links: yup.string().url(t('inputs:error.invalidUrl')).optional(),
});
