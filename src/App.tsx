import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ThemeController from './components/ThemeController';
import Loading from './components/Loading';
import { useStore } from './store/useStore';
import { useShallow } from 'zustand/react/shallow';
import { navRoutes, type RouteConfig } from '@/lib/routes';
import { Toaster } from '@/components/ui/sonner';
import { APP_CONFIG } from '@/config/app';
import { AUTH_UNAUTHORIZED_EVENT } from '@/auth/session';
import { ROUTER_CONFIG } from '@/config/router';
import AppErrorBoundary from '@/components/AppErrorBoundary';
import './i18n';

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

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
    };
  }, [handleUnauthorized]);

  return (
    <AppErrorBoundary>
      <ActiveRouter basename={ROUTER_CONFIG.basename || undefined}>
        <ThemeController />
        <Routes>
          <Route path={ROUTER_CONFIG.loginPath} element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {renderRoutes(navRoutes)}
            <Route
              path="/infrastructure/hosts/:hostId"
              element={
                <Suspense fallback={<Loading />}>
                  <HostDetailPage />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </ActiveRouter>
    </AppErrorBoundary>
  );
}
