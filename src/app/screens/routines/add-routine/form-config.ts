import { t } from 'i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type FormData = {
  routineName: string;
  routineType: string;
};

export const validationSchema = yup.object().shape({
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
});

export const formConfig = {
  defaultValues: {
    routineName: '',
    routineType: '',
  },
  resolver: yupResolver(validationSchema),
};
