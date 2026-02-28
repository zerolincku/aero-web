import React, { useMemo } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ChevronRight, Globe } from 'lucide-react';
import { navRoutes, type RouteConfig } from '../lib/routes';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';

export default function Layout() {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const languageValue = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en';

    // 深度查找当前路由及其祖先
    const breadcrumbs = useMemo(() => {
        const findRouteWithParents = (
            routes: RouteConfig[],
            targetPath: string,
            parents: RouteConfig[] = []
        ): { route: RouteConfig, ancestors: RouteConfig[] } | null => {
            for (const route of routes) {
                if (route.path === targetPath) {
                    return { route, ancestors: parents };
                }
                if (route.children) {
                    const found = findRouteWithParents(route.children, targetPath, [...parents, route]);
                    if (found) return found;
                }
            }
            return null;
        };

        const matchResult = findRouteWithParents(navRoutes, location.pathname);

        if (!matchResult) {
            return [{ label: 'Dashboard', labelKey: 'nav.dashboard', path: '/', isLink: false }];
        }

        const crumbs = matchResult.ancestors.map(a => ({
            label: a.label,
            labelKey: a.labelKey,
            path: a.path,
            // 只有定义了组件的路由才是有效链接
            isLink: !!a.component && a.path !== location.pathname
        }));

        crumbs.push({
            label: matchResult.route.label,
            labelKey: matchResult.route.labelKey,
            path: matchResult.route.path,
            isLink: false // 当前页面不作为链接
        });

        return crumbs;
    }, [location.pathname]);

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '13.5rem',
                    '--sidebar-width-icon': '64px',
                } as React.CSSProperties
            }
        >
            <Sidebar />

            <SidebarInset className="min-w-0">
                <header className="h-14 border-b flex items-center px-4 gap-4 bg-background/95 backdrop-blur shrink-0 z-10">
                    <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:text-foreground" />

                    <div className="h-4 w-[1px] bg-border mx-1" />

                    <nav className="flex items-center text-sm font-medium overflow-hidden">
                        {breadcrumbs.map((crumb, i) => (
                            <React.Fragment key={crumb.path + i}>
                                {i > 0 && <ChevronRight className="h-3.5 w-3.5 mx-2 text-muted-foreground shrink-0" />}
                                {crumb.isLink ? (
                                    <Link
                                        to={crumb.path}
                                        className="text-muted-foreground hover:text-foreground transition-colors truncate"
                                    >
                                        {t(crumb.labelKey, { defaultValue: crumb.label })}
                                    </Link>
                                ) : (
                                    <span className={i === breadcrumbs.length - 1 ? "text-foreground truncate" : "text-muted-foreground cursor-default truncate"}>
                    {t(crumb.labelKey, { defaultValue: crumb.label })}
                  </span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>

                    <div className="ml-auto w-10">
                        <Select value={languageValue} onValueChange={(value) => { void i18n.changeLanguage(value as 'en' | 'zh-CN'); }}>
                            <SelectTrigger
                                className="h-8 w-10 px-0 justify-center border-0 bg-transparent shadow-none ring-0 focus:ring-0 focus:ring-offset-0 hover:bg-accent/50 [&>svg:last-child]:hidden"
                                aria-label={t('settings.preferences.language')}
                                title={t('settings.preferences.language')}
                            >
                                <Globe className="h-5 w-5 text-muted-foreground" />
                            </SelectTrigger>
                            <SelectContent
                                side="bottom"
                                className="left-auto right-0 min-w-32"
                                style={{ width: '8rem', left: 'auto', right: 0 }}
                            >
                                <SelectItem value="en">{t('common.language.english')}</SelectItem>
                                <SelectItem value="zh-CN">{t('common.language.chineseSimplified')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-[#f4f6fa] p-6 dark:bg-muted/20">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
