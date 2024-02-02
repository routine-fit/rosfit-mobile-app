import { t } from 'i18next';
import * as yup from 'yup';

export type FormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
};

const genderRegex = new RegExp(
  `^(${t('common:gender.male')}|${t('common:gender.female')})$`,
  'i',
);

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.firstName').toLowerCase(),
      }),
    )
    .min(
      2,
      t('inputs:error.nameMinLength', {
        field: t('inputs:label.firstName').toLowerCase(),
        min: 2,
      }),
    ),
  lastName: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.lastName').toLowerCase(),
      }),
    )
    .min(
      2,
      t('inputs:error.nameMinLength', {
        field: t('inputs:label.lastName').toLowerCase(),
        min: 2,
      }),
    ),
  // TODO: define birthdate validations after implementing date picket and date format
  birthDate: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:label.birthDate').toLowerCase(),
    }),
  ),
  gender: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.gender').toLowerCase(),
      }),
    )
    .matches(
      genderRegex,
      t('inputs:error.genderValue', {
        male: t('common:gender.male').toLowerCase(),
        female: t('common:gender.female').toLowerCase(),
      }),
    ),
});
