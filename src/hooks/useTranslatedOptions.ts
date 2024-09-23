import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useTranslatedOptions = (
  values: string[],
  translationKeyPrefix: string,
) => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      values.map(value => ({
        label: t(`${translationKeyPrefix}.${value}`),
        value: value,
      })),
    [values, translationKeyPrefix, t],
  );
};
