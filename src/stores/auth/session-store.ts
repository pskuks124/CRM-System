import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import axios from "axios";
import authApi from "@/api/auth-api";
import { useRouter } from "vue-router";
import type { AuthData, Profile } from "@/types/auth-types";
import type { Token } from "@/types/auth-types";
import { showError } from "@/util/util";
import { tokenManager } from "@/api/token-manager";

export const useSessionStore = defineStore("auth", () => {
  const router = useRouter();

  // State
  const isAuthorized = ref<boolean | null>(!!tokenManager.refreshToken);

  const profile = reactive<Profile>({
    id: 0,
    username: "",
    email: "",
    date: "",
    isBlocked: false,
    roles: [],
    phoneNumber: "",
  });

  const adminAccess = computed(() => profile.roles.includes("ADMIN"));
  const moderatorAccess = computed(() => profile.roles.includes("MODERATOR"));
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
  // сменить showError на showFetchError
  const setAuth = (value: boolean) => {
    isAuthorized.value = value;
  };
  const validateToken = async (): Promise<Token> => {
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
    if (tokenManager.refreshToken) authApi.logout();
    setAuth(false);
    tokenManager.clearToken();
    router.push({ path: "/login" });
  };

  const fetchProfile = async () => {
    Object.assign(profile, await authApi.getProfile());
  };
  return {
    isAuthorized,
    profile,
    adminAccess,
    moderatorAccess,
    validateToken,
    login,
    logout,
    fetchProfile,
  };
});
