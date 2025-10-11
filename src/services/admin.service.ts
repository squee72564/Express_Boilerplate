// SEE: https://www.better-auth.com/docs/plugins/admin

import auth from "@/lib/auth.ts";
import type { Request } from "express";
import {
  CreateUserParams,
  ListUserParams,
  SetUserRoleParams,
  SetUserPasswordParams,
  UpdateUserParams,
  BanUserParams,
  UnbanUserParams,
  ListUserSessionsParams,
  RevokeUserSessionParams,
  RevokeAllUserSessionParams,
  ImpersonateUserParams,
  RemoveUserParams,
} from "../types/admin.types.js";

const createUser = async (params: CreateUserParams, req: Request) => {
  return auth.api.createUser({
    body: {
      email: params.email,
      password: params.password,
      name: params.name,
      role: params.role,
      data: params.data,
    },
    headers: req.headers,
  });
};

// List Users
const listUsers = async (params: ListUserParams, req: Request) => {
  return auth.api.listUsers({
    query: { ...params },
    headers: req.headers,
  });
};

// Set User Role

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

const unbanUser = async (params: UnbanUserParams, req: Request) => {
  return auth.api.unbanUser({
    body: {
      userId: params.userId,
    },
    headers: req.headers,
  });
};

// List User Sessions
const listUserSessions = async (params: ListUserSessionsParams, req: Request) => {
  return auth.api.listUserSessions({
    body: {
      userId: params.userId,
    },
    headers: req.headers,
  });
};

// Revoke User Session
const revokeUserSession = async (params: RevokeUserSessionParams, req: Request) => {
  return auth.api.revokeUserSession({
    body: {
      sessionToken: params.sessionToken,
    },
    headers: req.headers,
  });
};

// Revoke All Session for User
const revokeAllUserSessions = async (params: RevokeAllUserSessionParams, req: Request) => {
  return auth.api.revokeUserSessions({
    body: {
      userId: params.userId,
    },
    headers: req.headers,
  });
};

// Impersonate User
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
