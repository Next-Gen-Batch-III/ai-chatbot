import { apiClient } from './client';

export const createMessage = (chatId, payload, config) => (
  apiClient.post(`/api/chats/${chatId}/messages`, payload, config)
);

export const getChatMessages = (chatId, config) => apiClient.get(`/api/chats/${chatId}/messages`, config);
