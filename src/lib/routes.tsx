import React from 'react';
import {
    LayoutDashboard,
    Server,
    Users,
    Settings,
    Circle,
    type LucideIcon
} from 'lucide-react';
import {
    DashboardPage,
    HostsPage,
    NotFoundPage,
    OrgsPage,
    RegionsAzPage,
    SettingsPage,
    UsersPage,
} from '@/lib/route-components';

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
        component: DashboardPage,
    },
    {
        path: '/infrastructure',
        label: 'Infrastructure',
        labelKey: 'nav.infrastructure',
        icon: Server,
        children: [
            {
                path: '/infrastructure/hosts',
                label: 'Host List',
                labelKey: 'nav.hostList',
                icon: Circle,
                component: HostsPage
            },
            {
                path: '/infrastructure/regions-azs',
                label: 'Regions & AZs',
                labelKey: 'nav.regionsAzs',
                icon: Circle,
                component: RegionsAzPage,
            },
            {
                path: '/infrastructure/vms',
                label: 'Virtual Machines',
                labelKey: 'nav.virtualMachines',
                icon: Circle,
                component: NotFoundPage
            },
            {
                path: '/infrastructure/storage-pools',
                label: 'Storage Pools',
                labelKey: 'nav.storagePools',
                icon: Circle,
                component: NotFoundPage
            },
        ]
    },
    {
        path: '/management',
        label: 'Management',
        labelKey: 'nav.management',
        icon: Users,
        children: [
            {
                path: '/management/users',
                label: 'User List',
                labelKey: 'nav.userList',
                icon: Circle,
                component: UsersPage,
            },
            {
                path: '/management/orgs',
                label: 'Org List',
                labelKey: 'nav.orgList',
                icon: Circle,
                component: OrgsPage,
            },
            {
                path: '/management/groups',
                label: 'User Groups',
                labelKey: 'nav.userGroups',
                icon: Circle,
                component: NotFoundPage,
            },
        ],
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
                component: NotFoundPage
            }
        ]
    }
];
