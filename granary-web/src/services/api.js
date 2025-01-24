import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const readingsApi = {
  getAll: () => api.get('/readings'),
  getById: (id) => api.get(`/readings/${id}`),
  create: (data) => api.post('/readings', data),
  update: (id, data) => api.put(`/readings/${id}`, data),
  delete: (id) => api.delete(`/readings/${id}`),
  getByDateRange: (start, end) => 
    api.get(`/readings?timestamp_gte=${start}&timestamp_lte=${end}`),
};

export const alertsApi = {
  getAll: () => api.get('/alerts'),
  getActive: () => api.get('/alerts?status=active'),
  create: (data) => api.post('/alerts', data),
  update: (id, data) => api.put(`/alerts/${id}`, data),
  delete: (id) => api.delete(`/alerts/${id}`),
};

export const settingsApi = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

export const zonesApi = {
  getAll: () => api.get('/zones'),
  update: (id, data) => api.put(`/zones/${id}`, data),
}; 