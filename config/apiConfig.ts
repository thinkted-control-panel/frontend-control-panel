import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// ------------------ interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  (error) => {
    if (!error.response) return Promise.reject(error);

    const { status } = error.response;

    if (status === 401) {
      localStorage.clear();
      sessionStorage.removeItem("hasSeenPasswordPopup");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
