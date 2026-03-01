import type { ThemeColor } from '@/theme/palette';

export const APP_CONFIG = {
  brand: 'Aero Cloud',
  commandCenter: {
    en: 'Aero Command Center',
    zhCN: 'Aero 指令中心',
  },
  defaultThemeColor: 'blue' as ThemeColor,
} as const;

