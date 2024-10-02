import { t } from 'i18next';
import * as yup from 'yup';

export type ScheduleRoutineFormData = {
  routineId: string;
  day: string;
};

export const validationSchema = yup.object<ScheduleRoutineFormData>().shape({
  routineId: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.routineId').toLowerCase(),
      }),
    )
    .min(
      2,
      t('inputs:error.nameMinLength', {
        field: t('inputs:label.routineId').toLowerCase(),
        min: 2,
      }),
    ),
  day: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.day').toLowerCase(),
      }),
    )
    .min(
      2,
      t('inputs:error.nameMinLength', {
        field: t('inputs:label.day').toLowerCase(),
        min: 2,
      }),
    ),
});
