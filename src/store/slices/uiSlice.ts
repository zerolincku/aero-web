import type { StateCreator } from 'zustand';
import { toast } from 'sonner';
import { APP_CONFIG } from '@/config/app';
import type { ThemeColor } from '@/theme/palette';

export interface Toast {
  title?: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success';
}

export type Theme = 'light' | 'dark' | 'system';

export interface UiSlice {
  addToast: (data: Toast) => void;
  theme: Theme;
  themeColor: ThemeColor;
  setTheme: (theme: Theme) => void;
  setThemeColor: (color: ThemeColor) => void;
}

export const createUiSlice: StateCreator<UiSlice, [], [], UiSlice> = (set) => ({
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
