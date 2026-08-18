import axios from "axios";

export const thinklibApi = axios.create({
  baseURL: "/thinklib-api",
});

thinklibApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

thinklibApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
