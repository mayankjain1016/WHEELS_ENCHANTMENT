import apiClient from './client';

export interface GalleryImage {
  _id: string;
  title?: string;
  caption?: string;
  image: {
    url: string;
    thumbnail: string;
    alt: string;
    filename: string;
    width: number;
    height: number;
  };
  category: 'Training' | 'Students' | 'Events';
  tags: string[];
  uploadDate: string;
  displayOrder: number;
  isActive: boolean;
}

export const galleryApi = {
  // Get all gallery images
  getAll: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    tags?: string;
    isActive?: boolean;
  }) => {
    const response = await apiClient.get('/gallery', { params });
    return response.data;
  },

  // Get gallery image by ID
  getById: async (id: string) => {
    const response = await apiClient.get(`/gallery/${id}`);
    return response.data.data.image;
  },

  // Get gallery categories
  getCategories: async () => {
    const response = await apiClient.get('/gallery/categories/list');
    return response.data.data.categories;
  },

  // Upload single image (admin)
  create: async (formData: FormData) => {
    const response = await apiClient.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.image;
  },

  // Upload single image (admin) - alias
  upload: async (formData: FormData) => {
    const response = await apiClient.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.image;
  },

  // Bulk upload images (admin)
  bulkUpload: async (formData: FormData) => {
    const response = await apiClient.post('/gallery/bulk', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  // Update gallery image (admin)
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/gallery/${id}`, data);
    return response.data.data.image;
  },

  // Delete gallery image (admin)
  delete: async (id: string) => {
    await apiClient.delete(`/gallery/${id}`);
  },

  // Bulk delete images (admin)
  bulkDelete: async (ids: string[]) => {
    await apiClient.post('/gallery/bulk-delete', { ids });
  },
};
