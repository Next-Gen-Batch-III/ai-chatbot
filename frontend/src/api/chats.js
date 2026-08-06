import { apiClient } from './client';

export const createChat = (payload, config) => apiClient.post('/api/chats', payload, config);

export const getChats = (config) => apiClient.get('/api/chats', config);

export const updateChat = (chatId, payload, config) => apiClient.patch(`/api/chats/${chatId}`, payload, config);

export const deleteChat = (chatId, config) => apiClient.delete(`/api/chats/${chatId}`, config);

export const toggleChatPin = (chatId, payload, config) => (
  apiClient.patch(`/api/chats/${chatId}/toggle-pin`, payload, config)
);
  