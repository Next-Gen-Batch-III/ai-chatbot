import { apiClient } from "./client";

export const createProject = (payload, config) =>
  apiClient.post("/api/projects", payload, config);

export const getProjects = (config) =>
  apiClient.get("/api/projects", config);
