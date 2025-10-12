import { z } from "zod";

const roles = ["user", "admin"] as const;
type _Roles = (typeof roles)[number];

const getUserWithSession = z.object({});

const getUserById = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const listPublicUsers = z.object({
  query: z
    .object({
      limit: z.string().optional(),
      offset: z.string().optional(),
      role: z.enum(roles).optional(),
      sort: z.enum(["asc", "desc"]).optional(),
    })
    .optional(),
});

export default {
  getUserWithSession,
  getUserById,
  listPublicUsers,
};
