import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { InternalRouterContext, InternalRouterConfig, defaultRouterConfig } from './context';
import { useSearchParams } from 'react-router-dom';

const InternalRouterContextProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [routerConfig, setRouterConfig] = useState<InternalRouterConfig>(defaultRouterConfig);

  const updateRouterConfig = useCallback((patches: Record<string, string>) => {
    setRouterConfig((state) => {
      const nextState = { ...state };
      for (const [key, value] of Object.entries(patches)) {
        if (typeof value === 'string') nextState[key as keyof InternalRouterConfig] = value;
      }
      return nextState;
    });
  }, []);

  useLayoutEffect(() => {
    setRouterConfig((state) => {
      const nextState = { ...state };
      for (const key of Object.keys(nextState)) {
        if (typeof searchParams.get(key) === 'string') {
          nextState[key as keyof InternalRouterConfig] = searchParams.get(key) as string;
        }
      }
      return nextState;
    });
  }, [searchParams]);

  useEffect(() => {
    setSearchParams((prev) => {
      const nextState = { ...prev };
      for (const key of Object.keys(routerConfig)) {
        if (key && routerConfig[key as keyof InternalRouterConfig]) {
          (nextState as unknown as InternalRouterConfig)[key as keyof InternalRouterConfig] =
            routerConfig[key as keyof InternalRouterConfig];
        }
      }
      return nextState;
    });
  }, [routerConfig]);

  return (
    <InternalRouterContext.Provider value={{ routerConfig, updateRouterConfig }}>
      {children}
    </InternalRouterContext.Provider>
  );
};

export default InternalRouterContextProvider;
