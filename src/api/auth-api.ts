import type {
  UserRegistration,
  AuthData,
  Profile,
  Token,
  RefreshToken,
} from "../types/auth-types";
import { api } from "./api-client";

const authApi = {
  sendRegistrationData: async (user: UserRegistration): Promise<Profile> => {
    const response = await api.post("/auth/signup", user);
    return await response.data;
  },
  sendAuthData: async (user: AuthData): Promise<Token> => {
    const response = await api.post("/auth/signin", user);
    return await response.data;
  },
  refresh: async (refreshToken: RefreshToken): Promise<Token> => {
    const response = await api.post("/auth/refresh", refreshToken);
    return await response.data;
  },
  getProfile: async (): Promise<Profile> => {
    const response = await api.get("/user/profile");
    return await response.data;
  },
  logout: async (): Promise<void> => {
    await api.post("/user/logout");
  },
};

export default authApi;
