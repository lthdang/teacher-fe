import tenantsData from '../sample-data/tenants.json';

export interface TenantSettings {
  logo_url: string;
  theme_color: string;
  timezone: string;
  academic_year_start_month: number;
}

export interface TenantAddress {
  street: string;
  ward: string;
  district: string;
  province: string;
}

export interface TenantContact {
  phone: string;
  email: string;
  fanpage: string;
}

export interface TenantStats {
  teacher_count: number;
  student_count: number;
  class_count: number;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  school_level: 'thpt' | 'thcs' | 'university' | string;
  province_code: string;
  is_active: boolean;
  is_recruiting: boolean;
  recruiting_note: string | null;
  settings: TenantSettings;
  address: TenantAddress;
  contact: TenantContact;
  stats: TenantStats;
  created_at: string;
}

export const getTenants = (): Tenant[] => {
  return (tenantsData as { tenants: Tenant[] }).tenants;
};

export const getTenantByIdOrSlug = (idOrSlug: string): Tenant | undefined => {
  const tenants = getTenants();
  return tenants.find((t) => t.id === idOrSlug || t.slug === idOrSlug);
};

export const formatSchoolLevel = (level: string): string => {
  switch (level.toLowerCase()) {
    case 'thpt':
      return 'THPT (High School)';
    case 'thcs':
      return 'THCS (Secondary School)';
    case 'university':
      return 'Đại học (University)';
    default:
      return level.toUpperCase();
  }
};
