import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ThemeController from './components/ThemeController';
import Loading from './components/Loading';
import { useStore } from './store/useStore';
import { navRoutes, type RouteConfig } from '@/lib/routes';
import { Toaster } from '@/components/ui/sonner';
import { APP_CONFIG } from '@/config/app';
import './i18n';

const HostDetailPage = React.lazy(() => import('./pages/HostDetail'));

function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
  useEffect(() => {
    document.title = APP_CONFIG.brand;
  }, []);

  return (
    <Router>
      <ThemeController />
      <Routes>
        <Route path="/login" element={<Login />} />

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
    </Router>
  );
}
