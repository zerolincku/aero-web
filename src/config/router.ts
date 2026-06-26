import { ENV } from '@/config/env';

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

const envMode = ENV.ROUTER_MODE;

export const ROUTER_CONFIG = {
  mode: envMode === 'browser' ? 'browser' : 'hash',
  basename: normalizeBasename(ENV.APP_BASENAME),
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


