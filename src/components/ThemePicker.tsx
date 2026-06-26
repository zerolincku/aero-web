import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Palette, Sun, Moon, Monitor, Check } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { useStore } from '../store/useStore';
import { THEME_COLORS, THEME_SWATCH_COLOR } from '@/theme/palette';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';
import { useClickOutside } from '../hooks/use-click-outside';
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut';

interface ThemePickerProps {
    isCollapsed: boolean;
}

export function ThemePicker({ isCollapsed }: ThemePickerProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { theme, setTheme, themeColor, setThemeColor } = useStore(
        useShallow((store) => ({
            theme: store.theme,
            setTheme: store.setTheme,
            themeColor: store.themeColor,
            setThemeColor: store.setThemeColor,
        })),
    );

    useClickOutside(menuRef, () => setIsOpen(false));
    useKeyboardShortcut('Escape', () => setIsOpen(false));

    return (
        <div className="relative w-full" ref={menuRef}>
            {isOpen && (
                <div
                    className={cn(
                        'absolute bottom-full mb-2 w-64 rounded-xl border bg-popover p-4 shadow-xl z-50 animate-in zoom-in-95 duration-200',
                        isCollapsed ? 'left-[calc(100%-8px)] ml-2' : 'left-0',
                    )}
                >
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase">{t('sidebar.themeMode')}</label>
                            <div className="flex gap-1 bg-muted/40 p-1 rounded-lg">
                                {(['light', 'dark', 'system'] as const).map((mode) => (
                                    <Button
                                        key={mode}
                                        variant={theme === mode ? 'secondary' : 'ghost'}
                                        size="icon"
                                        className="h-8 w-full"
                                        onClick={() => setTheme(mode)}
                                        title={t(`common.theme.${mode}`)}
                                        aria-label={t(`common.theme.${mode}`)}
                                    >
                                        {mode === 'light' && <Sun className="h-4 w-4" />}
                                        {mode === 'dark' && <Moon className="h-4 w-4" />}
                                        {mode === 'system' && <Monitor className="h-4 w-4" />}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase">{t('sidebar.accentColor')}</label>
                            <div className="grid grid-cols-5 gap-2">
                                {THEME_COLORS.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setThemeColor(color)}
                                        className={cn(
                                            'h-6 w-6 rounded-full border shadow-sm transition-transform hover:scale-110 flex items-center justify-center',
                                            themeColor === color && 'ring-2 ring-primary ring-offset-2',
                                        )}
                                        style={{ backgroundColor: THEME_SWATCH_COLOR[color] }}
                                        aria-label={`${t('sidebar.accentColor')} ${color}`}
                                        title={color}
                                    >
                                        {themeColor === color && <Check className="h-3 w-3 text-white" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        onClick={() => setIsOpen((prev) => !prev)}
                        tooltip={t('sidebar.appearance')}
                        className="h-10 rounded-lg px-2.5 justify-start gap-3 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0"
                    >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center group-data-[collapsible=icon]:h-[18px] group-data-[collapsible=icon]:w-[18px]">
                            <Palette className="h-[18px] w-[18px] shrink-0" />
                        </div>
                        <span className="truncate group-data-[collapsible=icon]:hidden">{t('sidebar.appearance')}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </div>
    );
}
