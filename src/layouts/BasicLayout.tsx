import { Outlet } from 'react-router-dom';
import ThemeDemo from '@/context/Theme/ThemeDemo';
import FlipDemo from '@/components/biz/Flip/Demo';
import LocaleDemo from '@/context/Locale/Demo';
import FormItemDemo from '@/components/basic/FormItem/Demo';
import RouterDemo from '@/context/InternalRouter/Demo';
// import ModelDemo from '@/models/Demo';

export function BasicLayout() {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col gap-4">
      <div className="p-4">
        <ThemeDemo />
        <LocaleDemo />
        <RouterDemo />
        <FlipDemo />
        <FormItemDemo />
        {/* 
          <ModelDemo />
          */}
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
