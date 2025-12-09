import { defineStore } from "pinia";
import { ref } from "vue";
import authApi from "@/api/auth-api";
import { useRouter } from "vue-router";
import type { AuthData, Token } from "@/types/auth-types";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  // State
  const accessToken = ref<string | null>(localStorage.getItem("accessToken"));
  const refreshToken = ref<string | null>(localStorage.getItem("refreshToken"));

  //Actions
  const login = async (form: AuthData) => {
    try {
      const token = await authApi.sendAuthData(form);
      assignNewTokenValue(token);
      router.push({ path: "/" });
    } catch {
      alert("Не удалось авторизироваться");
    }
  };

  const refresh = async () => {
    if (refreshToken.value == null) throw new Error();
    const token = await authApi.refresh({ refreshToken: refreshToken.value });
    console.log(`token as it's being rewritten: ${{ ...token }}`);
    assignNewTokenValue(token);
    return token;
  };

  const assignNewTokenValue = (newToken: Token) => {
    accessToken.value = newToken.accessToken;
    refreshToken.value = newToken.refreshToken;
    localStorage.setItem("accessToken", accessToken.value);
    localStorage.setItem("refreshToken", refreshToken.value);
  };
  const clearToken = () => {
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  const logout = async () => {
    await authApi.logout().catch((error) => {
      alert(`logout error ${error}`);
    });
    console.log("store after api logout");
    clearToken();

    router.push({ path: "/login" });
  };

  return { accessToken, refreshToken, login, refresh, logout };
});
