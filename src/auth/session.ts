export const ACCESS_TOKEN_STORAGE_KEY = 'token';
export const AUTH_UNAUTHORIZED_EVENT = 'app:auth-unauthorized';

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

export const hasAccessToken = (): boolean => Boolean(getAccessToken());

export const setAccessToken = (token: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
};

export const clearAccessToken = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
};

export const emitUnauthorizedEvent = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
};

export const handleUnauthorizedSession = (): void => {
  clearAccessToken();
  emitUnauthorizedEvent();
};
