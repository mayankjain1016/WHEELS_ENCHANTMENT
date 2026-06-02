import client from './client';

export const reviewsApi = {
  create: async (data: { name: string; role: string; rating: number; comment: string }) => {
    const response = await client.post('/reviews', data);
    return response.data;
  },

  getApproved: async () => {
    const response = await client.get('/reviews/approved');
    return response.data.data?.reviews || [];
  },

  getAll: async (params?: { isApproved?: boolean; isActive?: boolean; page?: number; limit?: number }) => {
    const response = await client.get('/reviews', { params });
    // Backend returns paginated: { success, message, data: [...], meta: {...} }
    return response.data;
  },

  getById: async (id: string) => {
    const response = await client.get(`/reviews/${id}`);
    return response.data.review;
  },

  update: async (id: string, data: any) => {
    const response = await client.put(`/reviews/${id}`, data);
    return response.data.review;
  },

  approve: async (id: string) => {
    const response = await client.patch(`/reviews/${id}/approve`);
    return response.data.review;
  },

  delete: async (id: string) => {
    await client.delete(`/reviews/${id}`);
  },
};
