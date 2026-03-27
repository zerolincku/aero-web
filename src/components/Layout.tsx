import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ChevronRight, Globe } from 'lucide-react';
import { navRoutes, type RouteConfig } from '../lib/routes';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';

const findRouteWithParents = (
    routes: RouteConfig[],
    targetPath: string,
    parents: RouteConfig[] = [],
): { route: RouteConfig; ancestors: RouteConfig[] } | null => {
    for (const route of routes) {
        if (route.path === targetPath) {
            return { route, ancestors: parents };
        }
        if (route.children) {
            const found = findRouteWithParents(route.children, targetPath, [...parents, route]);
            if (found) {
                return found;
            }
        }
    }
    return null;
};

export default function Layout() {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const languageValue = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en';

    // 深度查找当前路由及其祖先
    const breadcrumbs = (() => {
        if (location.pathname.startsWith('/infrastructure/hosts/')) {
            const rawHostId = location.pathname.replace('/infrastructure/hosts/', '').split('/')[0];
            const hostId = decodeURIComponent(rawHostId || '');
            return [
                {
                    label: 'Infrastructure',
                    labelKey: 'nav.infrastructure',
                    path: '/infrastructure',
                    isLink: false
                },
                {
                    label: 'Host List',
                    labelKey: 'nav.hostList',
                    path: '/infrastructure/hosts',
                    isLink: true
                },
                {
                    label: hostId || 'Host Detail',
                    labelKey: hostId || 'hostDetail.title',
                    path: location.pathname,
                    isLink: false
                },
            ];
        }

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
    })();

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

                    <div className="ml-auto flex items-center gap-1">
                        <a
                            href="https://github.com/zerolincku/aero-web"
                            target="_blank"
                            rel="noreferrer"
                            className="h-8 w-10 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors hover:bg-accent/50 rounded-md"
                            aria-label="Open GitHub repository"
                            title="GitHub"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .5C5.649.5.5 5.649.5 12c0 5.084 3.292 9.387 7.862 10.91.575.106.786-.25.786-.556 0-.274-.01-1-.016-1.962-3.197.694-3.872-1.54-3.872-1.54-.523-1.329-1.278-1.682-1.278-1.682-1.044-.714.079-.699.079-.699 1.155.081 1.762 1.186 1.762 1.186 1.026 1.759 2.692 1.251 3.348.957.104-.743.402-1.251.731-1.539-2.553-.291-5.238-1.276-5.238-5.679 0-1.255.449-2.281 1.184-3.085-.118-.291-.513-1.462.112-3.049 0 0 .965-.309 3.162 1.179a10.997 10.997 0 0 1 2.878-.387c.976.004 1.96.132 2.879.387 2.195-1.488 3.159-1.179 3.159-1.179.627 1.587.232 2.758.114 3.049.737.804 1.183 1.83 1.183 3.085 0 4.414-2.689 5.384-5.25 5.669.413.355.781 1.059.781 2.135 0 1.541-.014 2.783-.014 3.162 0 .309.207.668.793.554C20.211 21.383 23.5 17.082 23.5 12c0-6.351-5.149-11.5-11.5-11.5z" />
                            </svg>
                        </a>

                        <div className="w-10">
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
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-[#f4f6fa] p-6 dark:bg-muted/20">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
