import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { localeConfig } from './context';

import zh_CN from './locales/zh_CN';
import en_US from './locales/en_US';

const resources = {
  zh_CN: {
    translation: {
      ...localeConfig.languages['zh_CN'].locale,
      ...zh_CN,
    },
  },
  en_US: {
    translation: {
      ...localeConfig.languages['en_US'].locale,
      ...en_US,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localeConfig.defaultLocale,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
