import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ArrowUp, ArrowDown, CornerDownLeft, Box, type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { navRoutes, type RouteConfig } from '../lib/routes';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const selectedItemRef = useRef<HTMLButtonElement>(null);

    const searchItems = useMemo(() => {
        const items: { key: string; displayLabel: string; breadcrumbs: string[]; icon: LucideIcon; path: string }[] = [];

        const flattenRoutes = (routes: RouteConfig[], parentLabels: string[] = [], rootIcon?: LucideIcon) => {
            routes.forEach((route) => {
                const routeLabel = t(route.labelKey, { defaultValue: route.label });
                const currentBreadcrumbs = [...parentLabels, routeLabel];
                const displayIcon = rootIcon || route.icon || Box;
                if (route.component) {
                    items.push({
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
        return items;
    }, [t]);

    const query = searchQuery.trim().toLowerCase();
    const filteredItems = searchItems.filter((item) =>
        !query ||
        item.displayLabel.toLowerCase().includes(query) ||
        item.breadcrumbs.some((crumb) => crumb.toLowerCase().includes(query)),
    );

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            const timer = setTimeout(() => searchInputRef.current?.focus(), 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (selectedItemRef.current && scrollContainerRef.current) {
            selectedItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [selectedIndex]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
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
                                onClose();
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
                                onClose();
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
    );
}
