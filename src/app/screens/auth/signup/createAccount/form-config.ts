import { t } from 'i18next';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.email').toLowerCase(),
      }),
    )
    .email(t('inputs:error.emailFormat')),

  password: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.password').toLowerCase(),
      }),
    )
    .min(
      6,
      t('inputs:error.passwordMinLength', {
        field: t('inputs:label.password').toLowerCase(),
        min: 6,
      }),
    ),

  repeatPassword: yup
    .string()
    .required(
      t('inputs:error.required', {
        field: t('inputs:label.repeatPassword').toLowerCase(),
      }),
    )
    .oneOf([yup.ref('password')], t('inputs:error.passwordMatch')),
});
