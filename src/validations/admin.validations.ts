import { z } from "zod";
import { defaultRoles } from "better-auth/plugins";
import type { AdminOptions, InferAdminRolesFromOption } from "better-auth/plugins";

// Helpers for expected role type
type Roles = InferAdminRolesFromOption<AdminOptions>;
const roleKeys = Object.keys(defaultRoles) as (keyof Omit<typeof defaultRoles, "member">)[];
const RoleSchema = z.union([
  z.enum(roleKeys as [Roles, ...Roles[]]),
  z.array(z.enum(roleKeys as [Roles, ...Roles[]])),
]);

// Create use
const CreateUserRequestSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    role: RoleSchema,
    data: z.record(z.string(), z.unknown()),
  }),
});

// List Users
const ListUserRequestSchema = z.object({
  body: z.object({
    searchValue: z.string().optional(),
    searchField: z.enum(["email", "name"]).optional(),
    searchOperator: z.enum(["contains", "starts_with", "ends_with"]).optional(),
    limit: z.union([z.string(), z.number()]).optional(),
    offset: z.union([z.string(), z.number()]).optional(),
    sortBy: z.string().optional(),
    sortDirection: z.enum(["asc", "desc"]).optional(),
    filterField: z.string().optional(),
    filterValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
    filterOperator: z.enum(["eq", "ne", "lt", "lte", "gt", "gte"]).optional(),
  }),
});

// Set User Role
const SetUserRoleRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
    role: RoleSchema,
  }),
});

// Set User Password
const SetUserPasswordRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
    newPassword: z.string(),
  }),
});

// Update User
const UpdateUserRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
    data: z.record(z.string(), z.unknown()),
  }),
});

// Ban User
const BanUserRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
    banReason: z.string().optional(),
    banExpiresIn: z.number().optional(),
  }),
});

// Unban user
const UnbanUserRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

// List User Sessions
const ListUserSessionsRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

// Revoke User Session
const RevokeUserSessionRequestSchema = z.object({
  body: z.object({
    sessionToken: z.string(),
  }),
});

// Revoke All Session for User
const RevokeAllUserSessionRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

// Impersonate User
const ImpersonateUserRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

// Stop Impersonating User
const StopImpersonatingRequestSchema = z.object({});

// Remove User
const RemoveUserRequestSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

export default {
  CreateUserRequestSchema,
  RemoveUserRequestSchema,
  UpdateUserRequestSchema,
  ListUserRequestSchema,
  SetUserRoleRequestSchema,
  ImpersonateUserRequestSchema,
  ListUserSessionsRequestSchema,
  StopImpersonatingRequestSchema,
  RevokeUserSessionRequestSchema,
  RevokeAllUserSessionRequestSchema,
  SetUserPasswordRequestSchema,
  BanUserRequestSchema,
  UnbanUserRequestSchema,
};
