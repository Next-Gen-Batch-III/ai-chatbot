import axios from "axios";

const baseURL = import.meta.env.VITE_CHATBOT_API_URL?.replace(/\/$/, "");
let redirecting = false;

export const apiClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: { Accept: "application/json" },
});

// ---------------------------------------------------------------------------
// Auth — mutable ref pattern
//
// The interceptor is registered ONCE at module load time and always reads
// from `getTokenRef`. configureAuthInterceptor() just swaps the ref so there
// is never a window between eject and re-add where requests go header-less.
// ---------------------------------------------------------------------------
let getTokenRef = null;

apiClient.interceptors.request.use(async (config) => {
  if (!config.skipAuth && getTokenRef) {
    try {
      const token = await getTokenRef();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn(
        "[apiClient] getToken() threw — sending request without auth:",
        err,
      );
    }
  }

  return config;
});

/**
 * Call once in App.jsx with Clerk's getToken from useAuth().
 * Returns a cleanup function that clears the ref (safe to use as useEffect return).
 */
export const configureAuthInterceptor = (getToken) => {
  getTokenRef = getToken;

  return () => {
    // Only clear if this call is still the active one.
    if (getTokenRef === getToken) {
      getTokenRef = null;
    }
  };
};

// ---------------------------------------------------------------------------
// Response — error normalisation + 401 redirect
// ---------------------------------------------------------------------------
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
