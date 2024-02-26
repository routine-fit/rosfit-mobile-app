import { t } from 'i18next';
import * as yup from 'yup';

export type FormData = {
  trainingType: string;
  trainingTime: string;
  trainingIntensity: string;
  trainingGoals: string;
};

export const validationSchema = yup.object().shape({
  trainingType: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:label.trainingType').toLowerCase(),
    }),
  ),
  trainingTime: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:label.trainingTime').toLowerCase(),
    }),
  ),
  trainingIntensity: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:label.trainingIntensity').toLowerCase(),
    }),
  ),
  trainingGoals: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:label.trainingGoals').toLowerCase(),
    }),
  ),
});
