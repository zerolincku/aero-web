import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../useStore';
import { clearAccessToken, hasAccessToken } from '@/auth/session';

describe('authSlice', () => {
  beforeEach(() => {
    useStore.setState({ isAuthenticated: false, currentUser: null });
    clearAccessToken();
  });

  it('should have initial unauthenticated state', () => {
    const state = useStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.currentUser).toBeNull();
  });

  it('should set session correctly', () => {
    const mockSession = {
      accessToken: 'mock-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'Admin',
        status: 'Active' as const,
      },
    };

    useStore.getState().setSession(mockSession);

    const state = useStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.currentUser).toEqual(mockSession.user);
    expect(hasAccessToken()).toBe(true);
  });

  it('should logout correctly', () => {
    const mockSession = {
      accessToken: 'mock-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'Admin',
        status: 'Active' as const,
      },
    };

    useStore.getState().setSession(mockSession);
    expect(useStore.getState().isAuthenticated).toBe(true);

    useStore.getState().logout();
    
    const state = useStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.currentUser).toBeNull();
    expect(hasAccessToken()).toBe(false);
  });

  it('should update user correctly', () => {
    const mockSession = {
      accessToken: 'mock-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'Admin',
        status: 'Active' as const,
      },
    };

    useStore.getState().setSession(mockSession);
    
    useStore.getState().updateUser({ name: 'Updated Name' });
    
    const state = useStore.getState();
    expect(state.currentUser?.name).toBe('Updated Name');
    expect(state.currentUser?.email).toBe('test@example.com');
  });
});
