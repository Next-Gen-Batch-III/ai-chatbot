const baseURL = import.meta.env.VITE_CHATBOT_API_URL?.replace(/\/$/, "");

let getTokenFn = null;
let redirecting = false;

/**
 * Register the async token getter produced by Clerk's useAuth().
 * Mirror of configureAuthInterceptor in client.js — call both together in App.jsx.
 * Returns a cleanup function that unregisters the getter.
 */
export const configureSseAuth = (getToken) => {
  getTokenFn = getToken;
  return () => {
    getTokenFn = null;
  };
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_MESSAGES = {
  401: "Your session has expired. Please sign in again.",
  403: "You do not have permission to perform this action.",
  404: "The requested resource was not found.",
  429: "Too many requests. Please try again shortly.",
};

function buildError(status, message, code = "SSE_ERROR") {
  return Object.assign(new Error(message), { status, code });
}

async function handleErrorResponse(response) {
  const status = response.status;

  let data = null;
  try {
    data = await response.json();
  } catch {
    // ignore — body may not be JSON
  }

  if (
    status === 401 &&
    !redirecting &&
    location.pathname !== "/login"
  ) {
    redirecting = true;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    location.assign("/login");
  }

  const message =
    data?.message ||
    STATUS_MESSAGES[status] ||
    (status >= 500
      ? "The service is temporarily unavailable."
      : "The request could not be completed.");

  throw buildError(status, message);
}

/**
 * Async generator that yields each complete line from the fetch ReadableStream.
 * Handles chunked delivery — a chunk may contain multiple lines or a partial line.
 */
async function* readLines(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      // Last element is either empty or an incomplete line — keep it in the buffer.
      buffer = lines.pop();

      for (const line of lines) {
        yield line;
      }
    }

    // Flush any remaining bytes after the stream closes.
    if (buffer) yield buffer;
  } finally {
    reader.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// Core stream function
// ---------------------------------------------------------------------------

/**
 * Makes a fetch request and streams the SSE response.
 *
 * @param {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"} method
 * @param {string} path  - Path relative to baseURL, e.g. "/api/chats"
 * @param {object} [options]
 * @param {unknown}        [options.body]      - Request body (will be JSON-serialised)
 * @param {AbortSignal}    [options.signal]    - AbortController signal for cancellation
 * @param {function}       [options.onEvent]   - Called with each parsed SSE event object
 * @param {boolean}        [options.skipAuth]  - Skip attaching the Bearer token
 *
 * SSE event shapes:
 *   { type: "start",   chatId, chatTitle }
 *   { type: "thought", chatId, content }
 *   { type: "text",    chatId, content }
 *   { type: "end",     chatId, chatTitle }
 */
async function stream(method, path, { body, signal, onEvent, skipAuth = false } = {}) {
  const url = `${baseURL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  };

  if (!skipAuth && getTokenFn) {
    const token = await getTokenFn();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body != null ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;

    if (err.name === "TimeoutError") {
      throw buildError(0, "The request timed out. Please try again.", "ETIMEDOUT");
    }

    throw buildError(
      0,
      "Unable to reach the service. Check your connection.",
      "NETWORK_ERROR",
    );
  }

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  // Parse SSE frames from the stream.
  for await (const line of readLines(response)) {
    // SSE spec: event data lines start with "data:"
    if (!line.startsWith("data:")) continue;

    const raw = line.slice(5).trim();
    if (!raw) continue;

    let event;
    try {
      event = JSON.parse(raw);
    } catch {
      // Malformed frame — skip silently.
      continue;
    }

    onEvent?.(event);
  }
}

// ---------------------------------------------------------------------------
// Public client (axios-shaped interface)
// ---------------------------------------------------------------------------

export const sseClient = {
  /** POST a JSON body and stream the SSE response. */
  post: (path, body, config) => stream("POST", path, { body, ...config }),

  /** GET and stream the SSE response. */
  get: (path, config) => stream("GET", path, config),
};
