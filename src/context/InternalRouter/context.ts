import React from 'react';
import { InternalRoute } from '@/constants/routes/internalRoutes';

export type InternalRouterConfig = Record<InternalRoute, string>;

export const defaultRouterConfig = Object.keys(InternalRoute).reduce((acc, key) => {
  const route = InternalRoute[key as keyof typeof InternalRoute];
  acc[route] = '';
  return acc;
}, {} as InternalRouterConfig);

export const InternalRouterContext = React.createContext<{
  routerConfig: InternalRouterConfig;
  updateRouterConfig: (patches: Partial<InternalRouterConfig>) => void;
}>({
  routerConfig: defaultRouterConfig,
  updateRouterConfig: () => null,
});
