import apiClient from './client';

export interface Lead {
  _id: string;
  studentName: string;
  dateOfBirth: string;
  school: string;
  fatherName: string;
  fatherMobile: string;
  motherName: string;
  motherMobile: string;
  address: string;
  email: string;
  photo?: string;
  aadharCard?: string;
  age?: number;
  location?: string;
  preferredLocation?: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  message?: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Rejected';
  source: 'Website' | 'Referral' | 'School';
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  };
  notes: Array<{
    text: string;
    addedBy: {
      _id: string;
      name: string;
    };
    addedAt: string;
  }>;
  followUpDate?: string;
  submittedAt: string;
  updatedAt: string;
}

export interface CreateLeadData {
  studentName: string;
  dateOfBirth: string;
  school: string;
  fatherName: string;
  fatherMobile: string;
  motherName: string;
  motherMobile: string;
  address: string;
  email: string;
  age?: number;
  location?: string;
  preferredLocation?: string;
  experienceLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  message?: string;
}

export const leadsApi = {
  // Submit lead form (public)
  submit: async (data: FormData) => {
    const response = await apiClient.post('/leads', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data.lead;
  },

  // Get all leads (admin)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    source?: string;
    search?: string;
  }) => {
    const response = await apiClient.get('/leads', { params });
    return response.data;
  },

  // Get lead by ID (admin)
  getById: async (id: string) => {
    const response = await apiClient.get(`/leads/${id}`);
    return response.data.data.lead;
  },

  // Get lead statistics (admin)
  getStats: async () => {
    const response = await apiClient.get('/leads/stats/dashboard');
    return response.data.data;
  },

  // Update lead (admin)
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/leads/${id}`, data);
    return response.data.data.lead;
  },

  // Update lead status (admin)
  updateStatus: async (id: string, status: string) => {
    const response = await apiClient.patch(`/leads/${id}/status`, { status });
    return response.data.data.lead;
  },

  // Assign lead (admin)
  assign: async (id: string, assignedTo: string) => {
    const response = await apiClient.patch(`/leads/${id}/assign`, { assignedTo });
    return response.data.data.lead;
  },

  // Add note to lead (admin)
  addNote: async (id: string, text: string) => {
    const response = await apiClient.post(`/leads/${id}/notes`, { text });
    return response.data.data.lead;
  },

  // Delete lead (admin)
  delete: async (id: string) => {
    await apiClient.delete(`/leads/${id}`);
  },
};
