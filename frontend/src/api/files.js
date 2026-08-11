import { apiClient } from './client';

export const uploadFile = (formData, config) => apiClient.post('/api/files', formData, config);

export const getFiles = (config) => apiClient.get('/api/files', config);

export const deleteFile = (fileId, config) => apiClient.delete(`/api/files/${fileId}`, config);

export const createFileEmbedding = (fileId, payload, config) => (
  apiClient.post(`/api/files/${fileId}/embedding`, payload, config)
);
