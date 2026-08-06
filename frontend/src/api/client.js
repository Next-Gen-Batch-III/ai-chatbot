import axios from "axios";

const baseURL = import.meta.env.VITE_CHATBOT_API_URL?.replace(/\/$/, "");
let redirecting = false;

export const apiClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: { Accept: "application/json" },
});

let authInterceptorId;

export const configureAuthInterceptor = (getToken) => {
  if (authInterceptorId !== undefined) {
    apiClient.interceptors.request.eject(authInterceptorId);
  }

  const interceptorId = apiClient.interceptors.request.use(async (config) => {
    if (!config.skipAuth) {
      const token = await getToken();

      if (token) {
        config.headers ??= {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  authInterceptorId = interceptorId;

  return () => {
    if (authInterceptorId === interceptorId) {
      apiClient.interceptors.request.eject(interceptorId);
      authInterceptorId = undefined;
    }
  };
};

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (
      status === 401 &&
      !error.config?.skipUnauthorizedRedirect &&
      location.pathname !== "/login" &&
      !redirecting
    ) {
      redirecting = true;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      location.assign("/login");
    }

    const messages = {
      401: "Your session has expired. Please sign in again.",
      403: "You do not have permission to perform this action.",
      404: "The requested resource was not found.",
      429: "Too many requests. Please try again shortly.",
    };

    let message =
      error.response?.data?.message ||
      messages[status] ||
      (status >= 500
        ? "The service is temporarily unavailable."
        : "The request could not be completed.");

    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      message = "The request timed out. Please try again.";
    } else if (!error.response) {
      message = "Unable to reach the service. Check your connection.";
    }

    return Promise.reject(
      Object.assign(new Error(message), {
        status: status || 0,
        code: error.code || "API_ERROR",
      }),
    );
  },
);
