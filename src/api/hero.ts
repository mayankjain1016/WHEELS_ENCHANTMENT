import apiClient from './client';

export const heroApi = {
  async getAll(params = {}) {
    const response = await apiClient.get('/hero-slides', { params });
    return response.data.data || response.data;
  },

  async getById(id) {
    const response = await apiClient.get(`/hero-slides/${id}`);
    return response.data.data || response.data;
  },

  async create(formData) {
    const response = await apiClient.post('/hero-slides', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data || response.data;
  },

  async update(id, formData) {
    const response = await apiClient.put(`/hero-slides/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data || response.data;
  },

  async delete(id) {
    const response = await apiClient.delete(`/hero-slides/${id}`);
    return response.data;
  }
};
