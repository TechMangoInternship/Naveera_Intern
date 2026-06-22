import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const gridService = {
  getRows: async (gridName) => {
    const response = await apiClient.get(`/grids/${gridName}/rows`);
    return response.data;
  },

  addRow: async (gridName, data) => {
    const response = await apiClient.post(`/grids/${gridName}/rows`, { data });
    return response.data;
  },

  updateRow: async (id, data) => {
    const response = await apiClient.put(`/grids/rows/${id}`, { data });
    return response.data;
  },

  deleteRow: async (id) => {
    const response = await apiClient.delete(`/grids/rows/${id}`);
    return response.data;
  },
};
