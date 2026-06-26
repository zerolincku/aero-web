export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  ROUTER_MODE: import.meta.env.VITE_ROUTER_MODE as 'hash' | 'browser' | undefined,
  APP_BASENAME: import.meta.env.VITE_APP_BASENAME as string | undefined,
  USE_MOCK_AUTH: import.meta.env.VITE_USE_MOCK_AUTH !== 'false',
} as const;
