import React from 'react';

import type { ThemeConfig } from 'antd';

export enum Theme {
  'dark' = 'dark',
  'light' = 'light',
}

export const themesOptions: { label: string; value: Theme }[] = [
  {
    label: 'Light',
    value: Theme.light,
  },
  {
    label: 'Dark',
    value: Theme.dark,
  },
];

export const tailwindTokens: Partial<ThemeConfig['token']> = {
  blue: '#333FB3',
  purple: '#a855f7',
  cyan: '#06b6d4',
  green: '#22c55e',
  pink: '#ec4899',
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#eab308',
  geekblue: '#6366f1', // indigo
  lime: '#84cc16',
  gold: '#f59e0b', // amber
  borderRadius: 6,
  fontFamily:
    'InterVariable, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
};

export const themeTokens: Record<Theme, Partial<ThemeConfig['token']>> = {
  dark: {
    colorPrimary: tailwindTokens.blue,
    colorTextBase: '#d6d6d8',
    colorBgBase: '#22282e',

    // colorText: '#f3f3f3',
    // colorTextSecondary: '',
    // colorTextTertiary: '',
    // colorTextQuaternary: '',
  },
  light: {
    colorPrimary: tailwindTokens.orange,
    colorTextBase: '#344054',
    colorBgBase: '#ffffff',

    // colorText: '#131313',
    // colorTextSecondary: '',
    // colorTextTertiary: '',
    // colorTextQuaternary: '',
  },
};

export interface ThemeContextConfig {
  theme: Theme;
  themesOptions: { label: string; value: Theme }[];
  setTheme: (theme: Theme) => void;
}

export const supportedThemes: Theme[] = [Theme.dark, Theme.light];
export const defaultTheme: Theme = supportedThemes[0];

export const ThemeContext = React.createContext<ThemeContextConfig>({
  theme: defaultTheme,
  themesOptions,
  setTheme: () => null,
});
