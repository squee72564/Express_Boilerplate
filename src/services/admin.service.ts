// SEE: https://www.better-auth.com/docs/plugins/admin

import auth from "@/lib/auth.ts";
import type { AdminOptions, InferAdminRolesFromOption } from "better-auth/plugins";
import type { Request } from "express";

type RolesFromOptions<O extends AdminOptions | undefined> =
  | InferAdminRolesFromOption<O>
  | InferAdminRolesFromOption<O>[];

type Roles = RolesFromOptions<AdminOptions>;

interface CreateUserParams {
  email: string;
  password: string;
  name: string;
  role?: Roles;
  data?: Record<string, unknown>; // TODO: Maybe change this to reflect the actual data in the user model dynamically?
}

// Create user
const createUser = async (params: CreateUserParams, req: Request) => {
  return auth.api.createUser({
    body: { ...params },
    headers: req.headers,
  });
};

interface ListUserParams {
  query: {
    searchValue?: string;
    searchField?: "email" | "name";
    searchOperator?: "contains" | "starts_with" | "ends_with";
    limit?: string | number;
    offset?: string | number;
    sortBy?: "string";
    sortDirection?: "asc" | "desc";
    filterField?: string;
    filterValue?: string | number | boolean;
    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte";
  };
  limit: number;
  offset: number;
}

// List Users
const listUsers = async (params: ListUserParams, req: Request) => {
  return auth.api.listUsers({
    query: params,
    headers: req.headers,
  });
};

// Set User Role

interface SetUserRoleParams {
  userId: string;
  role: Roles;
}

const setUserRole = async (params: SetUserRoleParams, req: Request) => {
  return auth.api.setRole({
    body: {
      userId: params.userId,
      role: params.role,
    },
    headers: req.headers,
  });
};

// Set User Password

interface SetUserPasswordParams {
  userId: string;
  newPassword: string;
}

const setUserPassword = async (params: SetUserPasswordParams, req: Request) => {
  return auth.api.setUserPassword({
    body: {
      userId: params.userId,
      newPassword: params.newPassword,
    },
    headers: req.headers,
  });
};

// Update User

interface UpdateUserParams {
  userId: string;
  data: Record<string, unknown>; // TODO: Maybe change this to reflect the actual data in the user model dynamically?
}

const updateUser = async (params: UpdateUserParams, req: Request) => {
  return auth.api.adminUpdateUser({
    body: {
      userId: params.userId,
      data: params.data,
    },
    headers: req.headers,
  });
};

// Ban User

interface BanUserParams {
  userId: string;
  banReason?: string;
  banExpiresIn?: number; // In Seconds
}

const banUser = async (params: BanUserParams, req: Request) => {
  return auth.api.banUser({
    body: {
      userId: params.userId,
      banReason: params.banReason,
      banExpiresIn: params.banExpiresIn,
    },
    headers: req.headers,
  });
};

// Unban User

interface UnbanUserParams {
  userId: string;
}

const unbanUser = async (params: UnbanUserParams, req: Request) => {
  return auth.api.unbanUser({
    body: {
      userId: params.userId,
    },
    headers: req.headers,
  });
};

// List User Sessions

interface ListUserSessionsParams {
  userId: string;
}

const listUserSessions = async (params: ListUserSessionsParams, req: Request) => {
  return auth.api.listUserSessions({
    body: {
      userId: params.userId,
    },
    headers: req.headers,
  });
};

// Revoke User Session

interface RevokeUserSessionParams {
  sessionToken: string;
}

const revokeUserSession = async (params: RevokeUserSessionParams, req: Request) => {
  return auth.api.revokeUserSession({
    body: {
      sessionToken: params.sessionToken,
    },
    headers: req.headers,
  });
};

// Revoke All Session for User

interface RevokeAllUserSessionsParams {
  userId: string;
}

const revokeAllUserSessions = async (params: RevokeAllUserSessionsParams, req: Request) => {
  return auth.api.revokeUserSessions({
    body: {
      userId: params.userId,
    },
    headers: req.headers,
  });
};

// Impersonate User

interface ImpersonateUserParams {
  userId: string;
}

const impersonateUser = async (params: ImpersonateUserParams, req: Request) => {
  return auth.api.impersonateUser({
    body: {
      userId: params.userId,
    },
    headers: req.headers,
  });
};

// Stop Impersonating User

const stopImpersonatingUser = async (req: Request) => {
  return auth.api.stopImpersonating({
    headers: req.headers,
  });
};

// Remove User

interface RemoveUserParams {
  userId: string;
}

const removeUser = async (params: RemoveUserParams, req: Request) => {
  return auth.api.removeUser({
    body: {
      userId: params.userId,
    },
    headers: req.headers,
  });
};

export default {
  createUser,
  listUsers,
  setUserRole,
  setUserPassword,
  updateUser,
  banUser,
  unbanUser,
  listUserSessions,
  revokeUserSession,
  revokeAllUserSessions,
  impersonateUser,
  stopImpersonatingUser,
  removeUser,
};
