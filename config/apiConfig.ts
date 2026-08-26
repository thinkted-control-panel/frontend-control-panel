import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

async function getAuthSession() {
  if (typeof window === "undefined") return null;

  const { getSession } = await import("next-auth/react");
  return getSession();
}

// ------------------ interceptors
api.interceptors.request.use(
  async (config) => {
    const session = await getAuthSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) return Promise.reject(error);

    const { status } = error.response;


    const requestUrl = error.config?.url ?? "";
    const isAuthEndpoint = requestUrl.includes("/api/auth");
    const isOnLoginPage =
      typeof window !== "undefined" && window.location.pathname === "/login";

    if (status === 401 && !isAuthEndpoint && !isOnLoginPage) {
      const session = await getAuthSession();

      if (!session || session.error === "RefreshAccessTokenError") {
        sessionStorage.removeItem("hasSeenPasswordPopup");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
