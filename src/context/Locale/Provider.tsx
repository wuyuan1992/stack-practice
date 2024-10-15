import { ConfigProvider as AntdConfigProvider } from 'antd';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import STORAGE_KEYS from '@/constants/storage';
import { localeConfig, localeOptions, LocaleContext, LocaleKey } from './context';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { useChangeLocale } from './hooks';

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [firstLoaded, setFirstLoaded] = useState(false);

  const [localeKey, setLocaleKey] = useState<LocaleKey>(() => {
    let localeSession = localStorage.getItem(STORAGE_KEYS.LOCALE) as LocaleKey;
    if (!localeSession || !localeConfig.languages[localeSession]) {
      localeSession = localeConfig.defaultLocale;
    }
    return localeSession;
  });
  const changeLocale = useChangeLocale();

  const locale = useMemo(() => {
    const lang = localeConfig.languages[localeKey] ?? localeConfig.languages[localeConfig.defaultLocale];
    return lang.locale;
  }, [localeKey]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOCALE, localeKey);
    document.documentElement.setAttribute('lang', localeKey);
    changeLocale(localeKey as string);

    // avoid lang flicking in first loading
    setFirstLoaded(true);
  }, [localeKey]);

  return (
    <LocaleContext.Provider value={{ locale: localeKey, setLocale: setLocaleKey, localeOptions }}>
      {/* avoid lang flicking in first loading */}
      {firstLoaded && (
        // customize i18n
        <I18nextProvider i18n={i18n}>
          {/* components i18n */}
          <AntdConfigProvider locale={locale}>{children}</AntdConfigProvider>
        </I18nextProvider>
      )}
    </LocaleContext.Provider>
  );
};

export default Provider;
