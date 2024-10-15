import { RouteObject } from 'react-router-dom';
import { BasicLayout } from '@/layouts/BasicLayout';
import { ErrorIndicate } from '@/components/basic/ErrorBoundary';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BasicLayout />,
    errorElement: <ErrorIndicate message="Route Error" />,
    children: [
      {
        path: 'projects',
        async lazy() {
          return { Component: (await import('@/pages/Projects')).default };
        },
        errorElement: <ErrorIndicate message="Route Error" />,
      },
      {
        path: 'projects/:projectId',
        async lazy() {
          return { Component: (await import('@/pages/Project')).default };
        },
        errorElement: <ErrorIndicate message="Route Error" />,
      },
      {
        path: 'login',
        async lazy() {
          return { Component: (await import('@/pages/Login')).default };
        },
        errorElement: <ErrorIndicate message="Route Error" />,
      },
    ],
  },
];

export default routes;
