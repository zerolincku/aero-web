import React, { lazy } from 'react';
import {
    LayoutDashboard,
    Users,
    Settings,
    Circle,
    type LucideIcon
} from 'lucide-react';
import NotFound from "@/pages/NotFound.tsx";

// Lazy load pages
const Dashboard = lazy(() => import('../pages/Dashboard'));
const UsersPage = lazy(() => import('../pages/Users'));
const OrgsPage = lazy(() => import('../pages/Orgs'));
const SettingsPage = lazy(() => import('../pages/Settings'));

// Type definition for route configuration
export type RouteConfig = {
    path: string;
    label: string;
    labelKey: string;
    icon?: LucideIcon;
    component?: React.ComponentType; // component to render
    children?: RouteConfig[];
};

// Main Navigation Routes (Used for Sidebar and App Routing)
export const navRoutes: RouteConfig[] = [
    {
        path: '/',
        label: 'Dashboard',
        labelKey: 'nav.dashboard',
        icon: LayoutDashboard,
        component: Dashboard,
    },
    {
        path: '/management', // Unique parent path
        label: 'Management',
        labelKey: 'nav.management',
        icon: Users,
        children: [
            {
                path: '/management/users',
                label: 'User List',
                labelKey: 'nav.userList',
                icon: Circle,
                component: UsersPage
            },
            {
                path: '/management/orgs',
                label: 'Org List',
                labelKey: 'nav.orgList',
                icon: Circle,
                component: OrgsPage
            },
            {
                path: '/management/groups',
                label: 'User Groups',
                labelKey: 'nav.userGroups',
                icon: Circle,
                component: NotFound
            },
        ]
    },
    {
        path: '/system', // Unique parent path
        label: 'System',
        labelKey: 'nav.system',
        icon: Settings,
        children: [
            {
                path: '/system/settings',
                label: 'General Settings',
                labelKey: 'nav.generalSettings',
                icon: Circle,
                component: SettingsPage
            },
            {
                path: '/system/security',
                label: 'Security',
                labelKey: 'nav.security',
                icon: Circle,
                component: NotFound
            }
        ]
    }
];
