import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LogOut, ChevronsUpDown } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useStore } from '../store/useStore';
import { useClickOutside } from '../hooks/use-click-outside';
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut';

interface UserMenuProps {
    isCollapsed: boolean;
}

export function UserMenu({ isCollapsed }: UserMenuProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { currentUser, logout } = useStore(
        useShallow((store) => ({
            currentUser: store.currentUser,
            logout: store.logout,
        })),
    );

    useClickOutside(menuRef, () => setIsOpen(false));
    useKeyboardShortcut('Escape', () => setIsOpen(false));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="relative w-full" ref={menuRef}>
            {isOpen && (
                <div
                    className={cn(
                        'absolute bottom-full mb-2 rounded-xl border bg-popover shadow-2xl z-50 animate-in slide-in-from-bottom-2 duration-200 overflow-hidden',
                        isCollapsed ? 'left-[calc(100%-8px)] ml-1 w-48' : 'left-0 right-0',
                    )}
                >
                    <div className="p-1">
                        <div className="px-3 py-2 border-b mb-1">
                            <p className="text-sm font-bold truncate">{currentUser?.name}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{currentUser?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                        >
                            <LogOut className="h-4 w-4" /> {t('common.actions.signOut')}
                        </button>
                    </div>
                </div>
            )}

            <Button
                variant="ghost"
                className={cn(
                    'w-full rounded-xl',
                    isCollapsed
                        ? 'h-10 px-0 justify-center'
                        : 'h-12 px-2.5 justify-between',
                )}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className={cn('flex items-center min-w-0', isCollapsed ? 'justify-center' : 'gap-3 flex-1 text-left')}>
                    <Avatar className="rounded-full shrink-0 h-7 w-7">
                        <AvatarFallback className="rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase">
                            {currentUser?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <div className="min-w-0">
                            <span className="block text-sm font-bold truncate">{currentUser?.name}</span>
                            <span className="block text-[11px] text-muted-foreground truncate">{currentUser?.email}</span>
                        </div>
                    )}
                </div>
                {!isCollapsed && <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground opacity-50 shrink-0" />}
            </Button>
        </div>
    );
}
