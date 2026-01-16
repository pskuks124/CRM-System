import type {
  MetaResponse,
  User,
  UserFilters,
  UserRequest,
  UserRolesRequest,
} from "@/types/admin-types";
import { api } from "./api-client";

const adminApi = {
  getUsers: async (filters: UserFilters): Promise<MetaResponse<User>> => {
    const result = await api.get("admin/users", { params: filters });
    return result.data;
  },
  getProfile: async (id: number): Promise<User> => {
    const result = await api.get(`admin/users/${id}`);
    return result.data;
  },
  editProfile: async (id: number, userData: UserRequest): Promise<User> => {
    const result = await api.put(`admin/users/${id}`, userData);
    return result.data;
  },
  removeUser: async (id: number): Promise<void> => {
    const result = await api.delete(`admin/users/${id}`);
    return result.data;
  },
  blockUser: async (id: number): Promise<User> => {
    const result = await api.post(`admin/users/${id}/block`);
    return result.data;
  },
  unblockUser: async (id: number): Promise<User> => {
    const result = await api.post(`admin/users/${id}/unblock`);
    return result.data;
  },
  updateRights: async (
    id: number,
    userData: UserRolesRequest,
  ): Promise<User> => {
    const result = await api.post(`admin/users/${id}/rights`, userData);
    return result.data;
  },
};

export default adminApi;
