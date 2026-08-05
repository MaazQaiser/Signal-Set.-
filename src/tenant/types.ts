export type Tenant = 'filtergo' | 'signal';

export const TENANT_HOME: Record<Tenant, string> = {
  filtergo: '/filtergo',
  signal: '/signal',
};

export const TENANT_LABEL: Record<Tenant, string> = {
  filtergo: 'FilterGo',
  signal: 'Signal',
};
