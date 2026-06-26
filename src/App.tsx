import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import ThemeController from './components/ThemeController';
import Loading from './components/Loading';
import { useStore } from './store/useStore';
import { useShallow } from 'zustand/react/shallow';
import { navRoutes, type RouteConfig } from '@/lib/routes';
import { NotFoundPage } from '@/lib/route-components';
import { Toaster } from '@/components/ui/sonner';
import { APP_CONFIG } from '@/config/app';
import { AUTH_UNAUTHORIZED_EVENT, ACCESS_TOKEN_STORAGE_KEY } from '@/auth/session';
import { ROUTER_CONFIG } from '@/config/router';
import { ROUTE_PATHS } from '@/config/paths';
import AppErrorBoundary from '@/components/AppErrorBoundary';
import { PublicOnlyRoute } from '@/components/PublicOnlyRoute';
import './i18n';

const Layout = React.lazy(() => import('./components/Layout'));
const LoginPage = React.lazy(() => import('./pages/Login'));
const HostDetailPage = React.lazy(() => import('./pages/HostDetail'));

function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={ROUTER_CONFIG.loginPath} replace />;
  }
  return <>{children}</>;
}

const renderRoutes = (routes: RouteConfig[]): React.ReactNode[] => {
  return routes.flatMap((route) => {
    const elements: React.ReactNode[] = [];

    if (route.component) {
      const Component = route.component;
      elements.push(
        <Route
          key={route.path}
          path={route.path}
          element={
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          }
        />
      );
    }

    if (route.children) {
      elements.push(...renderRoutes(route.children));
    }

    return elements;
  });
};

export default function App() {
  const { syncAuthFromStorage, handleUnauthorized } = useStore(
    useShallow((state) => ({
      syncAuthFromStorage: state.syncAuthFromStorage,
      handleUnauthorized: state.handleUnauthorized,
    })),
  );
  const ActiveRouter = ROUTER_CONFIG.mode === 'hash' ? HashRouter : BrowserRouter;

  useEffect(() => {
    document.title = APP_CONFIG.brand;
    syncAuthFromStorage();
  }, [syncAuthFromStorage]);

  useEffect(() => {
    const onUnauthorized = () => {
      handleUnauthorized();
    };
    
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN_STORAGE_KEY) {
        syncAuthFromStorage();
      }
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
    window.addEventListener('storage', onStorageChange);
    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
      window.removeEventListener('storage', onStorageChange);
    };
  }, [handleUnauthorized, syncAuthFromStorage]);

  return (
    <AppErrorBoundary>
      <ActiveRouter basename={ROUTER_CONFIG.basename || undefined}>
        <ThemeController />
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route
              path={ROUTER_CONFIG.loginPath}
              element={
                <Suspense fallback={<Loading />}>
                  <LoginPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path={ROUTE_PATHS.DASHBOARD}
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <Layout />
                </Suspense>
              </ProtectedRoute>
            }
          >
            {renderRoutes(navRoutes)}
            <Route
              path={ROUTE_PATHS.HOST_DETAIL}
              element={
                <Suspense fallback={<Loading />}>
                  <HostDetailPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </ActiveRouter>
    </AppErrorBoundary>
  );
}
