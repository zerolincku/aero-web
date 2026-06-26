export const ROUTE_PATHS = {
  DASHBOARD: '/',
  
  INFRASTRUCTURE: '/infrastructure',
  HOST_LIST: '/infrastructure/hosts',
  HOST_DETAIL: '/infrastructure/hosts/:hostname',
  REGIONS_AZS: '/infrastructure/regions-azs',
  VMS: '/infrastructure/vms',
  STORAGE_POOLS: '/infrastructure/storage-pools',
  
  MANAGEMENT: '/management',
  USER_LIST: '/management/users',
  ORG_LIST: '/management/orgs',
  USER_GROUPS: '/management/groups',
  
  SYSTEM: '/system',
  SETTINGS: '/system/settings',
  SECURITY: '/system/security',

  COMPONENTS: '/components',
} as const;
