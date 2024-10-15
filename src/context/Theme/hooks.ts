import { useContext } from 'react';
import { ThemeContext } from './context';

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
