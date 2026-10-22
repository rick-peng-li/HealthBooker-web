import axios from "axios";
import { getToken, removeToken } from "@/utils/auth";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
});

request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Network error";
    if (status === 401) {
      removeToken();
    }
    return Promise.reject(new Error(message));
  }
);

export default request;
