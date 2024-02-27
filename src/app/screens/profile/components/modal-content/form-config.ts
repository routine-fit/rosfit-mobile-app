import { t } from 'i18next';
import * as yup from 'yup';

export type FormData = {
  weight: string;
  height: string;
};

export const validationSchema = yup.object().shape({
  weight: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:name.weight').toLowerCase(),
    }),
  ),
  height: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:name.height').toLowerCase(),
    }),
  ),
});
