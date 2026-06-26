import type { StateCreator } from 'zustand';
import type { AuthSession } from '@/api/modules/auth';
import { clearAccessToken, hasAccessToken, setAccessToken } from '@/auth/session';

export type User = AuthSession['user'];

export interface AuthSlice {
  isAuthenticated: boolean;
  currentUser: User | null;
  setSession: (session: AuthSession) => void;
  logout: () => void;
  handleUnauthorized: () => void;
  syncAuthFromStorage: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  isAuthenticated: hasAccessToken(),
  currentUser: null,
  setSession: (session) => {
    setAccessToken(session.accessToken);
    set({
      isAuthenticated: true,
      currentUser: session.user,
    });
  },
  logout: () => {
    clearAccessToken();
    set({ isAuthenticated: false, currentUser: null });
  },
  handleUnauthorized: () => {
    clearAccessToken();
    set({ isAuthenticated: false, currentUser: null });
  },
  syncAuthFromStorage: () => {
    const authenticated = hasAccessToken();
    if (!authenticated) {
      set({ isAuthenticated: false, currentUser: null });
      return;
    }
    set((state) => ({ isAuthenticated: true, currentUser: state.currentUser }));
  },
  updateUser: (data) => set((state) => ({
    currentUser: state.currentUser ? { ...state.currentUser, ...data } : null
  })),
});
