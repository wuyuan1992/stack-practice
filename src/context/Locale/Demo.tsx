import Trans from '@/context/Locale/Trans';
import LocaleSelect from '@/components/basic/LocaleSelect';
import { useI18n } from '@/context/Locale/hooks';
import { DatePicker } from 'antd';

function LocaleDemo() {
  const i18n = useI18n();

  return (
    <div>
      <div>---------Trans----------</div>
      <LocaleSelect />
      <Trans i18nKey="greet" values={{ username: 'elonwu' }} components={{ slot: <Trans i18nKey="hi" /> }} />
      <div>{i18n('hi')}</div>
      <DatePicker />
      <div>---------Trans----------</div>
    </div>
  );
}

export default LocaleDemo;
