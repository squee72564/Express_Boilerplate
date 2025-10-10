import { z } from "zod";

const getUserById = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

const getAllUsers = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  emailVerified: z.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : undefined),
    z.boolean().optional()
  ),
});

export default {
  getUserById,
  getAllUsers,
};
