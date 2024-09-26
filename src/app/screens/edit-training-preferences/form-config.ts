import { t } from 'i18next';
import * as yup from 'yup';

export type FormData = {
  id: string;
  type: string;
  time: number;
  intensity: string;
};

export const validationSchema = yup.object().shape({
  id: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:name.trainingPreference').toLowerCase(),
    }),
  ),
  type: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:name.trainingType').toLowerCase(),
    }),
  ),
  time: yup.number().required(
    t('inputs:error.required', {
      field: t('inputs:name.trainingTime').toLowerCase(),
    }),
  ),
  intensity: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:name.trainingIntensity').toLowerCase(),
    }),
  ),
});
