export type RouterMode = 'hash' | 'browser';

const normalizeBasename = (rawBasename: string | undefined): string => {
  if (!rawBasename) {
    return '';
  }
  const trimmed = rawBasename.trim();
  if (!trimmed) {
    return '';
  }
  const prefixed = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return prefixed !== '/' && prefixed.endsWith('/') ? prefixed.slice(0, -1) : prefixed;
};

const normalizePath = (path: string): string => (path.startsWith('/') ? path : `/${path}`);

const withBasename = (path: string, basename: string): string => {
  if (!basename) {
    return normalizePath(path);
  }
  const normalizedPath = normalizePath(path);
  if (normalizedPath === '/') {
    return basename;
  }
  return `${basename}${normalizedPath}`;
};

const envMode = import.meta.env.VITE_ROUTER_MODE;

export const ROUTER_CONFIG = {
  mode: envMode === 'browser' ? 'browser' : 'hash',
  basename: normalizeBasename(import.meta.env.VITE_APP_BASENAME),
  loginPath: '/login',
} as const satisfies {
  mode: RouterMode;
  basename: string;
  loginPath: string;
};

export const buildAppPath = (path: string): string => withBasename(path, ROUTER_CONFIG.basename);

export const toLocation = (path: string): string => {
  const appPath = buildAppPath(path);
  return ROUTER_CONFIG.mode === 'hash' ? `#${appPath}` : appPath;
};

export const buildLoginLocation = (): string => {
  return toLocation(ROUTER_CONFIG.loginPath);
};

export const redirectToLogin = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  if (ROUTER_CONFIG.mode === 'hash') {
    const nextHash = buildLoginLocation();
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    return;
  }

  const nextPath = buildAppPath(ROUTER_CONFIG.loginPath);
  if (window.location.pathname !== nextPath) {
    window.location.assign(nextPath);
  }
};
