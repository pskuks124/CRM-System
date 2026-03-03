interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number;
  page?: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}

interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}

interface UserRolesRequest {
  roles: Roles[];
}

interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

type Roles = "ADMIN" | "MODERATOR" | "USER";

interface ModalState {
  open: boolean;
  record: User;
  type?: "roles" | "block" | "delete" | "filter";
}

export type {
  UserFilters,
  User,
  MetaResponse,
  UserRolesRequest,
  Roles,
  UserRequest,
  ModalState,
};
