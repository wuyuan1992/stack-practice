import React, { FC, useEffect, useMemo, useState } from 'react';
import { ConfigProvider as AntdConfigProvider, type ThemeConfig, theme as AntdTheme } from 'antd';
import { ThemeContext, Theme, themeTokens, themesOptions, defaultTheme, tailwindTokens } from './context';
import STORAGE_KEYS from '@/constants/storage';

const ThemeContextProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<ThemeConfig['token']>();

  const [theme, setTheme] = useState<Theme>(() => {
    let themeSession = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
    if (!themeSession || !themeTokens[themeSession as Theme]) {
      themeSession = defaultTheme;
    }
    return themeSession;
  });

  useEffect(() => {
    let themeToImplement = theme as Theme;
    let themeToken = themeTokens[themeToImplement];

    if (!themeToken) {
      themeToImplement = defaultTheme;
      themeToken = themeTokens[themeToImplement];
    }

    localStorage.setItem(STORAGE_KEYS.THEME, themeToImplement);
    document.documentElement.setAttribute('data-theme', themeToImplement);

    setToken(themeToken);
  }, [theme]);

  const algorithm = useMemo(() => {
    const isDark = [Theme.dark].includes(theme as Theme);
    return isDark ? [AntdTheme.darkAlgorithm] : [];
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themesOptions, setTheme }}>
      <AntdConfigProvider
        theme={{
          token: {
            ...tailwindTokens,
            ...token,
          },
          cssVar: { prefix: 'app', key: 'root' },
          hashed: false,
          algorithm,
        }}
      >
        {children}
      </AntdConfigProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
