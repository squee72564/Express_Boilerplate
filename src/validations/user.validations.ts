import { z } from "zod";

const getUserById = z.object({
  query: z.object({
    id: z.uuid(),
  }),
});

export default {
  getUserById,
};
