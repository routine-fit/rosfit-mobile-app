import React, { ReactNode, useEffect } from 'react';
import * as RNLocalize from 'react-native-localize';

import i18n from './i18n';

interface Props {
  children: ReactNode;
}

const LocalizationProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const locale = RNLocalize.getLocales()[0].languageCode;
    i18n.changeLanguage(locale);
  }, []);

  return <>{children}</>;
};

export default LocalizationProvider;
