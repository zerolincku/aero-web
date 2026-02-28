import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { APP_CONFIG } from '@/config/app';

const LANGUAGE_STORAGE_KEY = 'app_language';
export const SUPPORTED_LANGUAGES = ['en', 'zh-CN'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
    en: {
        translation: {
            app: {
                brand: APP_CONFIG.brand,
                commandCenter: APP_CONFIG.commandCenter.en,
            },
            nav: {
                dashboard: 'Dashboard',
                management: 'Management',
                userList: 'User List',
                orgList: 'Org List',
                userGroups: 'User Groups',
                system: 'System',
                generalSettings: 'General Settings',
                security: 'Security',
            },
            common: {
                actions: {
                    addUser: 'Add User',
                    addOrg: 'Add Org',
                    saveChanges: 'Save Changes',
                    logOut: 'Log Out',
                    signOut: 'Sign out',
                    signIn: 'Sign in',
                    signingIn: 'Signing in...',
                    goHome: 'Go Home',
                    reset: 'Reset',
                    decrease: 'Decrease',
                    increase: 'Increase',
                    filters: 'Filters',
                    show: 'Show',
                    perPage: 'per page',
                    navigate: 'Navigate',
                    select: 'Select',
                },
                status: {
                    active: 'Active',
                    inactive: 'Inactive',
                },
                role: {
                    admin: 'Admin',
                    editor: 'Editor',
                    viewer: 'Viewer',
                    administrator: 'Administrator',
                },
                theme: {
                    light: 'Light',
                    dark: 'Dark',
                    system: 'System',
                },
                language: {
                    english: 'English',
                    chineseSimplified: '简体中文',
                },
            },
            loading: {
                message: 'Loading...',
            },
            login: {
                title: 'Welcome back',
                description: 'Enter your email to sign in to your account',
                email: 'Email',
                password: 'Password',
                emailPlaceholder: 'm@example.com',
                successTitle: 'Success',
                successDescription: 'You have successfully logged in.',
                errorTitle: 'Error',
                errorDescription: 'Please enter both email and password.',
            },
            notFound: {
                description: 'Page not found.',
            },
            dashboard: {
                title: 'Dashboard',
                subtitle: 'Overview of your application state and metrics.',
                stats: {
                    totalRevenue: {
                        title: 'Total Revenue',
                        change: '+20.1% from last month',
                    },
                    activeUsers: {
                        title: 'Active Users',
                        change: '+180.1% from last month',
                    },
                    activeSessions: {
                        title: 'Active Sessions',
                        change: '+19% from last month',
                    },
                },
                stateDemo: {
                    title: 'Zustand State Demo',
                    description: 'Manage global state effortlessly. Current count is shared across the app.',
                },
            },
            users: {
                title: 'Users',
                subtitle: 'Manage user access and permissions.',
                allUsersTitle: 'All Users',
                allUsersDescription: 'A list of all users in your organization.',
                searchPlaceholder: 'Search users...',
                columns: {
                    avatar: 'Avatar',
                    name: 'Name',
                    role: 'Role',
                    status: 'Status',
                    actions: 'Actions',
                },
                noResults: 'No results found.',
                showingRange: 'Showing {{start}} - {{end}} of {{total}}',
                toast: {
                    title: 'Action Simulated',
                    description: 'Add user modal would open here.',
                },
            },
            orgs: {
                title: 'Orgs',
                subtitle: 'Monitor and manage organizational partners and clients.',
                searchPlaceholder: 'Quick search by name or head...',
                filterType: 'Type',
                filterStatus: 'Status',
                filterLocation: 'Location',
                selectTypePlaceholder: 'Select type',
                selectStatusPlaceholder: 'Select status',
                locationPlaceholder: 'Filter by city/state...',
                allTypes: 'All Types',
                allStatus: 'All Status',
                columns: {
                    orgName: 'Org Name',
                    type: 'Type',
                    location: 'Location',
                    headOfDept: 'Head of Dept',
                    status: 'Status',
                    actions: 'Actions',
                },
                noResults: 'No organizations matching your criteria.',
                showingRange: 'Showing {{start}} - {{end}} of {{total}}',
                toast: {
                    title: 'Org Management',
                    description: 'Opening registration form for new organization.',
                },
                types: {
                    university: 'University',
                    hospital: 'Hospital',
                    corporate: 'Corporate',
                    government: 'Government',
                    publicService: 'Public Service',
                },
            },
            settings: {
                title: 'Settings',
                subtitle: 'Manage your account settings and preferences.',
                profile: {
                    title: 'Profile Information',
                    description: 'Update your personal details here.',
                    displayName: 'Display Name',
                    email: 'Email Address',
                    role: 'Role',
                    id: 'ID',
                    lastUpdated: 'Last updated: {{time}}',
                    justNow: 'Just now',
                },
                preferences: {
                    title: 'Preferences',
                    description: 'Adjust your experience settings.',
                    language: 'Language',
                    toastTitle: 'Language Updated',
                    toastDescription: 'Application language has been switched.',
                },
                danger: {
                    title: 'Danger Zone',
                    description: 'Irreversible and sensitive actions.',
                    body: 'Sign out of your session on this device.',
                },
                toast: {
                    profileUpdatedTitle: 'Profile Updated',
                    profileUpdatedDescription: 'Your profile information has been saved.',
                    logoutTitle: 'Signed Out',
                    logoutDescription: 'You have been logged out.',
                },
            },
            sidebar: {
                quickSearch: 'Quick Search',
                quickSearchPlaceholder: 'Quick search...',
                appearance: 'Appearance',
                themeMode: 'Theme Mode',
                accentColor: 'Accent Color',
                searchPlaceholder: 'Search pages and management...',
                noResults: 'No results found for "{{query}}"',
                esc: 'ESC',
            },
        },
    },
    'zh-CN': {
        translation: {
            app: {
                brand: APP_CONFIG.brand,
                commandCenter: APP_CONFIG.commandCenter.zhCN,
            },
            nav: {
                dashboard: '仪表盘',
                management: '管理',
                userList: '用户列表',
                orgList: '组织列表',
                userGroups: '用户组',
                system: '系统',
                generalSettings: '通用设置',
                security: '安全',
            },
            common: {
                actions: {
                    addUser: '新增用户',
                    addOrg: '新增组织',
                    saveChanges: '保存修改',
                    logOut: '退出登录',
                    signOut: '退出',
                    signIn: '登录',
                    signingIn: '登录中...',
                    goHome: '返回首页',
                    reset: '重置',
                    decrease: '减少',
                    increase: '增加',
                    filters: '筛选',
                    show: '显示',
                    perPage: '每页',
                    navigate: '导航',
                    select: '选择',
                },
                status: {
                    active: '启用',
                    inactive: '停用',
                },
                role: {
                    admin: '管理员',
                    editor: '编辑',
                    viewer: '访客',
                    administrator: '管理员',
                },
                theme: {
                    light: '浅色',
                    dark: '深色',
                    system: '跟随系统',
                },
                language: {
                    english: 'English',
                    chineseSimplified: '简体中文',
                },
            },
            loading: {
                message: '加载中...',
            },
            login: {
                title: '欢迎回来',
                description: '输入你的邮箱登录账号',
                email: '邮箱',
                password: '密码',
                emailPlaceholder: 'm@example.com',
                successTitle: '成功',
                successDescription: '你已成功登录。',
                errorTitle: '错误',
                errorDescription: '请输入邮箱和密码。',
            },
            notFound: {
                description: '页面不存在。',
            },
            dashboard: {
                title: '仪表盘',
                subtitle: '应用状态与关键指标总览。',
                stats: {
                    totalRevenue: {
                        title: '总收入',
                        change: '较上月 +20.1%',
                    },
                    activeUsers: {
                        title: '活跃用户',
                        change: '较上月 +180.1%',
                    },
                    activeSessions: {
                        title: '活跃会话',
                        change: '较上月 +19%',
                    },
                },
                stateDemo: {
                    title: 'Zustand 状态示例',
                    description: '轻松管理全局状态，当前计数在应用内共享。',
                },
            },
            users: {
                title: '用户',
                subtitle: '管理用户访问与权限。',
                allUsersTitle: '全部用户',
                allUsersDescription: '组织内所有用户列表。',
                searchPlaceholder: '搜索用户...',
                columns: {
                    avatar: '头像',
                    name: '姓名',
                    role: '角色',
                    status: '状态',
                    actions: '操作',
                },
                noResults: '没有找到结果。',
                showingRange: '显示 {{start}} - {{end}}，共 {{total}} 条',
                toast: {
                    title: '模拟操作',
                    description: '这里将打开新增用户弹窗。',
                },
            },
            orgs: {
                title: '组织',
                subtitle: '监控并管理组织合作伙伴与客户。',
                searchPlaceholder: '按组织名或负责人快速搜索...',
                filterType: '类型',
                filterStatus: '状态',
                filterLocation: '地区',
                selectTypePlaceholder: '选择类型',
                selectStatusPlaceholder: '选择状态',
                locationPlaceholder: '按城市/州筛选...',
                allTypes: '全部类型',
                allStatus: '全部状态',
                columns: {
                    orgName: '组织名称',
                    type: '类型',
                    location: '地区',
                    headOfDept: '负责人',
                    status: '状态',
                    actions: '操作',
                },
                noResults: '没有符合条件的组织。',
                showingRange: '显示 {{start}} - {{end}}，共 {{total}} 条',
                toast: {
                    title: '组织管理',
                    description: '即将打开新增组织注册表单。',
                },
                types: {
                    university: '高校',
                    hospital: '医院',
                    corporate: '企业',
                    government: '政府',
                    publicService: '公共服务',
                },
            },
            settings: {
                title: '设置',
                subtitle: '管理账号设置与偏好。',
                profile: {
                    title: '个人信息',
                    description: '在这里更新你的个人资料。',
                    displayName: '显示名称',
                    email: '邮箱地址',
                    role: '角色',
                    id: 'ID',
                    lastUpdated: '最后更新：{{time}}',
                    justNow: '刚刚',
                },
                preferences: {
                    title: '偏好设置',
                    description: '调整你的使用体验。',
                    language: '语言',
                    toastTitle: '语言已更新',
                    toastDescription: '应用语言已切换。',
                },
                danger: {
                    title: '危险操作',
                    description: '不可逆且敏感的操作。',
                    body: '退出当前设备上的登录会话。',
                },
                toast: {
                    profileUpdatedTitle: '资料已更新',
                    profileUpdatedDescription: '你的个人信息已保存。',
                    logoutTitle: '已退出登录',
                    logoutDescription: '你已退出当前账号。',
                },
            },
            sidebar: {
                quickSearch: '快速搜索',
                quickSearchPlaceholder: '快速搜索...',
                appearance: '外观',
                themeMode: '主题模式',
                accentColor: '强调色',
                searchPlaceholder: '搜索页面和管理项...',
                noResults: '没有找到与 "{{query}}" 相关的结果',
                esc: 'ESC',
            },
        },
    },
};

const getInitialLanguage = (): SupportedLanguage => {
    if (typeof window === 'undefined') {
        return 'en';
    }

    const persisted = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (persisted && SUPPORTED_LANGUAGES.includes(persisted as SupportedLanguage)) {
        return persisted as SupportedLanguage;
    }

    const browserLanguage = window.navigator.language;
    if (browserLanguage.toLowerCase().startsWith('zh')) {
        return 'zh-CN';
    }

    return 'en';
};

void i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getInitialLanguage(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

i18n.on('languageChanged', (language) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
});

export default i18n;
