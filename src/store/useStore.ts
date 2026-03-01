import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { APP_CONFIG } from '@/config/app';
import type { AuthSession } from '@/api/modules/auth';
import { clearAccessToken, hasAccessToken, setAccessToken } from '@/auth/session';
import type { ThemeColor } from '@/theme/palette';

export type User = AuthSession['user'];

export interface Toast {
  title?: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success';
}

export type Theme = 'light' | 'dark' | 'system';

interface CounterSlice {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

interface AuthSlice {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string) => void;
  setSession: (session: AuthSession) => void;
  logout: () => void;
  handleUnauthorized: () => void;
  syncAuthFromStorage: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface UiSlice {
  addToast: (data: Toast) => void;
  theme: Theme;
  themeColor: ThemeColor;
  setTheme: (theme: Theme) => void;
  setThemeColor: (color: ThemeColor) => void;
}

type AppState = CounterSlice & AuthSlice & UiSlice;

type SetState = (partial: Partial<AppState> | ((state: AppState) => Partial<AppState>)) => void;
type GetState = () => AppState;

const buildLocalSession = (email: string): AuthSession => ({
  accessToken: `local-token-${Date.now()}`,
  user: {
    id: '1',
    name: 'Admin User',
    email,
    role: 'Administrator',
    status: 'Active',
  },
});

const createCounterSlice = (set: SetState): CounterSlice => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
});

const createAuthSlice = (set: SetState, get: GetState): AuthSlice => ({
  isAuthenticated: hasAccessToken(),
  currentUser: null,
  login: (email) => get().setSession(buildLocalSession(email)),
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
  handleUnauthorized: () => set({ isAuthenticated: false, currentUser: null }),
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

const createUiSlice = (set: SetState): UiSlice => ({
  addToast: (data) => {
    const { title, description, variant } = data;
    if (variant === 'success') {
      toast.success(title || 'Success', { description });
    } else if (variant === 'destructive') {
      toast.error(title || 'Error', { description });
    } else {
      toast(title || 'Notification', { description });
    }
  },

  theme: 'system',
  themeColor: APP_CONFIG.defaultThemeColor,
  setTheme: (theme) => set({ theme }),
  setThemeColor: (themeColor) => set({ themeColor }),
});

const createStore: StateCreator<AppState, [], [], AppState> = (set, get) => ({
  ...createCounterSlice(set),
  ...createAuthSlice(set, get),
  ...createUiSlice(set),
});

export const useStore = create<AppState>()(
  persist(createStore, {
    name: 'aero-cloud-admin-store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      currentUser: state.currentUser,
      theme: state.theme,
      themeColor: state.themeColor,
    }),
  }),
);
