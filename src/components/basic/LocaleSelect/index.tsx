import { useLocaleContext } from '@/context/Locale/hooks';
import Select from '@/components/ui/Select';

function LocaleSelect() {
  const { locale, setLocale, localeOptions } = useLocaleContext();

  return <Select value={locale} onChange={setLocale} options={localeOptions} />;
}

export default LocaleSelect;
