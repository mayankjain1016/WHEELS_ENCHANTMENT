import apiClient from './client';

export interface Coach {
  _id: string;
  name: string;
  role: string;
  experience: string;
  specialty?: string;
  bio?: string;
  image: {
    url: string;
    thumbnail: string;
    alt: string;
  };
  displayOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
  };
}

export const coachesApi = {
  // Get all coaches (public)
  getAll: async (params?: { isActive?: boolean; isFeatured?: boolean }) => {
    const response = await apiClient.get('/coaches', { params });
    return response.data.data || [];
  },

  // Get coach by ID
  getById: async (id: string) => {
    const response = await apiClient.get(`/coaches/${id}`);
    return response.data.data.coach;
  },

  // Create coach (admin)
  create: async (formData: FormData) => {
    const response = await apiClient.post('/coaches', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.coach;
  },

  // Update coach (admin)
  update: async (id: string, formData: FormData) => {
    const response = await apiClient.put(`/coaches/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.coach;
  },

  // Delete coach (admin)
  delete: async (id: string) => {
    await apiClient.delete(`/coaches/${id}`);
  },

  // Toggle active status
  toggleActive: async (id: string) => {
    const response = await apiClient.patch(`/coaches/${id}/toggle-active`);
    return response.data.data.coach;
  },

  // Toggle featured status
  toggleFeatured: async (id: string) => {
    const response = await apiClient.patch(`/coaches/${id}/toggle-featured`);
    return response.data.data.coach;
  },

  // Reorder coaches
  reorder: async (coaches: { id: string; displayOrder: number }[]) => {
    await apiClient.post('/coaches/reorder', { coaches });
  },
};
