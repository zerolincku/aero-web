import axios from 'axios';
import { getAccessToken, handleUnauthorizedSession } from '@/auth/session';
import { redirectToLogin } from '@/config/router';
import { toast } from 'sonner';
import { normalizeApiError } from '@/api/error';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
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
      redirectToLogin();
    } else {
      // Global error toast for all other errors
      toast.error('Request Failed', {
        description: normalizedError.message,
      });
    }

    return Promise.reject(normalizedError);
  },
);

export default instance;
