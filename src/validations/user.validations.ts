import { z } from "zod";
import adminValidations from "./admin.validations.js";

const getUserById = z.object({
  query: z.object({
    id: z.uuid(),
  }),
});

const listUsers = adminValidations.ListUserRequestSchema; // Same as admin's list users

export default {
  getUserById,
  listUsers,
};
