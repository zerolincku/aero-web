import axios from 'axios';
import { getAccessToken, handleUnauthorizedSession } from '@/auth/session';
import { toast } from 'sonner';
import { normalizeApiError } from '@/api/error';
import { ENV } from '@/config/env';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipGlobalError?: boolean;
  }
}

const instance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 10000,
});

// Request interceptor: attach access token automatically.
instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle auth expiration and keep response shape consistent.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeApiError(error);

    if (error.response?.status === 401) {
      handleUnauthorizedSession();
    } else {
      // Global error toast for all other errors unless skipGlobalError is true
      if (!error.config?.skipGlobalError) {
        toast.error('Request Failed', {
          description: normalizedError.message,
        });
      }
    }

    return Promise.reject(normalizedError);
  },
);

export default instance;
