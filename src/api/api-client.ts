import axios from "axios";
import { useAuthStore } from "@/stores/api/auth-store";

const api = axios.create({ baseURL: "https://easydev.club/api/v1" });

let refreshing = false;

api.interceptors.request.use(
  function (config) {
    const { accessToken } = useAuthStore();
    if (accessToken) {
      console.log("sent token is", accessToken);

      config.headers.Authorization = `Bearer ${accessToken}`;
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
    const originalRequest = error.config;
    if (error.status === 401 && !refreshing) {
      console.log("before store refresh");
      const { refresh, logout } = useAuthStore();
      refreshing = true;
      const result = await refresh()
        .catch(async (error) => {
          console.log("before refresh 401 check", error.status);
          if (error.status === 401) {
            console.log("before store logout", error);
            await logout().catch((error) => {
              alert(error);
            });
          }
        })
        .finally(() => (refreshing = false));
      if (result) {
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return api(originalRequest);
      }
    }
    throw error;
  },
);

export { api };
