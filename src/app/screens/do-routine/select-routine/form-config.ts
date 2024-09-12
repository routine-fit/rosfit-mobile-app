import { t } from 'i18next';
import * as yup from 'yup';

export type FormData = {
  routine: string;
};

export const validationSchema = yup.object().shape({
  routine: yup.string().required(
    t('inputs:error.required', {
      field: t('inputs:label.routine').toLowerCase(),
    }),
  ),
});
