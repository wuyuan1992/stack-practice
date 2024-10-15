import { useCallback, useContext } from 'react';
import { LocaleContext } from './context';
import { useTranslation } from 'react-i18next';

export const useLocaleContext = () => {
  return useContext(LocaleContext);
};

export const useI18n = () => {
  const { t } = useTranslation();
  return useCallback(
    (key: string, values: object = {}, components: { readonly [tagName: string]: React.ReactElement } = {}) => {
      const result = t(key, { values, components, interpolation: { escapeValue: false } });
      return result.toString();
    },
    [],
  );
};

export const useChangeLocale = () => {
  const { i18n } = useTranslation();
  return (lang: string) => i18n.changeLanguage(lang);
};
