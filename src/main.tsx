import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Spin from '@/components/ui/Spin';
import routes from '@/constants/routes';
import ThemeContextProvider from '@/context/Theme/Provider';
import LocaleProvider from '@/context/Locale/Provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <ThemeContextProvider>
        <RouterProvider router={createBrowserRouter(routes)} fallbackElement={<Spin />} />
      </ThemeContextProvider>
    </LocaleProvider>
  </StrictMode>,
);
