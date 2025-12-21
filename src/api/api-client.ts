import axios from "axios";
import { useAuthStore } from "@/stores/auth/auth-store";
import { tokenManager } from "./token-manager";

const api = axios.create({ baseURL: "https://easydev.club/api/v1" });
let refreshing: boolean = false;

api.interceptors.request.use(
  async function (config) {
    if (tokenManager.getAccessToken()) {
      config.headers.Authorization = `Bearer ${tokenManager.getAccessToken()}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const setRefreshing = (value: boolean) => {
      refreshing = value;
    };
    const { refresh } = useAuthStore();
    const originalRequest = error.config;
    if (error.status === 401 && !refreshing) {
      setRefreshing(true);
      await refresh()
        .then((result) => {
          if (result) {
            originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
            return api(originalRequest);
          }
        })
        .finally(() => {
          setTimeout(() => {
            setRefreshing(false);
          }, 5000);
        });
    }
    throw error;
  },
);

export { api };
