import { useLocaleContext } from '@/context/Locale/hooks';
import { useThemeContext } from '@/context/Theme/hooks';
import { useStore as useZooStore } from '@/models/zoo';
import Input from '@/components/ui/Input';
import { FC } from 'react';

const Api: FC<{ id: number }> = ({ id }) => {
  const { theme } = useThemeContext();
  const { locale } = useLocaleContext();

  const { bear: bearCount } = useZooStore((state) => state.zoo);

  return (
    <div className="w-[1200px] h-full flex flex-col items-stretch justify-stretch">
      <h4>接口 {id}</h4>
      <div>
        <span>theme: {theme};</span>
        <span>locale: {locale};</span>
        <span>bearCount: {bearCount};</span>
      </div>
      <Input placeholder="type something" />
    </div>
  );
};

export default Api;
