import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import authApi from "@/api/auth-api";
import { useRouter } from "vue-router";
import type { AuthData } from "@/types/auth-types";
import type { Token } from "@/types/auth-types";
import { showError } from "@/util/util";
import { tokenManager } from "@/api/token-manager";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  // State
  const isAuthorized = ref<boolean | null>(!!tokenManager.refreshToken);

  //Actions
  const login = async (form: AuthData) => {
    await authApi
      .sendAuthData(form)
      .then((result) => {
        tokenManager.setToken(result);
        setAuth(true);
        router.push({ path: "/" });
      })
      .catch(() => {
        showError("Ошибка при авторизации");
      });
  };
  const setAuth = (value: boolean) => {
    isAuthorized.value = value;
  };
  const refresh = async (): Promise<Token> => {
    const refreshToken = tokenManager.refreshToken;
    if (!refreshToken) {
      logout();
      throw new Error();
    }
    const token = await authApi
      .refresh({ refreshToken })
      .then((result) => {
        tokenManager.setToken(result);
        return result;
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.status === 401) {
          logout();
        } else showError("Ошибка при авторизации");
        return error;
      });
    return token;
  };

  const logout = () => {
    authApi.logout().then(() => {
      setAuth(false);
      tokenManager.setToken({ accessToken: null, refreshToken: null });
      router.push({ path: "/login" });
    });
  };

  return {
    isAuthorized,
    refresh,
    login,
    logout,
  };
});
