import apiClient from './client';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  hasSubcategories: boolean;
  displayOrder: number;
  isActive: boolean;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
}

export const categoriesApi = {
  // Get all categories
  getAll: async () => {
    const response = await apiClient.get('/categories');
    return response.data.data.categories;
  },

  // Get category by ID with subcategories
  getById: async (id: string) => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data.data;
  },

  // Create category (admin)
  create: async (data: { name: string; description?: string; isActive?: boolean }) => {
    const response = await apiClient.post('/categories', data);
    return response.data.data.category;
  },

  // Update category (admin)
  update: async (id: string, data: { name?: string; description?: string; isActive?: boolean }) => {
    const response = await apiClient.put(`/categories/${id}`, data);
    return response.data.data.category;
  },

  // Delete category (admin)
  delete: async (id: string) => {
    await apiClient.delete(`/categories/${id}`);
  },

  // Get subcategories for a category
  getSubcategories: async (categoryId: string) => {
    const response = await apiClient.get(`/categories/${categoryId}/subcategories`);
    return response.data.data.subcategories;
  },

  // Create subcategory (admin)
  createSubcategory: async (data: { name: string; categoryId: string; description?: string; isActive?: boolean }) => {
    const response = await apiClient.post('/categories/subcategories', data);
    return response.data.data.subcategory;
  },

  // Update subcategory (admin)
  updateSubcategory: async (id: string, data: { name?: string; description?: string; isActive?: boolean }) => {
    const response = await apiClient.put(`/categories/subcategories/${id}`, data);
    return response.data.data.subcategory;
  },

  // Delete subcategory (admin)
  deleteSubcategory: async (id: string) => {
    await apiClient.delete(`/categories/subcategories/${id}`);
  },
};
