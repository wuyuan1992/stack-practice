import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InternalRouterConfig, InternalRouterContext } from './context';
import { InternalRoute, MainTabMap } from '@/constants/routes/internalRoutes';

export const useInternalRouter = (key: keyof InternalRouterConfig) => {
  const { routerConfig, updateRouterConfig } = useContext(InternalRouterContext);
  return {
    tab: routerConfig[key],
    updateTab: (tab: string) => updateRouterConfig({ [key]: tab }),
  };
};

export function useNavigateToInternal() {
  const navigate = useNavigate();
  const { updateRouterConfig } = useContext(InternalRouterContext);

  return (params: Partial<Record<keyof InternalRouterConfig, string>>, projectId?: number) => {
    if (!projectId) {
      updateRouterConfig(params);
      return;
    }

    navigate({
      pathname: `/projects/${projectId}`,
      search: new URLSearchParams(params).toString(),
    });
  };
}

export const useMainTab = () => {
  return useInternalRouter(InternalRoute.MAIN_TAB);
};

export const useApiTab = () => {
  return useInternalRouter(InternalRoute.API_TAB);
};

export const useTestTab = () => {
  return useInternalRouter(InternalRoute.TEST_TAB);
};

export function useNavigateToApi() {
  const navigateToInternal = useNavigateToInternal();
  return useCallback((id: number, projectId?: number) => {
    navigateToInternal(
      { [InternalRoute.MAIN_TAB]: MainTabMap[InternalRoute.API_TAB].key, [InternalRoute.API_TAB]: String(id) },
      projectId,
    );
  }, []);
}

export function useNavigateToTest() {
  const navigateToInternal = useNavigateToInternal();
  return (id: number, projectId?: number) => {
    navigateToInternal(
      { [InternalRoute.MAIN_TAB]: MainTabMap[InternalRoute.TEST_TAB].key, [InternalRoute.TEST_TAB]: String(id) },
      projectId,
    );
  };
}
