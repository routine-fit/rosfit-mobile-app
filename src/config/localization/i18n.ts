import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import es from '../../translation/es';

const resources = {
  es,
};

i18n.use({ ...initReactI18next, transEmptyNodeValue: '' }).init({
  compatibilityJSON: 'v3',
  resources,
  lng: RNLocalize.getLocales()[0].languageCode,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
