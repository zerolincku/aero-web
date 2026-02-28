import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LogOut,
    ChevronsUpDown,
    ChevronDown,
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
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useStore } from '../store/useStore';
import { navRoutes, type RouteConfig } from '../lib/routes';

const QUICK_SEARCH_HOVER_KEY = 'quick-search';
const APPEARANCE_HOVER_KEY = 'appearance';

export default function Sidebar() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout, theme, setTheme, themeColor, setThemeColor, isSidebarCollapsed: isCollapsed } = useStore();

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const selectedItemRef = useRef<HTMLDivElement>(null);

    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        item.breadcrumbs.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    const openSearch = () => {
        setIsSearchOpen(true);
        setSelectedIndex(0);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSelectedIndex(0);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = (key: string) => {
        if (isCollapsed) return;
        setExpandedMenus((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
    };

    const handleMouseEnter = (key: string) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        if (isCollapsed) setHoveredMenu(key);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => setHoveredMenu(null), 200);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                openSearch();
            }
            if (e.key === 'Escape') closeSearch();
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
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setIsUserMenuOpen(false);
            if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) setIsThemeMenuOpen(false);
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
            <aside
                className={cn(
                    'bg-background border-r flex flex-col z-30 flex-shrink-0 transition-all duration-300 ease-in-out',
                    isCollapsed ? 'w-[65px]' : 'w-64',
                )}
            >
                <div className={cn('flex items-center h-14 px-4', isCollapsed ? 'justify-center' : 'gap-3')}>
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                        <div className="h-3 w-3 bg-white/30 rounded-full" />
                    </div>
                    {!isCollapsed && <span className="text-lg font-bold tracking-tight">{t('app.brand')}</span>}
                </div>

                <div
                    className="px-4 py-4 pb-2 relative"
                    onMouseEnter={() => handleMouseEnter(QUICK_SEARCH_HOVER_KEY)}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        onClick={openSearch}
                        className={cn(
                            'w-full flex items-center bg-muted/40 border border-transparent rounded-lg transition-all hover:bg-muted/60',
                            isCollapsed ? 'justify-center h-9' : 'px-3 py-2 gap-2',
                        )}
                    >
                        <Search className="h-4 w-4 text-muted-foreground" />
                        {!isCollapsed && (
                            <>
                                <span className="text-sm text-muted-foreground flex-1 text-left">{t('sidebar.quickSearchPlaceholder')}</span>
                                <div className="border rounded px-1.5 py-0.5 bg-background text-[10px] text-muted-foreground font-mono">⌘K</div>
                            </>
                        )}
                    </button>
                    {isCollapsed && hoveredMenu === QUICK_SEARCH_HOVER_KEY && (
                        <div className="absolute left-[calc(100%-8px)] top-4 ml-2 px-3 py-1.5 rounded-md border bg-popover shadow-xl z-50 text-xs font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-1 pointer-events-none">
                            {t('sidebar.quickSearch')} <span className="ml-1 opacity-50 font-mono">⌘K</span>
                        </div>
                    )}
                </div>

                <nav
                    className={cn(
                        'flex-1 px-3 space-y-1 mt-2',
                        isCollapsed ? 'overflow-visible' : 'overflow-y-auto scrollbar-none',
                    )}
                >
                    {navRoutes.map((item) => {
                        const Icon = item.icon || Box;
                        const isExpanded = expandedMenus.includes(item.path) && !isCollapsed;
                        const isActiveParent = item.children?.some((child) => location.pathname === child.path);

                        return (
                            <div
                                key={item.path}
                                className="relative"
                                onMouseEnter={() => handleMouseEnter(item.path)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {item.children ? (
                                    <>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                'w-full h-10 transition-all',
                                                isCollapsed ? 'justify-center px-0' : 'justify-between px-3',
                                                isActiveParent && !isExpanded && 'bg-accent/40 font-semibold',
                                            )}
                                            onClick={() => toggleMenu(item.path)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className={cn('h-5 w-5', isActiveParent ? 'text-primary' : 'text-muted-foreground')} />
                                                {!isCollapsed && <span className="text-sm font-medium">{getRouteLabel(item)}</span>}
                                            </div>
                                            {!isCollapsed && (
                                                <ChevronDown className={cn('h-4 w-4 transition-transform text-muted-foreground', !isExpanded && '-rotate-90')} />
                                            )}
                                        </Button>

                                        {isExpanded && !isCollapsed && (
                                            <div className="ml-6 mt-1 border-l border-border pl-2 space-y-1 animate-in slide-in-from-top-1 fade-in duration-200">
                                                {item.children.map((child) => {
                                                    const ChildIcon = child.icon || Box;
                                                    const isChildActive = location.pathname === child.path;
                                                    return (
                                                        <Link key={child.path} to={child.path}>
                                                            <Button
                                                                variant={isChildActive ? 'secondary' : 'ghost'}
                                                                size="sm"
                                                                className={cn('w-full justify-start pl-4 h-9', isChildActive && 'bg-muted font-medium')}
                                                            >
                                                                <ChildIcon className={cn('mr-2 h-2 w-2', isChildActive ? 'text-primary' : 'text-muted-foreground')} />
                                                                {getRouteLabel(child)}
                                                            </Button>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {isCollapsed && hoveredMenu === item.path && (
                                            <div className="absolute left-[calc(100%-8px)] top-0 ml-2 w-48 rounded-xl border bg-popover shadow-xl z-50 animate-in fade-in slide-in-from-left-2 duration-150 py-1 overflow-hidden">
                                                <div className="px-3 py-2 text-xs font-bold text-muted-foreground border-b bg-muted/20 uppercase tracking-tight">
                                                    {getRouteLabel(item)}
                                                </div>
                                                <div className="p-1 flex flex-col gap-1">
                                                    {item.children.map((child) => {
                                                        const isChildActive = location.pathname === child.path;
                                                        return (
                                                            <Link key={child.path} to={child.path} onClick={() => setHoveredMenu(null)}>
                                                                <div
                                                                    className={cn(
                                                                        'flex items-center px-3 py-2 text-sm rounded-md transition-colors',
                                                                        isChildActive ? 'bg-accent text-accent-foreground font-semibold' : 'hover:bg-accent/50',
                                                                    )}
                                                                >
                                                                    <span className="flex-1">{getRouteLabel(child)}</span>
                                                                    {isChildActive && <Check className="h-3 w-3 text-primary" />}
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Link to={item.path}>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    'w-full h-10',
                                                    isCollapsed ? 'justify-center px-0' : 'justify-start px-3',
                                                    location.pathname === item.path && 'bg-accent text-accent-foreground font-semibold',
                                                )}
                                            >
                                                <Icon className={cn('h-5 w-5', location.pathname === item.path ? 'text-primary' : 'text-muted-foreground')} />
                                                {!isCollapsed && <span className="ml-3 text-sm font-medium">{getRouteLabel(item)}</span>}
                                            </Button>
                                        </Link>
                                        {isCollapsed && hoveredMenu === item.path && (
                                            <div className="absolute left-[calc(100%-8px)] top-1 ml-2 px-3 py-1.5 rounded-md border bg-popover shadow-xl z-50 text-xs font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-1 pointer-events-none">
                                                {getRouteLabel(item)}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div
                    className="px-3 py-2 border-t relative"
                    ref={themeMenuRef}
                    onMouseEnter={() => handleMouseEnter(APPEARANCE_HOVER_KEY)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative">
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
                                            {(['zinc', 'red', 'blue', 'green', 'orange'] as const).map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setThemeColor(color)}
                                                    className={cn(
                                                        'h-6 w-6 rounded-full border shadow-sm transition-transform hover:scale-110 flex items-center justify-center',
                                                        themeColor === color && 'ring-2 ring-primary ring-offset-2',
                                                    )}
                                                    style={{
                                                        backgroundColor:
                                                            color === 'zinc'
                                                                ? '#18181b'
                                                                : `hsl(${color === 'red' ? '0 72% 50%' : color === 'blue' ? '221 83% 53%' : color === 'green' ? '142 76% 36%' : '24 95% 53%'})`,
                                                    }}
                                                >
                                                    {themeColor === color && <Check className="h-3 w-3 text-white" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            className={cn('w-full h-10 text-muted-foreground hover:text-foreground', isCollapsed ? 'justify-center px-0' : 'justify-start px-3')}
                            onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                        >
                            <Palette className="h-5 w-5 shrink-0" />
                            {!isCollapsed && <span className="ml-3 text-sm font-medium">{t('sidebar.appearance')}</span>}
                        </Button>
                    </div>
                    {isCollapsed && hoveredMenu === APPEARANCE_HOVER_KEY && !isThemeMenuOpen && (
                        <div className="absolute left-[calc(100%-8px)] top-2 ml-2 px-3 py-1.5 rounded-md border bg-popover shadow-xl z-50 text-xs font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-1 pointer-events-none">
                            {t('sidebar.appearance')}
                        </div>
                    )}
                </div>

                <div className={cn('border-t bg-background relative transition-all', isCollapsed ? 'p-2' : 'p-3')} ref={userMenuRef}>
                    {isUserMenuOpen && (
                        <div
                            className={cn(
                                'absolute bottom-full mb-2 rounded-xl border bg-popover shadow-2xl z-50 animate-in slide-in-from-bottom-2 duration-200 overflow-hidden',
                                isCollapsed ? 'left-[calc(100%-8px)] ml-1 w-48' : 'left-2 right-2',
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
                        className={cn('w-full h-14 p-0 rounded-xl', isCollapsed ? 'justify-center' : 'px-2 justify-between')}
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                        <div className={cn('flex items-center', isCollapsed ? 'justify-center' : 'gap-3 overflow-hidden text-left')}>
                            <Avatar className="h-9 w-9 rounded-lg shrink-0">
                                <AvatarFallback className="rounded-lg bg-indigo-500 text-white font-bold text-xs uppercase">{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            {!isCollapsed && (
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-bold truncate">{currentUser?.name}</span>
                                    <span className="text-[11px] text-muted-foreground truncate">{currentUser?.email}</span>
                                </div>
                            )}
                        </div>
                        {!isCollapsed && <ChevronsUpDown className="h-4 w-4 text-muted-foreground opacity-50 shrink-0" />}
                    </Button>
                </div>
            </aside>

            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={closeSearch} />
                    <div className="relative w-full max-w-xl mx-4 bg-popover rounded-xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center border-b px-4">
                            <Search className="h-5 w-5 text-muted-foreground" />
                            <input
                                autoFocus
                                ref={searchInputRef}
                                className="h-14 w-full bg-transparent px-3 outline-none text-base font-medium"
                                placeholder={t('sidebar.searchPlaceholder')}
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
                                <div
                                    key={item.key}
                                    ref={idx === selectedIndex ? selectedItemRef : null}
                                    onClick={() => {
                                        navigate(item.path);
                                        closeSearch();
                                    }}
                                    className={cn(
                                        'flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors',
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
                                </div>
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
