import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LogOut,
    ChevronsUpDown,
    ChevronRight,
    Cloud,
    Palette,
    Sun,
    Moon,
    Monitor,
    Check,
    Search,
    ArrowUp,
    ArrowDown,
    CornerDownLeft,
    Box,
    type LucideIcon,
} from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useStore } from '../store/useStore';
import { navRoutes, type RouteConfig } from '../lib/routes';
import { THEME_COLORS, THEME_SWATCH_COLOR } from '@/theme/palette';
import {
    Sidebar as SidebarRoot,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from './ui/sidebar';

export default function Sidebar() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const { currentUser, logout, theme, setTheme, themeColor, setThemeColor } = useStore(
        useShallow((store) => ({
            currentUser: store.currentUser,
            logout: store.logout,
            theme: store.theme,
            setTheme: store.setTheme,
            themeColor: store.themeColor,
            setThemeColor: store.setThemeColor,
        })),
    );

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
    const [collapsedMenuPath, setCollapsedMenuPath] = useState<string | null>(null);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const selectedItemRef = useRef<HTMLButtonElement>(null);
    const lastFocusedElementRef = useRef<HTMLElement | null>(null);

    const userMenuRef = useRef<HTMLDivElement>(null);
    const themeMenuRef = useRef<HTMLDivElement>(null);

    const getRouteLabel = (route: RouteConfig) => t(route.labelKey, { defaultValue: route.label });

    const searchItems: { key: string; displayLabel: string; breadcrumbs: string[]; icon: LucideIcon; path: string }[] = [];

    const flattenRoutes = (routes: RouteConfig[], parentLabels: string[] = [], rootIcon?: LucideIcon) => {
        routes.forEach((route) => {
            const routeLabel = getRouteLabel(route);
            const currentBreadcrumbs = [...parentLabels, routeLabel];
            const displayIcon = rootIcon || route.icon || Box;
            if (route.component) {
                searchItems.push({
                    key: route.path,
                    displayLabel: routeLabel,
                    breadcrumbs: currentBreadcrumbs,
                    icon: displayIcon,
                    path: route.path,
                });
            }
            if (route.children) {
                flattenRoutes(route.children, currentBreadcrumbs, displayIcon);
            }
        });
    };

    flattenRoutes(navRoutes);

    const filteredItems = searchItems.filter((item) =>
        item.displayLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.breadcrumbs.some((crumb) => crumb.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    const openSearch = () => {
        lastFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setIsSearchOpen(true);
        setSelectedIndex(0);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSelectedIndex(0);
        window.setTimeout(() => {
            lastFocusedElementRef.current?.focus();
        }, 0);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = (key: string) => {
        if (isCollapsed) {
            setCollapsedMenuPath((prev) => (prev === key ? null : key));
            return;
        }
        setCollapsedMenuPath(null);
        setExpandedMenus((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                openSearch();
            }
            if (e.key === 'Escape') {
                closeSearch();
                setIsThemeMenuOpen(false);
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            const timer = setTimeout(() => searchInputRef.current?.focus(), 50);
            return () => clearTimeout(timer);
        }
    }, [isSearchOpen]);

    useEffect(() => {
        if (selectedItemRef.current && scrollContainerRef.current) {
            selectedItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [selectedIndex]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (userMenuRef.current && !userMenuRef.current.contains(target)) setIsUserMenuOpen(false);
            if (themeMenuRef.current && !themeMenuRef.current.contains(target)) setIsThemeMenuOpen(false);
            if (!target.closest('[data-collapsed-menu-root="true"]')) setCollapsedMenuPath(null);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    useEffect(() => {
        if (isCollapsed) return;
        navRoutes.forEach((item) => {
            if (item.children?.some((child) => location.pathname === child.path)) {
                setExpandedMenus((prev) => (prev.includes(item.path) ? prev : [...prev, item.path]));
            }
        });
    }, [location.pathname, isCollapsed]);

    return (
        <>
            <SidebarRoot collapsible="icon" variant="sidebar" className="border-r">
                <SidebarHeader className="px-3 pt-3 pb-2 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:pt-3">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                size="lg"
                                className="h-10 gap-2.5 px-2 text-sidebar-foreground hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                            >
                                <div className="h-8 w-8 shrink-0 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5">
                                    <Cloud className="h-full w-full text-primary" />
                                </div>
                                <span className="text-[18px] font-semibold tracking-tight whitespace-nowrap group-data-[collapsible=icon]:hidden">{t('app.brand')}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem className="mt-3 group-data-[collapsible=icon]:mt-2">
                            <SidebarMenuButton
                                onClick={openSearch}
                                tooltip={t('sidebar.quickSearch')}
                                className="h-10 gap-2.5 rounded-lg border border-sidebar-border/80 bg-background px-3 text-sidebar-foreground/75 shadow-none hover:bg-background hover:text-sidebar-foreground dark:bg-sidebar-accent/35 dark:hover:bg-sidebar-accent/60 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:px-0"
                            >
                                <Search className="h-5 w-5 shrink-0 text-sidebar-foreground/70" />
                                <span className="whitespace-nowrap truncate font-medium group-data-[collapsible=icon]:hidden">{t('sidebar.quickSearchPlaceholder')}</span>
                                <span className="ml-auto rounded-md border border-sidebar-border bg-sidebar px-1.5 py-0.5 text-[10px] text-sidebar-foreground/60 font-mono group-data-[collapsible=icon]:hidden">⌘K</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent className="px-2.5 pb-2 group-data-[collapsible=icon]:px-2">
                    <SidebarMenu>
                        {navRoutes.map((item) => {
                            const Icon = item.icon || Box;
                            const isExpanded = expandedMenus.includes(item.path) && !isCollapsed;
                            const isActiveParent = item.children?.some((child) => location.pathname === child.path);
                            const itemLabel = getRouteLabel(item);

                            if (item.children) {
                                return (
                                    <SidebarMenuItem key={item.path} data-collapsed-menu-root="true">
                                        <SidebarMenuButton
                                            onClick={() => toggleMenu(item.path)}
                                            isActive={isActiveParent}
                                            tooltip={itemLabel}
                                            className="h-10 rounded-lg px-2.5 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0 data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-normal"
                                        >
                                            <Icon className={cn('h-[18px] w-[18px] shrink-0', isActiveParent && 'text-primary')} />
                                            <span>{itemLabel}</span>
                                            <ChevronRight className={cn('ml-auto h-4 w-4 transition-transform group-data-[collapsible=icon]:hidden', isExpanded && 'rotate-90', isActiveParent && 'text-primary')} />
                                        </SidebarMenuButton>

                                        <SidebarMenuSub className={cn('mx-4 my-1 border-l border-sidebar-border/80 px-2.5 py-1', !isExpanded && 'hidden')}>
                                            {item.children.map((child) => {
                                                const childLabel = getRouteLabel(child);
                                                const isChildActive = location.pathname === child.path;
                                                return (
                                                    <SidebarMenuSubItem key={child.path}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={isChildActive}
                                                            className="!h-9 rounded-md px-2 data-[active=true]:bg-transparent data-[active=true]:text-primary data-[active=true]:hover:bg-transparent"
                                                        >
                                                            <Link to={child.path}>
                                                                <span
                                                                    className={cn(
                                                                        'h-2.5 w-2.5 shrink-0 rounded-full border',
                                                                        isChildActive
                                                                            ? 'border-primary bg-primary/20'
                                                                            : 'border-sidebar-foreground/45 bg-transparent',
                                                                    )}
                                                                />
                                                                <span>{childLabel}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>

                                        {isCollapsed && collapsedMenuPath === item.path && (
                                            <div className="absolute left-full top-0 ml-2 w-56 rounded-xl border bg-popover shadow-xl z-50 overflow-hidden">
                                                <div className="px-3 py-2 text-xs font-bold text-muted-foreground border-b bg-muted/20 uppercase tracking-tight">
                                                    {itemLabel}
                                                </div>
                                                <div className="p-2">
                                                    {item.children.map((child) => {
                                                        const isChildActive = location.pathname === child.path;
                                                        const childLabel = getRouteLabel(child);
                                                        return (
                                                            <Link
                                                                key={child.path}
                                                                to={child.path}
                                                                onClick={() => setCollapsedMenuPath(null)}
                                                                className={cn(
                                                                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                                                                    isChildActive ? 'text-primary' : 'hover:bg-accent/50',
                                                                )}
                                                            >
                                                                <span
                                                                    className={cn(
                                                                        'h-2.5 w-2.5 shrink-0 rounded-full border',
                                                                        isChildActive
                                                                            ? 'border-primary bg-primary/20'
                                                                            : 'border-muted-foreground/40 bg-transparent',
                                                                    )}
                                                                />
                                                                <span className="flex-1">{childLabel}</span>
                                                                {isChildActive && <Check className="h-3 w-3 text-primary" />}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </SidebarMenuItem>
                                );
                            }

                            return (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={location.pathname === item.path}
                                        tooltip={itemLabel}
                                        className="h-10 rounded-lg px-2.5 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-normal"
                                    >
                                        <Link to={item.path} onClick={() => setCollapsedMenuPath(null)}>
                                            <Icon className={cn('h-[18px] w-[18px] shrink-0', location.pathname === item.path && 'text-primary')} />
                                            <span>{itemLabel}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter className="border-t px-2.5 py-2 group-data-[collapsible=icon]:px-2">
                    <div className="relative w-full" ref={themeMenuRef}>
                        {isThemeMenuOpen && (
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
                                    onClick={() => setIsThemeMenuOpen((prev) => !prev)}
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

                    <div className="relative w-full" ref={userMenuRef}>
                        {isUserMenuOpen && (
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
                            onClick={() => setIsUserMenuOpen((prev) => !prev)}
                        >
                            <div className={cn('flex items-center min-w-0', isCollapsed ? 'justify-center' : 'gap-3 flex-1 text-left')}>
                                <Avatar className="rounded-full shrink-0 h-7 w-7">
                                    <AvatarFallback className="rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase">{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
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
                </SidebarFooter>
            </SidebarRoot>

            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={closeSearch} aria-hidden="true" />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="command-palette-title"
                        className="relative w-full max-w-xl mx-4 bg-popover rounded-xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                    >
                        <h2 id="command-palette-title" className="sr-only">
                            {t('sidebar.quickSearch')}
                        </h2>
                        <div className="flex items-center border-b px-4">
                            <Search className="h-5 w-5 text-muted-foreground" />
                            <input
                                autoFocus
                                ref={searchInputRef}
                                className="h-14 w-full bg-transparent px-3 outline-none text-base font-medium"
                                placeholder={t('sidebar.searchPlaceholder')}
                                aria-label={t('sidebar.searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'ArrowDown') {
                                        e.preventDefault();
                                        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
                                    }
                                    if (e.key === 'ArrowUp') {
                                        e.preventDefault();
                                        setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
                                    }
                                    if (e.key === 'Enter' && filteredItems[selectedIndex]) {
                                        navigate(filteredItems[selectedIndex].path);
                                        closeSearch();
                                    }
                                }}
                            />
                            <div className="flex items-center gap-1.5 border rounded px-1.5 py-0.5 bg-muted text-[10px] text-muted-foreground font-mono">
                                {t('sidebar.esc')}
                            </div>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto p-2" ref={scrollContainerRef}>
                            {filteredItems.map((item, idx) => (
                                <button
                                    type="button"
                                    key={item.key}
                                    ref={idx === selectedIndex ? selectedItemRef : null}
                                    onClick={() => {
                                        navigate(item.path);
                                        closeSearch();
                                    }}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    className={cn(
                                        'flex w-full items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors text-left',
                                        idx === selectedIndex ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50',
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className={cn('h-4 w-4', idx === selectedIndex ? 'text-primary' : 'text-muted-foreground')} />
                                        <div className="flex items-center gap-1.5 text-sm font-medium">
                                            {item.breadcrumbs.map((crumb, crumbIndex) => (
                                                <React.Fragment key={`${item.path}-${crumbIndex}`}>
                                                    {crumbIndex > 0 && <span className="opacity-30">›</span>}
                                                    <span className={crumbIndex === item.breadcrumbs.length - 1 ? '' : 'opacity-60 text-xs'}>{crumb}</span>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                    {idx === selectedIndex && <CornerDownLeft className="h-3.5 w-3.5 opacity-40" />}
                                </button>
                            ))}
                            {filteredItems.length === 0 && (
                                <div className="py-12 text-center text-sm text-muted-foreground">
                                    {t('sidebar.noResults', { query: searchQuery })}
                                </div>
                            )}
                        </div>
                        <div className="bg-muted/30 border-t px-4 py-3 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1">
                                    <ArrowUp className="h-3 w-3" />
                                    <ArrowDown className="h-3 w-3" />
                                    {t('common.actions.navigate')}
                                </span>
                                <span className="flex items-center gap-1">
                                    <CornerDownLeft className="h-3 w-3" /> {t('common.actions.select')}
                                </span>
                            </div>
                            <span>{t('app.commandCenter')}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
