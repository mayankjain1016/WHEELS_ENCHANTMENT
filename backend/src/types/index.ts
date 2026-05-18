export interface ImageObject {
  url: string;
  thumbnail: string;
  alt: string;
  filename: string;
  width?: number;
  height?: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
  isActive: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  select?: string;
}

export interface FilterQuery extends PaginationQuery {
  search?: string;
  category?: string;
  status?: string;
  isActive?: string;
  isFeatured?: string;
}

export type UserRole = 'admin' | 'super_admin';

export type LeadStatus = 'New' | 'Contacted' | 'Enrolled' | 'Rejected';

export type LeadSource = 'Website' | 'Referral' | 'School';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type GalleryCategory = 'Training' | 'Competition' | 'Events' | 'Facilities' | 'Students' | 'Other';

export type SettingType = 'text' | 'number' | 'boolean' | 'json';

export type SettingCategory = 'general' | 'contact' | 'social' | 'seo';
