import apiClient from './client';

export interface Product {
  _id: string;
  name: string;
  slug: string;
  categoryId: {
    _id: string;
    name: string;
    slug: string;
  };
  subcategoryId?: {
    _id: string;
    name: string;
    slug: string;
  };
  description?: string;
  specifications?: string;
  images: Array<{
    url: string;
    thumbnail: string;
    alt: string;
    filename: string;
  }>;
  price?: number;
  compareAtPrice?: number;
  sku?: string;
  stock: number;
  isInStock: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  displayOrder: number;
  isActive: boolean;
}

export const productsApi = {
  // Get all products with filters
  getAll: async (params?: {
    page?: number;
    limit?: number;
    categoryId?: string;
    subcategoryId?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    search?: string;
  }) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  // Get product by ID
  getById: async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data.data.product;
  },

  // Get product by slug
  getBySlug: async (slug: string) => {
    const response = await apiClient.get(`/products/slug/${slug}`);
    return response.data.data.product;
  },

  // Create product (admin)
  create: async (formData: FormData) => {
    const response = await apiClient.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.product;
  },

  // Update product (admin)
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/products/${id}`, data);
    return response.data.data.product;
  },

  // Add images to product
  addImages: async (id: string, formData: FormData) => {
    const response = await apiClient.post(`/products/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.product;
  },

  // Delete product image
  deleteImage: async (id: string, filename: string) => {
    await apiClient.delete(`/products/${id}/images/${filename}`);
  },

  // Delete product (admin)
  delete: async (id: string) => {
    await apiClient.delete(`/products/${id}`);
  },
};
