import { apiClient } from '@/api/client';
import { ENV } from '@/config/env';
import { ApiRequestError } from '@/api/error';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
};

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};

const mockLogin = async (payload: LoginPayload): Promise<AuthSession> => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 600);
  });

  return {
    accessToken: `demo-token-${Date.now()}`,
    user: {
      id: '1',
      name: payload.email.split('@')[0] || 'Admin User',
      email: payload.email,
      role: 'Administrator',
      status: 'Active',
    },
  };
};

export const loginWithPassword = async (payload: LoginPayload): Promise<AuthSession> => {
  if (!payload.email || !payload.password) {
    throw new ApiRequestError({ message: 'Email and password are required', status: 400 });
  }

  if (ENV.USE_MOCK_AUTH) {
    return mockLogin(payload);
  }

  return apiClient.post<AuthSession, LoginPayload>('/auth/login', payload);
};
