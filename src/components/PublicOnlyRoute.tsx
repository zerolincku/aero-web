import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { ROUTE_PATHS } from '@/config/paths';

export function PublicOnlyRoute() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
}
