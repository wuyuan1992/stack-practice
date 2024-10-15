import { useThemeContext } from '@/context/Theme/hooks';
import Select from '@/components/ui/Select';

function ThemeSelect() {
  const { theme, themesOptions, setTheme } = useThemeContext();
  return <Select value={theme} onChange={setTheme} options={themesOptions} />;
}

export default ThemeSelect;
