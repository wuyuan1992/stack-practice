import React from 'react';

import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

// for date-picker i18n
import 'dayjs/locale/zh-cn';

export type LocaleKey = 'zh_CN' | 'en_US';

export const localeConfig = {
  defaultLocale: 'zh_CN',
  languages: {
    zh_CN: {
      value: 'zh_CN',
      label: '简体中文',
      locale: zhCN,
    },
    en_US: {
      value: 'en_US',
      label: 'English',
      locale: enUS,
    },
  },
} as const;

export const localeOptions = Object.values(localeConfig.languages).map(({ label, value }) => ({ label, value }));

export interface LocaleConfig {
  locale: LocaleKey;
  localeOptions: { label: string; value: LocaleKey }[];
  setLocale: (locale: LocaleKey) => void;
}

export const LocaleContext = React.createContext<LocaleConfig>({
  locale: localeConfig.defaultLocale,
  localeOptions,
  setLocale: () => null,
});
